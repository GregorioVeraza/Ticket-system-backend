export class CreateTicketDto {
    eventoId: string;
    tipoEntradaId: string;
    compradorId: string;
    OrdenCompraId: string;
    estado: boolean;


}
/*
@Prop({ type: Types.ObjectId, ref: 'Evento' , required: true })
    eventoId: Evento;
    
    @Prop({ type: Types.ObjectId, ref: 'TipoEntrada' , required: true })
    tipoEntradaId: TipoEntrada;
    
    @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
    compradorId: cliente;

    @Prop({ type: Types.ObjectId, ref: 'OrdenCompra', required: true })
    OrdenCompraId: OrdenCompra;
    
    @Prop({ required: true })
    estado: boolean;
    
    @Prop({ required: true })
    codigoPublico: string;
*/