import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ticket } from 'src/ticket/schemas/ticket.schema';

export type EventoDocument = Staff & Document;



@Schema()
export class Staff {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password:String;
}


export type UsuarioDocument = Staff & Document;
