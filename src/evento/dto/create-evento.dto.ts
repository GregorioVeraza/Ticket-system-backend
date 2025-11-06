import { CreateTipoEntradaDto } from '../../tipo-entrada/dto/create-tipo-entrada.dto';
import { ApiProperty } from "@nestjs/swagger";


export class CreateEventoDto {
  @ApiProperty()
  titulo: string;
  @ApiProperty()
  fecha: Date;
  @ApiProperty()
  descripcion: string;
  @ApiProperty({type: CreateTipoEntradaDto})
  tipoEntrada: CreateTipoEntradaDto[];
}
