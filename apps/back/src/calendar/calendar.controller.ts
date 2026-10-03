import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { CreateCalendarEventDto, UpdateCalendarEventDto } from './dto/calendar.dto';
import { OrbitAuthGuard } from '../auth/auth.guard';
import { CurrentUser, AuthenticatedUser } from '../auth/current-user.decorator';
import { EventCategory } from '@prisma/client';
import { Request } from 'express';

@ApiTags('Mission Calendar (Orbit Private)')
@Controller('calendar')
@UseGuards(OrbitAuthGuard)
@ApiBearerAuth()
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar eventos de calendario de misión',
    description: 'Permite filtrar por categoría (ensayos, entregas CONAE, pruebas, reuniones) y rango temporal.',
  })
  @ApiQuery({ name: 'category', enum: EventCategory, required: false })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  async getEvents(
    @Query('category') category?: EventCategory,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    return this.calendarService.findAll(category, fromDate, toDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento de misión por ID' })
  async getEvent(@Param('id') id: string) {
    return this.calendarService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento de misión' })
  @ApiResponse({ status: 201, description: 'Evento creado exitosamente.' })
  async createEvent(
    @Body() dto: CreateCalendarEventDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.calendarService.create(dto, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un evento de misión' })
  async updateEvent(
    @Param('id') id: string,
    @Body() dto: UpdateCalendarEventDto,
  ) {
    return this.calendarService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento de misión' })
  async deleteEvent(@Param('id') id: string) {
    return this.calendarService.remove(id);
  }
}
