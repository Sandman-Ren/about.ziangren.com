/**
 * Blog List Page
 *
 * Server component that statically generates the blog list page.
 * The blog registry is imported synchronously, so no async/await needed.
 */

import { getAllBlogPosts } from '@/lib/blog/registry'
import BlogList from '@/components/blog/blog-list'

export default function BlogPage() {
  // Get all published posts, sorted by date
  const posts = getAllBlogPosts()

  return <BlogList posts={posts} />
}
