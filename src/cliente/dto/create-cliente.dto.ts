import { ResponseTicketDto } from "src/ticket/dto/response-ticket.dto";

export class CreateClienteDto {
    email: string;
    password?: String;
    tickets?: String[];
    auth0Sub?: string;
    rol: string;
}
