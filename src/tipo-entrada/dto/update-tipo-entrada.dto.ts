import {ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTipoEntradaDto {
  @ApiPropertyOptional()
  nombre?: string;
  @ApiPropertyOptional()
  precio?: number;
  @ApiPropertyOptional()
  cantidadEntradas?: number;
}

