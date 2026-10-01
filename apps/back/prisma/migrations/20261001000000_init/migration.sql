-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('LEAD', 'AVIONICS', 'FLIGHT_DYNAMICS', 'ADMIN');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('HARDWARE_TEST', 'CONAE_DELIVERY', 'PARACHUTE_TEST', 'MEETING', 'INTEGRATION');

-- CreateEnum
CREATE TYPE "FlightStage" AS ENUM ('PAD_IDLE', 'POWERED_ASCENT', 'APOGEE_EJECTION', 'PARACHUTE_DESCENT', 'PARAGLIDER_GLIDE', 'EGG_RELEASE_2M', 'TOUCHDOWN_RECOVERY');

-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('INVESTIGATION', 'PDR_CDR', 'MEETING_MINUTES', 'ENVIRONMENTAL_TEST', 'TELEMETRY_LOG');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'OFFICIAL_ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'LEAD',
    "career" TEXT NOT NULL DEFAULT 'Ingeniería Informática',
    "subsystem" TEXT NOT NULL DEFAULT 'Aviónica & Sistemas',
    "avatarUrl" TEXT,
    "isAuthorizedTechnical" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "category" "EventCategory" NOT NULL DEFAULT 'MEETING',
    "location" TEXT DEFAULT 'Laboratorio de Aviónica - Universidad Austral',
    "isMilestone" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "category" "ReportCategory" NOT NULL DEFAULT 'INVESTIGATION',
    "subsystem" TEXT NOT NULL DEFAULT 'General',
    "flightStage" "FlightStage",
    "contentMarkdown" TEXT NOT NULL,
    "objective" TEXT,
    "findings" TEXT,
    "conclusions" TEXT,
    "nextSteps" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
    "revisionHash" TEXT NOT NULL DEFAULT '',
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_attachments" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "institution" TEXT DEFAULT 'Universidad Austral',
    "confirmed" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "calendar_events_category_idx" ON "calendar_events"("category");

-- CreateIndex
CREATE INDEX "calendar_events_startDate_idx" ON "calendar_events"("startDate");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_category_idx" ON "reports"("category");

-- CreateIndex
CREATE INDEX "report_attachments_reportId_idx" ON "report_attachments"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "newsletter_subscribers"("email");

-- AddForeignKey
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_attachments" ADD CONSTRAINT "report_attachments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
