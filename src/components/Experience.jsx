import { useEffect, useRef } from 'react';

const EXPERIENCE = [
  {
    role: 'AI Engineer (Part-Time)',
    company: 'HerbShield',
    period: 'Jan 2025 – Present',
    bullets: [
      'Built the core AI matching system using Google Genkit (TypeScript) with Zod schema validation, powering personalized herbal remedy recommendations based on symptoms, severity, and care type.',
      'Developed a WhatsApp chatbot and website chatbot delivering AI-personalized messaging across the full customer journey — from program signup through medication reminders and progress updates.',
      'Core founding team member; designed and built the full Next.js / Firebase / Stripe web application end-to-end.',
    ],
  },
  {
    role: 'Software Engineer (Part-Time)',
    company: 'CyberGhostOps',
    period: 'Jan 2025 – Present',
    bullets: [
      'Architected a Claude AI integration via Model Context Protocol (MCP), connecting the website to automate content updates and site management workflows — replacing manual processes with LLM-powered automation.',
      'Set up and managed the GitHub repository for a Flask-based cybersecurity education platform, establishing version control workflows, branch structure, and deployment processes.',
    ],
  },
  {
    role: 'AI/ML Technical Consultant & Curriculum Engineer',
    company: 'Independent',
    period: 'May 2024 – Present',
    bullets: [
      'Designed and delivered end-to-end ML engineering curriculum (Python, PyTorch, Scikit-learn, ETL pipelines) for 10+ learners.',
      'Advised on ML pipeline failures, model validation, and production-readiness using the same documentation and testing standards applied in enterprise AI delivery.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const timers = [];
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          itemRefs.current.forEach((el, i) => {
            if (!el) return;
            const t = setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="experience" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — Experience
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-accent mb-12">
          Where I've worked.
        </h2>

        <div className="space-y-12">
          {EXPERIENCE.map((job, i) => (
            <div
              key={job.company}
              ref={(el) => (itemRefs.current[i] = el)}
              className="reveal border-l border-border pl-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <div>
                  <p className="font-mono text-sm text-text">{job.role}</p>
                  <p className="font-mono text-xs text-accent">{job.company}</p>
                </div>
                <p className="font-mono text-xs text-muted whitespace-nowrap">{job.period}</p>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="font-mono text-sm text-text/70 leading-relaxed flex gap-3">
                    <span className="text-muted mt-0.5 shrink-0">–</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
