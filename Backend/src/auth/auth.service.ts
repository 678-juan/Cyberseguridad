import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../database/usuario/usuario.service';
import { VehiculoService } from 'src/database/vehiculo/vehiculo.service';
import { Usuario } from '../database/usuario/usuario.entity';
import { Rol } from 'src/database/usuario/rol.entity';
import { LoginDto } from './dto/login.dto'; // Importamos el DTO de login
import { JwtPayloadDto } from './dto/jwt-payload.dto'; // Importamos el DTO de JWT
import { AuthResponseDto } from './dto/auth-response.dto'; // Importamos el DTO de respuesta de auth
import { hash, compare } from 'bcryptjs';
import { Vehiculo } from 'src/database/vehiculo/vehiculo.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly vehiculoService: VehiculoService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para validar al usuario
  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      return null; // Usuario no encontrado
    }
    // Compara la contraseña ingresada con el hash almacenado
    const isPasswordValid = await compare(password, usuario.password);
    if (!isPasswordValid) {
      return null; // Contraseña incorrecta
    }

    return usuario; // Usuario válido
  }

  // Login: Autenticación de usuario
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Verificar que el usuario existe y la contraseña es correcta
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario || this.validateUser(email, password)) {
      throw new Error('Invalid credentials');
    }

    // Crear el payload con los datos del usuario
    const payload: JwtPayloadDto = {
      sub: usuario.id,
      username: usuario.user_name,
      rol: usuario.rol.nombre,
    };

    // Generar el JWT
    const access_token = this.jwtService.sign(payload);

    // Retornar el token
    return { access_token };
  }

  // Método para registrar al usuario (si es necesario)
  async registerUser(
    name: string,
    last_name: string,
    email: string,
    phone: string,
    user_name: string,
    password: string,
    rol: number,
  ): Promise<any> {
    const existingUser = await this.usuarioService.findByEmailOrUsername(
      email,
      user_name,
    );
    if (existingUser) {
      throw new Error('El correo o el nombre de usuario ya están en uso');
    }

    const hashedPassword = await hash(password, 10);
    const newRol = new Rol();
    newRol.id = rol;
    const newUser = new Usuario();
    newUser.name = name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.user_name = user_name;
    newUser.password = hashedPassword;
    newUser.rol = newRol;
    return this.usuarioService.create(newUser);
  }

  async registerEmployee(
    name: string,
    last_name: string,
    email: string,
    phone: string,
    user_name: string,
    password: string,
    rol: number,
  ): Promise<any> {
    const existingUser = await this.usuarioService.findByEmailOrUsername(
      email,
      user_name,
    );
    if (existingUser) {
      throw new Error('El correo o el nombre de usuario ya están en uso');
    }

    const hashedPassword = await hash(password, 10);
    const newRol = new Rol();
    newRol.id = rol;
    const newUser = new Usuario();
    newUser.name = name;
    newUser.last_name = last_name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.user_name = user_name;
    newUser.password = hashedPassword;
    newUser.rol = newRol;
    return this.usuarioService.create(newUser);
  }

  async registerVehicle(
    marca: string,
    modelo: string,
    anio: number,
    tipo_motor: string,
    color: string,
    transmision: string,
    combustible: string,
    precio: number,
    estado: string,
    imagen_url: string,
    disponible: boolean,
  ): Promise<any> {
    const newVehicle = new Vehiculo();
    newVehicle.marca = marca;
    newVehicle.modelo = modelo;
    newVehicle.anio = anio;
    newVehicle.tipo_motor = tipo_motor;
    newVehicle.color = color;
    newVehicle.transmision = transmision;
    newVehicle.combustible = combustible;
    newVehicle.precio = precio;
    newVehicle.estado = estado;
    newVehicle.imagen_url = imagen_url;
    newVehicle.disponible = disponible;

    return await this.vehiculoService.create(newVehicle);
  }
}
