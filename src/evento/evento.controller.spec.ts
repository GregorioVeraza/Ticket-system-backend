import { Test, TestingModule } from '@nestjs/testing';
import { eventoController } from './evento.controller';

describe('EventoController', () => {
  let controller: eventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [eventoController],
    }).compile();

    controller = module.get<eventoController>(eventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
