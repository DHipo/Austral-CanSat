import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeNewsletterDto } from './dto/newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(dto: SubscribeNewsletterDto) {
    const emailNormalized = dto.email.trim().toLowerCase();

    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: emailNormalized },
    });

    if (existing) {
      return {
        success: true,
        message: '¡Ya estás suscrito al boletín oficial de AuSat!',
        subscriber: existing,
      };
    }

    const subscriber = await this.prisma.newsletterSubscriber.create({
      data: {
        email: emailNormalized,
        fullName: dto.fullName,
        institution: dto.institution || 'Comunidad General',
        confirmed: true,
      },
    });

    return {
      success: true,
      message: '¡Gracias por unirte a la divulgación de AuSat CanSat 2026!',
      subscriber,
    };
  }

  async findAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
  }
}
