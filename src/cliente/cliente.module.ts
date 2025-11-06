import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cliente, ClienteSchema } from './schemas/cliente.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: cliente.name, schema: ClienteSchema }])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService]
})
export class ClienteModule {}
