import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { cliente } from 'src/cliente/schemas/cliente.schema';
import { Evento } from 'src/evento/schemes/evento.scheme';

export type OrdenCompraDocument = OrdenCompra & Document;

export enum estados {
    Pendiente = 'pending',
    Pagada = 'approved',
    Cancelada = 'cancelled',
    EnProceso = 'in_process',
    Rechazada = 'rejected',
}
//falta agregar el id del usuario que compro la entrada
@Schema()
export class OrdenCompra {
    @Prop({ required: true })
    clienteId: string;

    @Prop({ type: Types.ObjectId, ref: 'Evento' , required: true })
    eventoId: Evento;

    @Prop({required: true})
    estado: estados;

    @Prop({required: false })
    preferenceId: string;//from MP

    @Prop({ required: false })
    externalReference: string;//from MP

    @Prop({ required: true })
    total: number;

    @Prop({ required: true })
    fechaDeCreacion: Date;
}

export const OrdenCompraSchema = SchemaFactory.createForClass(OrdenCompra);
