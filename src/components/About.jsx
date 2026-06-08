import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    let timer;
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          left.classList.add('visible');
          timer = setTimeout(() => right.classList.add('visible'), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 gap-16">
        {/* Left column */}
        <div ref={leftRef} className="reveal mb-12 md:mb-0">
          <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
            — About
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-accent">
            Who I am.
          </h2>
        </div>

        {/* Right column */}
        <div ref={rightRef} className="reveal">
          <p className="font-mono text-sm leading-relaxed text-text/80">
            I'm Samyukkta — an M.S. Computer Science student at Columbia (ML Track, May 2026) currently building production AI systems at HerbShield and CyberGhostOps. I specialize in multi-agent orchestration, RAG pipelines, and evaluation-driven development, where every architecture decision is grounded in traces and metrics rather than intuition. I'm actively looking for full-time AI/ML engineering roles starting Summer 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
