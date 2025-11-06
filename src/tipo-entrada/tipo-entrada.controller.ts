import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEntradaService } from './tipo-entrada.service';
import { CreateTipoEntradaDto } from './dto/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dto/update-tipo-entrada.dto';

@Controller('tipo-entrada')
export class TipoEntradaController {
  constructor(private readonly tipoEntradaService: TipoEntradaService) {}

  @Post()
  create(@Body() createTipoEntradaDto: CreateTipoEntradaDto) {
    return this.tipoEntradaService.create(createTipoEntradaDto);
  }

  @Get()
  findAll() {
    return this.tipoEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEntradaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEntradaDto: UpdateTipoEntradaDto) {
    return this.tipoEntradaService.update(+id, updateTipoEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEntradaService.remove(+id);
  }
}
