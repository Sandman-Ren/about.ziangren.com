---
title: "TypeScript Generics: A Practical Guide"
summary: "Generics are one of TypeScript's most powerful features. This guide covers the core patterns you'll use every day — from simple type parameters to conditional types."
date: 2025-11-20
tags:
  - typescript
  - web-development
  - frontend
keywords:
  - TypeScript generics
  - type parameters
  - generic functions
  - generic types
  - TypeScript
published: true
featured: false
aiAssisted: true
author: Ziang Ren
collection: modern-web-fundamentals
---

# TypeScript Generics: A Practical Guide

Generics let you write code that works with any type while still maintaining type safety. Instead of using `any` and losing type information, generics preserve the relationship between input and output types.

## The Problem Generics Solve

Without generics, you'd write specific versions of the same function:

```typescript
function getFirstString(arr: string[]): string | undefined {
  return arr[0]
}

function getFirstNumber(arr: number[]): number | undefined {
  return arr[0]
}
```

Or lose type safety with `any`:

```typescript
function getFirst(arr: any[]): any {
  return arr[0]  // Caller has no idea what type this is
}
```

Generics solve both problems:

```typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

const name = getFirst(['alice', 'bob'])  // type: string | undefined
const age = getFirst([25, 30])           // type: number | undefined
```

## Core Patterns

### Generic Functions

The most common use case. The type parameter `T` is inferred from the arguments:

```typescript
function identity<T>(value: T): T {
  return value
}

const result = identity(42)  // T is inferred as number
```

### Generic Interfaces

Define shapes that work with any type:

```typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

type UserResponse = ApiResponse<User>
type PostResponse = ApiResponse<Post[]>
```

### Generic Constraints

Use `extends` to limit what types are accepted:

```typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}

getLength('hello')    // OK — string has .length
getLength([1, 2, 3])  // OK — array has .length
getLength(42)          // Error — number has no .length
```

### Multiple Type Parameters

When you need to relate several types:

```typescript
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 }
}

const result = merge({ name: 'Alice' }, { age: 30 })
// type: { name: string } & { age: number }
```

## Real-World Examples

### Type-Safe Event Emitter

```typescript
interface EventMap {
  click: { x: number; y: number }
  submit: { formData: FormData }
  error: { message: string }
}

function on<K extends keyof EventMap>(
  event: K,
  handler: (payload: EventMap[K]) => void
): void {
  // ...
}

on('click', (payload) => {
  // payload is typed as { x: number; y: number }
  console.log(payload.x, payload.y)
})
```

### Generic React Component

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  )
}
```

### Utility Types (Built-in Generics)

TypeScript ships with powerful generic utility types:

```typescript
Partial<T>      // All properties optional
Required<T>     // All properties required
Pick<T, K>      // Subset of properties
Omit<T, K>      // Exclude properties
Record<K, V>    // Map keys to values
```

## Common Mistakes

1. **Unnecessary generics** — if you don't use `T` in a meaningful way, you don't need it
2. **Too many type parameters** — more than 2-3 becomes hard to follow
3. **Forgetting constraints** — without `extends`, you can't access any properties on `T`

## When to Use Generics

- **Collections**: arrays, maps, sets of any type
- **API responses**: wrapper types around different payloads
- **Higher-order functions**: functions that transform or wrap other functions
- **Components**: React components that render different data shapes

If you find yourself writing the same logic for different types, or reaching for `any`, that's a signal to use generics.
