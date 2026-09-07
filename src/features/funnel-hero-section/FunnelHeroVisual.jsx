import { useEffect, useState } from 'react'

import './FunnelHeroVisual.css'
import logoSet1 from '../../assets/figma/hero-logos/logo-set-1.png'
import logoSet2 from '../../assets/figma/hero-logos/logo-set-2.png'
import logoSet3 from '../../assets/figma/hero-logos/logo-set-3.png'
import logoSet4 from '../../assets/figma/hero-logos/logo-set-4.png'
import logoSet5 from '../../assets/figma/hero-logos/logo-set-5.png'
import logoSet6 from '../../assets/figma/hero-logos/logo-set-6.png'
import logoSet7 from '../../assets/figma/hero-logos/logo-set-7.png'

const logoSets = [logoSet1, logoSet2, logoSet3, logoSet4, logoSet5, logoSet6, logoSet7]
const logoSlotNames = ['one', 'two', 'three', 'four']

function selectRandomLogos(previousLogos = []) {
  const shuffledLogos = [...logoSets].sort(() => Math.random() - 0.5)
  const freshLogos = shuffledLogos.filter((logo) => !previousLogos.includes(logo))

  return [...freshLogos, ...shuffledLogos.filter((logo) => previousLogos.includes(logo))].slice(0, 4)
}

export function FunnelHeroVisual() {
  const [visibleLogos, setVisibleLogos] = useState(selectRandomLogos)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const rotationInterval = window.setInterval(() => {
      setVisibleLogos((currentLogos) => selectRandomLogos(currentLogos))
    }, 6000)

    return () => window.clearInterval(rotationInterval)
  }, [])

  return (
    <div className="funnel-hero-visual" aria-hidden="true">
      {visibleLogos.map((logo, index) => (
        <img
          className={`funnel-hero-visual__logo funnel-hero-visual__logo--${logoSlotNames[index]} funnel-hero-visual__logo--animated${logo === logoSet7 ? ' funnel-hero-visual__logo--vkusno' : ''}`}
          key={`${logo}-${index}`}
          src={logo}
          alt=""
        />
      ))}
    </div>
  )
}
