# Styling

## Overview.

The NGEK TECH website uses Tailwind CSS 4.x with custom CSS variables for theming.

## Color System.

### CSS Variables.

All colors are defined in `src/app/globals.css`.

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --primary: #ff6b00;
  --primary-light: #ff8533;
  --primary-dark: #cc5500;
  --secondary: #fff5eb;
  --accent: #ff9500;
  --muted: #f5f5f5;
  --border: #e5e5e5;
  --neon-green: #39ff14;
}
```

### Tailwind Integration.

Colors are registered in the `@theme inline` block.

```css
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  /* ... */
}
```

## Typography.

### Font Family.

The website uses Google Sans with Inter as fallback.

```css
body {
  font-family: "Google Sans", system-ui, sans-serif;
}
```

### Font Loading.

Fonts are loaded via Google Fonts in `layout.tsx`.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

## Utility Classes.

### Gradient Text.

```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Usage.**

```tsx
<h1 className="gradient-text">NGEK TECH</h1>
```

### Gradient Background.

```css
.gradient-bg {
  background: linear-gradient(135deg, var(--primary), var(--accent));
}
```

**Usage.**

```tsx
<button className="gradient-bg text-white">Submit</button>
```

### Glass Effect.

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 0, 0.1);
}
```

**Usage.**

```tsx
<nav className="glass-effect">...</nav>
```

### Hover Lift.

```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(255, 107, 0, 0.15);
}
```

**Usage.**

```tsx
<div className="hover-lift">Card content</div>
```

### Guardrail.

```css
.guardrail {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  background: linear-gradient(90deg, var(--secondary), transparent);
}
```

**Usage.**

```tsx
<div className="guardrail">Important notice</div>
```

### Section Divider.

```css
.section-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  margin: 4rem 0;
}
```

**Usage.**

```tsx
<div className="section-divider" />
```

## Animations.

### Float Animation.

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

### Pulse Glow Animation.

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 107, 0, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### Slow Spin Animation.

```css
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
```

## Responsive Design.

### Breakpoints.

| Breakpoint | Min Width | Tailwind Prefix |
|------------|-----------|-----------------|
| Mobile | 0px | (default) |
| Tablet | 768px | md: |
| Desktop | 1024px | lg: |
| Large Desktop | 1280px | xl: |

### Example Usage.

```tsx
<div className="text-lg md:text-xl lg:text-2xl">
  Responsive text
</div>
```

## Best Practices.

1. Use CSS variables for theme colors.
2. Prefer utility classes over custom CSS.
3. Use animations sparingly for performance.
4. Ensure sufficient color contrast.
5. Test on multiple screen sizes.

---

*Documentation maintained by the NGEK TECH team.*
