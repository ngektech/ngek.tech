# NGEK TECH

> AI websites for the future.

A single-page website for NGEK TECH, an enterprise-grade web development company founded by Aditya Patange with EK and NA.

## Features

- **Animated Hero Section** - Eye-catching landing with nucleoid and electron logo animation.
- **Vacuum Cleaner Demo** - Interactive quote rotation widget with wisdom from famous personalities.
- **Company History** - About section with milestones and pricing information.
- **Team Profiles** - Solo founder Aditya Patange and the two snakes EK and NA.
- **Tech Blog** - Markdown-powered articles on Big O Notation, TSO, Yoga for Web Apps, and Quantum NextJS.
- **NGEK Talker** - Interactive chatbot with multiple personalities (Aditya, EK, NA).
- **Contact Form** - Validated submission form with guardrails.
- **Ray Tracer** - Neon green cursor trail effect.
- **Google Analytics** - IP tracking and page view analytics.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Markdown | Blog rendering |

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Installation

```bash
# Clone the repository.
git clone <repository-url>
cd ngek.tech

# Install dependencies.
npm install

# Set up environment variables.
cp .env.example .env.local
# Edit .env.local with your values.

# Run development server.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build.
npm run build

# Start production server.
npm start
```

## Project Structure

```
ngek.tech/
├── src/
│   ├── app/                    # Next.js App Router pages.
│   │   ├── layout.tsx          # Root layout.
│   │   ├── page.tsx            # Home page.
│   │   ├── globals.css         # Global styles.
│   │   └── blog/[slug]/        # Blog article pages.
│   ├── components/             # React components.
│   │   ├── Logo.tsx            # Animated SVG logo.
│   │   ├── Navbar.tsx          # Navigation bar.
│   │   ├── Hero.tsx            # Hero section.
│   │   ├── VacuumDemo.tsx      # Quote vacuum demo.
│   │   ├── About.tsx           # History section.
│   │   ├── Team.tsx            # Team profiles.
│   │   ├── Blog.tsx            # Blog preview.
│   │   ├── Chatbot.tsx         # NGEK Talker.
│   │   ├── Contact.tsx         # Contact form.
│   │   ├── Footer.tsx          # Page footer.
│   │   ├── RayTracer.tsx       # Cursor effect.
│   │   └── GoogleAnalytics.tsx # Analytics.
│   └── lib/
│       └── blog.ts             # Blog utilities.
├── content/
│   └── blog/                   # Markdown blog posts.
├── docs/                       # Documentation.
├── public/                     # Static assets.
├── .env.example                # Environment template.
├── .env.local                  # Local environment (git ignored).
└── README.md                   # This file.
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URL` | MongoDB connection string. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID. |
| `OPENAI_API_KEY` | OpenAI API key (optional, for future LLM features). |

## Color Scheme

The website uses an orange and white Hindu-themed color scheme.

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#ff6b00` | Main brand color |
| Primary Light | `#ff8533` | Hover states |
| Secondary | `#fff5eb` | Backgrounds |
| Accent | `#ff9500` | Highlights |
| Neon Green | `#39ff14` | Cursor effect |

## Blog Articles

1. **Big O Notation for Websites** - Understanding algorithmic complexity in web development.
2. **TSO (Time Space Organization)** - Balancing performance trade-offs.
3. **How Does Yoga Work on Web Apps** - Mindful approach to development.
4. **The Quantum Science Behind NextJS** - Quantum mechanics principles in Next.js.

## Documentation

Full documentation is available in the `/docs` folder:

- [Project Overview](./docs/project-overview.md)
- [Architecture](./docs/architecture.md)
- [Components](./docs/components.md)
- [Styling](./docs/styling.md)
- [Environment Variables](./docs/environment-variables.md)
- [Deployment](./docs/deployment.md)
- [Security](./docs/security.md)
- [Performance](./docs/performance.md)

## Security Features

- Input validation on all forms.
- Input sanitization to prevent XSS.
- Path traversal prevention for blog slugs.
- Environment variable protection.
- Guardrails throughout the UI.

## Performance

- Code splitting by route.
- Font preconnecting.
- Animation optimization with requestAnimationFrame.
- Static generation for blog pages.
- Quote caching in VacuumDemo.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Configure environment variables.
3. Deploy.

### Docker

```bash
docker build -t ngek-tech .
docker run -p 3000:3000 ngek-tech
```

See [Deployment Documentation](./docs/deployment.md) for more options.

## Team

- **Aditya Patange** - Solo Founder & CEO
- **EK** - Chief Wisdom Officer (Snake)
- **NA** - Chief Energy Officer (Snake)

## Pricing

- **Advance Payment**: $1,000 (one-time)
- **Maintenance**: $5,300/month (recurring)

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

Built with love by NGEK TECH.

*"I'm a polyphase motor that rotates syllables with no strain"* — Real Talk, Adi 55
