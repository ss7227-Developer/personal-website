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
            I'm Samyukkta — an AI engineer who thinks the gap between a working prototype and a production system is where the real engineering happens. My background spans full-stack development, ML systems, and security-aware design.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            Currently, I'm drawn to agentic AI — building systems where LLMs plan, retrieve, and act. I've built RAG pipelines, multi-agent workflows with LangGraph, and real-time anomaly detection systems that run in production environments.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80">
            I believe good AI engineering means thinking about latency, reliability, and what happens when the model is wrong. I write about this too — the messy middle of building AI systems that actually work.
          </p>
        </div>
      </div>
    </section>
  );
}
