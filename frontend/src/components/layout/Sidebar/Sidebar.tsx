import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, History, BellOff, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Henüz build edilmedi — pasif/tıklanamaz gösterilir. */
  disabled?: boolean
}

const navItems: NavItem[] = [
  { to: '/panel', label: 'Panel', icon: LayoutDashboard },
  { to: '/calendar', label: 'Takvim', icon: CalendarDays },
  { to: '/history', label: 'Geçmiş', icon: History },
  { to: '/quiet-hours', label: 'Sessiz Saatler', icon: BellOff, disabled: true },
  { to: '/profile', label: 'Profil', icon: UserRound }
]

/** Paylaşılan kabuk — tüm ekranlar kullanır. */
export function Sidebar(): JSX.Element {
  return (
    <aside className="app-drag flex h-full w-64 shrink-0 flex-col bg-surface px-sm py-md shadow-sm">
      <div className="app-no-drag mb-lg px-xs">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Voia</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
          Kişisel Sesli Asistan
        </p>
      </div>

      <nav className="app-no-drag flex flex-1 flex-col gap-base">
        {navItems.map(({ to, label, icon: Icon, disabled }) => {
          if (disabled) {
            return (
              <div
                key={to}
                aria-disabled="true"
                className="flex cursor-not-allowed items-center gap-sm p-sm text-on-surface-variant opacity-30"
              >
                <Icon size={20} strokeWidth={2} className="shrink-0" />
                <span className="font-body-md text-body-md">{label}</span>
              </div>
            )
          }

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-sm p-sm transition-colors',
                  isActive
                    ? 'border-r-4 border-primary bg-surface-container-high font-bold text-primary'
                    : 'text-on-surface-variant opacity-70 hover:bg-surface-container-high'
                ].join(' ')
              }
            >
              <Icon size={20} strokeWidth={2} className="shrink-0" />
              <span className="font-body-md text-body-md">{label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="app-no-drag px-xs pb-sm">
        <Link
          to="/calendar/new"
          className="block w-full rounded-lg bg-primary px-md py-sm text-center font-label-sm text-label-sm text-on-primary shadow-md transition-transform active:scale-95"
        >
          Yeni Hatırlatıcı Oluştur
        </Link>
      </div>
    </aside>
  )
}
