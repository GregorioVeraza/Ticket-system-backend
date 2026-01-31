import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Evento } from 'src/evento/schemes/evento.scheme';
import { cliente } from 'src/cliente/schemas/cliente.schema';
import {OrdenCompra} from 'src/orden-compra/schemas/OrdenCompra.schema';

export type TicketDocument = Ticket & Document;

export enum TipoEntrada{
    VIP = 'VIP',
    GENERAL = 'GENERAL',
    BALCON = 'BALCON',
    PLATEA = 'PLATEA',
    PALCO = 'PALCO',
    OTRO = 'OTRO'
}

//falta agregar el id del usuario que compro la entrada
@Schema()
export class Ticket {
    
    @Prop({ type: Types.ObjectId, ref: 'Evento' , required: true })
    eventoId: Evento;
    
    @Prop({required: true })
    tipoEntradaId: TipoEntrada;
    
    @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
    compradorId: cliente;

    @Prop({ type: Types.ObjectId, ref: 'OrdenCompra', required: true })
    OrdenCompraId: OrdenCompra;
    
    @Prop({ required: true })
    estado: boolean;

    @Prop({ required: false })
    codigoPublico: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
