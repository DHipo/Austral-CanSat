import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { SubscribeNewsletterDto } from './dto/newsletter.dto';
import { OrbitAuthGuard } from '../auth/auth.guard';

@ApiTags('Newsletter & Outreach (Public Landing)')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({
    summary: 'Suscripción al boletín informativo de AuSat',
    description: 'Endpoint público para que estudiantes e instituciones reciban avances de la misión.',
  })
  @ApiResponse({ status: 201, description: 'Suscripción completada.' })
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Get('subscribers')
  @UseGuards(OrbitAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar suscriptores (Privado Orbit)' })
  async getSubscribers() {
    return this.newsletterService.findAll();
  }
}
