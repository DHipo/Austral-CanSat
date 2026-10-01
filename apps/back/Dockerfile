# ==============================================================================
# Multi-Stage Dockerfile for Orbit Backend (NestJS + Prisma ORM)
# Context: apps/
# ==============================================================================

# Stage 1: Base & Dependencies
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

FROM base AS dependencies
WORKDIR /app

# Copy manifests
COPY package.json pnpm-workspace.yaml* ./
COPY packages/shared/package.json ./packages/shared/
COPY back/package.json ./back/

# Install dependencies
RUN npm install

# Stage 2: Builder
FROM dependencies AS builder
WORKDIR /app

# Copy source code
COPY packages/shared ./packages/shared
COPY back ./back

# Build shared library
RUN npm run build:shared

# Generate Prisma Client
WORKDIR /app/back
RUN npx prisma generate

# Build NestJS production bundle
RUN npm run build

# Stage 3: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=3001

# Create unprivileged system user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Create uploads directory and set permissions
RUN mkdir -p /app/back/uploads && \
    chown -R nestjs:nodejs /app/back/uploads

# Copy built artifacts and dependencies
# npm workspaces instala todo en /app/node_modules; se toma del builder para
# llevar el cliente Prisma ya generado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/back/dist ./back/dist
COPY --from=builder /app/back/prisma ./back/prisma
COPY --from=builder /app/back/package.json ./back/package.json

USER nestjs
WORKDIR /app/back

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
