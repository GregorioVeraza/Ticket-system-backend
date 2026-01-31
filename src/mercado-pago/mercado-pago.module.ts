import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { OrdenCompraModule } from 'src/orden-compra/orden-compra.module';

@Module({
  imports: [OrdenCompraModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadoPagoModule {}
