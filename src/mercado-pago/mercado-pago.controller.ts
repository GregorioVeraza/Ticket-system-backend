import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'mercadopago';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('preference')
  async createPreference(
    @Req() req,
    @Body()CreateMercadoPagoDto:CreateMercadoPagoDto
  ) {
    const auth0Sub = req.user.sub;
    const initPoint = await this.mercadoPagoService.createPreference(CreateMercadoPagoDto, auth0Sub);
    return { initPoint };
 
  }
  @Post('notifications')
  @HttpCode(200)
  async recibirNotificacion(@Body() body: any) {
    console.log('Webhook MP:', body);
    await this.mercadoPagoService.recibirNotificacion(body);
    return { status: 'ok' };
  }
}