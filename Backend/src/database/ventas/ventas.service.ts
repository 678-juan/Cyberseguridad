import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './ventas.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  // Método para crear una venta
  async createVenta(
    email: string,
    vehiculoId: number,
    precioFinal: number,
  ): Promise<Venta> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { vehiculo_ID: vehiculoId },
    });

    if (!usuario || !vehiculo) {
      throw new Error('Usuario o Vehículo no encontrado');
    }

    // Actualizamos el estado del vehículo a "vendido"
    vehiculo.disponible = false;
    await this.vehiculoRepository.save(vehiculo);

    // Creamos la venta
    const venta = this.ventaRepository.create({
      usuario,
      vehiculo,
      precio_final: precioFinal,
    });

    return this.ventaRepository.save(venta); // Guardamos la venta en la base de datos
  }

  // Método para cancelar una venta
  async cancelarVenta(id: number): Promise<string> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['vehiculo'],
    });

    if (!venta) {
      throw new Error('Venta no encontrada');
    }

    // Restablecemos el estado del vehículo a "disponible"
    venta.vehiculo.disponible = true;
    await this.vehiculoRepository.save(venta.vehiculo);

    // Eliminar la venta
    await this.ventaRepository.remove(venta);

    return 'Venta cancelada y vehículo disponible nuevamente';
  }

  // Método para obtener todas las ventas
  async getAllVentas(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }

  // Método para obtener una venta por su ID
  async getVentaById(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({ where: { id } });
    if (!venta) {
      throw new Error('Venta no encontrada');
    }
    return venta;
  }
}
