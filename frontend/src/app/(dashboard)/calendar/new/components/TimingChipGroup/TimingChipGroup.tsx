export interface TimingOption {
  value: string
  label: string
}

interface TimingChipGroupProps {
  label: string
  options: TimingOption[]
  selected: string
  onSelect: (value: string) => void
}

/** Bildirim/arama zamanlaması için pill buton grubu — Panel/Geçmiş'teki
 *  filtre pillerine benzer, ama tekli seçim (radio gibi) davranır. */
export function TimingChipGroup({ label, options, selected, onSelect }: TimingChipGroupProps): JSX.Element {
  return (
    <section>
      <h3 className="mb-sm font-headline-sm text-headline-sm text-on-surface">{label}</h3>
      <div className="flex flex-wrap gap-xs">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={[
              'rounded-full px-md py-xs font-label-sm text-label-sm transition-colors',
              option.value === selected
                ? 'border border-primary bg-surface-accent text-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-accent hover:text-primary'
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}
