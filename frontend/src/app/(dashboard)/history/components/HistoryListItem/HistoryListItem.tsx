import { format } from 'date-fns'
import { PhoneCall, PhoneMissed, Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import type { ReminderHistoryEntry, HistoryStatus } from '@renderer/types'

const TYPE_LABEL: Record<ReminderHistoryEntry['historyType'], string> = {
  call: 'Sesli Arama',
  push: 'Anlık Bildirim'
}

const STATUS_BADGE: Record<HistoryStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  delivered: {
    label: 'İletildi',
    className: 'bg-surface-accent text-primary-container border border-secondary-container',
    icon: CheckCircle2
  },
  missed: {
    label: 'Cevapsız',
    className: 'bg-error-container text-error border border-error/20',
    icon: AlertCircle
  },
  failed: {
    label: 'Başarısız',
    className: 'bg-error-container text-error border border-error/20',
    icon: AlertCircle
  },
  pending: {
    label: 'Bekliyor',
    className: 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
    icon: Clock
  }
}

interface HistoryListItemProps {
  entry: ReminderHistoryEntry
}

/** Tek bir geçmiş satırı; renk/ikon tür+duruma göre değişir. */
export function HistoryListItem({ entry }: HistoryListItemProps): JSX.Element {
  const isMissed = entry.status === 'missed' || entry.status === 'failed'
  const isCall = entry.historyType === 'call'
  const badge = STATUS_BADGE[entry.status]
  const BadgeIcon = badge.icon

  const iconWrapClass = isMissed
    ? 'bg-status-error-bg'
    : isCall
      ? 'bg-status-success-bg'
      : 'bg-surface-container-high'
  const iconColorClass = isMissed ? 'text-status-error' : isCall ? 'text-primary-container' : 'text-on-surface-variant'
  const RowIcon = isMissed && isCall ? PhoneMissed : isCall ? PhoneCall : Bell

  return (
    <div
      className={[
        'flex flex-col items-start gap-md p-md transition-colors hover:bg-surface-subtle sm:flex-row sm:items-center',
        isMissed && 'bg-status-error-bg/30'
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['flex h-10 w-10 shrink-0 items-center justify-center rounded-full', iconWrapClass].join(' ')}>
        <RowIcon size={18} strokeWidth={2} className={iconColorClass} />
      </div>

      <div className="min-w-0 flex-1">
        <h4
          className={[
            'truncate font-headline-sm text-headline-sm',
            isMissed ? 'text-status-error' : 'text-on-background'
          ].join(' ')}
        >
          {entry.reminderTitle}
        </h4>
        <div className="mt-1 flex items-center gap-xs font-body-md text-body-md text-on-surface-variant">
          <span>{TYPE_LABEL[entry.historyType]}</span>
          <span className="h-1 w-1 rounded-full bg-outline-variant" />
          <span>{format(new Date(entry.sentAt), 'HH:mm')}</span>
        </div>
      </div>

      <div
        className={['mt-2 flex shrink-0 items-center gap-xs rounded px-2 py-1 font-label-sm text-label-sm sm:mt-0', badge.className].join(
          ' '
        )}
      >
        <BadgeIcon size={16} strokeWidth={2} />
        {badge.label}
      </div>
    </div>
  )
}
