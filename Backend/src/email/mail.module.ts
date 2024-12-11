import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Cambia según tu proveedor de correo
        port: 465,
        secure: true, // true para puerto 465, false para otros
        auth: {
          user: 'tu-correo@gmail.com',
          pass: 'tu-contraseña',
        },
      },
      defaults: {
        from: '"Tu Nombre o Empresa" <tu-correo@gmail.com>',
      },
    }),
  ],
})
export class MailModule {}
