# Abraham Gebeyehu — Portfolio

Personal portfolio website for Abraham Gebeyehu, a full-stack software engineer and AI / ML engineer based in Addis Ababa, Ethiopia. The site presents selected projects, technical capabilities, experience, and contact links.

## Features

- Responsive portfolio with work, capabilities, experience, about, and contact sections
- Project details and links maintained as structured data
- Animated interactions and scroll effects, with reduced-motion support
- Three.js avatar and hero visuals, loaded separately from the main page
- Downloadable CV and portrait assets

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- GSAP and Lenis for animation and smooth scrolling
- Three.js for 3D visuals

## Getting started

You need Node.js and npm installed.

```bash
git clone https://github.com/Ab-xo/personal_portfolio.git
cd personal_portfolio
npm install
npm run dev
```

Vite prints a local URL in the terminal when the development server is ready.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run the TypeScript project checks |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
public/                 Static assets, including the portrait and CV
src/
  components/
    layout/             Navigation and footer
    sections/           Portfolio page sections
    ui/                 Reusable interface and 3D components
  data/                 Site copy, projects, experience, and capabilities
  hooks/                Shared React hooks
  lib/                  Animation and scrolling setup
```

## Updating portfolio content

- Edit `src/data/site.ts` for the biography, contact information, social links, and site navigation.
- Edit `src/data/projects.ts` to update featured and selected projects.
- Edit `src/data/experience.ts` and `src/data/capabilities.ts` for experience and technical skills.
- Replace `public/Abraham_Gebeyehu_CV.pdf` to update the downloadable CV.
- Replace `public/avatar.png` to update the portrait.
- Update the page title and search description in `index.html` when changing the site identity.

After making changes, run `npm run lint` and `npm run build` before deployment. Deploy the generated `dist/` directory using a static hosting provider that supports Vite builds.

## License

This repository contains personal portfolio content and assets. Contact the author before reusing the CV, portrait, or other personal materials.
