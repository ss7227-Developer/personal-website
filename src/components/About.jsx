export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Full-width header */}
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-4">
          — About
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-accent mb-10">
          Who I am.
        </h2>

        {/* 2-column bio grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-5">
          <p className="font-mono text-base leading-relaxed text-text/80">
            I'm Sammu, a software engineer and AI builder based in New York. I just completed my master's in Computer Science (ML track) at Columbia, and I'm actively looking for my next full-time role where I can keep doing what I love most: building things that are hard to build and actually matter to the people using them.
          </p>
          <p className="font-mono text-base leading-relaxed text-text/80">
            Most recently, I've been part of the founding team at a health-tech startup, where I own everything from the database schema to the AI — an intelligent matching system, a WhatsApp chatbot that walks customers through their entire journey, and a website chatbot for real-time Q&A. On the side, I've been integrating Claude AI into a cybersecurity platform via Model Context Protocol to automate the way the site gets updated.
          </p>
          <p className="font-mono text-base leading-relaxed text-text/80">
            My projects push further: I built a multi-agent security auditor that combines LLM orchestration with static analysis to detect vulnerabilities in real codebases, and an end-to-end RAG pipeline on AWS Bedrock with full retrieval evaluation metrics.
          </p>
          <p className="font-mono text-base leading-relaxed text-text/80">
            I care about the full picture — not just whether the model works, but whether the system is reliable, testable, and something a real team can build on. My stack spans TypeScript, Python, Next.js, React, Django, Flask, Firebase, AWS, and a growing list of AI frameworks.
          </p>
          <p className="font-mono text-base leading-relaxed text-text/80">
            Before Columbia, I studied CS at Rutgers Honors College with minors in Business and Mathematics.
          </p>
          <p className="font-mono text-base leading-relaxed text-text/80">
            If you're hiring or working on something interesting, I'd love to hear about it.
          </p>
        </div>
      </div>
    </section>
  );
}

