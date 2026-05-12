import matter from 'gray-matter'

export function parsePosts(rawFiles) {
  return Object.entries(rawFiles)
    .map(([filename, raw]) => {
      const { data, content } = matter(raw)
      return { slug: data.slug, title: data.title, date: data.date, excerpt: data.excerpt, content, filename }
    })
    .filter(({ slug, date, filename }) => {
      if (!slug || !date) {
        console.warn(`[posts] Skipping ${filename}: missing required frontmatter (slug, date)`)
        return false
      }
      return true
    })
    .map(({ filename: _f, ...post }) => post)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

const rawFiles = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' })

export const allPosts = parsePosts(rawFiles)

export function getPostBySlugFrom(posts, slug) {
  return posts.find(p => p.slug === slug) ?? null
}

export function getPostBySlug(slug) {
  return getPostBySlugFrom(allPosts, slug)
}

const DEFAULT_DATE_OPTS = { month: 'short', day: 'numeric', year: 'numeric' }

export function formatDate(dateStr, opts = DEFAULT_DATE_OPTS) {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) ? dateStr + 'T00:00:00' : dateStr
  return new Date(iso).toLocaleDateString('en-US', opts)
}
