import { useMemo, useState } from 'react'
import { isToday, isYesterday, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { HistoryFilterBar, type HistoryFilter } from './components/HistoryFilterBar/HistoryFilterBar'
import { HistoryListItem } from './components/HistoryListItem/HistoryListItem'
import { mockHistoryEntries } from './history.mock'
import type { ReminderHistoryEntry } from '@renderer/types'

function groupLabel(sentAt: string): string {
  const date = new Date(sentAt)
  if (isToday(date)) return 'BUGÜN'
  if (isYesterday(date)) return 'DÜN'
  return format(date, 'd MMMM', { locale: tr }).toUpperCase()
}

/**
 * GEÇMİŞ EKRANI (/history). Mock veri (history.mock.ts) — backend'e
 * bağlı değil. Çalışan: filtre pilleri + arama (client-side).
 * Aksiyonsuz: satıra tıklama, "Daha Eski Geçmişi Yükle".
 * Detaylar için proje kökündeki README.md.
 */
export default function Page(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEntries = useMemo(() => {
    return mockHistoryEntries
      .filter((entry) => activeFilter === 'all' || entry.historyType === activeFilter)
      .filter((entry) => entry.reminderTitle.toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }, [activeFilter, searchTerm])

  const groups = useMemo(() => {
    const map = new Map<string, ReminderHistoryEntry[]>()
    for (const entry of filteredEntries) {
      const label = groupLabel(entry.sentAt)
      const existing = map.get(label) ?? []
      existing.push(entry)
      map.set(label, existing)
    }
    return Array.from(map.entries())
  }, [filteredEntries])

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary">Bildirim ve Arama Geçmişi</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Asistanınızın etkileşimlerinin kronolojik kaydı. Kayıtlar 90 güne kadar güvenle saklanır.
        </p>
      </section>

      <HistoryFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-card">
        {groups.length === 0 && (
          <p className="p-lg text-center font-body-md text-body-md text-on-surface-variant">
            Aramanızla eşleşen bir kayıt bulunamadı.
          </p>
        )}

        {groups.map(([label, entries]) => (
          <div key={label}>
            <div className="border-b border-y border-surface-variant bg-surface-subtle px-md py-sm">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant">{label}</h3>
            </div>
            <div className="divide-y divide-surface-variant">
              {entries.map((entry) => (
                <HistoryListItem key={entry.historyId} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TODO: sayfalama (pagination) */}
      <div className="mb-xl mt-md flex justify-center">
        <button
          type="button"
          data-action="load-more-history"
          className="rounded-lg border border-outline-variant bg-surface-container px-lg py-2 font-headline-sm text-headline-sm text-primary transition-colors hover:bg-surface-container-high"
        >
          Daha Eski Geçmişi Yükle
        </button>
      </div>
    </div>
  )
}
