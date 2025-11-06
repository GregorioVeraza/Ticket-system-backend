import { Module } from '@nestjs/common';
import { TipoEntradaService } from './tipo-entrada.service';
import { TipoEntradaController } from './tipo-entrada.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoEntrada, TipoEntradaSchema } from './schemas/tipo-entrada.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TipoEntrada.name, schema: TipoEntradaSchema }])],
  controllers: [TipoEntradaController],
  providers: [TipoEntradaService],
  exports: [TipoEntradaService]
})
export class TipoEntradaModule {}
