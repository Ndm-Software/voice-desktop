import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Settings } from 'lucide-react'
import type { User } from '@renderer/types'

// Dil TR/EN ile sınırlı (Backend MVP Kapsam Raporu §1 — TTS yalnızca TR/EN).
const LANGUAGES = ['TR', 'EN'] as const
type Language = (typeof LANGUAGES)[number]

interface TopBarProps {
  user: User
}

/** Paylaşılan kabuk — tüm ekranlar kullanır. Avatar artık /profile'a
 *  gidiyor (Profil ekranı eklenince bağlandı). Baş harf rozeti kullanıyor
 *  (offline; gerçek fotoğraf backend bağlanınca user.avatarUrl'den gelecek). */
export function TopBar({ user }: TopBarProps): JSX.Element {
  const [activeLanguage, setActiveLanguage] = useState<Language>('TR')
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`

  return (
    <header className="app-drag sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-md bg-surface px-margin-desktop py-xs shadow-sm">
      <div className="app-no-drag flex flex-1 items-center gap-md">
        <div className="relative w-64">
          <Search
            size={18}
            strokeWidth={2}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50"
          />
          <input
            type="text"
            data-action="search-reminders"
            placeholder="Hatırlatıcılarda ara..."
            className="w-full rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-sm">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLanguage(lang)}
              className={[
                'px-2 py-1 font-label-sm text-label-sm transition-colors',
                activeLanguage === lang
                  ? 'font-semibold text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              ].join(' ')}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="app-no-drag flex shrink-0 items-center gap-md">
        <button
          type="button"
          aria-label="Bildirimler"
          data-action="open-notifications"
          className="text-on-surface-variant transition-colors hover:text-primary"
        >
          <Bell size={20} strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Ayarlar"
          data-action="open-settings"
          className="text-on-surface-variant transition-colors hover:text-primary"
        >
          <Settings size={20} strokeWidth={2} />
        </button>

        <Link
          to="/profile"
          aria-label="Profil"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-surface-accent bg-surface-container-high text-[13px] font-semibold text-primary transition-transform hover:scale-105"
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.firstName} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </Link>
      </div>
    </header>
  )
}
