import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './ventas.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, Usuario, Vehiculo]), // Importa las entidades necesarias
  ],
  providers: [VentasService], // Proveedor del servicio
  controllers: [VentasController], // Controlador de ventas
})
export class VentasModule {}
