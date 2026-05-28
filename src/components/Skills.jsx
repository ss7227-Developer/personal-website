import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    category: 'AI / ML',
    tags: ['LangGraph', 'LangChain', 'RAG', 'OpenAI API', 'Hugging Face', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    category: 'Backend',
    tags: ['Python', 'FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
  },
  {
    category: 'Infrastructure',
    tags: ['Docker', 'AWS', 'GCP', 'Vercel', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'Security',
    tags: ['SSRF', 'OWASP Top 10', 'Penetration Testing', 'Threat Modeling'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);

  useEffect(() => {
    const timers = [];
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          categoryRefs.current.forEach((el, i) => {
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
    <section id="skills" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — Skills
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-accent mb-12">
          What I work with.
        </h2>

        {SKILLS.map((group, i) => (
          <div
            key={group.category}
            ref={(el) => (categoryRefs.current[i] = el)}
            className="reveal"
          >
            <p className="font-mono text-sm text-text mb-3">{group.category}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border text-text font-mono text-base px-3 py-1 hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
