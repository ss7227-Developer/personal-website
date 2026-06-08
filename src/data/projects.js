export const projects = [
  {
    title: 'Multi-Agent AI Security Auditor',
    description:
      '3-agent LLM orchestration harness (URL Analyst, Sanitization Checker, Judge) combined with Semgrep static analysis, tested across 9 ablation conditions on 120 real-CVE files — lifting recall from 38% (static-only) to 86%. Every architecture decision grounded in EvidencePacket production traces. pytest eval harness enforces structured JSON output validation across all agent boundaries; 50%+ automated remediation.',
    stack: ['Python', 'LangChain', 'Claude API', 'Semgrep', 'FastMCP', 'LangSmith', 'promptfoo'],
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
    title: 'AI-Powered Domain-Specific Insights Assistant',
    description:
      'End-to-end RAG pipeline on AWS Bedrock with per-domain FAISS vector indexing, LangChain retrieval chain with page-level citations (PDF/DOCX/CSV/JSON/TXT), and structured JSON output (answer, key_insights[], confidence). Implemented Precision@k, Recall@k, MRR, and NDCG@k from scratch in a ground-truth benchmark runner that directly drove retrieval architecture, chunking, and reranking decisions.',
    stack: ['LangChain', 'FAISS', 'Amazon Bedrock', 'AWS', 'LangSmith', 'pytest'],
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
