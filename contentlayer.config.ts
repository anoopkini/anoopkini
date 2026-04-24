// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

const DEFAULT_CATEGORY = 'Uncategorized'
const DEFAULT_CATEGORY_SLUG = 'uncategorized'

function getPostPath(post) {
  return post._raw.flattenedPath.replace(/^posts\//, '')
}

function getPostCategorySlug(post) {
  const segments = getPostPath(post).split('/')
  return segments.length > 1 ? segments[0] : DEFAULT_CATEGORY_SLUG
}

function getCategoryLabelFromSlug(slug) {
  if (slug === DEFAULT_CATEGORY_SLUG) return DEFAULT_CATEGORY

  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    created: { type: 'date', required: true },
    author: { type: 'string', required: false },
    updated: { type: 'date', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => getPostPath(post),
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${getPostPath(post)}`,
    },
    category: {
      type: 'string',
      resolve: (post) => getCategoryLabelFromSlug(getPostCategorySlug(post)),
    },
    categorySlug: {
      type: 'string',
      resolve: (post) => getPostCategorySlug(post),
    },
  },
}))

export const CareerEntry = defineDocumentType(() => ({
  name: 'CareerEntry',
  filePathPattern: `career/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    start: { type: 'date', required: true },
    end: { type: 'date', required: false },
    type: { type: 'enum', options: ['education', 'job', 'business', 'life', 'milestone'], required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (entry) => entry._raw.flattenedPath.replace(/^career\//, ''),
    },
    url: {
      type: 'string',
      resolve: () => '/career',
    },
  },
}))

export default makeSource({
  contentDirPath: '.',
  contentDirInclude: ['posts', 'career'],
  fieldOptions: {
    typeFieldName: '_contentType',
  },
  documentTypes: [Post, CareerEntry],
})
