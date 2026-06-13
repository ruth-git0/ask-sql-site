# AskSQL — Marketing Site

A premium, design-forward redesign of the AskSQL marketing site.

**AskSQL** is conversational analytics for the enterprise — ask questions in plain
English and get trusted, governed, explainable SQL answers in seconds.

## Design intent

- **Editorial minimalism.** Ink-on-paper base, generous whitespace, a single
  restrained indigo accent, and serif-italic accents for warmth.
- **Premium detail.** Hairline borders, layered soft shadows, fluid type scale,
  subtle film grain, soft gradient glows, and motion that respects
  `prefers-reduced-motion`.
- **Hand-built product mockup.** The hero centerpiece is a real text-to-SQL
  interface rendered in pure HTML/CSS with an animated query.

## Stack

Zero build step. Hand-written, dependency-free:

- `index.html` — semantic markup
- `assets/styles.css` — design system + components
- `assets/app.js` — scroll reveals, typing animation, nav behavior

Fonts: Inter, Fraunces, JetBrains Mono (Google Fonts).

## Run

Open `index.html` in any modern browser, or serve locally:

```bash
npx serve .
# or
python -m http.server 8000
```
