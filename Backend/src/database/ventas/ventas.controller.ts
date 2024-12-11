import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { VentasService } from './ventas.service';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  // Endpoint para crear una venta
  @Post()
  async createVenta(
    @Body()
    body: {
      usuarioId: string;
      vehiculoId: number;
      precioFinal: number;
    },
  ) {
    return this.ventasService.createVenta(
      body.usuarioId,
      body.vehiculoId,
      body.precioFinal,
    );
  }

  // Endpoint para obtener todas las ventas
  @Get()
  async getAllVentas() {
    return this.ventasService.getAllVentas();
  }

  // Endpoint para obtener una venta por ID
  @Get(':id')
  async getVentaById(@Param('id') id: string) {
    // 'id' es de tipo string
    const parsedId = parseInt(id, 10); // Convertir el id a número
    return this.ventasService.getVentaById(parsedId);
  }

  // Endpoint para cancelar una venta
  @Delete(':id')
  async cancelarVenta(@Param('id') id: string) {
    // 'id' es de tipo string
    const parsedId = parseInt(id, 10); // Convertir el id a número
    return this.ventasService.cancelarVenta(parsedId);
  }
}
