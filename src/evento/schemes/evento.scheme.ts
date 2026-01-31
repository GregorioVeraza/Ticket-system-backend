import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CreateTipoEntradaDto } from 'src/tipo-entrada/dto/create-tipo-entrada.dto';
import { TipoEntrada } from 'src/tipo-entrada/schemas/tipo-entrada.schema';

export type EventoDocument = Evento & Document;



@Schema()
export class Evento {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  descripcion: string;

  @Prop(
    { type: 
        [{
          nombre: { type: String, required: true },
          precio: { type: Number, required: true },
          cantidadEntradas: { type: Number, required: true },
        },
      ], 
      required: true 
    }
  )
  tipoEntrada: TipoEntrada[];
  @Prop({required: true })
    creadorId: string;
  @Prop({ required: true })
  imagePublicId: string;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
