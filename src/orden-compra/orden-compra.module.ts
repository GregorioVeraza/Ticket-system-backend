import { Module } from '@nestjs/common';
import { OrdenCompraService } from './orden-compra.service';
import { OrdenCompraController } from './orden-compra.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdenCompra ,OrdenCompraSchema } from './schemas/OrdenCompra.schema';
import { TicketModule } from 'src/ticket/ticket.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrdenCompra.name, schema: OrdenCompraSchema }]), TicketModule, ClienteModule],
  controllers: [OrdenCompraController],
  providers: [OrdenCompraService],
  exports: [OrdenCompraService]
})
export class OrdenCompraModule {}
