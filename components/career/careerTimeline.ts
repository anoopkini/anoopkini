import { CareerEntry } from 'contentlayer/generated'
import { compareAsc, compareDesc, format } from 'date-fns'

const TIMELINE_TOP_PERCENT = 12
const TIMELINE_BOTTOM_PERCENT = 88

export type CareerEntryKind = 'education' | 'job' | 'business' | 'life' | 'milestone'
export type CareerTimelineSide = 'left' | 'right'

export type CareerTimelineEntry = {
  entry: CareerEntry
  kind: CareerEntryKind
  startDate: Date
  effectiveEndDate: Date
  isCurrent: boolean
  topPercent: number
  side: CareerTimelineSide
  startLabel: string
}

export type CareerTimelineModel = {
  entries: CareerTimelineEntry[]
  earliestStart: Date
  latestStart: Date
}

type NormalizedCareerEntry = {
  entry: CareerEntry
  kind: CareerEntryKind
  startDate: Date
  effectiveEndDate: Date
  isCurrent: boolean
}

function toTimestamp(date: Date) {
  return date.getTime()
}

function clampPercent(value: number) {
  return Math.max(TIMELINE_TOP_PERCENT, Math.min(TIMELINE_BOTTOM_PERCENT, value))
}

function normalizeEntries(entries: CareerEntry[], now: Date) {
  return entries
    .map((entry) => ({
      entry,
      kind: entry.type as CareerEntryKind,
      startDate: new Date(entry.start),
      effectiveEndDate: entry.end ? new Date(entry.end) : now,
      isCurrent: !entry.end,
    }))
    .sort((a, b) => compareDesc(a.startDate, b.startDate))
}

function getTopPercent(startDate: Date, latestStart: Date, earliestStart: Date) {
  const range = Math.max(toTimestamp(latestStart) - toTimestamp(earliestStart), 1)
  const distanceFromLatest = toTimestamp(latestStart) - toTimestamp(startDate)
  const rawPercent =
    TIMELINE_TOP_PERCENT + (distanceFromLatest / range) * (TIMELINE_BOTTOM_PERCENT - TIMELINE_TOP_PERCENT)

  return clampPercent(rawPercent)
}

export function buildCareerTimeline(entries: CareerEntry[], now = new Date()): CareerTimelineModel {
  const normalizedEntries = normalizeEntries(entries, now)

  if (normalizedEntries.length === 0) {
    const fallbackDate = now
    return {
      entries: [],
      earliestStart: fallbackDate,
      latestStart: fallbackDate,
    }
  }

  const startsAscending = [...normalizedEntries].sort((a, b) => compareAsc(a.startDate, b.startDate))
  const earliestStart = startsAscending[0].startDate
  const latestStart = startsAscending[startsAscending.length - 1].startDate

  const resolvedEntries = normalizedEntries.map((item, index) => {
    const topPercent = getTopPercent(item.startDate, latestStart, earliestStart)
    const side: CareerTimelineSide = index % 2 === 0 ? 'right' : 'left'

    return {
      entry: item.entry,
      kind: item.kind,
      startDate: item.startDate,
      effectiveEndDate: item.effectiveEndDate,
      isCurrent: item.isCurrent,
      topPercent,
      side,
      startLabel: format(item.startDate, 'MMM yyyy'),
    }
  })

  return {
    entries: resolvedEntries,
    earliestStart,
    latestStart,
  }
}
