import Nav from '../components/Nav'
import { Link, useParams } from 'react-router-dom'
import { getPostBySlug, formatDate } from '../lib/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <>
        <Nav />
        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
          <p className="font-mono text-sm text-muted">Post not found.</p>
          <Link to="/blog" className="font-mono text-xs text-accent hover:underline mt-4 inline-block">← All posts</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <Link to="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors mb-12 inline-block">← All posts</Link>
        <h1 className="font-serif text-4xl md:text-5xl text-text mb-4">{post.title}</h1>
        <p className="font-mono text-xs text-muted mb-12">{formatDate(post.date)}</p>
        <div className="font-mono text-sm text-text/80 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </main>
    </>
  )
}
