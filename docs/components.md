# Components

## Overview.

All components are located in `src/components/`. Each component is a self-contained React functional component.

## Component Reference.

### Logo.tsx

**Purpose.** Animated SVG logo with nucleoid and electron design.

**Props.**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | number | 40 | Logo size in pixels. |
| className | string | "" | Additional CSS classes. |

**Features.**

- Animated electron orbits.
- Gradient fill on nucleus.
- Infinite rotation animation.

**Usage.**

```tsx
import Logo from "@/components/Logo";

<Logo size={120} className="mx-auto" />
```

---

### Navbar.tsx

**Purpose.** Fixed navigation bar with mobile support.

**Props.** None.

**Features.**

- Scroll-based glass effect.
- Mobile hamburger menu.
- Smooth scroll to sections.
- Lucide icons for nav items.

**State.**

- `isScrolled`: Boolean for scroll position.
- `isMobileMenuOpen`: Boolean for mobile menu.

---

### Hero.tsx

**Purpose.** Landing section with tagline and CTAs.

**Props.** None.

**Features.**

- Animated background blobs.
- Floating logo animation.
- Gradient text effects.
- CTA buttons with hover effects.
- Scroll indicator.

---

### VacuumDemo.tsx

**Purpose.** Interactive quote rotation widget.

**Props.** None.

**Features.**

- Power toggle button.
- Cached quotes from famous personalities.
- Rotation animation when active.
- Quote attribution display.
- Adi 55 attribution line.

**State.**

- `isOn`: Boolean for power state.
- `currentQuote`: Current displayed quote.
- `quoteIndex`: Index for rotation.
- `isLoading`: Loading state.

---

### About.tsx

**Purpose.** Company history and pricing information.

**Props.** None.

**Features.**

- Guardrail-styled story section.
- Milestone cards with icons.
- Pricing cards for services.
- Animated entry on scroll.

---

### Team.tsx

**Purpose.** Team member profiles.

**Props.** None.

**Features.**

- Profile cards for Aditya, EK, and NA.
- Role badges and descriptions.
- Lucide User icon for snake avatars.
- Hover lift effect.

---

### Blog.tsx

**Purpose.** Blog post preview grid.

**Props.** None.

**Features.**

- Article cards with icons.
- Read time indicators.
- Category badges.
- Links to full articles.

---

### Chatbot.tsx

**Purpose.** NGEK Talker interactive assistant.

**Props.** None.

**Features.**

- Floating toggle button.
- Message history display.
- Multiple speaker personalities.
- Typing indicator.
- Keyword-based responses.

**State.**

- `isOpen`: Chat window visibility.
- `messages`: Message history array.
- `input`: Current input value.
- `isTyping`: Typing indicator state.

---

### Contact.tsx

**Purpose.** Website request form.

**Props.** None.

**Features.**

- Name, email, phone, website fields.
- Message textarea.
- Client-side validation.
- Input sanitization.
- Success confirmation.

**State.**

- `formData`: Form field values.
- `errors`: Validation errors.
- `isSubmitting`: Submission state.
- `isSubmitted`: Success state.

---

### Footer.tsx

**Purpose.** Page footer with links and social media.

**Props.** None.

**Features.**

- Brand section with logo.
- Quick links navigation.
- Services list.
- Social media icons.
- Security guardrail notice.
- Copyright with year.

---

### RayTracer.tsx

**Purpose.** Neon green cursor trail effect.

**Props.** None.

**Features.**

- Canvas-based rendering.
- Mouse and touch support.
- Fading trail effect.
- Multiple glow layers.
- Performance optimized.

**State.**

- `canvasRef`: Canvas element reference.
- `pointsRef`: Cursor position history.
- `animationFrameRef`: Animation frame ID.

---

### GoogleAnalytics.tsx

**Purpose.** Google Analytics integration.

**Props.**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| measurementId | string | Yes | GA4 measurement ID. |

**Features.**

- Validates measurement ID format.
- Tracks page views.
- Logs IP tracking status.
- Handles route changes.

---

*Documentation maintained by the NGEK TECH team.*
