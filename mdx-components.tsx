import type { MDXComponents } from 'mdx/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Heading components with proper styling
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2">
        {children}
      </h4>
    ),
    
    // Paragraph and text components
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    
    // List components
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
    
    // Code components
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 my-6">
        {children}
      </pre>
    ),
    
    // Link component
    a: ({ href, children }) => (
      <Link 
        href={href || '#'} 
        className="font-medium text-primary underline underline-offset-4 hover:no-underline"
      >
        {children}
      </Link>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    
    // Table components
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead>
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="[&_tr:last-child]:border-0">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b transition-colors hover:bg-muted/50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {children}
      </td>
    ),
    
    // Custom components
    Badge,
    Button,
    Separator,
    
    ...components,
  }
}