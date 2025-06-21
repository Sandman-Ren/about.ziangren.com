# Context for Ziang Ren's Personal Website

## Overview
This project is a personal website built using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. It is inspired by the `nim` template, which is a minimal and animated personal website template designed for developers, designers, and founders.

## Key Features of the Template
- **Minimal Design**: Clean and responsive layout with a focus on typography and animations.
- **Blog Support**: Uses MDX for writing blog posts with React components.
- **Animations**: Powered by Motion-Primitives for smooth and delightful interactions.
- **Dark Mode**: Fully supports light and dark themes using `ThemeProvider`.

## Layout Design
- **Root Layout**:
  - The layout is structured with a centered content area (`max-w-screen-sm`) and responsive design (`min-h-screen`).
  - Includes a `Header` and `Footer` for consistent navigation and branding.
  - Uses `ThemeProvider` to manage light/dark themes.
- **Global Styling**:
  - Tailwind CSS is used exclusively for styling.
  - Typography plugin (`@tailwindcss/typography`) enhances text readability.
  - Custom CSS variables are defined for consistent theming.
- **Animated Components**:
  - `AnimatedBackground`: Interactive background animations triggered by hover or click.
  - `TextEffect`: Animates text with effects like blur, fade, scale, and slide.

## Typography Design
- **Fonts**:
  - Uses `Geist` and `Geist Mono` from Google Fonts for a modern aesthetic.
  - Applied globally using CSS variables.
- **Text Animation**:
  - `TextEffect` component provides animated typography for headings and key text elements.
  - Supports per-character, per-word, or per-line animations.

## Technologies Used
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: Library for building user interfaces.
- **TypeScript**: Ensures type safety and better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Motion-Primitives**: Library for animations and transitions.
- **React Icons**: Used for adding icons to the website.

## Current State
The project has been set up with the following features:

- **MDX Support**: Configured using `@next/mdx` to enable writing blog posts and pages in MDX format. The `next.config.ts` file has been updated to include MDX support with custom extensions and plugins.
- **Syntax Highlighting**: Integrated `rehype-highlight` for syntax highlighting in MDX files.
- **Dependencies Installed**: All necessary dependencies and devDependencies for Next.js, TypeScript, Tailwind CSS, and MDX have been installed.
- **ESLint Configuration**: ESLint has been configured to enforce semicolon usage, integrate Prettier, and support MDX files.
- **Tailwind CSS**: Fully integrated for utility-first styling, including the typography plugin for enhanced text readability.
- **React Icons**: Replaced `lucide-react` with `react-icons` for a broader selection of icons.
- **Project Structure**: The project is structured to support modular and scalable development, with a focus on clean and maintainable code.

### Website Structure
- **Header**: Displays the name, title, and tagline.
- **Work Experience Section**: Dynamically renders work experience from a structured data array.
- **About Section**: Placeholder for a brief introduction or bio.
- **Projects Section**: Placeholder for showcasing projects.
- **Contact Section**: Displays GitHub, LinkedIn, and email links horizontally with icons from `react-icons`.
- **Footer**: Includes copyright information.

### Recent Changes

#### Global Styles

- Updated `globals.css` to include a refined color palette and typography settings.

- Added custom CSS variables for primary, secondary, accent colors, and border styles.

- Ensured compatibility with both light and dark themes.

#### Layout and Styling

- Refined the layout and styling of `page.tsx` to align with the `nim` template, incorporating a modular and declarative style with clear sectioning.

- Applied Tailwind CSS utility classes for consistent spacing, typography, and alignment, adhering to a minimalist and professional aesthetic.

- Added hover and focus effects to links, buttons, and cards for better interactivity, ensuring a polished user experience.

- Ensured consistent section spacing and alignment across all sections.

#### Components

- Header: Displays the name, title, and a brief description.

- Work Experience: Lists professional experiences with titles, companies, and summaries.

- Contact: Includes links to GitHub, LinkedIn, and email with icons.

- Footer: Displays copyright information.

### Pending Tasks

- Resolve linting issues related to Tailwind CSS class ordering.

- Test the website on different devices and browsers to ensure responsiveness.

- Explore additional features inspired by the `nim` template, such as animated components or blog support.

### Notes

- The project adheres to the coding conventions specified in the `global.instructions.md` file.

- Future updates should continue to prioritize minimalism and professional design.