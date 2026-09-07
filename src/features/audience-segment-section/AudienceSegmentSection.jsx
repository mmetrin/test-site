import { useState } from 'react'

import { AudienceDataScene } from './AudienceDataScene'
import { useRevealOnVisible } from '../../shared/lib/useRevealOnVisible'
import { SegmentedControl } from '../../shared/ui/segmented-control/SegmentedControl'
import './AudienceSegmentSection.css'

const audienceSegments = [
  { label: 'Крупному и среднему бизнесу', value: 'enterprise' },
  { label: 'Малому бизнесу', value: 'small-business' },
  { label: 'Паблишерам', value: 'publishers' },
  { label: 'Блогерам', value: 'bloggers' },
]

export function AudienceSegmentTabs({ activeSegment, onChange }) {
  return (
    <div className="audience-segment-section__tabs">
      <SegmentedControl items={audienceSegments} onChange={onChange} value={activeSegment} />
    </div>
  )
}

export function AudienceSegmentSection({ activeSegment: controlledSegment, onSegmentChange, hideTabs = false }) {
  const [internalSegment, setInternalSegment] = useState(audienceSegments[0].value)
  const activeSegment = controlledSegment ?? internalSegment
  const handleSegmentChange = onSegmentChange ?? setInternalSegment
  const { elementRef: dataContentRef, isVisible: isDataContentVisible } = useRevealOnVisible({
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px',
    once: true,
  })

  return (
    <section className="audience-segment-section" aria-label="Аудитории MTS Ads">
      {!hideTabs && <AudienceSegmentTabs activeSegment={activeSegment} onChange={handleSegmentChange} />}

      <div className="audience-segment-section__data" aria-labelledby="audience-data-title">
        <h2
          className={`audience-segment-section__data-title${isDataContentVisible ? ' audience-segment-section__data-title--visible' : ''}`}
          id="audience-data-title"
        >
          <span>Анализируем больше данных —</span>
          <strong>точнее находим ваших клиентов</strong>
        </h2>

        <div
          ref={dataContentRef}
          className={`audience-segment-section__content${isDataContentVisible ? ' audience-segment-section__content--visible' : ''}`}
        >
          <AudienceDataScene isVisible={isDataContentVisible} />
          <p className="audience-segment-section__caption audience-segment-section__caption--mts audience-segment-section__reveal audience-segment-section__reveal--caption"><strong>Подберём точную аудиторию среди 65+ млн абонентов МТС</strong> на основе их интересов, интернет-поведения, звонков и гео-данных</p>
          <p className="audience-segment-section__caption audience-segment-section__caption--partners audience-segment-section__reveal audience-segment-section__reveal--right"><strong>Обогащаем выборку данными от партнёров</strong> — знаем детали о реальных покупках на товары вашей категории или бренд</p>
        </div>
      </div>
    </section>
  )
}
