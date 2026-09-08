# Chronicle — Modern Headless Blog Platform

A state-of-the-art editorial web application built with **Next.js 15 (App Router, TypeScript, Tailwind CSS)** and **Strapi 5 Headless CMS**.

---

## 📁 Architecture & Folder Structure

```
strapi/
│
├── my-app/                                      # Next.js Frontend
│   │
│   ├── public/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logo.svg
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   │
│   │   │   ├── (website)/
│   │   │   │   ├── page.tsx                     # Home
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx                 # Blog listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx             # Single blog
│   │   │   │   ├── category/
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx             # Category archive
│   │   │   │   ├── author/
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx             # Author profile
│   │   │   │   ├── search/
│   │   │   │   │   └── page.tsx                 # Debounced search
│   │   │   │   └── about/
│   │   │   │       └── page.tsx                 # About & pitch
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── revalidate/
│   │   │   │       └── route.ts                 # Strapi webhook ISR revalidation
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── globals.css
│   │   │   └── favicon.ico
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header/ (Header.tsx, index.ts)
│   │   │   │   ├── Footer/ (Footer.tsx, index.ts)
│   │   │   │   └── Navbar/ (Navbar.tsx, index.ts)
│   │   │   ├── blog/ (BlogCard, BlogGrid, BlogList, BlogHero, BlogContent, RelatedPosts, FeaturedPosts, Pagination)
│   │   │   ├── author/ (AuthorCard, AuthorProfile)
│   │   │   ├── category/ (CategoryCard)
│   │   │   ├── search/ (SearchBar, SearchResults)
│   │   │   ├── seo/ (JsonLd)
│   │   │   └── ui/ (Button, Input, Image, Skeleton, Icons)
│   │   │
│   │   ├── lib/
│   │   │   ├── strapi/ (client, posts, authors, categories, tags, media)
│   │   │   ├── utils/ (formatDate, slugify, cn)
│   │   │   └── constants.ts (mock fallbacks & site config)
│   │   │
│   │   ├── types/ (blog, author, category, tag, strapi)
│   │   └── hooks/ (useDebounce)
│   │
│   ├── .env.local
│   ├── .env.example
│   ├── next.config.ts
│   └── tsconfig.json
│
└── strapi/                                     # Strapi 5 Headless CMS
    ├── config/ (middlewares.ts, server.ts, api.ts, etc.)
    └── src/
        ├── api/ (post, author, category, tag, comment)
        └── components/ (shared/seo.json, blog/social-links.json, blog/table-of-contents.json)
```

---

## 🚀 Quick Start

### 1. Run the Strapi 5 Backend
```bash
cd strapi
npm run develop
```
- Strapi Admin URL: `http://localhost:1337/admin`
- Strapi API Base: `http://localhost:1337/api`

### 2. Run the Next.js Frontend
```bash
cd my-app
npm run dev
```
- Web Application: `http://localhost:3000`

---

## 💎 Features
- **Modern Editorial Aesthetic**: Glassmorphic panels, dark mode support, fluid typography, subtle micro-interactions.
- **Graceful Fallbacks**: Fully browsable and interactive out-of-the-box with fallback datasets even before Strapi DB is populated.
- **Strapi 5 Schemas**: Pre-configured Content Types (`Post`, `Author`, `Category`, `Tag`, `Comment`) and Components (`SEO`, `SocialLinks`, `TableOfContents`).
- **Live Search**: Instant debounced search with keyword filtering across titles and excerpts.
- **SEO Ready**: Dynamic OpenGraph tags, Twitter Cards, structured Schema.org `BlogPosting` JSON-LD on every article.
