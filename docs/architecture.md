# Architecture

## Overview.

The NGEK TECH website follows a component-based architecture using Next.js App Router.

## Application Architecture.

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
├─────────────────────────────────────────────────┤
│                 Next.js App Router               │
├──────────────┬──────────────┬───────────────────┤
│   Layout     │    Pages     │    Components     │
│  (Root)      │  (Routes)    │   (UI Elements)   │
├──────────────┴──────────────┴───────────────────┤
│                    Lib                           │
│              (Utilities & Helpers)               │
├─────────────────────────────────────────────────┤
│                  Content                         │
│            (Markdown Blog Posts)                 │
└─────────────────────────────────────────────────┘
```

## Component Hierarchy.

```
RootLayout
├── GoogleAnalytics
└── Page
    ├── RayTracer (Global cursor effect)
    ├── Navbar
    ├── Main
    │   ├── Hero
    │   ├── VacuumDemo
    │   ├── About
    │   ├── Team
    │   ├── Blog
    │   └── Contact
    ├── Footer
    └── Chatbot
```

## Data Flow.

### Client-Side Data.

```
User Interaction
      ↓
Component State (useState)
      ↓
UI Update (React re-render)
```

### Server-Side Data.

```
Request
   ↓
Server Component
   ↓
Data Fetching (lib/blog.ts)
   ↓
HTML Response
```

## Rendering Strategy.

| Route | Strategy | Reason |
|-------|----------|--------|
| / (Home) | Client | Interactive components. |
| /blog/[slug] | Static | Content from markdown. |

## State Management.

The application uses local component state for.

1. **Chatbot Messages.** Message history and typing state.
2. **Contact Form.** Form data and validation errors.
3. **Vacuum Demo.** Power state and current quote.
4. **Mobile Menu.** Open/close state.
5. **Ray Tracer.** Cursor position history.

## Animation Architecture.

```
Framer Motion
├── Page Transitions (AnimatePresence)
├── Scroll Animations (whileInView)
├── Hover Effects (whileHover, whileTap)
├── Logo Animation (motion.svg)
└── Stagger Effects (variants)
```

## Error Handling.

### Client-Side.

- Form validation with user feedback.
- Try-catch blocks for async operations.
- Graceful degradation for missing features.

### Server-Side.

- Not found handling (notFound()).
- Error boundaries for component errors.
- Fallback content for missing data.

## Security Architecture.

```
User Input
    ↓
Sanitization (Client)
    ↓
Validation (Client)
    ↓
API Route (Server)
    ↓
Sanitization (Server)
    ↓
Database
```

## Performance Architecture.

### Code Splitting.

- Automatic page-level splitting.
- Dynamic imports for heavy components.
- Lazy loading for below-fold content.

### Caching.

- Static page caching for blog posts.
- Browser caching for assets.
- Quote cache rotation in VacuumDemo.

---

*Documentation maintained by the NGEK TECH team.*
