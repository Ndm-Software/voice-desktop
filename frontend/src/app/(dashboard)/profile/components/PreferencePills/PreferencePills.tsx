import { Check } from 'lucide-react'

export interface PillOption {
  value: string
  label: string
}

interface PreferencePillsProps {
  label: string
  options: PillOption[]
  selected: string
  onSelect: (value: string) => void
  /** Seçili pilde onay tiki göster (dil seçici için Stitch'te vardı). */
  showCheck?: boolean
}

/** Tercih seçici pill grubu — dil, varsayılan bildirim/arama zamanı için
 *  kullanılıyor. calendar/new'deki TimingChipGroup'a benzer ama ekranlar
 *  arası kod paylaşımı yapmama kuralı gereği bilerek ayrı bir kopya. */
export function PreferencePills({
  label,
  options,
  selected,
  onSelect,
  showCheck = false
}: PreferencePillsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-sm text-label-sm text-on-surface-variant">{label}</label>
      <div className="flex flex-wrap gap-xs">
        {options.map((option) => {
          const isSelected = option.value === selected
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={[
                'flex items-center gap-xs rounded-full px-sm py-xs font-body-md text-body-md transition-all',
                isSelected
                  ? 'border border-primary bg-surface-accent text-primary'
                  : 'border border-transparent bg-surface-subtle text-on-surface-variant hover:bg-surface-container'
              ].join(' ')}
            >
              {showCheck && isSelected && <Check size={18} strokeWidth={2.5} />}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
