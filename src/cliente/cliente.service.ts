import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { cliente, ClienteDocument } from './schemas/cliente.schema';
import { Model } from 'mongoose';
import { ResponseClienteTicketsDto } from './dto/response-cliente.dto';
import { ResponseTicketDto } from 'src/ticket/dto/response-ticket.dto';
import { Ticket } from 'src/ticket/schemas/ticket.schema';
import { ResponseMultipleClienteDto } from './dto/response-multiple-cliente.dto';

function convertirTicket(ticket:Ticket[]): ResponseTicketDto[] {
    return ticket.map((ticket: any) => ({
    id: ticket._id.toString(),
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
@Injectable()
export class ClienteService {

  constructor(@InjectModel(cliente.name) private clienteModel: Model<ClienteDocument>){}

  create(createClienteDto: CreateClienteDto): Promise<ClienteDocument> {
    const cliente = new this.clienteModel(createClienteDto);
    return cliente.save();
  }
  
  
  
  async findAll():  Promise<ResponseMultipleClienteDto[]>{
    const clientes = await this.clienteModel
    .find()
    .populate({path:'tickets', select: 'id Usado entrada evento'}).exec();
    
    return clientes.map(cliente => ({
      email: String(cliente.email),
      password: String(cliente.password),
      tickets: convertirTicket(cliente.tickets as Ticket[]),
    }));;
  }

  async findOne(id: string): Promise<ResponseClienteTicketsDto> {
  const cliente = await this.clienteModel
    .findOne({ _id: id }) // importante usar findOne
    .select('tickets')
    .populate({
      path: 'tickets',
      select: 'eventoId tipoEntradaId Usado', // lo que querés del ticket
      populate: [
        { path: 'eventoId', select: 'nombre fecha' },
        { path: 'tipoEntradaId', select: 'nombre precio' },
      ],
    })
    .exec();

  if (!cliente) {
    throw new Error('Cliente no encontrado');
  }

  return {
    tickets: convertirTicket(cliente.tickets),
  };
}


  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
