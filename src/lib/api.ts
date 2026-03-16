import type { Post, Category, Tag, SiteSettings, PageItem, PaginationMeta, ApiResponse } from './types'

const API_BASE = import.meta.env.PUBLIC_API_URL || 'https://seed.seedwebs.app/api/public'

// Module-level cache for settings (fetched once per build)
let settingsCache: SiteSettings | null = null

async function fetchAPI<T>(path: string, params?: Record<string, string>): Promise<{ data: T, meta?: PaginationMeta }> {
  const url = new URL(`${API_BASE}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) url.searchParams.set(key, value)
    }
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText} for ${path}`)
  }

  const json = await res.json() as ApiResponse<T>
  if (!json.success) {
    throw new Error(`API error: ${json.error || 'Unknown error'}`)
  }

  return { data: json.data as T, meta: json.meta }
}

// ---------- Posts ----------

export async function getPosts(opts?: {
  page?: number
  perPage?: number
  category?: string
  tag?: string
}): Promise<{ posts: Post[], meta: PaginationMeta }> {
  const perPage = opts?.perPage || parseInt(import.meta.env.PUBLIC_POSTS_PER_PAGE || '12')
  const { data, meta } = await fetchAPI<Post[]>('/posts', {
    page: String(opts?.page || 1),
    per_page: String(perPage),
    ...(opts?.category && { category: opts.category }),
    ...(opts?.tag && { tag: opts.tag }),
  })
  return {
    posts: data || [],
    meta: meta || { page: 1, per_page: perPage, total: 0, total_pages: 0 },
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data } = await fetchAPI<Post>(`/posts/${slug}`)
    return data || null
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const { posts, meta } = await getPosts({ page, perPage: 100 })
    slugs.push(...posts.map(p => p.slug))
    totalPages = meta.total_pages
    page++
  }

  return slugs
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`)
    const json = await res.json() as ApiResponse<Category[]>
    return json.data || []
  } catch {
    return []
  }
}

// ---------- Tags ----------

export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetch(`${API_BASE}/tags`)
    const json = await res.json() as ApiResponse<Tag[]>
    return json.data || []
  } catch {
    return []
  }
}

// ---------- Settings ----------

export async function getSettings(): Promise<SiteSettings> {
  if (settingsCache) return settingsCache

  try {
    const { data } = await fetchAPI<SiteSettings>('/settings')
    settingsCache = data
    return data
  } catch {
    return {
      site_name: 'My Blog',
      tag_line: '',
      primary: '#3d3d5c',
      primary_foreground: '#fafafa',
    }
  }
}

// ---------- Pages ----------

export async function getPage(slug: string): Promise<PageItem | null> {
  try {
    const { data } = await fetchAPI<PageItem>(`/pages/${slug}`)
    return data || null
  } catch {
    return null
  }
}

export async function getPages(): Promise<PageItem[]> {
  try {
    const res = await fetch(`${API_BASE}/pages`)
    const json = await res.json() as ApiResponse<PageItem[]>
    return json.data || []
  } catch {
    return []
  }
}
