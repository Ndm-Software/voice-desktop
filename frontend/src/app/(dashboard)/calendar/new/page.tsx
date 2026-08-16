import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { TimingChipGroup } from './components/TimingChipGroup/TimingChipGroup'
import type { RepeatType } from '@renderer/types'

const REPEAT_OPTIONS: { value: RepeatType; label: string }[] = [
  { value: 'none', label: 'Bir kez' },
  { value: 'daily', label: 'Her gün' },
  { value: 'weekly', label: 'Haftalık' },
  { value: 'monthly', label: 'Aylık' }
]

// Backend §1: TTS yalnızca TR/EN — Stitch'te 4 dil vardı, TopBar'daki
// kararla tutarlı olsun diye burada da TR/EN'e sabitlendi.
const LANGUAGE_OPTIONS = ['Türkçe', 'English']

const PUSH_OPTIONS = [
  { value: '0', label: 'Zamanında' },
  { value: '5', label: '5 dk' },
  { value: '15', label: '15 dk' },
  { value: '30', label: '30 dk' }
]

const CALL_OPTIONS = [
  { value: 'off', label: 'Yok' },
  { value: '0', label: 'Zamanında' },
  { value: '5', label: '5 dk' },
  { value: '10', label: '10 dk' }
]

/**
 * YENİ HATIRLATICI EKRANI (/calendar/new). Tüm alanlar gerçekten
 * yazılabilir/seçilebilir (controlled input). "Kaydet" gerçek web
 * koduyla aynı davranıyor: backend'e gitmiyor ama toast gösterip
 * Takvim'e yönlendiriyor (client-side simülasyon).
 * Detaylar için proje kökündeki README.md.
 */
export default function Page(): JSX.Element {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0])
  const [repeatType, setRepeatType] = useState<RepeatType>('none')
  const [pushMinutes, setPushMinutes] = useState('0')
  const [callMinutes, setCallMinutes] = useState('0')
  const [toast, setToast] = useState(false)

  // TODO(backend): POST /reminders bağlanınca gerçek isteğe dönüşecek.
  function handleSave(): void {
    setToast(true)
    setTimeout(() => {
      setToast(false)
      navigate('/calendar')
    }, 1800)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-lg font-headline-sm text-headline-sm font-bold text-primary">
        Yeni Hatırlatıcı Oluştur
      </h2>

      <div className="rounded-2xl bg-surface-container-lowest p-md shadow-card md:p-lg">
        <form className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <div className="col-span-full">
            <label className="mb-xs block font-label-sm text-label-sm text-primary">BAŞLIK</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Toplantı hazırlığı..."
              className="w-full border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-lg text-body-lg transition-all focus:border-primary focus:ring-0"
            />
          </div>

          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-primary">ASİSTAN DİLİ</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-md text-body-md transition-all focus:border-primary focus:ring-0"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-primary">TEKRAR</label>
            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value as RepeatType)}
              className="w-full border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-md text-body-md transition-all focus:border-primary focus:ring-0"
            >
              {REPEAT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-primary">TARİH</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-md text-body-md focus:border-primary focus:ring-0"
            />
          </div>

          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-primary">SAAT</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-md text-body-md focus:border-primary focus:ring-0"
            />
          </div>

          <div className="col-span-full">
            <label className="mb-xs block font-label-sm text-label-sm text-primary">AÇIKLAMA</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Hatırlatıcı detaylarını buraya ekleyin..."
              className="w-full resize-none border-0 border-b border-outline-variant bg-surface-subtle py-sm font-body-md text-body-md focus:border-primary focus:ring-0"
            />
          </div>

          <div className="col-span-full grid grid-cols-1 gap-gutter md:grid-cols-2">
            <TimingChipGroup
              label="Bildirim Zamanlaması"
              options={PUSH_OPTIONS}
              selected={pushMinutes}
              onSelect={setPushMinutes}
            />
            <TimingChipGroup
              label="Sesli Arama Zamanlaması"
              options={CALL_OPTIONS}
              selected={callMinutes}
              onSelect={setCallMinutes}
            />
          </div>

          <div className="col-span-full mt-lg flex items-center justify-end gap-md">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg px-lg py-md font-semibold text-primary transition-colors hover:bg-surface-accent"
            >
              İptal Et
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-primary px-xl py-md font-bold text-on-primary shadow-lg transition-colors hover:opacity-90"
            >
              Hatırlatıcıyı Kaydet
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-sm rounded-2xl bg-primary px-lg py-md font-body-md text-body-md font-bold text-on-primary shadow-lg">
          <Check size={20} strokeWidth={2.5} className="shrink-0" />
          Hatırlatıcı başarıyla kaydedildi!
        </div>
      )}
    </div>
  )
}
