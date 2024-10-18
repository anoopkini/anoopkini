// app/posts/[slug]/page.tsx
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

function GoBack(){
  return (
    <nav className="my-2"><Link href="/#recent-posts">&larr; Go back</Link></nav>
  );
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <>
    <GoBack />
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8">
        <div className="mb-1 text-xs text-gray-600">
          <span>{post.author}</span>&nbsp;&bull;&nbsp;
          <time dateTime={post.created} >
            {format(parseISO(post.created), 'LLLL d, yyyy')}
          </time>
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
    <GoBack />
    </>
  )
}

export default PostLayout