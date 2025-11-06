import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { ResponseTicketDto } from './dto/response-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}
  
  create(createTicketDto: CreateTicketDto) {
    const ticket = new this.ticketModel(createTicketDto);
    return ticket.save();
  }

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
        nombre: ticket.tipoEntradaId?.nombre,
        precio: ticket.tipoEntradaId?.precio,
      },
      Usado: ticket.Usado,
    }));
  }

  findOne(id: number) {
    return this.ticketModel.findOne({id}).populate('eventoId').populate('tipoEntradaId').exec()
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