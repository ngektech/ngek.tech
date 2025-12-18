# Security

## Overview.

This document outlines the security measures implemented in the NGEK TECH website.

## Input Validation.

### Contact Form.

All form inputs are validated on the client side.

```typescript
// Name validation.
if (!formData.name.trim()) {
  newErrors.name = "Name is required.";
} else if (formData.name.length < 2) {
  newErrors.name = "Name must be at least 2 characters.";
} else if (formData.name.length > 100) {
  newErrors.name = "Name must be less than 100 characters.";
}

// Email validation.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
  newErrors.email = "Please enter a valid email address.";
}

// Message validation.
if (formData.message.length > 5000) {
  newErrors.message = "Message must be less than 5000 characters.";
}
```

### Input Sanitization.

All user inputs are sanitized before use.

```typescript
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags.
    .replace(/[<>\"'&]/g, "") // Remove dangerous characters.
    .trim();
};
```

## Path Traversal Prevention.

### Blog Slug Sanitization.

Blog slugs are sanitized to prevent path traversal attacks.

```typescript
const sanitizedSlug = slug.replace(/[^a-z0-9-]/gi, "");
const filePath = path.join(BLOG_DIR, `${sanitizedSlug}.md`);
```

## Environment Variable Security.

### Server-Only Variables.

Sensitive variables are kept server-side only.

```typescript
// Only available on server.
const mongoUrl = process.env.MONGODB_URL;

// Available on client (prefixed with NEXT_PUBLIC_).
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
```

### Validation.

Environment variables are validated before use.

```typescript
const isValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
if (!isValidMeasurementId) {
  console.warn("Invalid Google Analytics measurement ID format.");
  return null;
}
```

## XSS Prevention.

### React Default Escaping.

React automatically escapes content rendered with JSX.

```tsx
// Safe - content is escaped.
<p>{userInput}</p>

// Dangerous - avoid unless necessary.
<div dangerouslySetInnerHTML={{ __html: content }} />
```

### Markdown Rendering.

Custom components are used for markdown to control rendering.

```tsx
<ReactMarkdown
  components={{
    p: ({ children }) => <p className="text-[#333]">{children}</p>,
    code: ({ children }) => <code className="bg-gray-100">{children}</code>,
  }}
>
  {content}
</ReactMarkdown>
```

## Content Security.

### External Resources.

Only trusted external resources are loaded.

- Google Fonts (fonts.googleapis.com).
- Google Analytics (googletagmanager.com).

### Image Sources.

Images are served from local public directory only.

## Rate Limiting Considerations.

For production, implement rate limiting on form submissions.

```typescript
// Example rate limiting middleware.
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes.
  max: 5, // 5 requests per window.
};
```

## Security Headers.

Recommended headers for production deployment.

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Guardrails Throughout.

Visual guardrails remind users of important information.

```tsx
<div className="guardrail py-4 rounded-r-xl text-sm text-[#666]">
  <p>
    <strong>Note:</strong> Advance payment of $1,000 is required.
  </p>
</div>
```

## Security Checklist.

- [x] Input validation on all forms.
- [x] Input sanitization to remove dangerous characters.
- [x] Path traversal prevention for blog slugs.
- [x] Environment variable protection.
- [x] XSS prevention via React escaping.
- [ ] Rate limiting (implement for production).
- [ ] Security headers (configure on server).
- [ ] Regular dependency updates.

## Reporting Security Issues.

Report security vulnerabilities to security@ngek.tech.

---

*Documentation maintained by the NGEK TECH team.*
