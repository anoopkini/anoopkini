import PostTimeline from 'components/blog/PostTimeline'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategories, getPostsByCategorySlug } from 'utils/categories'

type PageProps = {
  params: Promise<{ category: string }>
}

export const generateStaticParams = async () => (
  getCategories(allPosts).map((category) => ({ category: category.slug }))
)

export const generateMetadata = async ({ params }: PageProps) => {
  const { category: categorySlug } = await params
  const category = getCategories(allPosts).find((category) => category.slug === categorySlug)

  return {
    title: category ? `${category.label} Posts` : 'Category',
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const category = getCategories(allPosts).find((category) => category.slug === categorySlug)
  const posts = getPostsByCategorySlug(allPosts, categorySlug)

  if (!category || posts.length === 0) notFound()

  return (
    <section className="py-8 mt-24">
      <div className="mx-auto max-w-xl py-8">
        <nav className="not-prose mb-8">
          <Link href="/category" className="link link-hover">&larr; Categories</Link>
        </nav>
        <h1 className="text-3xl font-bold">{category?.label ?? 'Category'}</h1>
        <div className="mt-8">
          <PostTimeline posts={posts} />
        </div>
      </div>
    </section>
  )
}
