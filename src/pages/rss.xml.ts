import type { APIRoute } from 'astro'
import { getPosts, getSettings } from '@/lib/api'
import { excerpt } from '@/lib/utils'

export const GET: APIRoute = async ({ site }) => {
  const settings = await getSettings()
  const { posts } = await getPosts({ perPage: 20 })
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://example.com'

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/post/${post.slug}</link>
      <guid>${siteUrl}/post/${post.slug}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${excerpt(post.body, 300)}]]></description>
      ${post.categories.map(c => `<category>${c.name}</category>`).join('')}
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${settings.site_name}</title>
    <description>${settings.tag_line}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
