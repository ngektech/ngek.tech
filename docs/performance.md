# Performance

## Overview.

This document outlines performance optimizations implemented in the NGEK TECH website.

## Core Web Vitals Targets.

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint. |
| FID | < 100ms | First Input Delay. |
| CLS | < 0.1 | Cumulative Layout Shift. |
| TTFB | < 600ms | Time to First Byte. |

## Optimization Strategies.

### Code Splitting.

Next.js automatically splits code by page.

```
Page Bundles:
├── / (main page)
└── /blog/[slug] (blog pages)
```

### Font Loading.

Fonts are preconnected for faster loading.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

### Image Optimization.

Using Next.js Image component for automatic optimization.

```tsx
import Image from "next/image";

<Image
  src="/image.png"
  width={100}
  height={100}
  alt="Description"
  priority // For above-fold images.
/>
```

### Animation Performance.

#### Hardware Acceleration.

CSS transforms use GPU acceleration.

```css
.animate-float {
  animation: float 3s ease-in-out infinite;
  transform: translateZ(0); /* Force GPU layer. */
}
```

#### Ray Tracer Optimization.

The ray tracer uses requestAnimationFrame for smooth animation.

```typescript
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw operations...
  animationFrameRef.current = requestAnimationFrame(animate);
};
```

Point array is limited to prevent memory growth.

```typescript
if (pointsRef.current.length > 50) {
  pointsRef.current.shift();
}
```

### Quote Caching.

Vacuum demo uses cached quotes to avoid network requests.

```typescript
const cachedQuotes = [
  { quote: "...", author: "..." },
  // Pre-fetched and stored.
];
```

## Bundle Size.

### Dependencies.

| Dependency | Size | Purpose |
|------------|------|---------|
| framer-motion | ~150KB | Animations. |
| lucide-react | Tree-shakable | Icons. |
| react-markdown | ~50KB | Blog rendering. |

### Tree Shaking.

Only imported icons are included in the bundle.

```typescript
// Good - tree shakable.
import { Home, User, Mail } from "lucide-react";

// Avoid - imports entire library.
import * as Icons from "lucide-react";
```

## Lazy Loading.

### Scroll-Based Animation.

Components animate only when in viewport.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Chatbot.

Chatbot is only rendered when toggle button is clicked.

```tsx
<AnimatePresence>
  {isOpen && <ChatWindow />}
</AnimatePresence>
```

## Static Generation.

### Blog Pages.

Blog pages are statically generated at build time.

```typescript
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

## Caching Strategy.

### Static Assets.

Static assets are cached with long TTL.

```
Cache-Control: public, max-age=31536000, immutable
```

### Pages.

- Static pages: Cached indefinitely.
- Dynamic pages: Revalidated on request.

## Monitoring.

### Google Analytics.

Page load performance is tracked via GA4.

```javascript
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href,
});
```

### Console Logging.

Development builds include performance logs.

```typescript
console.log('NGEK TECH: Google Analytics IP tracking enabled.');
```

## Performance Checklist.

- [x] Font preconnect headers.
- [x] Code splitting by route.
- [x] Animation optimization.
- [x] Quote caching.
- [x] Tree-shakable imports.
- [x] Scroll-based lazy loading.
- [x] Static generation for blog.
- [ ] Image optimization (add images as needed).
- [ ] Service worker (add for PWA support).

## Testing Performance.

### Lighthouse.

Run Lighthouse in Chrome DevTools.

```
1. Open Chrome DevTools (F12).
2. Navigate to Lighthouse tab.
3. Select Performance category.
4. Click "Analyze page load".
```

### WebPageTest.

Test from multiple locations at webpagetest.org.

### Bundle Analyzer.

Analyze bundle size.

```bash
npm install @next/bundle-analyzer

# Add to next.config.ts.
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis.
ANALYZE=true npm run build
```

---

*Documentation maintained by the NGEK TECH team.*
