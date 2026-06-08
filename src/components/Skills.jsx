import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    category: 'Programming',
    tags: ['Python', 'SQL', 'Java', 'C++', 'JavaScript'],
  },
  {
    category: 'Agentic AI & LLMs',
    tags: ['Multi-agent orchestration', 'LangChain', 'LlamaIndex', 'FastMCP', 'Google Genkit', 'Prompt Engineering', 'Trace-based Grounding', 'Structured Output Validation', 'Hallucination Mitigation'],
  },
  {
    category: 'RAG & Retrieval',
    tags: ['FAISS', 'Amazon Bedrock', 'LangChain retrieval/reranking', 'Document understanding', 'Precision@k', 'Recall@k', 'MRR', 'NDCG'],
  },
  {
    category: 'Data Engineering',
    tags: ['ETL pipelines', 'Celery', 'PostgreSQL', 'AWS S3', 'AWS SQS', 'AWS RDS', 'AWS EC2', 'AWS Lambda', 'DynamoDB', 'Redis'],
  },
  {
    category: 'ML & Full-Stack',
    tags: ['PyTorch', 'Scikit-learn', 'XGBoost', 'MLflow', 'React 18', 'Next.js', 'Django 5.0', 'Flask', 'FastAPI', 'Streamlit'],
  },
  {
    category: 'Evals & Testing',
    tags: ['pytest', 'LangSmith', 'promptfoo', 'CI/CD', 'GitHub Actions', 'Docker', 'Structured JSON output validation'],
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
