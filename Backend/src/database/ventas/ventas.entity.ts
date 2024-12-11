import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con Usuario: Muchas ventas pueden ser hechas por un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.ventas, { nullable: false })
  usuario: Usuario;

  // Relación con Vehiculo: Una venta puede incluir un solo vehículo
  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.ventas, { nullable: false })
  vehiculo: Vehiculo;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio_final: number; // Precio final de la venta

  @CreateDateColumn()
  fecha: Date; // Fecha de la venta
}
