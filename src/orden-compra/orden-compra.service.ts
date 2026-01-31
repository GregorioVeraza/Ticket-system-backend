import { Injectable } from '@nestjs/common';
import { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import { UpdateOrdenCompraDto } from './dto/update-orden-compra.dto';
import {CreateTicketDto} from '../ticket/dto/create-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoEntrada } from 'src/ticket/schemas/ticket.schema';
import { ClienteService } from 'src/cliente/cliente.service';
import {TicketService} from '../ticket/ticket.service';
import { OrdenCompra, OrdenCompraDocument, estados } from './schemas/OrdenCompra.schema';

@Injectable()
export class OrdenCompraService {
  constructor(@InjectModel(OrdenCompra.name) private ordenCompraModel: Model<OrdenCompraDocument>, private ticketService: TicketService, private clienteService: ClienteService) {}

  create(createOrdenCompraDto: CreateOrdenCompraDto) : Promise<string> {
    console.log(createOrdenCompraDto);
    const ordenCompleta = { ...createOrdenCompraDto, fechaDeCreacion: new Date() };
    const orden = new this.ordenCompraModel(ordenCompleta);
    return orden.save().then((result) => {
      return result.id;
    });
  }

  updatePreferenceId(id: string, preferenceId: string ): Promise<OrdenCompra> {
    return this.ordenCompraModel.findByIdAndUpdate(
      id,
      { preferenceId: preferenceId },
      { new: true },//retorna el documento actualizado
    ).exec().then((updatedOrden) => {
      if (!updatedOrden) {
        throw new Error('Orden de compra no encontrada');
      }
      return updatedOrden;
    });
  } 

  private async crearTicket(createTicketDTo: CreateTicketDto): Promise<string> {
    return this.ticketService.create(createTicketDTo);
  }

  async updateEstado(nuevoEstado: string | undefined, idOrdenCompra: string): Promise<OrdenCompra> {
    
    return this.ordenCompraModel.findByIdAndUpdate(
      idOrdenCompra,
      { estado: nuevoEstado },//actualiza el estado
      { new: true },
    ).exec().then(async (updatedOrden) => {
      if (!updatedOrden) {
        throw new Error('Orden de compra no encontrada');
      }
      if (nuevoEstado === 'approved') {//si es aprobado, creo tickets y lo asigno al cliente
        try {
          const cliente = await this.clienteService.findByAuth0Sub(updatedOrden.clienteId);
          const createTicketDTO: CreateTicketDto = {
            eventoId: updatedOrden.eventoId as unknown as string,
            tipoEntradaId: TipoEntrada.VIP,
            compradorId: cliente._id as unknown as string,
            OrdenCompraId: updatedOrden._id as string,
            estado: true,
          };
          const idTicket = await this.crearTicket(createTicketDTO);
          this.clienteService.addTicket(cliente._id as unknown as string, idTicket);
        } catch (err) {
          console.error('Error creating ticket for approved order:', err);
        }
      }
      return updatedOrden;
    }).catch((error) => {
      throw new Error(`Error updating orden de compra: ${error.message}`);
    });
  }

  findAll() {
    return `This action returns all ordenCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenCompra`;
  }

  update(id: number, updateOrdenCompraDto: UpdateOrdenCompraDto) {
    return `This action updates a #${id} ordenCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenCompra`;
  }
}
