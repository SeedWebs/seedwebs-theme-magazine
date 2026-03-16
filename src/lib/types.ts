// SeedWebs Public API response types

export interface Post {
  id: number
  title: string
  slug: string
  body: string
  featured_image: string | null
  featured_image_mobile: string | null
  seo_title: string | null
  seo_description: string | null
  data: Record<string, unknown>
  categories: Category[]
  tags: Tag[]
  status: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  parent_id: number | null
  created_at: string
  updated_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  site_name: string
  tag_line: string
  primary: string
  primary_foreground: string
}

export interface PageItem {
  id: number
  title: string
  slug: string
  body: string
  featured_image: string | null
  featured_image_mobile: string | null
  seo_title: string | null
  seo_description: string | null
  data: Record<string, unknown>
  template: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface PaginationMeta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: PaginationMeta
}
