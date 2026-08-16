import { useState } from 'react'
import { addMonths, format, subMonths } from 'date-fns'
import { tr } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid'
import { DayDetailPanel } from './components/DayDetailPanel/DayDetailPanel'
import { mockRemindersByDay, mockSelectedDay, mockVisibleMonth, mockVisibleYear } from './calendar.mock'

const VIEW_OPTIONS = ['Gün', 'Hafta', 'Ay'] as const
type ViewOption = (typeof VIEW_OPTIONS)[number]

/**
 * TAKVIM EKRANI (/calendar). Mock veri (calendar.mock.ts) — backend'e
 * bağlı değil. Çalışan: ay değiştirme, gün seçimi (sağ paneli günceller),
 * boş günde "Hatırlatıcı Ekle" (/calendar/new'e gider). Aksiyonsuz:
 * Gün/Hafta görünümü (sadece Ay var), hatırlatıcı kartına tıklama.
 * Detaylar için proje kökündeki README.md.
 */
export default function Page(): JSX.Element {
  const [visibleMonth, setVisibleMonth] = useState(new Date(mockVisibleYear, mockVisibleMonth, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(mockVisibleYear, mockVisibleMonth, mockSelectedDay))
  const [activeView, setActiveView] = useState<ViewOption>('Ay')

  const selectedReminders = mockRemindersByDay[selectedDate.getDate()] ?? []

  return (
    <div className="flex flex-col gap-gutter lg:flex-row">
      <div className="flex-grow space-y-md">
        <div className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-sm shadow-card">
          <div className="flex items-center gap-md">
            <h2 className="font-headline-sm text-headline-sm capitalize text-primary">
              {format(visibleMonth, 'LLLL yyyy', { locale: tr })}
            </h2>
            <div className="flex items-center gap-xs">
              <button
                type="button"
                aria-label="Önceki ay"
                onClick={() => setVisibleMonth((m) => subMonths(m, 1))}
                className="rounded-full p-xs transition-colors hover:bg-surface-accent"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Sonraki ay"
                onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
                className="rounded-full p-xs transition-colors hover:bg-surface-accent"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex rounded-lg bg-surface-container p-0.5">
            {VIEW_OPTIONS.map((view) => (
              <button
                key={view}
                type="button"
                onClick={() => setActiveView(view)}
                className={[
                  'rounded-md px-md py-xs font-label-sm text-label-sm transition-all',
                  activeView === view
                    ? 'bg-surface-container-lowest font-bold text-primary shadow-sm'
                    : 'hover:bg-surface-container-low'
                ].join(' ')}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <CalendarGrid
          visibleMonth={visibleMonth}
          selectedDate={selectedDate}
          remindersByDay={mockRemindersByDay}
          onSelectDay={setSelectedDate}
        />
      </div>

      <aside className="w-full space-y-md lg:w-80">
        <DayDetailPanel selectedDate={selectedDate} reminders={selectedReminders} />
      </aside>
    </div>
  )
}
