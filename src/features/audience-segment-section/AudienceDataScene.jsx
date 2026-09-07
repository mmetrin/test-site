import { useEffect, useRef } from 'react'
import bigDataMtsImage from '../../assets/figma/dcp/big-data/big-data-mts.svg'
import dataOrbImage from '../../assets/figma/audience-data/data-orb.png'
import dataOrbMask from '../../assets/figma/audience-data/data-orb-mask.svg'
import dataPlusImage from '../../assets/figma/audience-data/audience-data-img.png'
import dataRingImage from '../../assets/figma/audience-data/data-ring.png'
import dataShapeImage from '../../assets/figma/audience-data/planet.png'
import { AudienceCursorTrail } from './AudienceCursorTrail'
import { AudienceDataChannels } from './AudienceDataChannels'
import { AudienceTransferImpulses } from './AudienceTransferImpulses'
import { AudiencePartnerLogos } from './AudiencePartnerLogos'
import './AudienceDataScene.css'

// Retained as a reversible backup: enable to restore the original plus intro.
const SHOW_DATA_INTRO = false

export function AudienceDataScene({ isVisible }) {
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!isVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const flowNames = new Set([
      'audience-data-flow',
      'audience-data-symbol-flow',
      'audience-transfer-impulse',
    ])
    const animations = sceneRef.current.getAnimations({ subtree: true })
      .filter((animation) => flowNames.has(animation.animationName))
    const startedAt = performance.now()
    let frame

    function slowDown(now) {
      const progress = Math.min((now - startedAt) / 6000, 1)
      // Preserve each animation's current position while easing from 2.4× to 1×.
      const rate = 1 + 1.4 * (1 - progress) ** 2
      animations.forEach((animation) => animation.updatePlaybackRate(rate))
      if (progress < 1) frame = requestAnimationFrame(slowDown)
    }

    slowDown(startedAt)
    return () => {
      cancelAnimationFrame(frame)
      animations.forEach((animation) => animation.updatePlaybackRate(1))
    }
  }, [isVisible])

  return (
    <div ref={sceneRef} className={`audience-data-scene${SHOW_DATA_INTRO ? ' audience-data-scene--with-intro' : ''}`}>
      <img className="audience-data-scene__orbit" src={dataShapeImage} alt="" />
      <img className="audience-data-scene__label" src={bigDataMtsImage} alt="Big Data MTS" />
      <div className="audience-data-scene__intro-decoration" hidden={!SHOW_DATA_INTRO} aria-hidden="true">
        <div className="audience-data-scene__orb" style={{ maskImage: `url(${dataOrbMask})` }}>
          <img src={dataOrbImage} alt="" />
        </div>
        <img className="audience-data-scene__ring" src={dataRingImage} alt="" />
        <img className="audience-data-scene__plus-image" src={dataPlusImage} alt="" />
        <div className="audience-data-scene__plus">
          <span />
          <span />
        </div>
      </div>
      <AudienceDataChannels />
      <AudienceTransferImpulses />
      <AudiencePartnerLogos />
      <AudienceCursorTrail />
    </div>
  )
}
