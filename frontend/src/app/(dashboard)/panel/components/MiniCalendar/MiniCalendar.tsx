import { useMemo, useState } from 'react'
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns'
import { tr } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAY_LABELS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']

interface MiniCalendarProps {
  markedDays?: number[]
  selectedDate?: Date
}

export function MiniCalendar({
  markedDays = [],
  selectedDate = new Date()
}: MiniCalendarProps): JSX.Element {
  const [visibleMonth, setVisibleMonth] = useState<Date>(selectedDate)

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
    <div className="rounded-xl bg-surface-container-lowest p-md shadow-card">
      <div className="mb-md flex items-center justify-between">
        <h5 className="font-label-sm text-label-sm font-bold uppercase text-on-surface">
          {format(visibleMonth, 'LLLL yyyy', { locale: tr })}
        </h5>
        <div className="flex gap-sm">
          <button
            type="button"
            aria-label="Önceki ay"
            onClick={() => setVisibleMonth((m) => subMonths(m, 1))}
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Sonraki ay"
            onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
            className="text-on-surface-variant transition-colors hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-xs text-center">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="font-label-sm text-[10px] text-on-surface-variant">
            {label}
          </div>
        ))}

        {days.map((day) => {
          const inMonth = isSameMonth(day, visibleMonth)
          const isSelected = isSameDay(day, selectedDate)
          const isMarked = inMonth && markedDays.includes(day.getDate())

          return (
            <div key={day.toISOString()} className="relative flex items-center justify-center p-xs">
              <button
                type="button"
                className={[
                  'flex h-6 w-6 items-center justify-center font-label-sm text-label-sm transition-colors',
                  !inMonth && 'text-on-surface-variant opacity-30',
                  inMonth && !isSelected && 'text-on-surface hover:text-primary',
                  isSelected && 'rounded-full bg-primary font-bold text-on-primary'
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {day.getDate()}
              </button>
              {isMarked && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-secondary" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
