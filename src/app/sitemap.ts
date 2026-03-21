import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog/registry'
import { getAllCollections } from '@/lib/blog/collections'

export const dynamic = 'force-static'

const SITE_URL = 'https://about.ziangren.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified || post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const collections = getAllCollections()
  const collectionEntries: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${SITE_URL}/blog/collections/${collection.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/fun`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog/collections`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...blogEntries,
    ...collectionEntries,
  ]
}
