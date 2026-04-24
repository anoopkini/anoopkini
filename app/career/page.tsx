import { allCareerEntries } from 'contentlayer/generated'
import { format } from 'date-fns'
import CareerTimelineCard from 'components/career/CareerTimelineCard'
import { buildCareerTimeline } from 'components/career/careerTimeline'

export const metadata = {
  title: 'Career',
}

export default function CareerPage() {
  const timeline = buildCareerTimeline(allCareerEntries)

  return (
    <div className="py-8 mt-24">
      <section className="not-prose">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-base-content/60">Career</p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">Work and education timeline</h1>
          {/* <p className="m-0 text-base leading-7 text-base-content/75">
            A single central timeline maps work and education by start date, with cards alternating from side to
            side for a clean, readable rhythm.
          </p> */}
        </div>

        {/* <div className="rounded-[2rem] border border-base-300 bg-base-100/95 p-5 shadow-sm sm:p-6"> */}
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-base-300/80 pb-5 text-sm text-base-content/65">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-base-content/45">Timeline span</p>
              <p className="m-0 text-base font-medium text-base-content">
              {format(timeline.earliestStart, 'MMM yyyy')} to {format(timeline.latestStart, 'MMM yyyy')}
              </p>
            </div>
            {/* <p className="m-0 max-w-md text-sm">
              Start dates drive placement on the rail. Missing end dates are still treated as ongoing through the
              present, even though end dates are not yet visualized.
            </p> */}
          </div>

          <div className="relative space-y-4 pt-10 md:min-h-[880px] md:space-y-0 md:pt-0">
            <div className="absolute bottom-[12%] left-3 top-[12%] w-px bg-base-300 md:left-1/2 md:-translate-x-1/2" />

            {/* <div className="absolute left-0 top-0 z-10 rounded bg-base-100/90 px-2 text-xs font-medium uppercase tracking-[0.2em] text-base-content/45 md:left-1/2 md:-translate-x-1/2">
              {format(timeline.latestStart, 'MMM yyyy')}
            </div>
            <div className="absolute bottom-0 left-0 z-10 rounded bg-base-100/90 px-2 text-xs font-medium uppercase tracking-[0.2em] text-base-content/45 md:left-1/2 md:-translate-x-1/2">
              {format(timeline.earliestStart, 'MMM yyyy')}
            </div> */}

            {timeline.entries.map((item) => (
              <CareerTimelineCard key={item.entry.slug} item={item} />
            ))}
          </div>
        {/* </div> */}
      </section>

    </div>
  )
}
