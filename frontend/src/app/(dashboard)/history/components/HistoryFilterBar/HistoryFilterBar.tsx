import { Search } from 'lucide-react'

export type HistoryFilter = 'all' | 'call' | 'push'

const FILTER_OPTIONS: { value: HistoryFilter; label: string }[] = [
  { value: 'all', label: 'Tüm Geçmiş' },
  { value: 'call', label: 'Sadece Sesli Aramalar' },
  { value: 'push', label: 'Sadece Bildirimler' }
]

interface HistoryFilterBarProps {
  activeFilter: HistoryFilter
  onFilterChange: (filter: HistoryFilter) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

/** Filtre/arama gerçekten çalışıyor (mock veri, client-side). */
export function HistoryFilterBar({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange
}: HistoryFilterBarProps): JSX.Element {
  return (
    <div className="mb-md flex flex-col items-center justify-between gap-sm rounded-lg bg-surface-container-lowest p-sm shadow-card sm:flex-row">
      <div className="hide-scrollbar flex w-full gap-xs overflow-x-auto pb-2 sm:w-auto sm:pb-0">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onFilterChange(option.value)}
            className={[
              'whitespace-nowrap rounded-full px-md py-2 font-label-sm text-label-sm transition-colors',
              activeFilter === option.value
                ? 'bg-surface-accent text-primary-container'
                : 'bg-surface-subtle text-on-surface-variant hover:bg-surface-container-high'
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-sm top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Başlıklarda ara..."
          className="w-full rounded-t border-b border-outline-variant bg-surface-subtle py-2 pl-xl pr-sm font-body-md text-body-md text-on-surface outline-none transition-colors focus:border-primary"
        />
      </div>
    </div>
  )
}
