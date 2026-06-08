export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-8">
          — About
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left: anchored title */}
          <div className="shrink-0 md:w-44">
            <h2 className="font-serif text-4xl md:text-5xl text-accent md:leading-tight">
              Who<br className="hidden md:block" /> I am.
            </h2>
          </div>

          {/* Right: bio column */}
          <div className="space-y-5">
            <p className="font-mono text-base leading-relaxed text-text/80">
              I'm Sammu, a software engineer and AI builder based in New York. I just completed my master's in Computer Science (ML track) at Columbia, and I'm actively looking for my next full-time role where I can keep doing what I love most: building things that are hard to build and actually matter to the people using them.
            </p>
            <p className="font-mono text-base leading-relaxed text-text/80">
              Most recently, I've been part of the founding team at a health-tech startup, where I own everything from the database schema to the AI — an intelligent matching system, a WhatsApp chatbot that walks customers through their entire journey, and a website chatbot for real-time Q&A. On the side, I've been integrating Claude AI into a cybersecurity platform via Model Context Protocol to automate the way the site gets updated.
            </p>
            <p className="font-mono text-base leading-relaxed text-text/80">
              My projects push further: I built a multi-agent security auditor that combines LLM orchestration with static analysis to detect vulnerabilities in real codebases, and an end-to-end RAG pipeline on AWS Bedrock with full retrieval evaluation metrics. My stack spans TypeScript, Python, Next.js, React, Django, Flask, Firebase, AWS, and a growing list of AI frameworks.
            </p>
            <p className="font-mono text-base leading-relaxed text-muted">
              Rutgers Honors College CS → Columbia MS. If you're hiring or working on something interesting, I'd love to hear about it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

