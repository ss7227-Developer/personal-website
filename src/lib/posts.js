function parseFrontMatter(raw) {
  const match = raw.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]*([\s\S]*)/)
  if (!match) return { data: {}, content: raw.trim() }
  const data = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if (val.length > 1 && (val[0] === '"' || val[0] === "'") && val.endsWith(val[0])) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return { data, content: match[2].trim() }
}

export function parsePosts(rawFiles) {
  return Object.entries(rawFiles)
    .map(([filename, raw]) => {
      const { data, content } = parseFrontMatter(raw)
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
