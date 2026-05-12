# Samyukkta Suryanarayanan — Personal Website

Personal portfolio for Samyukkta Suryanarayanan, AI/ML Engineer.

## Stack

- React 18 + Vite 5
- Tailwind CSS v3
- React Router v6
- gray-matter (blog post frontmatter)
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Blog Posts

Add posts as `.md` files in `src/posts/` with this frontmatter:

```markdown
---
slug: your-post-slug
title: "Post Title"
date: 2025-05-01
excerpt: "One-sentence summary shown in preview."
---

Post content here...
```

Posts are loaded at build time via `import.meta.glob`. No server required — drop a file and redeploy.

## Resume

Place `resume.pdf` in `public/`. It's served at `/resume.pdf` and linked from the Nav and Resume section.

## Deployment

Deployed to Vercel. The `vercel.json` includes an SPA rewrite rule so client-side routes work on direct navigation.
