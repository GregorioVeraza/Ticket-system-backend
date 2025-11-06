export class ResponseTicketDto {
    id: String;
    evento: {
        nombre: String;
        fecha: Date;
    };
    entrada: {
        nombre: String;
        precio: number;
    };
    Usado: boolean;
}
