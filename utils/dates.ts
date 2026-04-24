import { format, parse } from 'date-fns'

export function parsePostDate(date: string) {
  const calendarDate = date.slice(0, 10)
  return parse(calendarDate, 'yyyy-MM-dd', new Date())
}

export function formatPostDate(date: string) {
  return format(parsePostDate(date), 'LLLL d, yyyy')
}

export function formatPostMonth(date: string) {
  return format(parsePostDate(date), 'LLLL')
}

export function formatPostYear(date: string) {
  return format(parsePostDate(date), 'yyyy')
}
