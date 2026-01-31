import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]), ClienteModule],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService]
})
export class TicketModule {}
