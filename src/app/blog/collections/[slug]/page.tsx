import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCollection, getCollectionPosts } from '@/lib/blog/collections'
import { collectionSlugs } from '@/content/blog/collection-slugs'
import CollectionPage from '@/components/blog/collection-page'

interface CollectionPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: `${collection.title} - Ziang Ren`,
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      url: `https://about.ziangren.com/blog/collections/${slug}`,
    },
  }
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) {
    notFound()
  }

  const posts = getCollectionPosts(slug)

  return <CollectionPage collection={collection} posts={posts} />
}
