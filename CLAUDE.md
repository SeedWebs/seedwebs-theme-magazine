# SeedWebs Astro Magazine Theme

Astro v6 blog theme (Magazine style) powered by SeedWebs headless CMS public API.

## Quick Reference

```bash
bun install          # Install dependencies
bun run dev          # Dev server (port 4321)
bun run build        # Build for production
bun run preview      # Preview production build
```

## Project Structure

- `src/components/blog/` — Blog components (PostCard, FeaturedHero, PostGrid, CategoryGrid, PostBody)
- `src/components/layout/` — Shell components (Header, Footer, Sidebar, Pagination)
- `src/components/seo/` — SEO (SEOHead with meta, OG, Twitter, canonical)
- `src/components/ui/` — Reusable UI (ResponsiveImage, FormattedDate, CategoryBadge)
- `src/layouts/` — Page layouts (BaseLayout, BlogLayout with sidebar, PageLayout full-width)
- `src/lib/api.ts` — SeedWebs API client (fetch wrapper, module-level settings cache)
- `src/lib/types.ts` — TypeScript interfaces (Post, Category, Tag, SiteSettings, PageItem)
- `src/lib/utils.ts` — Helpers (formatDate, excerpt, readingTime, URL generators)
- `src/pages/` — File-based routing (Astro)
- `src/styles/global.css` — Tailwind v4 + typography plugin + theme tokens + dark mode

## Architecture

### Data Source
- SeedWebs Public API: `{PUBLIC_API_URL}/posts`, `/categories`, `/tags`, `/settings`, `/pages`
- No auth required — all endpoints are public (`/api/public/*`)
- API base URL configured via `PUBLIC_API_URL` env var

### Rendering Strategy
- **Static (SSG)** by default — all pages pre-rendered at build time
- **SSR** opt-in per page with `export const prerender = false` (e.g., `search.astro`)
- `getStaticPaths()` paginates through API to generate all post/category/tag slugs
- Site settings fetched once per build (module-level cache in `api.ts`)

### Theming
- Colors from SeedWebs site settings (`primary`, `primary_foreground`)
- Injected as CSS custom properties in BaseLayout: `--site-primary`, `--site-primary-foreground`
- Tailwind theme tokens reference these: `--color-primary: var(--site-primary)`
- Dark mode via `class` strategy (toggle in Header, persisted to localStorage)

## Code Style

- **No semicolons**, single quotes, trailing commas (ES5)
- TypeScript strict mode
- Astro component props defined with `interface Props` in frontmatter

## Pages

| Route | File | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | `index.astro` | SSG | Homepage — hero + grids + categories |
| `/post` | `post/index.astro` | SSG | Blog listing page 1 |
| `/post/2` | `post/[page].astro` | SSG | Blog listing paginated |
| `/post/:slug` | `post/[slug].astro` | SSG | Single post detail |
| `/category/:slug` | `category/[slug]/index.astro` | SSG | Category filter |
| `/category/:slug/:page` | `category/[slug]/[page].astro` | SSG | Category paginated |
| `/tag/:slug` | `tag/[slug]/index.astro` | SSG | Tag filter |
| `/tag/:slug/:page` | `tag/[slug]/[page].astro` | SSG | Tag paginated |
| `/search?q=` | `search.astro` | SSR | Server-side search |
| `/rss.xml` | `rss.xml.ts` | SSG | RSS feed |
| `/*` | `[...slug].astro` | SSG | CMS pages catch-all |

## Configuration

Environment variables (`.env`):

```env
PUBLIC_API_URL=https://seed.seedwebs.app/api/public   # Required
PUBLIC_SITE_URL=https://yourblog.com                   # Optional (for canonical/OG)
PUBLIC_POSTS_PER_PAGE=12                               # Optional (default: 12)
```

## Deployment

- Target: Cloudflare Pages (`@astrojs/cloudflare` adapter)
- Build: `bun run build` → output in `dist/`
- Deploy: `bunx wrangler pages deploy dist` or connect GitHub repo to Cloudflare Pages

## API Client (`src/lib/api.ts`)

Key functions:
- `getPosts({ page, perPage, category, tag })` — List posts with pagination + filters
- `getPost(slug)` — Single post by slug
- `getAllPostSlugs()` — All slugs (for getStaticPaths)
- `getCategories()` — All categories
- `getTags()` — All tags
- `getSettings()` — Site settings (cached per build)
- `getPages()` / `getPage(slug)` — CMS pages

## Conventions

- Layouts handle data fetching for shared data (settings, sidebar content)
- Pages handle page-specific data fetching in frontmatter
- Components receive data via typed props — no fetching inside components
- URL helpers in `utils.ts`: `postUrl()`, `categoryUrl()`, `tagUrl()`
- Images use `ResponsiveImage` component with srcset (mobile 800w + desktop 1600w)
