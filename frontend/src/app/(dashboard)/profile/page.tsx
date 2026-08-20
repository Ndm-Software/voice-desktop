import { useState } from 'react'
import { Check, Trash2, LogOut, UserCircle, SlidersHorizontal, Laptop, CalendarClock } from 'lucide-react'
import { AvatarUpload } from './components/AvatarUpload/AvatarUpload'
import { PreferencePills } from './components/PreferencePills/PreferencePills'
import { DeviceListItem } from './components/DeviceListItem/DeviceListItem'
import { DeleteAccountModal } from './components/DeleteAccountModal/DeleteAccountModal'
import { mockDevices, mockUser, mockUserSettings } from './profile.mock'

const LANGUAGE_OPTIONS = [
  { value: 'tr', label: 'Türkçe (TR)' },
  { value: 'en', label: 'English (US)' }
]

const PUSH_DEFAULT_OPTIONS = [
  { value: '15', label: '15 dk önce' },
  { value: '30', label: '30 dk önce' },
  { value: '60', label: '1 saat önce' }
]

const CALL_DEFAULT_OPTIONS = [
  { value: '0', label: 'Anında' },
  { value: '5', label: '5 dk önce' },
  { value: '10', label: '10 dk önce' }
]

/**
 * PROFİL EKRANI (/profile). Mock veri (profile.mock.ts) — backend'e
 * bağlı değil. Form + tercihler + avatar yükleme (gerçek dosya seçici)
 * + hesap silme modalı hepsi çalışıyor. "Kaydet" toast gösteriyor,
 * gerçek silme yok. Kişisel Bilgiler → USERS, Tercihler → USER_SETTINGS,
 * Bağlı Cihazlar → DEVICES tablosuna karşılık gelir.
 * Detaylar için proje kökündeki README.md.
 */
export default function Page(): JSX.Element {
  const [fullName, setFullName] = useState(`${mockUser.firstName} ${mockUser.lastName}`)
  const [email, setEmail] = useState(mockUser.email)
  const [phone, setPhone] = useState(mockUser.phoneNumber)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(mockUser.avatarUrl ?? null)

  const [language, setLanguage] = useState(mockUserSettings.languageId)
  const [pushDefault, setPushDefault] = useState(String(mockUserSettings.defaultPushBefore))
  const [callDefault, setCallDefault] = useState(String(mockUserSettings.defaultCallBefore))

  const [toast, setToast] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const initials = `${mockUser.firstName.charAt(0)}${mockUser.lastName.charAt(0)}`

  function handleSave(): void {
    // TODO(backend): PATCH /users/me + PATCH /users/me/settings
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  // "İptal Et" — hiç bağlı değildi, eklendi. Backend yok, "en son kaydedilen
  // hâl" diye bir şey de yok; şimdilik alanları mock veriye (ilk açılış
  // değerlerine) geri döndürüyor.
  function handleCancel(): void {
    setFullName(`${mockUser.firstName} ${mockUser.lastName}`)
    setEmail(mockUser.email)
    setPhone(mockUser.phoneNumber)
    setAvatarSrc(mockUser.avatarUrl ?? null)
    setLanguage(mockUserSettings.languageId)
    setPushDefault(String(mockUserSettings.defaultPushBefore))
    setCallDefault(String(mockUserSettings.defaultCallBefore))
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary">Hesap Ayarları</h2>
        <p className="mt-xs font-body-lg text-body-lg text-on-surface-variant">
          Profil bilgilerinizi yönetin ve asistan tercihlerinizi özelleştirin.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-gutter">
        {/* Kişisel Bilgiler */}
        <section className="rounded-xl bg-surface-container-lowest p-md shadow-card">
          <div className="mb-md flex items-center gap-sm">
            <UserCircle size={22} strokeWidth={2} className="text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Kişisel Bilgiler</h3>
          </div>

          <div className="flex flex-col items-start gap-lg md:flex-row">
            <AvatarUpload avatarSrc={avatarSrc} initials={initials} onChange={setAvatarSrc} />

            <div className="w-full flex-grow space-y-md">
              <div className="grid grid-cols-1 gap-md md:grid-cols-2">
                <div className="flex flex-col gap-xs">
                  <label className="px-1 font-label-sm text-label-sm text-on-surface-variant">Ad Soyad</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-t-lg border-b border-outline-variant bg-surface-subtle px-md py-sm font-body-md transition-all focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="px-1 font-label-sm text-label-sm text-on-surface-variant">E-posta Adresi</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-t-lg border-b border-outline-variant bg-surface-subtle px-md py-sm font-body-md transition-all focus:border-primary"
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-xs">
                <label className="px-1 font-label-sm text-label-sm text-on-surface-variant">Telefon Numarası</label>
                <div className="flex items-center">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-t-lg border-b border-outline-variant bg-surface-subtle px-md py-sm pr-32 font-body-md transition-all focus:border-primary"
                  />
                  {mockUser.phoneVerified && (
                    <div className="absolute right-3 top-7 flex items-center gap-1 rounded-full bg-status-success-bg px-2 py-0.5 text-secondary">
                      <Check size={14} strokeWidth={2.5} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Doğrulandı</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tercihler */}
        <section className="rounded-xl bg-surface-container-lowest p-md shadow-card">
          <div className="mb-md flex items-center gap-sm">
            <SlidersHorizontal size={22} strokeWidth={2} className="text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Tercihler</h3>
          </div>

          <div className="space-y-lg">
            <PreferencePills
              label="Asistan Dili"
              options={LANGUAGE_OPTIONS}
              selected={language}
              onSelect={setLanguage}
              showCheck
            />

            <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
              <PreferencePills
                label="Varsayılan Bildirim Zamanı"
                options={PUSH_DEFAULT_OPTIONS}
                selected={pushDefault}
                onSelect={setPushDefault}
              />
              <PreferencePills
                label="Varsayılan Arama Hatırlatıcı"
                options={CALL_DEFAULT_OPTIONS}
                selected={callDefault}
                onSelect={setCallDefault}
              />
            </div>
          </div>
        </section>

        {/* Bağlı Cihazlar — DEVICES tablosu (Stitch'te yoktu, gerçek web kodunda vardı) */}
        <section className="rounded-xl bg-surface-container-lowest p-md shadow-card">
          <div className="mb-md flex items-center gap-sm">
            <Laptop size={22} strokeWidth={2} className="text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Bağlı Cihazlar</h3>
          </div>
          <div className="space-y-sm">
            {mockDevices.map((device) => (
              <DeviceListItem key={device.deviceId} device={device} />
            ))}
          </div>
        </section>

        {/* Hesap Yönetimi */}
        <section className="rounded-xl bg-surface-container-lowest p-md shadow-card">
          <div className="mb-md flex items-center gap-sm">
            <CalendarClock size={22} strokeWidth={2} className="text-primary" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Hesap Yönetimi</h3>
          </div>

          <div className="mb-md overflow-hidden rounded-xl border border-outline-variant bg-surface-subtle">
            <div className="flex items-center justify-between border-b border-outline-variant px-md py-sm">
              <span className="font-body-md text-body-md text-on-surface-variant">Hesap Oluşturma Tarihi</span>
              <span className="font-body-md text-body-md font-bold text-on-surface">12 Ocak 2024</span>
            </div>
            <div className="flex items-center justify-between px-md py-sm">
              <span className="font-body-md text-body-md text-on-surface-variant">Son Giriş</span>
              <span className="font-body-md text-body-md font-bold text-on-surface">Bugün</span>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center gap-xs rounded-xl bg-status-error px-md py-sm font-body-md text-body-md font-bold text-white transition-colors hover:opacity-90"
            >
              <Trash2 size={18} strokeWidth={2} />
              Hesabı Sil
            </button>
            {/* TODO(backend): oturum sonlandırma + token temizleme */}
            <button
              type="button"
              className="flex items-center gap-xs rounded-xl bg-surface-container px-md py-sm font-body-md text-body-md font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              <LogOut size={18} strokeWidth={2} />
              Çıkış Yap
            </button>
          </div>
        </section>

        {/* Alt Butonlar */}
        <div className="flex items-center justify-end gap-md pt-md">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg px-lg py-sm font-body-md text-body-md text-on-surface transition-colors hover:bg-surface-container"
          >
            İptal Et
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-primary px-lg py-sm font-body-md text-body-md font-bold text-on-primary shadow-lg transition-colors hover:opacity-90"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>

      <DeleteAccountModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => setDeleteModalOpen(false)}
      />

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-sm rounded-2xl bg-primary px-lg py-md font-body-md text-body-md font-bold text-on-primary shadow-lg">
          <Check size={20} strokeWidth={2.5} className="shrink-0" />
          Değişiklikler başarıyla kaydedildi.
        </div>
      )}
    </div>
  )
}
