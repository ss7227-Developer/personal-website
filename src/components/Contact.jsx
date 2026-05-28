import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          content.classList.add('visible');
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

  return (
    <>
      <section id="contact" ref={sectionRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={contentRef} className="reveal">
            <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
              — Contact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-accent mb-6">
              Let's talk.
            </h2>
            <p className="font-mono text-sm text-muted mb-10">
              I'm open to interesting problems, collaborations, and conversations about AI systems.
            </p>
            <a
              href="mailto:ss7227@columbia.edu"
              className="border border-accent text-accent font-mono text-sm px-8 py-4 hover:bg-accent hover:text-bg transition-colors inline-block"
            >
              ss7227@columbia.edu
            </a>
            <div className="mt-10 flex gap-6">
              <a
                href="https://github.com/ss7227-Developer"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/samyukkta-suryanarayanan/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-muted">
            © 2025 Samyukkta Suryanarayanan
          </span>
          <div className="flex gap-6">
            <a
              href="https://github.com/ss7227-Developer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/samyukkta-suryanarayanan/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
