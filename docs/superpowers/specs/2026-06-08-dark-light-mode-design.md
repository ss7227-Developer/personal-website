# Dark / Light Mode Toggle — Design Spec
**Date:** 2026-06-08

## Summary

Add a dark/light theme toggle to the portfolio site. Dark mode is the existing default. Light mode uses a warm Paper/Sepia palette. The toggle is a sun/moon icon at the far right of the navbar.

---

## Color Tokens

| Token | Dark (default) | Light (Paper/Sepia) |
|---|---|---|
| `bg` | `#0a0a0a` | `#f5f0e8` |
| `surface` | `#111111` | `#ede8dc` |
| `border` | `#1f1f1f` | `#d6ccb8` |
| `text` | `#e8e6e0` | `#2d2520` |
| `muted` | `#6b6b6b` | `#92856e` |
| `accent` | `#F59E0B` | `#b45309` |

---

## Architecture

### CSS Variables (index.css)

Replace the hardcoded hex values in `tailwind.config.js` with `var(--color-*)` references. Define both palettes as CSS custom properties:

- `:root` — dark theme (current defaults)
- `html.light` — Paper/Sepia overrides

This means every existing Tailwind class (`bg-bg`, `text-text`, `text-accent`, `border-border`, etc.) continues to work without modification. Only the underlying variable values change when the theme switches.

### ThemeContext (src/context/ThemeContext.jsx)

A new React context that:
- Reads initial theme from `localStorage` key `"theme"`, falling back to `"dark"`
- Applies/removes the `.light` class on `document.documentElement` when the theme changes
- Exposes `{ theme, toggleTheme }` to consumers
- Persists the selected theme to `localStorage` on every toggle

### ThemeProvider wired at root (src/main.jsx)

Wrap `<App>` in `<ThemeProvider>` so the context is available site-wide.

### Toggle button (src/components/Nav.jsx)

- Desktop: icon button at the far right of the nav link list, after the Resume link
- Mobile: icon button added to the bottom of the mobile overlay menu, after the Resume link
- Icon: `☀` when in dark mode (click to switch to light), `☾` when in light mode (click to switch to dark)
- Styled consistently with existing nav links (`font-mono text-muted hover:text-accent transition-colors`)

---

## Files Changed

| File | Change |
|---|---|
| `tailwind.config.js` | Swap hex values for `var(--color-*)` |
| `src/index.css` | Add `:root` and `html.light` CSS variable blocks |
| `src/context/ThemeContext.jsx` | New file — context + provider + localStorage logic |
| `src/main.jsx` | Wrap `<App>` in `<ThemeProvider>` |
| `src/components/Nav.jsx` | Add toggle button (desktop + mobile) |

No other components need changes.

---

## Behavior

- Default theme on first visit: **dark**
- Theme persists across page refreshes via `localStorage`
- Toggle is available on all screen sizes (desktop nav + mobile overlay)
- Transition is instant (no animation needed — CSS variable swap is immediate)
