import { Injectable } from '@nestjs/common';
import { CreateTipoEntradaDto } from './dto/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dto/update-tipo-entrada.dto';
import { TipoEntrada, TipoEntradaDocument } from './schemas/tipo-entrada.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TipoEntradaService {
  constructor(@InjectModel(TipoEntrada.name) private tipoEntradaModel:Model<TipoEntradaDocument>) {}

  create(createTipoEntradaDto: CreateTipoEntradaDto) {
    const tipoEntrada = new this.tipoEntradaModel(createTipoEntradaDto);
    return tipoEntrada.save();
  }
  findAll(): Promise<TipoEntrada[]> {
    return this.tipoEntradaModel.find().exec();
  }

  findOne(id: number): Promise<TipoEntrada | null> {
    return this.tipoEntradaModel.findOne({id}).exec();
  }

  update(id: number, updateTipoEntradaDto: UpdateTipoEntradaDto) {
    return `This action updates a #${id} tipoEntrada`;
  }

  remove(id: number): Promise<{ deletedCount?: number }> {
    return this.tipoEntradaModel.deleteOne({id}).exec();
  }
}
