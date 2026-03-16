/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_SITE_URL: string
  readonly PUBLIC_POSTS_PER_PAGE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
