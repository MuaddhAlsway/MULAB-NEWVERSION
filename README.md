# Muaddh Al-Sway | Portfolio Website

A modern, high-performance portfolio website showcasing 44+ projects built with React 19, Vite, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and a clean, professional UI.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://muaddh-portfolio.vercel.app)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](https://github.com/MuaddhAlsway/Portfolio-Website-Design)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

---

## 🎯 Overview

This is a comprehensive portfolio website designed to showcase professional development work across multiple domains:

- **15 Full-Stack Applications** (React, Next.js, Node.js, Express, MongoDB, SQLite)
- **18 HTML/CSS/JavaScript Projects** (Responsive clones, custom builds)
- **5 C Programming Applications** (Algorithms, systems programming)
- **Interactive UI Components** (42+ shadcn/ui components)
- **Production-Ready Code** (TypeScript, optimized builds, security best practices)

**Live Demo:** [muaddh-portfolio.vercel.app](https://muaddh-portfolio.vercel.app)

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MuaddhAlsway/Portfolio-Website-Design.git
cd Portfolio-Website-Design

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main portfolio component
│   ├── components/
│   │   ├── figma/             # Custom components
│   │   └── ui/                # 42+ shadcn/ui components
│   ├── data/
│   │   ├── projects.ts        # 44 projects with metadata
│   │   ├── caseStudies.ts
│   │   ├── trqStudioCaseStudy.ts
│   │   └── mesahaLakumCaseStudy.ts
│   └── styles/
│       ├── theme.css          # Dark theme variables
│       ├── fonts.css          # Google Fonts
│       └── tailwind.css       # Tailwind configuration
├── main.tsx                    # React DOM entry
└── vite.config.ts             # Vite configuration

public/
├── Projects/                   # Project images (41 files)
├── Course/                     # Course images
└── me.jpeg                    # Profile image

config files:
├── index.html                 # HTML entry point
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Vite build config
├── vercel.json               # Vercel deployment config
└── pnpm-workspace.yaml       # pnpm monorepo config
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 6.3.5** - Build tool (⚡ Lightning-fast)
- **TypeScript 5.0+** - Type safety
- **Tailwind CSS 4.1.12** - Utility-first CSS
- **shadcn/ui** - 42+ accessible UI components
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

### Animations & Effects
- **Framer Motion (motion/react)** - Component animations
- **canvas-confetti** - Confetti effects
- **GSAP** - Advanced timeline animations
- **React Router 7.13** - Client-side routing

### Forms & Data
- **React Hook Form 7.55** - Form state management
- **Recharts 2.15.2** - Data visualization
- **Zod** - Schema validation

### UI Libraries
- **Radix UI** - Unstyled, accessible components
- **MUI Material** - Material Design components
- **React DnD** - Drag and drop

### Styling & Utilities
- **class-variance-authority** - CSS class composition
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes
- **next-themes** - Theme management

### Developer Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Figma asset resolver** - Custom Vite plugin

---

## 📊 Portfolio Content

### Projects Showcase

#### Full-Stack Applications (15 projects)
1. **CarRentLab** - Modern car rental platform with React Router
2. **SkillNest** - Learning management system (LMS)
3. **QuickBlog** - AI-powered blog with Google Gemini API
4. **HealthCare** - Hospital management system UI
5. **Adusity** - Real estate portfolio with GSAP animations
6. **Netflix Clone** - Streaming platform with Firebase & TMDB API
7. **Disney+ Clone** - Streaming interface
8. **Authentication** - Next Auth V5 implementation
9. **Spotify Clone** - Music player with audio API
10. **Gemini Clone** - AI chat interface
11. **TD Logistics** - RTL bilingual logistics platform
12. **TRQ Studio** - Bilingual portfolio & CMS
13. **Riyadah** - Bilingual accounting firm website
14. **Writer's Journey** - Book launch platform
15. **Mesaha Lakum** - Event management platform

#### HTML/CSS/JavaScript (18 projects)
- **E-Commerce Clones:** Adidas, Apple, Amazon, Alert Fashion
- **Web Apps:** Book Store, Pizza Ordering, Ford Website
- **Business Sites:** Coffee Cherry, KOFFEE CHERRY
- **Specialized:** Airbnb, Netflix, Britich Council, ALRYADH, Spotify, YouTube

#### C Programming (5 projects)
- Algorithms and systems programming projects

### Additional Sections
- **Experience:** Current & past roles at development companies
- **Skills:** Tech stack proficiency across 30+ technologies
- **Testimonials:** Client and team feedback
- **Case Studies:** Detailed project breakdowns

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

The `vercel.json` file is pre-configured with:
- Vite build settings
- Caching strategies
- Clean URLs
- Performance optimizations

### Alternative Deployments
- **Netlify:** Works with default Vite settings
- **GitHub Pages:** Use `npm run build` and push `dist/` folder
- **Cloudflare Pages:** Connect repository and deploy

### Environment Variables
```bash
VITE_SITE_URL=https://your-domain.com
```

---

## 📈 Performance

**Build Output:**
- JavaScript: 440.10 kB (128.48 kB gzipped)
- CSS: 112.82 kB (17.26 kB gzipped)
- HTML: 0.81 kB (0.46 kB gzipped)
- Build time: ~4 seconds

**Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🎨 Design Features

- **Custom Cursor** (desktop only)
- **Grain Overlay** - Subtle texture effect
- **Particle Canvas** - Interactive background
- **Smooth Animations** - Framer Motion transitions
- **Dark Theme** - Cyan accents (#00d8ff)
- **Fully Responsive** - Mobile-first design
- **Accessible** - WCAG 2.1 AA compliant

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Mobile (iOS/Android) | ✅ Latest |

---

## 🔗 Available Links

Each project includes multiple link types:
- **GitHub** - Source code repositories
- **Live Demo** - Production deployments
- **LinkedIn** - Post documentation
- **Notion** - Case study notes (selected projects)
- **Wiki** - Technical documentation (selected projects)
- **Diagrams** - Architecture diagrams (selected projects)

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server at localhost:5173
npm run build            # Production build → dist/
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint (if configured)
npm run type-check       # TypeScript check (if configured)
```

---

## 🔐 Security & Best Practices

- ✅ **TypeScript** - Type-safe code
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **CORS** - Cross-origin protection
- ✅ **CSP** - Content Security Policy headers
- ✅ **Input Validation** - Zod schema validation
- ✅ **Secure Dependencies** - Regular updates

---

## 📄 Project Files

### Data Files
- `projects.ts` - 44 projects with full metadata
  - Project name, description, long description
  - Technology stack (10-20 techs per project)
  - Features, challenges, learnings
  - Links (GitHub, live, LinkedIn, Notion, Wiki, Diagrams)
  - Images and project metadata

### Configuration Files
- `vercel.json` - Deployment configuration
- `vite.config.ts` - Build tool configuration
- `postcss.config.mjs` - PostCSS configuration
- `index.html` - HTML entry point with meta tags

### Style Files
- `theme.css` - CSS custom properties & dark theme
- `fonts.css` - Google Fonts imports
- `tailwind.css` - Tailwind CSS configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

### Acknowledgments
- **shadcn/ui** - Component library (MIT)
- **Unsplash** - Stock images
- **Google Fonts** - Typography
- **Lucide** - Icon library
- **Framer Motion** - Animation library

---

## 👨‍💻 About the Developer

**Muaddh Al-Sway** - Full-Stack Web Developer

- 🌐 **Portfolio:** [muaddh-portfolio.vercel.app](https://muaddh-portfolio.vercel.app)
- 💼 **LinkedIn:** [linkedin.com/in/muaddh-alsway](https://www.linkedin.com/in/muaddh-alsway)
- 🐙 **GitHub:** [@MuaddhAlsway](https://github.com/MuaddhAlsway)
- ✉️ **Email:** [muaddh@example.com](mailto:muaddh@example.com)

---

## 🙋 Support

Need help? Check out:
- 📖 [Official Vite Documentation](https://vitejs.dev)
- ⚛️ [React Documentation](https://react.dev)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com)
- 🎯 [shadcn/ui Components](https://ui.shadcn.com)

---

## 📊 Statistics

- **Total Projects:** 44+
- **Lines of Code:** 10,000+
- **Components:** 42+ UI components
- **Git Commits:** 100+
- **Development Time:** 2+ years
- **Technologies:** 50+
- **Deployment Targets:** Vercel, Netlify, GitHub Pages, Cloudflare

---

## 🔄 Version History

**v1.0.0** (Current)
- ✅ 44 projects integrated
- ✅ Full TypeScript support
- ✅ Dark theme with animations
- ✅ Vercel deployment ready
- ✅ Mobile-first responsive design
- ✅ Production-optimized builds

---

**Last Updated:** June 30, 2026

**Made with ❤️ by Muaddh Al-Sway**
