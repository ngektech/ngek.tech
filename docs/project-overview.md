# Project Overview

## Introduction.

NGEK TECH is a single-page website built with Next.js 15, TypeScript, and Tailwind CSS. The website showcases AI-powered website development services.

## Tech Stack.

### Core Technologies.

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 11.x | Animations |
| Lucide React | 0.x | Icons |

### Key Dependencies.

- **framer-motion**: Animation library for smooth transitions.
- **lucide-react**: Icon library with consistent design.
- **gray-matter**: Markdown frontmatter parsing.
- **react-markdown**: Markdown rendering.

## Project Structure.

```
ngek.tech/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout.
│   │   ├── page.tsx        # Home page.
│   │   ├── globals.css     # Global styles.
│   │   └── blog/
│   │       └── [slug]/
│   │           └── page.tsx # Blog article page.
│   ├── components/
│   │   ├── Logo.tsx        # Animated SVG logo.
│   │   ├── Navbar.tsx      # Navigation bar.
│   │   ├── Hero.tsx        # Hero section.
│   │   ├── VacuumDemo.tsx  # Quote vacuum demo.
│   │   ├── About.tsx       # History section.
│   │   ├── Team.tsx        # Team section.
│   │   ├── Blog.tsx        # Blog preview.
│   │   ├── Chatbot.tsx     # NGEK Talker.
│   │   ├── Contact.tsx     # Contact form.
│   │   ├── Footer.tsx      # Page footer.
│   │   ├── RayTracer.tsx   # Cursor effect.
│   │   └── GoogleAnalytics.tsx # Analytics.
│   └── lib/
│       └── blog.ts         # Blog utilities.
├── content/
│   └── blog/               # Markdown articles.
├── docs/                   # Documentation.
├── public/                 # Static assets.
├── .env.example            # Environment template.
├── .env.local              # Local environment.
└── README.md               # Project README.
```

## Features.

### Main Features.

1. **Animated Hero Section.** Eye-catching landing with logo animation.
2. **Vacuum Cleaner Demo.** Interactive quote rotation widget.
3. **Company History.** About section with milestones.
4. **Team Profiles.** Founder and snake team members.
5. **Blog Section.** Markdown-powered tech articles.
6. **NGEK Talker.** Interactive chatbot assistant.
7. **Contact Form.** Validated submission form.
8. **Ray Tracer.** Neon green cursor effect.

### Technical Features.

1. **Google Analytics.** IP tracking and page views.
2. **Responsive Design.** Mobile-first approach.
3. **SEO Optimized.** Meta tags and structured data.
4. **Performance Optimized.** Code splitting and lazy loading.
5. **Security Guardrails.** Input validation throughout.

## Color Scheme.

The website uses an orange and white Hindu-themed color scheme.

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Primary | #ff6b00 | Main brand color. |
| Primary Light | #ff8533 | Hover states. |
| Primary Dark | #cc5500 | Active states. |
| Secondary | #fff5eb | Backgrounds. |
| Accent | #ff9500 | Highlights. |
| Neon Green | #39ff14 | Cursor effect. |

## Brand Guidelines.

- Company name: NGEK TECH (all caps).
- Tagline: "AI websites for the future".
- Tone: Professional, innovative, spiritual.

---

*Documentation maintained by the NGEK TECH team.*
