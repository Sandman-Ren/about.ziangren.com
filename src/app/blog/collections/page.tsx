import { Metadata } from 'next'
import { getAllCollections, getCollectionPosts } from '@/lib/blog/collections'
import CollectionsList from '@/components/blog/collections-list'

export const metadata: Metadata = {
  title: 'Collections - Ziang Ren',
  description: 'Curated series of related blog posts on the same topic.',
  openGraph: {
    title: 'Collections',
    description: 'Curated series of related blog posts on the same topic.',
    url: 'https://about.ziangren.com/blog/collections',
  },
}

export default function CollectionsPage() {
  const collections = getAllCollections().map(collection => ({
    ...collection,
    postCount: getCollectionPosts(collection.slug).length,
  }))

  return <CollectionsList collections={collections} />
}
