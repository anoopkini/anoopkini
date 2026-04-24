// app/posts/[...slug]/page.tsx
import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { getCategoryHref, getPostCategory } from 'utils/categories'
import { formatPostDate } from 'utils/dates'

const DEFAULT_AUTHOR = 'Anoop Kini'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug.split('/') }))

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug: slugSegments } = await params
  const slug = slugSegments.join('/')
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title }
}

function GoBack(){
  return (
    <nav className="my-5"><Link href="/#recent-posts">&larr; Recent Posts</Link></nav>
  );
}

function PostNavigation({ previousPost, nextPost }: {
  previousPost?: typeof allPosts[number]
  nextPost?: typeof allPosts[number]
}) {
  return (
    <nav className="not-prose my-10 grid gap-4 border-t border-base-300 pt-6 sm:grid-cols-2">
      <div>
        {previousPost ? (
          <Link href={previousPost.url} className="group block">
            <span className="block text-xs uppercase text-gray-600">Previous post</span>
            <span className="link link-hover group-hover:underline">&larr; {previousPost.title}</span>
          </Link>
        ) : (
          <span className="block text-sm text-gray-500">No previous post</span>
        )}
      </div>
      <div className="sm:text-right">
        {nextPost ? (
          <Link href={nextPost.url} className="group block">
            <span className="block text-xs uppercase text-gray-600">Next post</span>
            <span className="link link-hover group-hover:underline">{nextPost.title} &rarr;</span>
          </Link>
        ) : (
          <span className="block text-sm text-gray-500">No next post</span>
        )}
      </div>
    </nav>
  )
}

const PostLayout = async ({ params }: PageProps) => {
  const { slug: slugSegments } = await params
  const slug = slugSegments.join('/')
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  const posts = [...allPosts].sort((a, b) => compareDesc(new Date(a.created), new Date(b.created)))
  const currentPostIndex = posts.findIndex((post) => post.slug === slug)
  const nextPost = posts[currentPostIndex - 1]
  const previousPost = posts[currentPostIndex + 1]

  return (
    <>
<div className="py-8 mt-24">
    <GoBack />
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8">
        <div className="mb-1 text-xs text-gray-600">
          <span>{post.author ?? DEFAULT_AUTHOR}</span>&nbsp;&bull;&nbsp;
          <time dateTime={post.created} >
            {formatPostDate(post.created)}
          </time>&nbsp;&bull;&nbsp;
          <Link href={getCategoryHref(post)} className="link link-hover">
            {getPostCategory(post)}
          </Link>
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
      <PostNavigation previousPost={previousPost} nextPost={nextPost} />
    </article>
    <GoBack />
</div>
    </>
  )
}

export default PostLayout
