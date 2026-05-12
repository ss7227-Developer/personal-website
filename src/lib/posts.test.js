import { describe, it, expect } from 'vitest'
import { parsePosts, formatDate, getPostBySlugFrom } from './posts'

describe('parsePosts', () => {
  it('parses title, slug, date, excerpt, and content', () => {
    const raw = {
      'a.md': '---\ntitle: "Hello World"\ndate: "2026-05-01"\nexcerpt: "A test post."\nslug: "hello-world"\n---\n\nBody content here.',
    }
    const posts = parsePosts(raw)
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Hello World')
    expect(posts[0].slug).toBe('hello-world')
    expect(posts[0].date).toBe('2026-05-01')
    expect(posts[0].excerpt).toBe('A test post.')
    expect(posts[0].content.trim()).toBe('Body content here.')
  })

  it('sorts posts by date descending', () => {
    const raw = {
      'old.md': '---\ntitle: Old\ndate: "2026-01-01"\nexcerpt: Old\nslug: old\n---\n',
      'new.md': '---\ntitle: New\ndate: "2026-05-11"\nexcerpt: New\nslug: new\n---\n',
    }
    const posts = parsePosts(raw)
    expect(posts[0].slug).toBe('new')
    expect(posts[1].slug).toBe('old')
  })

  it('returns empty array for empty input', () => {
    expect(parsePosts({})).toEqual([])
  })
})

describe('formatDate', () => {
  it('formats a YYYY-MM-DD date string', () => {
    const result = formatDate('2026-05-01')
    expect(result).toBe('May 1, 2026')
  })

  it('does not shift day due to timezone offset', () => {
    // Without the T00:00:00 fix, timezones west of UTC would show Apr 30
    const result = formatDate('2026-05-01')
    expect(result).not.toContain('Apr')
    expect(result).toContain('May')
  })
})

describe('getPostBySlugFrom', () => {
  const posts = [
    { slug: 'hello', title: 'Hello', date: '2026-05-01', excerpt: 'Hi', content: 'body' },
    { slug: 'world', title: 'World', date: '2026-04-01', excerpt: 'Yo', content: 'body' },
  ]

  it('returns the matching post', () => {
    expect(getPostBySlugFrom(posts, 'hello')?.title).toBe('Hello')
  })

  it('returns null for unknown slug', () => {
    expect(getPostBySlugFrom(posts, 'missing')).toBeNull()
  })
})
