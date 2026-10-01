import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';
import { ReportsModule } from './reports/reports.module';
import { FilesModule } from './files/files.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CalendarModule,
    ReportsModule,
    FilesModule,
    NewsletterModule,
  ],
})
export class AppModule {}
