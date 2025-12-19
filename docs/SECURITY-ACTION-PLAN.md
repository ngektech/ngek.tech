# Security Action Plan: NGEK TECH

**Created:** December 19, 2025
**Based on:** VAPT Report dated December 19, 2025
**Priority:** CRITICAL - Immediate Action Required

---

## IMMEDIATE ACTIONS (Within 24 Hours)

### Action 1: Rotate Exposed API Keys

**Priority:** CRITICAL
**Estimated Time:** 15 minutes
**Assignee:** System Administrator

**Steps:**
1. Go to https://platform.openai.com/api-keys
2. Revoke the exposed key: `sk-svcacct-Y5jFura...`
3. Generate a new API key
4. Update Vercel/deployment environment variables (NOT local files)
5. Verify application functionality
6. Monitor OpenAI usage dashboard for unauthorized usage

**Verification:**
```bash
# Test that old key no longer works
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-svcacct-Y5jFura..."
# Should return 401 Unauthorized
```

---

### Action 2: Secure Environment Files

**Priority:** CRITICAL
**Estimated Time:** 30 minutes
**Assignee:** Developer

**Steps:**

1. **Delete sensitive .env files from repository history:**
```bash
# Install BFG Repo-Cleaner
brew install bfg

# Remove sensitive files from history
bfg --delete-files .env.local
bfg --delete-files .env.production

# Force push (coordinate with team)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

2. **Update .gitignore:**
```bash
# Verify .gitignore contains
.env*
!.env.example
```

3. **Create sanitized .env.example:**
```bash
# .env.example should only contain placeholder values
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
OPENAI_API_KEY=sk-your-api-key-here
```

4. **Configure deployment secrets:**
   - Vercel: Settings → Environment Variables
   - Never store production secrets in files

---

### Action 3: Add Security Headers

**Priority:** HIGH
**Estimated Time:** 1 hour
**Assignee:** Developer

**Implementation:**

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'",
    ].join('; ')
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  }
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

**Verification:**
```bash
# After deployment, test headers
curl -I https://ngek.tech | grep -E "(Content-Security|X-Frame|X-Content)"
```

---

## SHORT-TERM ACTIONS (Within 1 Week)

### Action 4: Implement Contact Form Backend with CSRF Protection

**Priority:** HIGH
**Estimated Time:** 4 hours
**Assignee:** Developer

**Steps:**

1. **Create API route:**

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.timestamp > RATE_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { name, email, phone, website, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.slice(0, 100).replace(/<[^>]*>/g, ''),
      email: email.slice(0, 255),
      phone: phone?.slice(0, 20) || '',
      website: website?.slice(0, 255) || '',
      message: message.slice(0, 5000).replace(/<[^>]*>/g, ''),
    };

    // TODO: Send email or save to database
    // For now, log (remove in production)
    console.log('Contact form submission:', sanitizedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
```

2. **Update Contact component to use API:**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Submission failed');
    }

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', website: '', message: '' });
  } catch (error) {
    setErrors({ message: error.message });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Action 5: Improve Input Sanitization

**Priority:** MEDIUM
**Estimated Time:** 2 hours
**Assignee:** Developer

**Steps:**

1. **Install DOMPurify:**
```bash
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify
```

2. **Create sanitization utility:**

```typescript
// src/lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Remove HTML tags and dangerous content
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: [],
  });

  // Additional character filtering
  return cleaned
    .replace(/[<>]/g, '') // Extra safety
    .trim();
}

export function sanitizeForDisplay(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: [],
  });
}
```

---

### Action 6: Add Error Boundaries

**Priority:** MEDIUM
**Estimated Time:** 2 hours
**Assignee:** Developer

**Steps:**

1. **Create global error page:**

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-[#ff6b00] mb-4">
          Something went wrong.
        </h1>
        <p className="text-[#666] mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 gradient-bg text-white rounded-full"
        >
          Try Again.
        </button>
      </div>
    </div>
  );
}
```

2. **Create not-found page:**

```typescript
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-[#666] mb-8">Page not found.</p>
        <Link
          href="/"
          className="px-6 py-3 gradient-bg text-white rounded-full inline-block"
        >
          Return Home.
        </Link>
      </div>
    </div>
  );
}
```

---

## MEDIUM-TERM ACTIONS (Within 1 Month)

### Action 7: Implement Rate Limiting at Edge

**Priority:** MEDIUM
**Estimated Time:** 4 hours

**Options:**

1. **Vercel Edge Config:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implement rate limiting logic
  // Consider using @upstash/ratelimit
}
```

2. **Cloudflare WAF:**
   - Enable rate limiting rules
   - Set up bot protection
   - Configure DDoS protection

---

### Action 8: MongoDB Security Hardening

**Priority:** MEDIUM
**Estimated Time:** 2 hours

**Steps:**
1. Enable IP whitelist in MongoDB Atlas
2. Create database user with minimal permissions
3. Enable audit logging
4. Configure connection pooling limits
5. Enable encryption at rest

---

### Action 9: Add Privacy Notice for Analytics

**Priority:** MEDIUM
**Estimated Time:** 2 hours

**Implementation:**
1. Add cookie consent banner
2. Update Privacy Policy with analytics details
3. Implement analytics opt-out mechanism
4. Configure Google Analytics data retention

---

### Action 10: Implement Logging and Monitoring

**Priority:** LOW
**Estimated Time:** 4 hours

**Steps:**
1. Set up error tracking (Sentry recommended)
2. Configure application performance monitoring
3. Set up security alerts
4. Create incident response playbook

---

## VERIFICATION CHECKLIST

After implementing fixes, verify:

- [ ] OpenAI API key rotated and old key revoked
- [ ] Environment files removed from git history
- [ ] Security headers present in responses
- [ ] Contact form submits to API with rate limiting
- [ ] Input sanitization uses DOMPurify
- [ ] Error boundaries catch and handle errors gracefully
- [ ] 404 page displays for invalid routes
- [ ] No sensitive data in browser console
- [ ] npm audit shows 0 vulnerabilities

---

## SECURITY TESTING COMMANDS

```bash
# Check security headers
curl -I https://ngek.tech

# Test rate limiting
for i in {1..10}; do curl -X POST https://ngek.tech/api/contact -d '{}'; done

# Scan for vulnerabilities
npm audit

# Check for exposed secrets
git log --all --full-history -- "*.env*"

# Test CSP headers
curl -s https://ngek.tech | grep -o "Content-Security-Policy"
```

---

## ONGOING SECURITY PRACTICES

1. **Weekly:** Run `npm audit` and update dependencies
2. **Monthly:** Review access logs and analytics
3. **Quarterly:** Conduct security review
4. **Annually:** Full penetration testing

---

## INCIDENT RESPONSE

If a security incident occurs:

1. **Contain:** Revoke compromised credentials immediately
2. **Assess:** Determine scope of breach
3. **Notify:** Inform affected users if required
4. **Remediate:** Fix vulnerability
5. **Review:** Conduct post-incident analysis

**Emergency Contacts:**
- OpenAI Security: security@openai.com
- MongoDB Atlas Support: support.mongodb.com
- Vercel Support: vercel.com/support

---

**Document Version:** 1.0
**Last Updated:** December 19, 2025
**Next Review:** January 19, 2026
