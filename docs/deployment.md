# Deployment

## Overview.

This guide covers deploying the NGEK TECH website to various platforms.

## Build Process.

### Development Build.

```bash
npm run dev
```

- Starts development server on port 3000.
- Hot module replacement enabled.
- Source maps available.

### Production Build.

```bash
npm run build
```

- Optimizes and minifies code.
- Generates static pages.
- Creates production bundles.

### Production Start.

```bash
npm start
```

- Runs the production server.
- Requires `npm run build` first.

## Vercel Deployment.

### Automatic Deployment.

1. Connect your GitHub repository to Vercel.
2. Configure environment variables.
3. Push to main branch.
4. Vercel automatically deploys.

### Manual Deployment.

```bash
# Install Vercel CLI.
npm i -g vercel

# Deploy to Vercel.
vercel

# Deploy to production.
vercel --prod
```

### Environment Variables.

Set in Vercel dashboard.

| Variable | Scope |
|----------|-------|
| MONGODB_URL | Production |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | All |

## Docker Deployment.

### Dockerfile.

```dockerfile
FROM node:20-alpine AS base

# Install dependencies.
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image.
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose.

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URL=${MONGODB_URL}
      - NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
    restart: unless-stopped
```

### Build and Run.

```bash
# Build image.
docker build -t ngek-tech .

# Run container.
docker run -p 3000:3000 ngek-tech
```

## Self-Hosted Deployment.

### Prerequisites.

- Node.js 20 or later.
- npm or yarn.
- Nginx or similar reverse proxy.

### Setup Steps.

1. Clone the repository.

```bash
git clone <repository-url>
cd ngek.tech
```

2. Install dependencies.

```bash
npm ci
```

3. Set environment variables.

```bash
export MONGODB_URL="your-mongodb-url"
export NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

4. Build the application.

```bash
npm run build
```

5. Start the server.

```bash
npm start
```

### Nginx Configuration.

```nginx
server {
    listen 80;
    server_name ngek.tech www.ngek.tech;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Process Management with PM2.

```bash
# Install PM2.
npm i -g pm2

# Start with PM2.
pm2 start npm --name "ngek-tech" -- start

# Save process list.
pm2 save

# Setup startup script.
pm2 startup
```

## Static Export.

For static hosting without a Node.js server.

### Configuration.

Add to `next.config.ts`.

```typescript
const nextConfig = {
  output: 'export',
};
```

### Build.

```bash
npm run build
```

Output will be in the `out` directory.

### Hosting.

Upload `out` directory to any static host.

- Netlify.
- GitHub Pages.
- AWS S3 + CloudFront.
- Firebase Hosting.

## Pre-Deployment Checklist.

- [ ] Environment variables configured.
- [ ] Build completes without errors.
- [ ] All tests pass.
- [ ] Security headers configured.
- [ ] SSL/TLS certificate ready.
- [ ] DNS records configured.
- [ ] Analytics verified.
- [ ] Performance tested.

---

*Documentation maintained by the NGEK TECH team.*
