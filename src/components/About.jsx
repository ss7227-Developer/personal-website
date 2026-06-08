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
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            I'm Samyukkta — an AI engineer who thinks the gap between a working prototype and a production system is where the real engineering happens. I'm finishing my M.S. in Computer Science (ML Track) at Columbia Engineering while building AI systems in production at HerbShield and CyberGhostOps.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            I specialize in multi-agent orchestration, RAG pipelines, and evaluation-driven development — building systems where every architecture decision is grounded in traces and metrics, not intuition. My work spans agentic AI, structured output validation, and end-to-end retrieval systems across heterogeneous enterprise corpora.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80">
            I believe good AI engineering means being rigorous about what you measure. I run ablations, build eval harnesses, and treat hallucination mitigation as a first-class engineering problem — not an afterthought.
          </p>
        </div>
      </div>
    </section>
  );
}
