import { CalendarCheck2, PhoneIncoming, CircleSlash2, ArrowRight, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SummaryCard } from './components/SummaryCard/SummaryCard'
import { UpcomingReminderRow } from './components/UpcomingReminderRow/UpcomingReminderRow'
import { MiniCalendar } from './components/MiniCalendar/MiniCalendar'
import { mockMarkedDays, mockPanelSummary, mockUpcomingReminders, mockUser } from './panel.mock'

const REMINDER_BAR_COLORS = ['primary', 'secondary', 'tertiary'] as const

/**
 * PANEL EKRANI (/panel). Mock veri (panel.mock.ts) — backend'e bağlı
 * değil. Çalışan: mini takvim ay okları, "Yeni Hatırlatıcı Ekle"
 * (/calendar/new'e gider). Aksiyonsuz: hatırlatıcı satırına tıklama
 * (detay sayfası yok), "Tümünü Gör" (Takvim'e gidecek, henüz bağlı değil).
 * Detaylar için proje kökündeki README.md.
 */
export default function Page(): JSX.Element {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary">
          Merhaba, {mockUser.firstName}!
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          İşte bugün için planladıkların ve asistanının notları.
        </p>
      </section>

      <section className="mb-lg grid grid-cols-1 gap-gutter md:grid-cols-3">
        <SummaryCard
          icon={CalendarCheck2}
          label="AKTİF HATIRLATICILAR"
          value={mockPanelSummary.activeReminderCount}
          accent="primary"
        />
        <SummaryCard
          icon={PhoneIncoming}
          label="BUGÜNKÜ ARAMALAR"
          value={mockPanelSummary.todaysCallCount}
          accent="secondary"
        />
        <SummaryCard
          icon={CircleSlash2}
          label="SESSİZ SAAT DURUMU"
          value={mockPanelSummary.silentHoursActive ? 'Açık' : 'Kapalı'}
          accent="muted"
        />
      </section>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <div className="space-y-sm lg:col-span-2">
          <div className="mb-sm flex items-center justify-between">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">
              Yaklaşan Hatırlatıcılar
            </h4>
            {/* TODO: Takvim'e yönlendir (Geçmiş değil — bkz. README.md) */}
            <button
              type="button"
              data-action="view-all-reminders"
              className="flex items-center gap-xs font-label-sm text-label-sm text-primary"
            >
              Tümünü Gör
              <ArrowRight size={16} />
            </button>
          </div>

          {mockUpcomingReminders.map((reminder, index) => (
            <UpcomingReminderRow
              key={reminder.reminderId}
              reminder={reminder}
              barColor={REMINDER_BAR_COLORS[index % REMINDER_BAR_COLORS.length]}
            />
          ))}

          <Link
            to="/calendar/new"
            className="flex w-full items-center justify-center gap-sm rounded-xl border-2 border-dashed border-outline-variant p-sm text-on-surface-variant transition-all hover:border-primary hover:text-primary"
          >
            <PlusCircle size={20} strokeWidth={2} />
            <span className="font-body-md text-body-md font-semibold">Yeni Hatırlatıcı Ekle</span>
          </Link>
        </div>

        <div className="space-y-gutter">
          <MiniCalendar markedDays={mockMarkedDays} />
        </div>
      </div>
    </div>
  )
}
