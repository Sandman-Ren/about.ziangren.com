import { getBlogPost, getAllBlogPosts } from '@/lib/blog/registry'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostPage from '@/components/blog/blog-post-page'
import { getBlogContent } from '@/content/blog'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

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

  // Get the MDX content component for this post
  const Content = getBlogContent(slug)

  if (!Content) {
    // Post exists in registry but no content file - show metadata only
    return <BlogPostPage post={post} />
  }

  return (
    <BlogPostPage post={post}>
      <Content />
    </BlogPostPage>
  )
}
