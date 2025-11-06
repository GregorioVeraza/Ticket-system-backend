import { Test, TestingModule } from '@nestjs/testing';
import { TipoEntradaController } from './tipo-entrada.controller';
import { TipoEntradaService } from './tipo-entrada.service';

describe('TipoEntradaController', () => {
  let controller: TipoEntradaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoEntradaController],
      providers: [TipoEntradaService],
    }).compile();

    controller = module.get<TipoEntradaController>(TipoEntradaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
