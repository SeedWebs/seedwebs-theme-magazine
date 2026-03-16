/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateStr: string, locale = 'en-US'): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Strip HTML tags and truncate to create an excerpt
 */
export function excerpt(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * Estimate reading time in minutes
 */
export function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/**
 * Generate a URL for a post
 */
export function postUrl(slug: string): string {
  return `/post/${slug}`
}

/**
 * Generate a URL for a category
 */
export function categoryUrl(slug: string): string {
  return `/category/${slug}`
}

/**
 * Generate a URL for a tag
 */
export function tagUrl(slug: string): string {
  return `/tag/${slug}`
}
