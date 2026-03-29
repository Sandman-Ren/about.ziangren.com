'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const mermaidTheme = resolvedTheme === 'dark' ? 'dark' : 'default'

    mermaid.initialize({
      startOnLoad: false,
      theme: mermaidTheme,
      fontFamily: 'inherit',
    })

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
    mermaid.render(id, chart).then(({ svg }) => {
      setSvg(svg)
    }).catch(() => {
      if (ref.current) {
        ref.current.textContent = chart
      }
    })
  }, [chart, resolvedTheme])

  if (svg) {
    return (
      <div
        className="my-6 flex justify-center [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    )
  }

  return <div ref={ref} className="my-6" />
}
