import { ApiProperty } from '@nestjs/swagger';
class CreateTipoEntrada {
  title: string;
  quantity: number;
  unit_price: number;
};
export class CreateMercadoPagoDto {
  @ApiProperty({type: CreateTipoEntrada, isArray: true})
  items: CreateTipoEntrada[];

  @ApiProperty()
  eventoId: string;
}
