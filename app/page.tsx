import React from "react";
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import PostCardTimeline from "components/blog/PostCardTimeline";

export default function HomePage() {
  return (
    <>
      {/* <Hero /> */}
      <section className="hero hero-content min-h-screen flex flex-col">
        <h1 className="pt-24">Hi, there! </h1>
        <div>
          <p className="inline">I am <span className="bg-amber-200 p-1">Anoop Kini</span>, Software Developer @ <a target="_blank" href="https://www.ericsson.com/en">Ericsson.</a></p>
          <br />
          {/* <p><a href="mailto:anoopk.kini@gmail.com" data-before=' 📩' className="hover:underline after:content-[attr(data-before)] mt-2 " >Drop me a note</a></p> */}
          <p className="text-center underline">Connect with me&nbsp;
            <a href="https://www.linkedin.com/in/anoopkini/" target="_blank"><br /><svg className="h-10 w-10 text-center inline-block" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>linkedin</title> <path d="M0 8.219v15.563c0 1.469 1.156 2.625 2.625 2.625h15.563c0.719 0 1.406-0.344 1.844-0.781 0.469-0.469 0.781-1.063 0.781-1.844v-15.563c0-1.469-1.156-2.625-2.625-2.625h-15.563c-0.781 0-1.375 0.313-1.844 0.781-0.438 0.438-0.781 1.125-0.781 1.844zM2.813 10.281c0-1 0.813-1.875 1.813-1.875 1.031 0 1.875 0.875 1.875 1.875 0 1.031-0.844 1.844-1.875 1.844-1 0-1.813-0.813-1.813-1.844zM7.844 23.125v-9.531c0-0.219 0.219-0.406 0.375-0.406h2.656c0.375 0 0.375 0.438 0.375 0.719 0.75-0.75 1.719-0.938 2.719-0.938 2.438 0 4 1.156 4 3.719v6.438c0 0.219-0.188 0.406-0.375 0.406h-2.75c-0.219 0-0.375-0.219-0.375-0.406v-5.813c0-0.969-0.281-1.5-1.375-1.5-1.375 0-1.719 0.906-1.719 2.125v5.188c0 0.219-0.219 0.406-0.438 0.406h-2.719c-0.156 0-0.375-0.219-0.375-0.406zM2.875 23.125v-9.531c0-0.219 0.219-0.406 0.375-0.406h2.719c0.25 0 0.406 0.156 0.406 0.406v9.531c0 0.219-0.188 0.406-0.406 0.406h-2.719c-0.188 0-0.375-0.219-0.375-0.406z"></path> </g></svg></a>
          </p>
        </div>
        <hr className="mb-2" />
        <p><Link href="#recent-projects" className="mx-2 link link-hover">Projects &darr;</Link>
          <Link href="#recent-posts" className="mx-2 link link-hover">Read recent posts &darr;</Link>
        </p>
      </section>
      <ProjectsHome />
      <BlogHome />
    </>
  );
}

function PostCard(post: Post) {
  return (
    <div className="card mb-8 shadow">
      <div className="card-body">
        <h3 className="card-title">
          <Link href={post.url}>
            {post.title}
          </Link>
        </h3>
        <time dateTime={post.created} className="mb-2 block text-xs text-gray-600">
          {format(parseISO(post.created), 'LLLL d, yyyy')}
        </time>
        {/* <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
      </div>
    </div>
  )
}

function BlogHome() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.created), new Date(b.created)))

  return (
    <section id="recent-posts" className="py-8">
      <h2>Recent Posts</h2>
      <ul className="timeline timeline-vertical not-prose timeline-compact ">
        {posts.map((post, idx) => (
          <PostCardTimeline key={idx} {...post} />
        ))}
      </ul>
      <nav className="my-5">
        <hr className="mb-2" />
        <Link href="/#recent-projects" className="link link-hover px-2">Projects &uarr;</Link>&nbsp;
        <Link href="/#top" className="link link-hover px-2">Top &uarr;</Link>&nbsp;
      </nav>
    </section>
  )
}

function Hero() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}

function ProjectsHome() {
  return (
    <>
      <section id="recent-projects" className="py-8">
        <h2>Recent Projects</h2>
        <div className="card card-compact bg-base-100 shadow">
          {/* <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title">
              <Link href="/projects/she-shines" className="link link-hover">She Shines</Link>
            </h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>
        <nav className="my-5">
          <hr className="mb-2" />
          <Link href="/#recent-posts" className="link link-hover px-2">Posts &darr;</Link>&nbsp;
          <Link href="/#top" className="link link-hover px-2">Top &uarr;</Link>&nbsp;
        </nav>
      </section>
    </>
  );
}