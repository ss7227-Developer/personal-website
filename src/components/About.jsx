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

    // If already in viewport on mount (e.g. navigated directly here), show immediately
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      left.classList.add('visible');
      right.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          left.classList.add('visible');
          timer = setTimeout(() => right.classList.add('visible'), 150);
          observer.disconnect();
        }
      },
      { threshold: 0 }
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
            I'm Sammu, a software engineer and AI builder based in New York. I just completed my master's in Computer Science (ML track) at Columbia, and I'm actively looking for my next full-time role where I can keep doing what I love most: building things that are hard to build and actually matter to the people using them.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            Most recently, I've been part of the founding team at a health-tech startup, where I own everything from the database schema to the AI — an intelligent matching system, a WhatsApp chatbot that walks customers through their entire journey, and a website chatbot for real-time Q&A. On the side, I've been integrating Claude AI into a cybersecurity platform via Model Context Protocol to automate the way the site gets updated.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            My projects push further: I built a multi-agent security auditor that combines LLM orchestration with static analysis to detect vulnerabilities in real codebases, and an end-to-end RAG pipeline on AWS Bedrock with full retrieval evaluation metrics.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            I care about the full picture — not just whether the model works, but whether the system is reliable, testable, and something a real team can build on. My stack spans TypeScript, Python, Next.js, React, Django, Flask, Firebase, AWS, and a growing list of AI frameworks.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80 mb-4">
            Before Columbia, I studied CS at Rutgers Honors College with minors in Business and Mathematics.
          </p>
          <p className="font-mono text-sm leading-relaxed text-text/80">
            If you're hiring or working on something interesting, I'd love to hear about it.
          </p>
        </div>
      </div>
    </section>
  );
}
