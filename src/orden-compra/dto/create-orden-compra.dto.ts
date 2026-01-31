export class CreateOrdenCompraDto {
    clienteId: string;
    eventoId: string;
    estado: string;
    preferenceId?: string;
    total: number;
}
/*
@Prop({ type: Types.ObjectId, ref: 'cliente' , required: true })
    userId: cliente;

    @Prop({ type: Types.ObjectId, ref: 'Evento' , required: true })
    eventoId: Evento;

    @Prop({required: true})
    estado: estados;

    @Prop({required: true })
    preferenceId: string;//from MP

    @Prop({ required: true })
    externalReference: string;//from MP

    @Prop({ required: true })
    total: number;

    @Prop({ required: true })
    createdAt: Date;
*/