import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
import { MercadoPagoConfig, Preference, Payment} from 'mercadopago';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import {OrdenCompraService} from '../orden-compra/orden-compra.service';
import {CreateOrdenCompraDto} from '../orden-compra/dto/create-orden-compra.dto';
@Injectable()
export class MercadoPagoService {
   private client = new MercadoPagoConfig({ accessToken: 'APP_USR-8689660892447475-121517-79f4e190b043205dcb21d941a9640857-3069409488' });
   private paymentClient = new Payment(this.client);
   constructor(private ordenCompraService: OrdenCompraService) {}
     

  async createPreference(createeventoDto: CreateMercadoPagoDto, auth0Sub: string): Promise<{ init_point: string; id: string }> {
    const preference = new Preference(this.client);
    console.log(createeventoDto);
    try {
      if (!createeventoDto || !Array.isArray(createeventoDto.items)) {
        throw new BadRequestException('`items` must be a non-empty array');
      }
      if (createeventoDto.items.length === 0) {
        throw new BadRequestException('`items` must contain at least one entry');
      }

      const createOrdenCompraDto: CreateOrdenCompraDto = {
        clienteId: auth0Sub,
        eventoId: createeventoDto.eventoId,
        estado: 'in_process',
        total: createeventoDto.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
      };
      const ordenCompraId= await this.ordenCompraService.create(createOrdenCompraDto);
      const data: any = await preference.create({
        body: {
          items: createeventoDto.items.map((entrada, index) => ({
            id: `${index + 1}`,
            title: entrada.title,
            quantity: entrada.quantity,
            unit_price: entrada.unit_price,
          })),
          back_urls: {
            success: 'https://unstack-letty-lovably.ngrok-free.dev/pago-exitoso',
            failure: 'https://unstack-letty-lovably.ngrok-free.dev/pago-fallido',
            pending: 'https://unstack-letty-lovably.ngrok-free.dev/pago-pendiente',
          },
          // URL pública donde Mercado Pago enviará las notificaciones.
          // Recomendado: configurar MP_WEBHOOK_URL en variables de entorno.
          notification_url: process.env.MP_WEBHOOK_URL || 'https://unstack-letty-lovably.ngrok-free.dev/mercado-pago/notifications',
          external_reference: ordenCompraId,
          //auto_return: 'approved',
        },
      });
      console.log(data);
      this.ordenCompraService.updatePreferenceId(ordenCompraId, data.id);
      return {
        init_point: data.init_point,
        id: data.id
      }
    } catch (err) {
      // propagate or handle the error as appropriate
      throw err;
    }
  }

  async recibirPayment(paymentId: string) {
    return await this.paymentClient.get({ id: paymentId });
  }
  async recibirNotificacion(body:any){
    try {
      if (!body || !body.data || !body.data.id) {
        console.warn('Invalid notification payload:', body);
        return;
      }
      
      const paymentId = body.data.id;
      const payment = await this.recibirPayment(paymentId);
      
      // Extract the response object correctly based on the payment client response structure
      const paymentData = payment;
      const externalRef = paymentData?.external_reference;
      const status = paymentData?.status;
      
      console.log('Notificación recibida:', body);
      console.log('Payment ID:', paymentId, 'External Reference:', externalRef, 'Status:', status);
      
      if (!externalRef) {
        console.warn('No external_reference found in payment:', paymentData);
        return;
      }
      
      if (!status) {
        console.warn('No status found in payment:', paymentData);
        return;
      }
      
      await this.ordenCompraService.updateEstado(status, externalRef);
    } catch (err) {
      console.error('Error processing notification:', err);
      throw err;
    }
  }
}
