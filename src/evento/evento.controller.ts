import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EventoService } from './evento.service';
import { returnEventoDto } from './dto/return-evento.dto';
import { Evento } from './schemes/evento.scheme';
import { TipoEntrada } from '../tipo-entrada/schemas/tipo-entrada.schema';
import { updateTipoEntradaDto } from './dto/update-tipo-entrada-evento';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReturnTipoEntrada } from '../tipo-entrada/dto/return-tipo-entrada.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('evento')
export class eventoController {
    constructor(private readonly eventoServices: EventoService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body()CreateEventoDto:CreateEventoDto){
    return this.eventoServices.create(CreateEventoDto); 
  }


  @Get()
  @ApiOkResponse({type: [returnEventoDto]})
  findAll():  Promise<Evento[]> {
    return this.eventoServices.findAll();
  }


  @Get(':nombre')//busca por nombre. Si encuntra el nombre, devuelve el evento, sino undefined
  @ApiOkResponse({type:  [ReturnTipoEntrada]})
  findOne(@Param('nombre') nombre: string): Promise<TipoEntrada[] | null> {
    return this
    .eventoServices
    .findByName(nombre)
    .then(evento => {
      if (!evento) {
        return null;
      } else {
        return evento.tipoEntrada;
      }
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() update: updateTipoEntradaDto) {
    return this.eventoServices.update(update);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoServices.remove(id);
  }
}
