# Builds the admin SPA, then bakes it into the Caddy image that fronts the whole server
# (Caddy serves the static files itself; see deploy/aws/Caddyfile).

FROM node:20-bookworm-slim AS build
WORKDIR /app
# puppeteer is only used by local helper scripts; skip its Chromium download
ENV PUPPETEER_SKIP_DOWNLOAD=true
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
ARG VITE_API_URL
ARG VITE_FRONTEND_URL
ENV VITE_API_URL=$VITE_API_URL \
    VITE_FRONTEND_URL=$VITE_FRONTEND_URL
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/dist /srv/admin
