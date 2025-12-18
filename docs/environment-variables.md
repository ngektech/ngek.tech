# Environment Variables

## Overview.

Environment variables are used to configure the application without hardcoding sensitive values.

## Configuration Files.

### .env.example

Template file for environment variables. Copy to `.env.local` for local development.

### .env.local

Local environment file. Never commit to version control.

## Variables Reference.

### MONGODB_URL

**Type.** String

**Required.** No (for current implementation)

**Description.** MongoDB connection URL for database operations.

**Format.**

```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
```

**Security Notes.**

- Never expose in client-side code.
- Use strong passwords.
- Whitelist IP addresses in MongoDB Atlas.

---

### NEXT_PUBLIC_GA_MEASUREMENT_ID

**Type.** String

**Required.** Yes (for analytics)

**Description.** Google Analytics 4 measurement ID for tracking.

**Format.**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Notes.**

- Prefix `NEXT_PUBLIC_` makes it available client-side.
- Required format: `G-` followed by alphanumeric characters.
- Obtain from Google Analytics dashboard.

**Validation.**

The GoogleAnalytics component validates the format.

```typescript
const isValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
```

---

### OPENAI_API_KEY

**Type.** String

**Required.** No (for future LLM integration)

**Description.** OpenAI API key for LLM-powered features.

**Format.**

```
OPENAI_API_KEY=sk-...
```

**Security Notes.**

- Never expose in client-side code.
- Use environment-specific keys.
- Set usage limits in OpenAI dashboard.

## Setup Instructions.

### Local Development.

1. Copy the example file.

```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your values.

```bash
nano .env.local
```

3. Restart the development server.

```bash
npm run dev
```

### Production Deployment.

#### Vercel.

1. Go to Project Settings.
2. Navigate to Environment Variables.
3. Add each variable with production values.
4. Redeploy the application.

#### Docker.

Pass environment variables via docker-compose.

```yaml
environment:
  - MONGODB_URL=${MONGODB_URL}
  - NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
```

#### Manual Server.

Export variables before starting.

```bash
export MONGODB_URL="your-mongodb-url"
export NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
npm start
```

## Security Best Practices.

1. **Never commit secrets.** Add `.env.local` to `.gitignore`.
2. **Use different values per environment.** Separate dev, staging, production.
3. **Rotate secrets regularly.** Update API keys periodically.
4. **Limit access.** Use least-privilege database users.
5. **Audit access.** Monitor who has access to production secrets.

## Troubleshooting.

### Variable Not Loading.

1. Ensure the file is named `.env.local` (not `.env`).
2. Restart the development server after changes.
3. Check for typos in variable names.
4. Verify the file is in the project root.

### Client-Side Access.

Only variables prefixed with `NEXT_PUBLIC_` are available in the browser.

```typescript
// Works on client.
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Only works on server.
process.env.MONGODB_URL;
```

---

*Documentation maintained by the NGEK TECH team.*
