import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { AudioLines, MapPin, Languages, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CalendarDetailIcon, CalendarReminder } from '../../calendar.mock'

const CATEGORY_LABEL: Record<CalendarReminder['category'], string> = {
  is: 'İş',
  kisisel: 'Kişisel'
}

const CATEGORY_STYLE: Record<CalendarReminder['category'], string> = {
  is: 'bg-primary-container text-white',
  kisisel: 'bg-secondary text-white'
}

const DETAIL_ICON: Record<CalendarDetailIcon, typeof AudioLines> = {
  transcribe: AudioLines,
  location: MapPin,
  language: Languages
}

interface DayDetailPanelProps {
  selectedDate: Date
  reminders: CalendarReminder[]
}

/** Seçili günün hatırlatıcı kartları. "Voia Dinliyor" widget'ı
 *  bilerek eklenmedi (Panel'deki kararla tutarlı, §11). */
export function DayDetailPanel({ selectedDate, reminders }: DayDetailPanelProps): JSX.Element {
  return (
    <div className="flex h-full flex-col rounded-xl bg-surface-container-lowest p-md shadow-card">
      <div className="mb-md border-b border-outline-variant pb-md">
        <h3 className="font-headline-sm text-headline-sm text-primary">
          {format(selectedDate, 'd MMMM, EEEE', { locale: tr })}
        </h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
          {reminders.length} Hatırlatıcı Planlandı
        </p>
      </div>

      <div className="flex-1 space-y-sm">
        {reminders.length === 0 && (
          <div className="rounded-xl border border-outline-variant bg-surface-subtle p-lg text-center">
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              Bu gün için etkinlik yok.
            </p>
            <Link
              to="/calendar/new"
              className="inline-flex items-center gap-xs rounded-xl bg-primary px-md py-sm font-body-md text-body-md font-bold text-on-primary transition-colors hover:opacity-90"
            >
              <Plus size={16} strokeWidth={2.5} />
              Hatırlatıcı Ekle
            </Link>
          </div>
        )}

        {reminders.map((reminder) => {
          const Icon = DETAIL_ICON[reminder.detailIcon]
          return (
            <button
              key={reminder.id}
              type="button"
              className="block w-full rounded-lg border border-outline-variant bg-surface-subtle p-sm text-left transition-all hover:border-primary hover:bg-surface-container-high hover:shadow-md"
            >
              <div className="mb-xs flex items-start justify-between">
                <span
                  className={[
                    'rounded px-2 py-0.5 text-[10px] font-bold uppercase',
                    CATEGORY_STYLE[reminder.category]
                  ].join(' ')}
                >
                  {CATEGORY_LABEL[reminder.category]}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{reminder.time}</span>
              </div>
              <h4 className="mb-xs text-[15px] font-headline-sm leading-tight text-on-surface">
                {reminder.title}
              </h4>
              <div className="flex items-center gap-xs text-on-surface-variant opacity-70">
                <Icon size={16} strokeWidth={2} />
                <span className="font-body-md text-body-md">{reminder.detailLabel}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
