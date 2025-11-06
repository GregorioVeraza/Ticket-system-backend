import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TipoEntradaDocument = TipoEntrada & Document;



@Schema()
export class TipoEntrada {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  cantidadEntradas: number;
}

export const TipoEntradaSchema = SchemaFactory.createForClass(TipoEntrada);