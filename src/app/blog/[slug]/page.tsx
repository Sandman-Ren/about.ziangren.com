import { getBlogPost } from '@/lib/blog/registry'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostPage from '@/components/blog/blog-post-page'
import { slugs } from '@/content/blog/slugs'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params from the auto-generated slugs list
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

// Return 404 for unknown slugs
export const dynamicParams = false

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Ziang Ren`,
    description: post.summary,
    keywords: post.keywords,
    authors: [{ name: post.author || 'Ziang Ren' }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author || 'Ziang Ren'],
      tags: post.tags,
      url: `https://about.ziangren.com/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Dynamic import - MDX file exists after import-notes runs
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <BlogPostPage post={post}>
      <Content />
    </BlogPostPage>
  )
}
