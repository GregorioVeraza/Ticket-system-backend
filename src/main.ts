import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Auth0Guard } from './auth0.guard';
import { MercadoPagoConfig } from 'mercadopago';



async function bootstrap() {



  const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:5173',
});

 
 const config = new DocumentBuilder()
   .setTitle('App de tickets')
   .setDescription('Documentacion de la API de gestion de eventos')
   .setVersion('1.0')
   .addTag('model')
   .addBearerAuth()
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
