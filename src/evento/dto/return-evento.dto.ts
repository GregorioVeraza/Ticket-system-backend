import { ApiProperty } from "@nestjs/swagger";
import { CreateTipoEntradaDto } from "src/tipo-entrada/dto/create-tipo-entrada.dto";

export class returnEventoDto{
    @ApiProperty()
    id: string;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    descripcion: string;
    @ApiProperty({type: [CreateTipoEntradaDto]})
    tipoEntrada:  CreateTipoEntradaDto[]; 
    @ApiProperty()
    creadorId: string;
    @ApiProperty()
    imagePublicId: string;  
}