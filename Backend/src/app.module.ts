import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoModule } from './database/vehiculo/vehiculo.module';
import { UsuarioModule } from './database/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { VentasModule } from './database/ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-east-1.pooler.supabase.com', // Cambia según la configuración de tu DB
      port: 6543,
      username: 'postgres.lxlxplntgvlcryedvkpt', // Usuario de PostgreSQL
      password: 'Z1b#N<J095Wv', // Contraseña de PostgreSQL
      database: 'postgres', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'SECRET_KEY', // La misma clave secreta que en el JwtStrategy
      signOptions: { expiresIn: '60s' }, // Expiración del token (puedes ajustarlo)
    }),
    VehiculoModule,
    UsuarioModule,
    VentasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
