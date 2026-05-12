import matter from 'gray-matter'

export function parsePosts(rawFiles) {
  return Object.entries(rawFiles)
    .map(([, raw]) => {
      const { data, content } = matter(raw)
      return {
        slug: data.slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

const rawFiles = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' })

export const allPosts = parsePosts(rawFiles)

export function getPostBySlug(slug) {
  return allPosts.find(p => p.slug === slug) ?? null
}

export function formatDate(dateStr, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', opts)
}
