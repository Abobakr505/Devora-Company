# Devora — Software & Digital Solutions

A production-ready marketing site built with React, Vite, Tailwind CSS, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       # One folder per section (Navbar, Hero, About, ...)
├── data/             # Content for services, projects, process, tech stack
├── hooks/            # useScrollReveal (GSAP + ScrollTrigger), useReducedMotion
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- Colors, type, and layout live in `tailwind.config.js` — adjust the `emerald` / `ink` / `mist` scales to retheme.
- The contact form in `src/components/Contact/Contact.jsx` currently only sets local state on submit — wire the `handleSubmit` function up to EmailJS or your own API endpoint.
- Replace the placeholder logo in `src/components/Logo/Logo.jsx` with a final SVG whenever it's ready — every place the logo appears imports from that one file.
- All animations respect `prefers-reduced-motion`.
