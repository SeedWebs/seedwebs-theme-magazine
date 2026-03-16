# SeedWebs Magazine Theme

A magazine-style blog theme built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), powered by [SeedWebs](https://seedwebs.app) headless CMS.

## Features

- Magazine-style homepage with featured hero, post grids, and category tiles
- Blog listing with pagination and sidebar
- Single post with responsive images, reading time, and JSON-LD
- Category and tag filtering pages
- Server-side search page
- Dark mode toggle
- RSS feed
- CMS pages support
- SEO optimized (meta tags, Open Graph, canonical URLs)
- Deployed on Cloudflare Pages

## Quick Start

```bash
# Clone this template
git clone https://github.com/SeedWebs/seedwebs-theme-magazine.git my-blog
cd my-blog

# Install dependencies
bun install

# Set your API URL
cp .env.example .env
# Edit .env with your SeedWebs site URL

# Start dev server
bun run dev

# Build for production
bun run build
```

## Configuration

Create a `.env` file (see `.env.example`):

```env
# Required: Your SeedWebs public API URL
PUBLIC_API_URL=https://yoursite.seedwebs.app/api/public

# Optional: Your site URL for SEO
PUBLIC_SITE_URL=https://yourblog.com

# Optional: Posts per page (default: 12)
PUBLIC_POSTS_PER_PAGE=12
```

## Project Structure

```
src/
├── components/
│   ├── blog/          # PostCard, FeaturedHero, PostGrid, CategoryGrid
│   ├── layout/        # Header, Footer, Sidebar, Pagination
│   ├── seo/           # SEOHead (meta + OG tags)
│   └── ui/            # ResponsiveImage, FormattedDate, CategoryBadge
├── layouts/
│   ├── BaseLayout.astro    # HTML shell + site settings
│   ├── BlogLayout.astro    # 2-column with sidebar
│   └── PageLayout.astro    # Full-width
├── lib/
│   ├── api.ts         # SeedWebs API client
│   ├── types.ts       # TypeScript interfaces
│   └── utils.ts       # Date format, excerpt, URL helpers
├── pages/             # File-based routing
└── styles/
    └── global.css     # Tailwind + theme tokens
```

## Customization

### Colors

The theme automatically uses your SeedWebs site colors (primary + foreground). Override in `src/styles/global.css`:

```css
@theme {
  --color-primary: var(--site-primary, #your-color);
  --color-primary-fg: var(--site-primary-foreground, #fff);
}
```

### Adding Pages

Add `.astro` files to `src/pages/`. Static by default. Add `export const prerender = false` for server-rendered pages.

### Components

All components are in `src/components/` and designed to be easily modified. Each component has typed props at the top.

## Deploy to Cloudflare Pages

```bash
bun run build
bunx wrangler pages deploy dist
```

Or connect your GitHub repo to Cloudflare Pages with build command `bun run build` and output directory `dist`.

## Tech Stack

- [Astro](https://astro.build) v6
- [Tailwind CSS](https://tailwindcss.com) v4
- [Cloudflare Pages](https://pages.cloudflare.com)
- [SeedWebs](https://seedwebs.app) Headless CMS

## License

MIT
