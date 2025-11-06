import { Test, TestingModule } from '@nestjs/testing';
import { TipoEntradaService } from './tipo-entrada.service';

describe('TipoEntradaService', () => {
  let service: TipoEntradaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoEntradaService],
    }).compile();

    service = module.get<TipoEntradaService>(TipoEntradaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
