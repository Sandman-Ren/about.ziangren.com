---
title: Building Modern React Applications with TypeScript
summary: A comprehensive guide to building scalable React applications using TypeScript, covering best practices, patterns, and advanced techniques.
date: 2025-08-10
tags:
  - react
  - typescript
  - frontend
  - best-practices
keywords:
  - React
  - TypeScript
  - components
  - hooks
  - patterns
  - scalability
published: true
featured: false
aiAssisted: true
author: Ziang Ren
---

# Building Modern React Applications with TypeScript

A comprehensive guide to building scalable React applications using TypeScript, covering best practices, patterns, and advanced techniques.

## Introduction

TypeScript has become an essential tool for building robust React applications. In this guide, we'll explore how to leverage TypeScript's type system to write safer, more maintainable code.

## Getting Started

### Setting Up Your Project

```bash
npx create-next-app@latest my-app --typescript
```

### Configuring TypeScript

Your `tsconfig.json` should include strict mode for the best type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

## Component Patterns

### Typing Props

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, size = 'md', children, onClick }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Using Generics

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## Hooks with TypeScript

### Custom Hooks

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}
```

## Best Practices

1. **Prefer interfaces over types** for object shapes
2. **Use discriminated unions** for complex state
3. **Avoid `any`** - use `unknown` when type is truly unknown
4. **Leverage inference** - don't over-annotate

## Conclusion

TypeScript and React together create a powerful combination for building maintainable applications. Start with strict mode enabled and gradually adopt more advanced patterns as your team becomes comfortable.

---

*This post is part of a series on modern web development practices.*
