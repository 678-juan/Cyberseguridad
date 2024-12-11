import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from '../database/usuario/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { CreateVehicleDto } from './dto/CreateVehicle.dto';
import { Vehiculo } from 'src/database/vehiculo/vehiculo.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Valida el usuario con email y contraseña
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user); // Si es válido, devuelve el JWT
  }

  @Post('registerUser')
  async registerUser(@Body() registerDto: RegisterDto): Promise<Usuario> {
    const { name, last_name, email, phone, user_name, password } = registerDto;

    const user = await this.authService.registerUser(
      name,
      last_name,
      email,
      phone,
      user_name,
      password,
      3,
    );
    if (!user) {
      throw new Error('Error registrando el usuario');
    }
    return;
  }

  @Post('registerEmployee')
  async registerEmployee(@Body() registerDto: RegisterDto): Promise<Usuario> {
    const { name, last_name, email, phone, user_name, password } = registerDto;

    const user = await this.authService.registerUser(
      name,
      last_name,
      email,
      phone,
      user_name,
      password,
      2,
    );
    if (!user) {
      throw new Error('Error registrando el usuario');
    }
    return;
  }

  @Post('registerVehicle')
  async registerVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<Vehiculo> {
    const {
      marca,
      modelo,
      anio,
      tipo_motor,
      color,
      transmision,
      combustible,
      precio,
      estado,
      imagen_url,
      disponible,
    } = createVehicleDto;

    return await this.authService.registerVehicle(
      marca,
      modelo,
      anio,
      tipo_motor,
      color,
      transmision,
      combustible,
      precio,
      estado,
      imagen_url,
      disponible,
    );
  }
}
