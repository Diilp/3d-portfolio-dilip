# Dilip Kumar Yadav - 3D Portfolio

Professional 3D portfolio for Dilip Kumar Yadav, built with React, TypeScript, Three.js, React Three Fiber, and GSAP.

The site presents Dilip's full-stack, Angular, cloud, AI, project, certification, and problem-solving profile in one animated portfolio experience.

Primary resume asset: `public/Dilip_Kumar_Yadav_Resume.pdf`

## Features

- Animated 3D character hero with custom cursor interactions.
- Resume-driven sections for about, services, experience, work, skills, achievements, code impact, and contact.
- Interactive technology orbit for Dilip's stack.
- Project carousel with generated portfolio visuals, avoiding stale screenshots.
- Responsive dark/cyan developer design system.

## Tech Stack

- React 18
- TypeScript
- Vite
- GSAP
- Three.js
- React Three Fiber
- React Icons

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Project Structure

```text
.
|-- public/
|-- src/
|   |-- components/
|   |   |-- Character/
|   |   |-- styles/
|   |   |-- About.tsx
|   |   |-- Achievements.tsx
|   |   |-- Career.tsx
|   |   |-- CodeImpact.tsx
|   |   |-- Contact.tsx
|   |   |-- Landing.tsx
|   |   |-- MainContainer.tsx
|   |   |-- Navbar.tsx
|   |   |-- Skills.tsx
|   |   |-- TechStack.tsx
|   |   |-- WhatIDo.tsx
|   |   |-- Work.tsx
|   |-- context/
|   |-- data/
|   |-- App.tsx
|   |-- main.tsx
|-- package.json
|-- vite.config.ts
```

## Deployment

Build with `npm run build` and deploy the generated `dist/` folder to Vercel, Netlify, Cloudflare Pages, or another static hosting provider.
