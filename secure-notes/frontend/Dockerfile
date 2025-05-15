# ─── Stage 1: Build ────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy lockfile + manifest, then install only prod deps
COPY package*.json ./
RUN npm ci

# Copy all sources & env, then build
COPY . .
# Bake in the API URL at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build         # produces /app/dist

# ─── Stage 2: Serve ───────────────────────────────────────────────
FROM nginx:stable-alpine AS runner
# (Optional) custom nginx.conf if you need SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
