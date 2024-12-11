import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  marca: string;

  @IsString()
  modelo: string;

  @IsNumber()
  @Min(1886) // Año mínimo, desde el primer automóvil
  @Max(new Date().getFullYear() + 1) // Año máximo: el próximo año
  anio: number;

  @IsString()
  tipo_motor: string;

  @IsString()
  color: string;

  @IsString()
  transmision: string;

  @IsString()
  combustible: string;

  @IsNumber()
  @Min(0) // El precio no puede ser negativo
  precio: number;

  @IsString()
  estado: string;

  @IsString()
  imagen_url: string;

  @IsBoolean()
  disponible: boolean;
}
