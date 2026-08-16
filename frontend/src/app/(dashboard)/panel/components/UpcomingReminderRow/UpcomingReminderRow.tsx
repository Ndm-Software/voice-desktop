import { format, isToday, isTomorrow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Pencil, Trash2 } from 'lucide-react'
import type { Reminder } from '@renderer/types'

const BAR_COLOR: Record<'primary' | 'secondary' | 'tertiary', string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary'
}

function formatRelativeDay(dateIso: string): string {
  const date = new Date(dateIso)
  if (isToday(date)) return `Bugün, ${format(date, 'HH:mm')}`
  if (isTomorrow(date)) return `Yarın, ${format(date, 'HH:mm')}`
  return format(date, 'd MMMM, HH:mm', { locale: tr })
}

/** TODO(backend): displayLabel alanı netleşene kadar mevcut
 *  alanlardan türetiliyor. */
function deriveDetailLabel(reminder: Reminder): string {
  if (reminder.repeatType !== 'none') return 'Tekrarlayan'
  if (reminder.callEnabled) return 'Sesli Bildirim Açık'
  if (reminder.description?.toLowerCase().includes('konum')) return 'Konum Bazlı'
  return reminder.description ?? 'Bildirim Açık'
}

interface UpcomingReminderRowProps {
  reminder: Reminder
  /** Sol kenar çubuğunun rengi — Stitch export'unda liste sırasına göre
   *  değişiyor (primary / secondary / tertiary). */
  barColor: 'primary' | 'secondary' | 'tertiary'
}

export function UpcomingReminderRow({ reminder, barColor }: UpcomingReminderRowProps): JSX.Element {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between rounded-xl border border-transparent bg-surface-container-lowest px-md py-sm shadow-card transition-all hover:scale-[1.01] hover:border-primary/20 hover:bg-surface-container-low hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex items-center gap-md">
        <span className={['h-10 w-2 shrink-0 rounded-full', BAR_COLOR[barColor]].join(' ')} />
        <div className="min-w-0 text-left">
          <p className="truncate font-body-md text-body-md font-semibold text-on-surface">
            {reminder.title}
          </p>
          <p className="font-label-sm text-label-sm normal-case tracking-normal text-on-surface-variant">
            {formatRelativeDay(reminder.eventDatetime)} • {deriveDetailLabel(reminder)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-sm opacity-0 transition-opacity group-hover:opacity-100">
        <span
          role="button"
          aria-label="Düzenle"
          className="text-on-surface-variant transition-colors hover:text-primary"
        >
          <Pencil size={17} strokeWidth={2} />
        </span>
        <span
          role="button"
          aria-label="Sil"
          className="text-on-surface-variant transition-colors hover:text-status-error"
        >
          <Trash2 size={17} strokeWidth={2} />
        </span>
      </div>
    </button>
  )
}
