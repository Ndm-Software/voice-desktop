import { useMemo } from 'react'
import {
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import type { CalendarReminder } from '../../calendar.mock'

const WEEKDAY_LABELS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const BAR_COLOR: Record<CalendarReminder['category'], string> = {
  is: 'bg-primary-container',
  kisisel: 'bg-secondary'
}

interface CalendarGridProps {
  visibleMonth: Date
  selectedDate: Date
  remindersByDay: Record<number, CalendarReminder[]>
  onSelectDay: (date: Date) => void
}

/** Büyük ay ızgarası — MiniCalendar'la aynı mantık, bilerek ayrı kod
 *  (Panel'e dokunmadan Takvim geliştirilebilsin diye). */
export function CalendarGrid({
  visibleMonth,
  selectedDate,
  remindersByDay,
  onSelectDay
}: CalendarGridProps): JSX.Element {
  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 1 })
    const gridEnd = endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: 1 })
    const list: Date[] = []
    for (let d = gridStart; d <= gridEnd; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
      list.push(d)
    }
    return list
  }, [visibleMonth])

  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-card">
      <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-subtle">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-sm text-center font-label-sm text-label-sm text-on-surface-variant opacity-70">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const inMonth = isSameMonth(day, visibleMonth)
          const isSelected = isSameDay(day, selectedDate)
          const dayReminders = inMonth ? remindersByDay[day.getDate()] : undefined

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => inMonth && onSelectDay(day)}
              disabled={!inMonth}
              className={[
                'flex aspect-[1/1.1] flex-col border-b border-r border-outline-variant p-xs text-right font-body-md text-body-md transition-colors',
                !inMonth && 'opacity-30',
                inMonth && !isSelected && 'cursor-pointer hover:bg-surface-accent/50',
                isSelected && 'cursor-pointer border-primary bg-surface-accent font-bold text-primary'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span>{format(day, 'd')}</span>
              {dayReminders && dayReminders.length > 0 && (
                <div className="mt-xs flex flex-col gap-0.5">
                  {dayReminders.slice(0, 2).map((reminder) => (
                    <span
                      key={reminder.id}
                      className={[
                        'h-1.5 w-full rounded-full',
                        BAR_COLOR[reminder.category],
                        isSelected && reminder.category === 'kisisel' ? 'opacity-50' : ''
                      ].join(' ')}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
