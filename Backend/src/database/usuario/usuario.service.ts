// src/usuario/usuario.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Buscar usuario por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findByEmailOrUsername(
    email: string,
    user_name: string,
  ): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: [
        { email }, // Buscar por email
        { user_name },
      ],
    });
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol'] }); // Incluimos la relación con rol
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
  }

  // Crear un nuevo usuario
  async create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  // Actualizar un usuario
  async update(id: number, usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
