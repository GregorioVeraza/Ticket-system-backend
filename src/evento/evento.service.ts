import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from './schemes/evento.scheme';
import { CreateEventoDto } from './dto/create-evento.dto';
import { updateTipoEntradaDto } from './dto/update-tipo-entrada-evento';
import { TipoEntrada } from 'src/tipo-entrada/schemas/tipo-entrada.schema';


@Injectable()
export class EventoService {
    constructor(@InjectModel(Evento.name) private eventoModel: Model<EventoDocument>) {}
    
  async create(createeventoDto: CreateEventoDto): Promise<Evento> {
    const evento = new this.eventoModel(createeventoDto);
    return evento.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async findByName(nombre: string): Promise<Evento | null> {
    return this.eventoModel.findOne({ nombre }).populate('tipoEntrada').exec();
  }

  async update(update:updateTipoEntradaDto): Promise<updateTipoEntradaDto| string> {
    const evento = await this.eventoModel.findOne({ _id: update._id });
    
    if (!evento) {
      return 'evento no encontrado';
    }
    if (update.nombre) evento.nombre = update.nombre;
    if (update.fecha) evento.fecha = update.fecha;
    if (update.descripcion) evento.descripcion = update.descripcion;
    if (update.tipoEntrada && Array.isArray(update.tipoEntrada)) {
    for (const newTipo of update.tipoEntrada) {
      if (newTipo.nombre != ''){
        if (!evento.tipoEntrada.some(t => t.nombre === newTipo.nombre)) {
          evento.tipoEntrada.push(newTipo);
        }
      }
      }
    } 
console.log(evento);
    
    await evento.save();
    return update;
  }

  async   remove(id: string): Promise<string> {
    console.log('ID recibido para eliminar:', id);
    const result = await this.eventoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return 'Evento no encontrado';
    } 
    return 'Evento eliminado correctamente';
  }
}
