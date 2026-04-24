import { format } from 'date-fns'
import {
  HiAcademicCap,
  HiBriefcase,
  HiBuildingStorefront,
  HiHeart,
  HiTrophy,
} from 'react-icons/hi2'

import { CareerEntryKind, CareerTimelineEntry } from './careerTimeline'

type CareerTimelineCardProps = {
  item: CareerTimelineEntry
}

function getTypeLabel(kind: CareerEntryKind) {
  if (kind === 'education') return 'Education'
  if (kind === 'business') return 'Business'
  if (kind === 'life') return 'Life'
  if (kind === 'milestone') return 'Milestone'
  return 'Job'
}

function getTypeIcon(kind: CareerEntryKind) {
  if (kind === 'education') return HiAcademicCap
  if (kind === 'business') return HiBuildingStorefront
  if (kind === 'life') return HiHeart
  if (kind === 'milestone') return HiTrophy
  return HiBriefcase
}

function getTypeIconClassName(kind: CareerEntryKind) {
  return 'text-base-content/65 bg-base-200 border-base-300'
}

function renderTypeIcon(kind: CareerEntryKind) {
  const Icon = getTypeIcon(kind)
  return <Icon className="h-4 w-4" />
}

export default function CareerTimelineCard({ item }: CareerTimelineCardProps) {
  const desktopSideClass =
    item.side === 'left' ? 'md:right-[calc(50%+1.75rem)] md:text-right' : 'md:left-[calc(50%+1.75rem)]'
  const endLabel = item.entry.end ? format(item.effectiveEndDate, 'MMM yyyy') : null
  const dateLabel = endLabel ? `${item.startLabel} - ${endLabel}` : item.startLabel

  const connectorStyle =
    item.side === 'left'
      ? { right: '-1.75rem', width: '1.75rem' }
      : { left: '-1.75rem', width: '1.75rem' }

  const markerStyle = item.side === 'left' ? { right: '-2.9rem' } : { left: '-2.9rem' }

  return (
    <article
      className={`relative ml-8 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:absolute md:ml-0 md:top-[var(--timeline-top)] md:w-[calc(50%-2.75rem)] md:-translate-y-1/2 ${desktopSideClass}`}
      style={{ ['--timeline-top' as string]: `${item.topPercent}%` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 md:flex-col md:items-start">
        <div>
          <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-base-content/50">
            {dateLabel}
          </p>
          <h2 className="m-0 text-lg font-semibold sm:text-xl">{item.entry.title}</h2>
          <p className="mb-0 mt-3 text-sm leading-6 text-base-content/80">{item.entry.summary}</p>
        </div>
      </div>

      <div className="absolute left-[-1.25rem] top-1/2 h-px w-5 -translate-y-1/2 bg-base-300 md:hidden" />
      <span
        className={`absolute left-[-2.15rem] top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:hidden ${getTypeIconClassName(item.kind)}`}
        aria-label={getTypeLabel(item.kind)}
        title={getTypeLabel(item.kind)}
      >
        {renderTypeIcon(item.kind)}
      </span>

      <div
        className="absolute top-1/2 hidden h-px -translate-y-1/2 bg-base-300 md:block"
        style={connectorStyle}
      />
      <span
        className={`absolute top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:inline-flex ${getTypeIconClassName(item.kind)}`}
        aria-label={getTypeLabel(item.kind)}
        title={getTypeLabel(item.kind)}
        style={markerStyle}
      >
        {renderTypeIcon(item.kind)}
      </span>
    </article>
  )
}
