import { useEffect, useRef } from 'react';

export default function Resume() {
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

  return (
    <section id="resume" className="py-24 px-6" ref={sectionRef}>
      <div ref={contentRef} className="reveal max-w-4xl mx-auto text-center">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — Resume
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-text mb-6">
          Get my resume.
        </h2>
        <p className="font-mono text-sm text-muted mb-10">
          A one-page summary of my work, skills, and projects.
        </p>
        <a
          href="/resume.pdf"
          download
          className="border border-accent text-accent font-mono text-sm px-8 py-4 hover:bg-accent hover:text-bg transition-colors inline-block"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
