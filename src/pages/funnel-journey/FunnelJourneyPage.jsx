import { useState } from 'react'

import { AudienceSegmentSection, AudienceSegmentTabs } from '../../features/audience-segment-section'
import { FunnelStageSection } from '../../features/funnel-stage-section'
import { FunnelHeroSection } from '../../features/funnel-hero-section'
import { LightGlowCanvas } from '../../features/light-glow'
import formImage from '../../../form.png'
import { usePageScrollRestoration } from '../../shared/lib/usePageScrollRestoration'
import { useScrollReveal } from '../../shared/lib/useScrollReveal'
import './FunnelJourneyPage.css'

export function FunnelJourneyPage() {
  const [activeSegment, setActiveSegment] = useState('enterprise')
  const [funnelTransition, setFunnelTransition] = useState('idle')
  usePageScrollRestoration()
  useScrollReveal('.funnel-journey-page__scroll-reveal', {
    threshold: 0.04,
    rootMargin: '0px 0px -8% 0px',
  })

  return (
    <main className="funnel-journey-page">
      <FunnelHeroSection />
      <AudienceSegmentTabs activeSegment={activeSegment} onChange={setActiveSegment} />
      <FunnelStageSection onTransitionChange={setFunnelTransition} />
      <AudienceSegmentSection
        activeSegment={activeSegment}
        funnelTransition={funnelTransition}
        hideTabs
        onSegmentChange={setActiveSegment}
      />
      <section className="funnel-journey-page__feedback funnel-journey-page__scroll-reveal" aria-label="Форма обратной связи">
        <LightGlowCanvas />
        <img src={formImage} alt="Форма обратной связи" />
      </section>
    </main>
  )
}
