import Link from 'next/link'

export const metadata = {
  title: '404 - Page wandered off',
}

export default function NotFound() {
  return (
    <main className="hero min-h-[70vh]">
      <section className="hero-content max-w-2xl flex-col text-center">
        <h1 className="text-4xl font-bold sm:text-5xl mt-20">This page took a coffee break.</h1>
        <p className="max-w-xl text-base-content/70">
          We checked under the keyboard, behind the router, and inside the snack drawer.
          No luck. It probably joined a meeting with no agenda.
        </p>
        <Link href="/#recent-posts" className="btn btn-shadow">
          Read recent posts
        </Link>
      </section>
    </main>
  )
}
