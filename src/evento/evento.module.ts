import { Module } from '@nestjs/common';
import { eventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Evento, EventoSchema } from './schemes/evento.scheme';

@Module({
  imports: [MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }])],
  controllers: [eventoController],
  providers: [EventoService],
  exports: [EventoService]
})
export class EventoModule {}
