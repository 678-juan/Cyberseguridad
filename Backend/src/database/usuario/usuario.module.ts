import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { Rol } from './rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])], // Registra las entidades Usuario y Rol
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
