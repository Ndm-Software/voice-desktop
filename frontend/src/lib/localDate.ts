/** new Date().toISOString() KULLANMA — UTC verir, TR saatinde (00:00–
 *  03:00 arası) bir gün kaydırır. Yerel tarih için bu yardımcıyı kullan. */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getTodayLocalDateString(): string {
  return toLocalDateString(new Date())
}

export function getOffsetLocalDateString(daysOffset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return toLocalDateString(date)
}
