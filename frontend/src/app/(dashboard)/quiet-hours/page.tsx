import { useEffect, useState } from 'react'
import { AlertTriangle, Check, Clock } from 'lucide-react'
import { DayRow } from './components/DayRow/DayRow'
import { mockDays, mockEmergencyBypassEnabled } from './quiet-hours.mock'
import type { QuietHoursDay } from '@renderer/types'

function useLocalClock(): string {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }))
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }))
    }, 1000 * 30)
    return () => clearInterval(id)
  }, [])
  return time
}

/**
 * SESSİZ SAATLER EKRANI (/quiet-hours). Mock veri (quiet-hours.mock.ts).
 * Çalışan: gün aç/kapa, saat değiştirme, "Tüm günlere uygula" (toast
 * gösterir), Acil Durum Geçişi anahtarı. Yerel saat gerçekten güncelleniyor.
 * Gerçek web kodunda arama kutusu ve "Akıllı Bilgi" kartı yoktu, Stitch'te
 * vardı — web'in kaldırdığı kararla tutarlı, buraya da eklenmedi.
 */
export default function Page(): JSX.Element {
  const [days, setDays] = useState<QuietHoursDay[]>(mockDays)
  const [emergencyEnabled, setEmergencyEnabled] = useState(mockEmergencyBypassEnabled)
  const [toast, setToast] = useState<string | null>(null)
  const localTime = useLocalClock()

  function showToast(message: string): void {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  function toggleDay(index: number): void {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d)))
  }

  function updateTime(index: number, field: 'startTime' | 'endTime', value: string): void {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)))
  }

  function applyToAll(): void {
    const ref = days[0]
    setDays((prev) => prev.map((d) => ({ ...d, startTime: ref.startTime, endTime: ref.endTime })))
    showToast(`${ref.startTime} – ${ref.endTime} tüm günlere uygulandı.`)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary">Sessiz Saatler</h2>
        <p className="mt-xs font-body-lg text-body-lg text-on-surface-variant">
          Dinlenme zamanlarınızı ve rahatsız edilmeyeceğiniz saatleri buradan yönetin.
        </p>
      </header>

      <div className="flex flex-col gap-gutter lg:flex-row">
        {/* Haftalık Program */}
        <section className="flex-[2] rounded-2xl bg-surface-container-lowest p-md shadow-card">
          <div className="mb-md flex items-center justify-between">
            <div className="flex items-center gap-xs font-bold text-primary">
              <Clock size={18} strokeWidth={2} />
              Haftalık Program
            </div>
            <button
              type="button"
              onClick={applyToAll}
              className="font-body-md text-body-md font-semibold text-primary hover:underline"
            >
              Tüm günlere uygula
            </button>
          </div>

          <div className="space-y-xs">
            {days.map((day, index) => (
              <DayRow
                key={day.day}
                day={day}
                onToggle={() => toggleDay(index)}
                onTimeChange={(field, value) => updateTime(index, field, value)}
              />
            ))}
          </div>
        </section>

        {/* Sağ sütun */}
        <div className="flex flex-1 flex-col gap-gutter">
          <section className="rounded-2xl bg-surface-container-lowest p-md shadow-card">
            <h4 className="mb-sm font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Yerel Saat
            </h4>
            <div className="mb-xs flex items-end gap-xs">
              <span className="font-headline-lg text-headline-lg text-primary">{localTime}</span>
              <span className="mb-1 font-body-md text-body-md text-on-surface-variant">GMT+3</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Şu anki saat diliminiz İstanbul/Türkiye olarak ayarlanmıştır.
            </p>
          </section>

          <section className="rounded-2xl border border-status-error/20 bg-status-error-bg/40 p-md shadow-card">
            <div className="mb-md flex items-start gap-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-status-error/20 bg-white text-status-error">
                <AlertTriangle size={20} strokeWidth={2} />
              </div>
              <div>
                <h4 className="mb-xs font-body-md text-body-md font-bold text-on-surface">Acil Durum Geçişi</h4>
                <p className="font-body-md text-[13px] leading-relaxed text-on-surface-variant">
                  Aynı kişiden 3 dakika içinde gelen ardışık aramaların veya mesajların sessiz
                  saatleri aşmasına izin verin.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-sm">
              <span className={['font-label-sm text-label-sm font-bold uppercase', emergencyEnabled ? 'text-primary' : 'text-on-surface-variant'].join(' ')}>
                {emergencyEnabled ? 'Aktif' : 'Pasif'}
              </span>
              <button
                type="button"
                onClick={() => setEmergencyEnabled((prev) => !prev)}
                aria-label="Acil durum geçişini aç/kapat"
                className="relative inline-flex items-center"
              >
                <div className={['h-6 w-11 rounded-full transition-colors', emergencyEnabled ? 'bg-status-error' : 'bg-surface-container-highest'].join(' ')} />
                <div
                  className={[
                    'absolute left-[2px] top-[2px] h-5 w-5 rounded-full border border-outline-variant bg-white transition-transform',
                    emergencyEnabled ? 'translate-x-full' : 'translate-x-0'
                  ].join(' ')}
                />
              </button>
            </div>
          </section>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-sm rounded-2xl bg-primary px-lg py-md font-body-md text-body-md font-bold text-on-primary shadow-lg">
          <Check size={20} strokeWidth={2.5} className="shrink-0" />
          {toast}
        </div>
      )}
    </div>
  )
}
