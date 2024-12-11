// src/usuario/usuario.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Rol } from './rol.entity'; // Importamos la entidad Rol
import { Venta } from '../ventas/ventas.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  // Relación con la tabla Roles
  @ManyToOne(() => Rol, (rol) => rol.usuarios) // Muchos usuarios pueden tener un rol
  rol: Rol; // Rol es una entidad relacionada con Usuario

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[]; // Relación inversa con Ventas
}
