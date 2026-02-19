import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { eventoController} from './evento/evento.controller';
import { TipoEntradaModule } from './tipo-entrada/tipo-entrada.module';
import { TicketModule } from './ticket/ticket.module';
import { ClienteModule } from './cliente/cliente.module';
import { StaffModule } from './staff/staff.module';
import { AuthzModule } from './authz/authz.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';

//gregoveraza_db_user:gre123
@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://gregoveraza_db_user:gre123@cluster0.mebxqkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),EventoModule, TipoEntradaModule, TicketModule, ClienteModule, StaffModule, AuthzModule, MercadoPagoModule, OrdenCompraModule],
  controllers: [AppController, eventoController],
  providers: [AppService],
})
export class AppModule {}
