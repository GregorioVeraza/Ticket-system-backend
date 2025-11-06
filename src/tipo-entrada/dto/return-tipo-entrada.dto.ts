import { ApiProperty } from "@nestjs/swagger";
export class ReturnTipoEntrada {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  precio: number;
  @ApiProperty()
  cantidadEntradas: number;
}
