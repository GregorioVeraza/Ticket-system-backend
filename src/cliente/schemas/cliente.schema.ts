import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ticket } from 'src/ticket/schemas/ticket.schema';

export type ClienteDocument = cliente & Document;



@Schema()
export class cliente {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password:String;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'TipoEntrada' }], required: true })
    tickets: Ticket[];
}


export const ClienteSchema = SchemaFactory.createForClass(cliente);

