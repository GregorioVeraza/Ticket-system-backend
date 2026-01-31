import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ticket } from 'src/ticket/schemas/ticket.schema';

export type EventoDocument = Staff & Document;

export enum StaffRole {
  STAFF = 'staff',
  PRODUCER = 'productora',
  VALIDATOR = 'validador',
  ADMIN = 'admin',
}

@Schema()
export class Staff {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: String;

  @Prop({ required: false, default: StaffRole.STAFF })
  role: StaffRole;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);

export type UsuarioDocument = Staff & Document;
