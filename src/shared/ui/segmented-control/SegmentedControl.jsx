import './SegmentedControl.css'

export function SegmentedControl({ disabled = false, items, onChange, value }) {
  return (
    <div className="segmented-control" role="tablist">
      {items.map((item) => {
        const isActive = item.value === value

        return (
          <button
            aria-pressed={isActive}
            aria-selected={isActive}
            className={`segmented-control__item${isActive ? ' is-active' : ''}`}
            disabled={disabled || item.disabled}
            key={item.value}
            onClick={() => onChange?.(item.value)}
            role="tab"
            type="button"
          >
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
