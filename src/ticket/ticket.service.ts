import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import {ClienteService} from 'src/cliente/cliente.service';
import { ResponseTicketDto } from './dto/response-ticket.dto';
import {createTransport, createTestAccount, getTestMessageUrl} from 'nodemailer';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>, private clienteService: ClienteService) {}
  
  private async enviarMailConQR(mail: string, codigoPublico: string) {

    const testAccount = await createTestAccount();
    // Create a transporter using Ethereal test credentials.
    // For production, replace with your actual SMTP server details.
    const transporter = createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    // 1. Generar QR como buffer (PNG)
    const qrBuffer = await QRCode.toBuffer(codigoPublico);

  // Send an email using async/await
    (async () => {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: mail,
        subject: "Entradas compradas - QR Code",
        text: `Gracias por su compra. Su código de entrada es: ${codigoPublico}`,
        html: `
          <h1>Gracias por su compra.</h1>
          <p>Mostrá este QR al staff:</p>
          <img src="cid:qr-code" />
        `, // HTML version of the message
        attachments: [
          {
            filename: 'qrcode.png',
            content: qrBuffer,
            cid: 'qr-code' // same cid value as in the html img src
          }
        ]
      });

      console.log("Message sent:", info.messageId);
      const previewUrl = getTestMessageUrl(info);
      console.log("Preview URL: %s", previewUrl);
    })();
  }

  create(createTicketDto: CreateTicketDto): Promise<string> {
    const ticketConCodigo = {
      ...createTicketDto,
      codigoPublico: crypto.randomUUID(),
    }
    const ticket = new this.ticketModel(ticketConCodigo);
    return ticket.save().then(async (result) => {
      const email: string = await this.clienteService.findOneById(createTicketDto.compradorId).then( (cliente) => {
        return cliente;
      });
      this.enviarMailConQR(email, ticket.codigoPublico);
      return result.id;
    });
  }
/*
  async findAll(): Promise<ResponseTicketDto[]> {
    const tickets = await this.ticketModel
    .find()
    .populate({path:'eventoId', select: 'nombre fecha'})
    .populate({path: 'tipoEntradaId', select: 'nombre precio'})
    .select( '-__v')
    .exec();
    
    return tickets.map(ticket => ({
      id: String(ticket._id),
      evento: {
        nombre: ticket.eventoId?.nombre,
        fecha: ticket.eventoId?.fecha,
      },
      entrada: {
        nombre: Array.isArray(ticket.tipoEntradaId) ? ticket.tipoEntradaId[0]?.nombre : ticket.tipoEntradaId?.nombre,
        precio: Array.isArray(ticket.tipoEntradaId) ? ticket.tipoEntradaId[0]?.precio : ticket.tipoEntradaId?.precio,
      },
      Usado: ticket.estado,
    }));
  }*/

  async findOne(id: string)  {
    return this.ticketModel.findOne({id}).populate('eventoId').populate('tipoEntradaId').exec()
  }

  async findOneByUuid(uuid: string)  {
    return this.ticketModel.findOne({codigoPublico: uuid}).populate('eventoId').populate('tipoEntradaId').exec()
  }
  
  async validarTicket(idTicket: string): Promise<{ message: string; isValid: boolean }> {
  console.log(`Validando ticket ${idTicket}...`);

  try {
    const ticket = await this.findOneByUuid(idTicket);

    if (!ticket) {
      throw new Error(`Ticket ${idTicket} no encontrado`);
    }

    const hoy = new Date();
    const fechaEvento = new Date(ticket.eventoId.fecha);

    const esHoy =
      hoy.getUTCFullYear() === fechaEvento.getUTCFullYear() &&
      hoy.getUTCMonth() === fechaEvento.getUTCMonth() &&
      hoy.getUTCDate() === fechaEvento.getUTCDate();

    if (!esHoy) {
      throw new Error(`Ticket ${idTicket} no válido: fecha del evento no coincide`);
    }

    if (!ticket.estado) {
      throw new Error(`Ticket ${idTicket} ya fue usado`);
    }

    ticket.estado = false;
    await ticket.save();

    console.log(`Ticket ${idTicket} validado correctamente`);
    return {
      message: `Ticket ${idTicket} validado correctamente`,
      isValid: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `Error al validar ticket ${idTicket}: ${error.message}`,
      isValid: false,
    };
  }
}

/*
  remove(id: number) {
    return this.Tickets.splice(id,1);
  }*/
}
/*
[
  {
    "_id": "68d1a79d054c7afd86221f17",
    "eventoId": [
      {
        "_id": "68d17373dbe635218f5786a1",
        "nombre": "giveon",
        "fecha": "2025-09-22T00:00:00.000Z",
        "descripcion": "cantante de R&B",
        "tipoEntrada": [
          "68d17134585f5e06ebc4874a"
        ],
        "__v": 0
      }
    ],
    "tipoEntradaId": [
      {
        "_id": "68d17134585f5e06ebc4874a",
        "nombre": "general",
        "precio": 300,
        "cantidadEntradas": 10,
        "__v": 0
      }
    ],
    "Usado": false,
    "__v": 0
  }
]*/