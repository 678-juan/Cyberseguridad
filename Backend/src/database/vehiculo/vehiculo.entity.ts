import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Venta } from '../ventas/ventas.entity';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  vehiculo_ID: number;

  @Column() // Valor por defecto vacío para cadena de texto
  marca: string;

  @Column() // Valor por defecto vacío para cadena de texto
  modelo: string;

  @Column() // Año por defecto en 0
  anio: number;

  @Column() // Tipo de motor por defecto vacío
  tipo_motor: string;

  @Column() // Color por defecto vacío
  color: string;

  @Column() // Transmisión por defecto vacío
  transmision: string;

  @Column() // Combustible por defecto vacío
  combustible: string;
  @Column() // Precio por defecto en 0.0
  precio: number;

  @Column() // Estado por defecto vacío
  estado: string;

  @Column() // URL de la imagen por defecto vacío
  imagen_url: string;

  @Column() // Vehículo disponible por defecto true
  disponible: boolean; // Para marcar si el vehículo está disponible

  @OneToOne(() => Venta, (venta) => venta.vehiculo, { nullable: true })
  ventas: Venta[]; // Relación inversa con Ventas
}
