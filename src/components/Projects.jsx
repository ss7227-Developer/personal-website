import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const timers = [];
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const t = setTimeout(() => el.classList.add('visible'), i * 100);
            timers.push(t);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — Projects
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-accent mb-12">
          Things I've built.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="reveal border border-border bg-surface p-6 flex flex-col gap-4 hover:border-accent/50 transition-colors group"
            >
              <h3 className="font-serif text-xl text-text group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="font-mono text-sm text-text leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-muted/70 border border-border/50 px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted hover:text-accent transition-colors flex items-center gap-1"
                >
                  ↗ GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
