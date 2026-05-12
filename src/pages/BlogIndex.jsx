import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import { allPosts, formatDate } from '../lib/posts'

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl text-text mb-16">Writing.</h1>

        {allPosts.length === 0 ? (
          <p className="font-mono text-xs text-muted">No posts yet.</p>
        ) : (
          allPosts.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.slug}>
              <div className="group flex flex-col gap-1 py-6 border-b border-border hover:pl-2 transition-all duration-200">
                <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                <span className="font-serif text-2xl text-text group-hover:text-accent transition-colors">{post.title}</span>
                {post.excerpt && (
                  <p className="font-mono text-xs text-muted leading-relaxed mt-1">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))
        )}
      </main>
    </>
  )
}
