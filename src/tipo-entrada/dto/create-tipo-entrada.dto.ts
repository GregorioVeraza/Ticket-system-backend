import { ApiProperty } from "@nestjs/swagger";
export class CreateTipoEntradaDto {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  precio: number;
  @ApiProperty()
  cantidadEntradas: number;
}
