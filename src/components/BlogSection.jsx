import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { allPosts, formatDate } from '../lib/posts';

export default function BlogSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentRef.current?.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const recentPosts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto reveal" ref={contentRef}>
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — Writing
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-text mb-12">
          Recent writing.
        </h2>

        {allPosts.length === 0 ? (
          <p className="font-mono text-xs text-muted">No posts yet.</p>
        ) : (
          <>
            <div>
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col gap-1 py-6 border-b border-border hover:pl-2 transition-all duration-200"
                >
                  <span className="font-mono text-xs text-muted">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-serif text-xl text-text group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <span className="font-mono text-xs text-muted leading-relaxed mt-1">
                      {post.excerpt}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/blog"
              className="font-mono text-xs text-muted hover:text-accent transition-colors mt-8 inline-block"
            >
              All writing →
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
