import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.entity';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  // Obtener todos los vehículos
  @Get()
  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAll();
  }

  // Obtener un vehículo por ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vehiculo> {
    return this.vehiculoService.findOne(id);
  }

  // Crear un nuevo vehículo
  @Post()
  create(@Body() vehiculo: Vehiculo): Promise<Vehiculo> {
    return this.vehiculoService.create(vehiculo);
  }

  // Actualizar un vehículo
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() vehiculo: Vehiculo,
  ): Promise<Vehiculo> {
    return this.vehiculoService.update(id, vehiculo);
  }

  // Eliminar un vehículo
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.vehiculoService.remove(id);
  }
}
