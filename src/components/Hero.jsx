import { useState, useEffect, useRef } from 'react';

const TAGLINES = [
  "I build AI systems that work in production.",
  "LangGraph. RAG. Real-time inference.",
  "From prototype to production engineer.",
  "Security-aware ML systems.",
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineFading, setTaglineFading] = useState(false);
  const [visible, setVisible] = useState([false, false, false, false]);

  // Staggered reveal on mount
  useEffect(() => {
    const delays = [0, 150, 300, 450];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Rotating tagline every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineFading(true);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setTaglineFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen bg-bg flex items-center justify-center"
    >
      <div className="flex flex-col items-center text-center gap-6 px-4">
        {/* Eyebrow label */}
        <p
          className={`reveal${visible[0] ? ' visible' : ''} font-mono text-muted text-xs uppercase tracking-widest`}
        >
          AI / ML Engineer
        </p>

        {/* Main heading */}
        <h1
          className={`reveal${visible[1] ? ' visible' : ''} font-serif text-text text-6xl md:text-8xl leading-tight`}
        >
          Samyukkta
        </h1>

        {/* Rotating tagline */}
        <p
          className={`reveal${visible[2] ? ' visible' : ''} font-mono text-muted text-sm md:text-base transition-opacity duration-300 ${taglineFading ? 'opacity-0' : 'opacity-100'}`}
        >
          {TAGLINES[taglineIndex]}
        </p>

        {/* CTA buttons */}
        <div className={`reveal${visible[3] ? ' visible' : ''} flex gap-4`}>
          <button
            onClick={() => scrollTo('projects')}
            className="border border-accent text-accent px-6 py-3 font-mono text-sm hover:bg-accent hover:text-bg transition-colors"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo('blog')}
            className="border border-border text-muted px-6 py-3 font-mono text-sm hover:border-text hover:text-text transition-colors"
          >
            Read Writing
          </button>
        </div>
      </div>
    </section>
  );
}
