# ── Stage 1: Dependencies ─────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ── Build-time ENV: Force TinaCMS into local/offline mode ─────────────────────
# These variables ensure TinaCMS never attempts to reach Tina Cloud during build.
ENV TINA_PUBLIC_IS_LOCAL=true
ENV NEXT_PUBLIC_TINA_CLIENT_ID=local
ENV TINA_TOKEN=local
ENV SKIP_TINA_CLOUD_CHECK=true
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build TinaCMS schema (local mode) then Next.js
RUN npm run build

# ── Stage 3: Production Runner ────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public        ./public
COPY --from=builder /app/.next/static  ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
