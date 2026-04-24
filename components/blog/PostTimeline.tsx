import { Post } from 'contentlayer/generated'
import { compareDesc, isBefore, subMonths } from 'date-fns'
import Link from 'next/link'
import { getCategoryHref, getPostCategory } from 'utils/categories'
import { formatPostMonth, formatPostYear, parsePostDate } from 'utils/dates'
import PostCardTimeline from './PostCardTimeline'

type MonthGroup = {
  month: string
  posts: Post[]
}

type YearGroup = {
  year: string
  months: MonthGroup[]
}

function groupOlderPosts(posts: Post[]) {
  const groups = new Map<string, Map<string, Post[]>>()

  posts.forEach((post) => {
    const year = formatPostYear(post.created)
    const month = formatPostMonth(post.created)
    const months = groups.get(year) ?? new Map<string, Post[]>()
    const monthPosts = months.get(month) ?? []

    monthPosts.push(post)
    months.set(month, monthPosts)
    groups.set(year, months)
  })

  return Array.from(groups.entries()).map<YearGroup>(([year, months]) => ({
    year,
    months: Array.from(months.entries()).map(([month, monthPosts]) => ({
      month,
      posts: monthPosts,
    })),
  }))
}

function PostMonthTimelineGroup({ month, posts }: MonthGroup) {
  return (
    <li>
      <hr />
      <div className="timeline-start">
        <span className="text-xs text-gray-600">{month}</span>
      </div>
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd" />
        </svg>
      </div>
      <div className="timeline-end timeline-box">
        <ul className="m-0 list-none p-0">
          {posts.map((post) => (
            <li key={post.slug} className="mb-3 rounded px-2 py-2 -mx-2 border-b border-base-300 transition-colors hover:bg-base-200/60 last:mb-0 last:border-b-0">
              <Link className="hover:underline" href={post.url}>{post.title}</Link>
              <div className="mt-1 text-xs text-gray-600">
                <Link className="link link-hover" href={getCategoryHref(post)}>
                  {getPostCategory(post)}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </li>
  )
}

export default function PostTimeline({ posts }: { posts: Post[] }) {
  const cutoff = subMonths(new Date(), 6)
  const sortedPosts = [...posts].sort((a, b) => compareDesc(parsePostDate(a.created), parsePostDate(b.created)))
  const recentPosts = sortedPosts.filter((post) => !isBefore(parsePostDate(post.created), cutoff))
  const olderPosts = sortedPosts.filter((post) => isBefore(parsePostDate(post.created), cutoff))
  const olderPostGroups = groupOlderPosts(olderPosts)

  return (
    <>
      {recentPosts.length > 0 ? (
        <ul className="timeline timeline-vertical not-prose timeline-compact">
          {recentPosts.map((post) => (
            <PostCardTimeline key={post.slug} {...post} />
          ))}
        </ul>
      ) : null}

      {olderPostGroups.map((group) => (
        <section key={group.year} className="not-prose mt-8">
          <h3 className="mb-3 text-lg font-semibold">{group.year}</h3>
          <ul className="timeline timeline-vertical timeline-compact">
            {group.months.map((monthGroup) => (
              <PostMonthTimelineGroup key={`${group.year}-${monthGroup.month}`} {...monthGroup} />
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
