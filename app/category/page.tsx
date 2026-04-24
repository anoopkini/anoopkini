import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { getCategories } from 'utils/categories'

export const metadata = {
  title: 'Categories',
}

export default function CategoryIndexPage() {
  const categories = getCategories(allPosts)

  return (
    <section className="py-8 mt-24">
      <div className="mx-auto max-w-xl py-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <ul className="not-prose mt-8 space-y-3">
          {categories.map((category) => (
            <li key={category.slug} className="flex items-center justify-between border-b border-base-300 pb-3">
              <Link href={category.href} className="link link-hover text-lg font-semibold">
                {category.label}
              </Link>
              <span className="text-sm text-gray-600">
                {category.count} {category.count === 1 ? 'post' : 'posts'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
