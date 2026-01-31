import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ticket } from 'src/ticket/schemas/ticket.schema';

export type ClienteDocument = cliente & Document;



@Schema()
export class cliente {
  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  password?: String;

  @Prop({ required: true, unique: true, sparse: true })
  auth0Sub: string;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TipoEntrada' }], required: false })
    tickets: Ticket[];

  @Prop({ required: true })
  rol: string;
}


export const ClienteSchema = SchemaFactory.createForClass(cliente);

