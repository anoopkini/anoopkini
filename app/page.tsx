import React from "react";
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'

export default function HomePage() {
    return (
        <>
            <section className="w-full h-screen flex flex-col justify-center">
                <h1>Hey, There! </h1>
                <div>
                    <p className="inline">I am Anoop Kini, Software Developer @ <a target="_blank" href="https://www.ericsson.com/en">Ericsson.</a></p>
                    <p><a href="mailto:anoopk.kini@gmail.com" data-before=' 📩' className="hover:underline after:content-[attr(data-before)] mt-2 " >Drop me a note</a></p>
                </div>
                {/* <p><Link href="#recent-posts">Read recent posts</Link></p> */}
            </section>
            <section>
                {/* <BlogHome /> */}
            </section>
        </>
    );
}

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h3 className="mb-1 text-xl">
        <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h3>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}

function BlogHome() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-xl py-8">
        <h2 id="recent-posts">Recent Posts</h2>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}