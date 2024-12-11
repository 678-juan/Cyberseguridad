import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) {}

  // Obtener todos los vehículos
  async findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  // Obtener un vehículo por ID
  async findOne(id: number): Promise<Vehiculo> {
    return this.vehiculoRepository.findOneBy({ vehiculo_ID: id });
  }

  // Crear un nuevo vehículo
  async create(vehiculo: Vehiculo): Promise<Vehiculo> {
    return this.vehiculoRepository.save(vehiculo);
  }

  // Actualizar un vehículo
  async update(id: number, vehiculo: Vehiculo): Promise<Vehiculo> {
    await this.vehiculoRepository.update(id, vehiculo);
    return this.findOne(id);
  }

  // Eliminar un vehículo
  async remove(id: number): Promise<void> {
    await this.vehiculoRepository.delete(id);
  }
}
