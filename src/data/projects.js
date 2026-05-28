export const projects = [
  {
    title: 'SSRF Auditor',
    description:
      'A hybrid security pipeline detecting Server-Side Request Forgery vulnerabilities in AI-generated Python code. Combines Semgrep static analysis with a LangGraph multi-agent triage system (URL Analyst → Sanitization Checker → Judge) with trace-based grounding, reducing hallucinations by 40%.',
    stack: ['Python', 'LangGraph', 'Claude API', 'Semgrep', 'MCP', 'LangSmith'],
    github: 'https://github.com/ss7227-Developer/SSRF_Auditor',
  },
  {
    title: 'Real-Time Transaction Anomaly Detection',
    description:
      'Event-driven risk monitoring system using a Flask API and Redis queue to score financial transactions with low latency. PyTorch autoencoder with full governance: model versioning, audit-ready logs, 100% auditability.',
    stack: ['PyTorch', 'Flask', 'Redis', 'PostgreSQL', 'Docker', 'AWS EC2'],
    github: 'https://github.com/ss7227-Developer/transaction-anomaly-detection',
  },
  {
    title: 'AI-Powered Financial Insights Assistant',
    description:
      'RAG system using Amazon Bedrock embeddings and Qdrant vector DB to extract structured insights from large financial document corpora. RAGAS evaluation pipeline with faithfulness and context precision scoring.',
    stack: ['LangChain', 'Qdrant', 'Amazon Bedrock', 'RAGAS', 'LangSmith', 'Streamlit'],
    github: 'https://github.com/ss7227-Developer/insight-assistant',
  },
  {
    title: 'Global Regulatory Compliance Dashboard',
    description:
      'Production-grade full-stack platform using React 18 and Django 5.0, orchestrating a 5-service containerized environment via Docker Compose to streamline analysis of global regulatory data. Asynchronous Celery/AWS SQS pipeline ingesting 10k+ OpenFDA records with an immutable S3 data lake and Scikit-learn risk scoring.',
    stack: ['React 18', 'Django 5.0', 'Docker Compose', 'Celery', 'AWS SQS/S3', 'Scikit-learn'],
    github: 'https://github.com/ss7227-Developer/compliance-tracker',
  },
]
