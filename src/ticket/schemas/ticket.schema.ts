import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Evento } from 'src/evento/schemes/evento.scheme';
import { TipoEntrada } from 'src/tipo-entrada/schemas/tipo-entrada.schema';

export type TicketDocument = Ticket & Document;


//falta agregar el id del usuario que compro la entrada
@Schema()
export class Ticket {
    
    @Prop({ type: Types.ObjectId, ref: 'Evento' , required: true })
    eventoId: Evento;
    
    @Prop({ type: Types.ObjectId, ref: 'TipoEntrada' , required: true })
    tipoEntradaId: TipoEntrada;
    
    @Prop({ required: true })
    Usado: boolean;

}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
