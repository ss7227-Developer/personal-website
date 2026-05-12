import { describe, it, expect } from 'vitest'
import { parsePosts } from './posts'

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
