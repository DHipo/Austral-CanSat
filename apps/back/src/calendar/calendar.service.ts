import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCalendarEventDto, UpdateCalendarEventDto } from './dto/calendar.dto';
import { EventCategory } from '@prisma/client';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: EventCategory, fromDate?: string, toDate?: string) {
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (fromDate || toDate) {
      where.startDate = {};
      if (fromDate) {
        where.startDate.gte = new Date(fromDate);
      }
      if (toDate) {
        where.startDate.lte = new Date(toDate);
      }
    }

    return this.prisma.calendarEvent.findMany({
      where,
      orderBy: { startDate: 'asc' },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.calendarEvent.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Evento de calendario con ID ${id} no encontrado.`);
    }

    return event;
  }

  async create(dto: CreateCalendarEventDto, userId: string) {
    this.assertValidRange(new Date(dto.startDate), new Date(dto.endDate));

    return this.prisma.calendarEvent.create({
      data: {
        title: dto.title,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        category: dto.category,
        location: dto.location?.trim() || null,
        isMilestone: dto.isMilestone ?? false,
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateCalendarEventDto) {
    const current = await this.findOne(id);
    this.assertValidRange(
      dto.startDate ? new Date(dto.startDate) : current.startDate,
      dto.endDate ? new Date(dto.endDate) : current.endDate,
    );

    const data: any = {};
    if (dto.title) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    if (dto.category) data.category = dto.category;
    if (dto.location !== undefined) data.location = dto.location.trim() || null;
    if (dto.isMilestone !== undefined) data.isMilestone = dto.isMilestone;

    return this.prisma.calendarEvent.update({
      where: { id },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.calendarEvent.delete({
      where: { id },
    });
    return { success: true, message: `Evento ${id} eliminado.` };
  }

  private assertValidRange(start: Date, end: Date) {
    if (end < start) {
      throw new BadRequestException('La fecha de fin no puede ser anterior a la de inicio.');
    }
  }
}
