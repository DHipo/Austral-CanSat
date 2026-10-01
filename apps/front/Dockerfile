# ==============================================================================
# Multi-Stage Dockerfile for Orbit Frontend (Next.js Standalone Build)
# Context: apps/
# ==============================================================================

# Stage 1: Base
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Dependencies
FROM base AS dependencies
WORKDIR /app

COPY package.json pnpm-workspace.yaml* ./
COPY packages/shared/package.json ./packages/shared/
COPY front/package.json ./front/

RUN npm install

# Stage 3: Builder
FROM dependencies AS builder
WORKDIR /app

COPY packages/shared ./packages/shared
COPY front ./front

# Build shared library first
RUN npm run build:shared

# Build Next.js in standalone mode
WORKDIR /app/front
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 4: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root system user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy Next.js standalone server and static assets
COPY --from=builder /app/front/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/front/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/front/.next/static ./front/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "front/server.js"]
