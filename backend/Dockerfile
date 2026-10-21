# Build for the ARM (t4g) server: docker build --platform linux/arm64 -t mahaprisons-backend .

FROM node:20-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY prisma ./prisma
RUN npx prisma generate
# Keep the prisma CLI (devDependency) for migrate deploy at start; drop the rest of dev deps
RUN npm prune --omit=dev && npm install --no-save --ignore-scripts prisma@6.19.3

FROM node:20-bookworm-slim AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production \
    PORT=5000
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node src ./src
RUN mkdir -p uploads && chown node:node uploads
USER node
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy && echo 'migrations applied' && node src/index.js"]
