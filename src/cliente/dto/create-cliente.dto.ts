import { ResponseTicketDto } from "src/ticket/dto/response-ticket.dto";

export class CreateClienteDto {
    email: string;
    password: string;
    tickets?: String[];
}
