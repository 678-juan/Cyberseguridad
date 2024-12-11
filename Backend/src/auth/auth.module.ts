// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from '../database/usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // Importa el strategy
import { UsuarioService } from 'src/database/usuario/usuario.service';
import { VehiculoService } from 'src/database/vehiculo/vehiculo.service';
import { Vehiculo } from 'src/database/vehiculo/vehiculo.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Vehiculo]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Asegúrate de poner una clave secreta segura
      signOptions: { expiresIn: '60m' }, // El token expirará en 60 minutos
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    UsuarioService,
    VehiculoService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
