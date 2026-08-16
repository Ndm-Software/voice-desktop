import type { LucideIcon } from 'lucide-react'

interface SummaryCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  /** Stitch export'undaki 3 karta karşılık gelir: sol kenar rengi + ikon
   *  dairesinin arka/ön rengi bu üçünden birine göre değişir. */
  accent: 'primary' | 'secondary' | 'muted'
}

const ACCENT_STYLES: Record<SummaryCardProps['accent'], { border: string; iconWrap: string; icon: string }> = {
  primary: {
    border: 'border-primary',
    iconWrap: 'bg-surface-accent',
    icon: 'text-primary'
  },
  secondary: {
    border: 'border-secondary',
    iconWrap: 'bg-secondary-container/30',
    icon: 'text-secondary'
  },
  muted: {
    border: 'border-outline-variant',
    iconWrap: 'bg-surface-container-high',
    icon: 'text-on-surface-variant'
  }
}

export function SummaryCard({ icon: Icon, label, value, accent }: SummaryCardProps): JSX.Element {
  const style = ACCENT_STYLES[accent]

  return (
    <div
      className={[
        'flex items-center gap-md rounded-xl border-l-4 bg-surface-container-lowest p-md shadow-card',
        style.border
      ].join(' ')}
    >
      <div className={['flex h-12 w-12 shrink-0 items-center justify-center rounded-full', style.iconWrap].join(' ')}>
        <Icon size={20} strokeWidth={2} className={style.icon} />
      </div>
      <div className="min-w-0">
        <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          {label}
        </p>
        <h3 className="font-headline-md text-headline-md text-on-surface">{value}</h3>
      </div>
    </div>
  )
}
