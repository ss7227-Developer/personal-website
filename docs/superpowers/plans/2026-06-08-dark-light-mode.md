# Dark / Light Mode Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sun/moon toggle in the navbar that switches between the existing dark theme and a Paper/Sepia light theme, persisted to localStorage.

**Architecture:** CSS custom properties drive all color tokens; Tailwind reads `var(--color-*)` references so existing utility classes (`bg-bg`, `text-text`, etc.) work without modification. A React context applies/removes the `html.light` class and persists the choice to localStorage. A toggle button in Nav handles user interaction.

**Tech Stack:** React 18, Tailwind CSS v3, CSS custom properties, localStorage

---

### Task 1: Wire Tailwind color tokens to CSS custom properties

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Replace hardcoded hex values in tailwind.config.js with var() references**

Open `tailwind.config.js` and replace the entire `colors` block:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      'var(--color-bg)',
        surface: 'var(--color-surface)',
        border:  'var(--color-border)',
        text:    'var(--color-text)',
        muted:   'var(--color-muted)',
        accent:  'var(--color-accent)',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono:  ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Add CSS variable blocks to index.css**

Open `src/index.css` and replace the `@layer base` block with:

```css
@layer base {
  :root {
    --color-bg:      #0a0a0a;
    --color-surface: #111111;
    --color-border:  #1f1f1f;
    --color-text:    #e8e6e0;
    --color-muted:   #6b6b6b;
    --color-accent:  #F59E0B;
  }

  html.light {
    --color-bg:      #f5f0e8;
    --color-surface: #ede8dc;
    --color-border:  #d6ccb8;
    --color-text:    #2d2520;
    --color-muted:   #92856e;
    --color-accent:  #b45309;
  }

  html {
    scroll-behavior: smooth;
    @apply bg-bg text-text;
  }

  body {
    @apply font-mono;
    -webkit-font-smoothing: antialiased;
  }
}
```

- [ ] **Step 3: Run the dev server and verify dark theme still looks identical**

```bash
npm run dev
```

Open http://localhost:5173 (or the port shown). Check:
- Background is still near-black `#0a0a0a`
- Text is still off-white `#e8e6e0`
- Accent color (amber) is still `#F59E0B`

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "refactor: switch color tokens to CSS custom properties"
```

---

### Task 2: Create ThemeContext

**Files:**
- Create: `src/context/ThemeContext.jsx`

- [ ] **Step 1: Create the context file**

Create `src/context/ThemeContext.jsx` with this content:

```jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/context/ThemeContext.jsx
git commit -m "feat: add ThemeContext with localStorage persistence"
```

---

### Task 3: Wrap App in ThemeProvider

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Update main.jsx**

Replace the contents of `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Verify app still loads in the browser with no console errors**

Check http://localhost:5173 — site should look identical to before.

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: wrap app in ThemeProvider"
```

---

### Task 4: Add toggle button to Nav

**Files:**
- Modify: `src/components/Nav.jsx`

- [ ] **Step 1: Import useTheme in Nav.jsx**

At the top of `src/components/Nav.jsx`, add the import after the existing imports:

```js
import { useTheme } from '../context/ThemeContext'
```

- [ ] **Step 2: Destructure theme and toggleTheme inside the Nav component**

Inside the `Nav` function body, after the existing hooks, add:

```js
const { theme, toggleTheme } = useTheme()
```

- [ ] **Step 3: Add toggle button to the desktop nav (after the Resume link)**

In the desktop `<ul>` section, after the Resume `<li>`, add:

```jsx
<li>
  <button
    onClick={toggleTheme}
    aria-label="Toggle theme"
    className="font-mono text-muted hover:text-accent transition-colors text-base"
  >
    {theme === 'dark' ? '☀' : '☾'}
  </button>
</li>
```

- [ ] **Step 4: Add toggle button to the mobile overlay menu (after the Resume link)**

In the mobile overlay `<div>`, after the Resume `<a>`, add:

```jsx
<button
  onClick={() => { toggleTheme(); setMenuOpen(false); }}
  aria-label="Toggle theme"
  className="font-mono text-base uppercase tracking-widest transition-colors text-muted hover:text-accent"
>
  {theme === 'dark' ? '☀' : '☾'}
</button>
```

- [ ] **Step 5: Verify in browser**

- Click the ☀ icon in the nav → page switches to warm Paper/Sepia light mode
- Background becomes `#f5f0e8`, text becomes `#2d2520`, accent becomes `#b45309`
- Click ☾ → switches back to dark mode
- Refresh the page → theme persists (check localStorage key `"theme"` in DevTools → Application → Local Storage)

- [ ] **Step 6: Commit and push**

```bash
git add src/components/Nav.jsx
git commit -m "feat: add dark/light mode toggle to navbar"
git push origin main
```
