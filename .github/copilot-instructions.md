# Copilot Instructions for Ziang Ren's Personal Site

These are coding conventions and preferences to follow in this project, powered by Next.js, React, TypeScript, and Tailwind CSS.

---

## 🔷 General Conventions

- Always use **TypeScript**. Avoid `any` unless absolutely necessary.
- Prefer **function components**.
- Keep files and functions **small and modular**.
- Avoid `console.log` in production code.
- Use **async/await** over `.then()` chaining.
- Apply **Prettier and ESLint rules** by default.

---

## 🧠 Code Style Guidelines

- Use `camelCase` for variables and functions, and `PascalCase` for components and types.
- Add **explicit return types** for exported functions and components.
- Inline comments should be minimal and meaningful. Use **JSDoc**-style comments for exported entities.
- No magic strings or numbers — use constants or enums where appropriate.
- Use `const` by default, `let` only when necessary.
- Documentation: add JSDoc comments for all functions and components

---

## 🎨 Tailwind CSS Guidelines

- Use **Tailwind CSS utility classes exclusively** for styling — avoid writing raw CSS unless absolutely necessary.
- Group utility classes by layout → spacing → typography → colors → effects:
  ```tsx
  <div className="flex flex-col gap-4 text-center text-sm text-gray-600 shadow-md" />

---

## Book Keeping

- You must maintain a `context.md` at the root of the project. At appropriate times, you should update the `context.md` file to reflect the current state of the project.
- Use the `context.md` file to document important decisions, architectural changes, and any other relevant information that helps maintain the project.