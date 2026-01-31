import { UpdateTipoEntradaDto } from "src/tipo-entrada/dto/update-tipo-entrada.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class updateTipoEntradaDto{
    @ApiProperty()
    _id?: string;

    @ApiPropertyOptional()
    nombre?: string;
    
    @ApiPropertyOptional()
    descripcion?: string;

    @ApiPropertyOptional()
    fecha?: Date;

    @ApiPropertyOptional({type: UpdateTipoEntradaDto})
    tipoEntrada?: UpdateTipoEntradaDto;

}