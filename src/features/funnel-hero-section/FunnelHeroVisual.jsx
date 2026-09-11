import { useEffect, useState } from 'react'

import './FunnelHeroVisual.css'
import logoSet01 from '../../../logoset-new/logo-set-01.png'
import logoSet02 from '../../../logoset-new/logo-set-02.png'
import logoSet03 from '../../../logoset-new/logo-set-03.png'
import logoSet04 from '../../../logoset-new/logo-set-04.png'
import logoSet05 from '../../../logoset-new/logo-set-05.png'
import logoSet06 from '../../../logoset-new/logo-set-06.png'
import logoSet07 from '../../../logoset-new/logo-set-07.png'
import logoSet08 from '../../../logoset-new/logo-set-08.png'
import logoSet09 from '../../../logoset-new/logo-set-09.png'
import logoSet10 from '../../../logoset-new/logo-set-10.png'
import logoSet11 from '../../../logoset-new/logo-set-11.png'
import logoSet12 from '../../../logoset-new/logo-set-12.png'
import logoSet13 from '../../../logoset-new/logo-set-13.png'

const logoSets = [
  logoSet01,
  logoSet02,
  logoSet03,
  logoSet04,
  logoSet05,
  logoSet06,
  logoSet07,
  logoSet08,
  logoSet09,
  logoSet10,
  logoSet11,
  logoSet12,
  logoSet13,
]
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
          className={`funnel-hero-visual__logo funnel-hero-visual__logo--${logoSlotNames[index]} funnel-hero-visual__logo--animated`}
          key={`${logo}-${index}`}
          src={logo}
          alt=""
        />
      ))}
    </div>
  )
}
