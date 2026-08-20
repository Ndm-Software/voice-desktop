import type { QuietHoursDay } from '@renderer/types'

interface DayRowProps {
  day: QuietHoursDay
  onToggle: () => void
  onTimeChange: (field: 'startTime' | 'endTime', value: string) => void
}

/** Tek bir gün satırı: aç/kapa anahtarı + başlangıç/bitiş saati. Kapalı
 *  günlerde saat kutuları soluk ve devre dışı (web'in gerçek koduyla aynı). */
export function DayRow({ day, onToggle, onTimeChange }: DayRowProps): JSX.Element {
  return (
    <div
      className={[
        'flex items-center justify-between rounded-xl p-sm transition-all hover:bg-surface-subtle',
        !day.enabled && 'opacity-60'
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex w-1/3 items-center">
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${day.day} sessiz saatlerini ${day.enabled ? 'kapat' : 'aç'}`}
          className="relative mr-md inline-flex items-center"
        >
          <div
            className={[
              'h-6 w-11 rounded-full transition-colors duration-300',
              day.enabled ? 'bg-primary' : 'bg-surface-container-highest'
            ].join(' ')}
          />
          <div
            className={[
              'absolute left-[2px] top-[2px] h-5 w-5 rounded-full border border-outline-variant bg-white transition-transform duration-300',
              day.enabled ? 'translate-x-full' : 'translate-x-0'
            ].join(' ')}
          />
        </button>
        <span className={['font-headline-sm text-headline-sm', day.enabled ? 'text-on-surface' : 'text-on-surface-variant'].join(' ')}>
          {day.day}
        </span>
      </div>

      <div className={['flex flex-1 items-center justify-end gap-xs', !day.enabled && 'pointer-events-none'].filter(Boolean).join(' ')}>
        <input
          type="time"
          value={day.startTime}
          disabled={!day.enabled}
          onChange={(e) => onTimeChange('startTime', e.target.value)}
          className="w-28 rounded-lg border border-outline-variant bg-surface-subtle py-2 text-center font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <span className="font-body-md text-body-md text-on-surface-variant">-</span>
        <input
          type="time"
          value={day.endTime}
          disabled={!day.enabled}
          onChange={(e) => onTimeChange('endTime', e.target.value)}
          className="w-28 rounded-lg border border-outline-variant bg-surface-subtle py-2 text-center font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  )
}
