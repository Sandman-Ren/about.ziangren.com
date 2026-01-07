import type { MDXComponents } from 'mdx/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Heading components with refined typography and anchor support
    h1: ({ children, id, ...props }: ComponentPropsWithoutRef<'h1'>) => (
      <h1 
        id={id}
        className="scroll-m-24 text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-8 mb-4 first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }: ComponentPropsWithoutRef<'h2'>) => (
      <h2 
        id={id}
        className="scroll-m-24 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground border-b border-border pb-2 mt-12 mb-4 first:mt-0"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }: ComponentPropsWithoutRef<'h3'>) => (
      <h3 
        id={id}
        className="scroll-m-24 text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }: ComponentPropsWithoutRef<'h4'>) => (
      <h4 
        id={id}
        className="scroll-m-24 text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-6 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    
    // Paragraph with comfortable reading line height
    p: ({ children }) => (
      <p className="text-base leading-relaxed text-foreground/90 [&:not(:first-child)]:mt-5">
        {children}
      </p>
    ),
    
    // List components with better spacing
    ul: ({ children }) => (
      <ul className="my-5 ml-6 list-disc text-foreground/90 [&>li]:mt-2 [&>li]:leading-relaxed marker:text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal text-foreground/90 [&>li]:mt-2 [&>li]:leading-relaxed marker:text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1">
        {children}
      </li>
    ),
    
    // Inline code with subtle styling
    code: ({ children }) => (
      <code className="relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-foreground before:content-none after:content-none">
        {children}
      </code>
    ),
    // Code block with enhanced styling
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 my-6 text-sm leading-relaxed">
        {children}
      </pre>
    ),
    
    // Link with animated underline
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
      const isExternal = href?.startsWith('http') || href?.startsWith('//')
      if (isExternal) {
        return (
          <a 
            href={href}
            className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        )
      }
      return (
        <Link 
          href={href || '#'} 
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          {...props}
        >
          {children}
        </Link>
      )
    },
    
    // Blockquote with accent border and background
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary/50 bg-muted/30 py-3 pl-6 pr-4 italic text-foreground/80 rounded-r-lg [&>p]:mt-0">
        {children}
      </blockquote>
    ),
    
    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    
    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),
    
    // Table components with refined styling
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="transition-colors hover:bg-muted/30">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="h-11 px-4 text-left align-middle font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-middle text-foreground/90">
        {children}
      </td>
    ),
    
    // Image with rounded corners (note: MDX wraps images in <p>, so we can't use <figure>)
    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
      <span className="block my-8">
        <img 
          src={src} 
          alt={alt} 
          className="rounded-lg border border-border w-full"
          {...props}
        />
        {alt && (
          <span className="block mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </span>
        )}
      </span>
    ),
    
    // Custom components
    Badge,
    Button,
    Separator,
    
    ...components,
  }
}