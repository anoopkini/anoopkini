export const DEFAULT_CATEGORY = 'Uncategorized'

type CategorySource = {
  category?: string | null
  categorySlug?: string | null
}

export function getCategoryLabel(category?: string | null) {
  const label = category?.trim()
  return label || DEFAULT_CATEGORY
}

export function getPostCategory(post: CategorySource) {
  return getCategoryLabel(post.category)
}

export function getCategorySlug(category?: string | null) {
  const slug = getCategoryLabel(category)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'uncategorized'
}

export function getPostCategorySlug(post: CategorySource) {
  return post.categorySlug?.trim() || getCategorySlug(post.category)
}

export function getCategoryHref(category?: string | CategorySource | null) {
  if (typeof category === 'object' && category !== null) {
    return `/category/${getPostCategorySlug(category)}`
  }

  return `/category/${getCategorySlug(typeof category === 'string' ? category : null)}`
}

export function getCategories<TPost extends CategorySource>(posts: TPost[]) {
  const categories = new Map<string, { label: string; slug: string; href: string; count: number }>()

  posts.forEach((post) => {
    const label = getPostCategory(post)
    const slug = getPostCategorySlug(post)
    const category = categories.get(slug)

    if (category) {
      category.count += 1
      return
    }

    categories.set(slug, {
      label,
      slug,
      href: `/category/${slug}`,
      count: 1,
    })
  })

  return Array.from(categories.values()).sort((a, b) => a.label.localeCompare(b.label))
}

export function getPostsByCategorySlug<TPost extends CategorySource>(posts: TPost[], slug: string) {
  return posts.filter((post) => getPostCategorySlug(post) === slug)
}
