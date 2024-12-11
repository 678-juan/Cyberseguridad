import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://concesionario-front.vercel.app'], // Permitir solo las solicitudes desde el frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Si estás usando cookies o autenticación
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
