import { useEffect, useRef, useState } from 'react'

import funnelImage from '../../../sales-funnel.png'
import interestCasesImage from '../../../интерес.png'
import reachCasesImage from '../../../охваты.png'
import salesCasesImage from '../../../продажи.png'
import reactivationCasesImage from '../../../реактивация.png'
import { useRevealOnVisible } from '../../shared/lib/useRevealOnVisible'

const stages = ['Охваты', 'Интерес', 'Продажи', 'Реактивация']

const defaultInstruments = ['Каскадная реклама', 'Telegram Ads', 'Конструктор чат-ботов']

const contentSteps = [
  {
    title: 'Увеличим знание о вас до 40 %',
    description:
      'Повышайте конверсию в обращение и увеличивайте количество запросов',
    instruments: ['Каскадная реклама', 'Telegram Ads', 'Конструктор чат-ботов'],
    casesImage: reachCasesImage,
  },
  {
    title: 'Ждем текст',
    description: 'Повышайте конверсию в покупку и сокращайте время закрытия сделки',
    instruments: defaultInstruments,
    casesImage: interestCasesImage,
  },
  {
    title: 'Ждем текст',
    description: 'Возвращайте клиентов, увеличивайте число повторных покупок и снижайте затраты на привлечение',
    instruments: defaultInstruments,
    casesImage: salesCasesImage,
  },
  {
    title: 'Увеличим знание о вас до 40%',
    description: 'Повышайте узнаваемость, растите охваты и присутствие бренда',
    instruments: defaultInstruments,
    casesImage: reactivationCasesImage,
  },
]

export function FunnelStageSection() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const { elementRef: revealRef, isVisible: isSceneVisible } = useRevealOnVisible({
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  })
  const [activeStep, setActiveStep] = useState(0)
  const [displayedStep, setDisplayedStep] = useState(0)
  const [isContentLeaving, setIsContentLeaving] = useState(false)
  const content = contentSteps[displayedStep]

  useEffect(() => {
    if (activeStep === displayedStep) {
      setIsContentLeaving(false)
      return undefined
    }

    setIsContentLeaving(true)

    const contentTimer = window.setTimeout(() => {
      setDisplayedStep(activeStep)
      setIsContentLeaving(false)
    }, 460)

    return () => window.clearTimeout(contentTimer)
  }, [activeStep, displayedStep])

  useEffect(() => {
    function updateStep() {
      const section = sectionRef.current
      const scene = sceneRef.current

      if (!section || !scene) {
        return
      }

      const scrollDistance = section.offsetHeight - scene.offsetHeight
      const sceneTop = Math.max(0, (window.innerHeight - scene.offsetHeight) / 2)
      const progress = Math.min(
        1,
        Math.max(0, scrollDistance > 0 ? (sceneTop - section.getBoundingClientRect().top) / scrollDistance : 0),
      )

      setActiveStep(Math.min(contentSteps.length - 1, Math.floor(progress * contentSteps.length)))
    }

    updateStep()

    window.addEventListener('scroll', updateStep, { passive: true })
    window.addEventListener('resize', updateStep)

    return () => {
      window.removeEventListener('scroll', updateStep)
      window.removeEventListener('resize', updateStep)
    }
  }, [])

  return (
    <section className="funnel-stage-section" ref={sectionRef} aria-labelledby="funnel-stage-title">
      <div
        className="funnel-stage-section__scene"
        ref={(element) => {
          sceneRef.current = element
          revealRef.current = element
        }}
      >
        <div className={`funnel-stage-section__container funnel-stage-section__container--reveal${isSceneVisible ? ' is-visible' : ''}`}>
          <div className="funnel-stage-section__visual" aria-label="Этапы воронки">
            <div className="funnel-stage-section__funnel-frame">
              <img className="funnel-stage-section__funnel" src={funnelImage} alt="" />
            </div>
            <ol className="funnel-stage-section__stages">
              {stages.map((stage, index) => (
                <li className={index === activeStep ? 'is-active' : ''} key={stage}>
                  <span className="funnel-stage-section__stage-label">
                    <span>{stage}</span>
                    {index === activeStep && <span className="funnel-stage-section__stage-underline" aria-hidden="true" />}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="funnel-stage-section__content">
            <h1 id="funnel-stage-title">
              <span className="funnel-stage-section__title-secondary">Работаем</span> на&nbsp;всех этапах воронки
            </h1>

            <div
              className={`funnel-stage-section__dynamic-content${isContentLeaving ? ' is-leaving' : ''}`}
              key={displayedStep}
            >
              <div className="funnel-stage-section__description">
                <h2>{content.title}</h2>
                <p>{content.description}</p>
              </div>

              <div className="funnel-stage-section__cases" aria-label="Кейсы клиентов">
                <img className="funnel-stage-section__cases-image" src={content.casesImage} alt="Кейсы клиентов" />
              </div>

              <div className="funnel-stage-section__channels" aria-label="Инструменты рекламы">
                {content.instruments.map((instrument) => (
                  <span className="funnel-stage-section__chip" key={instrument}>{instrument}</span>
                ))}
                <span className="funnel-stage-section__channels-more">ещё 5</span>
              </div>
            </div>

            <button className="funnel-stage-section__button" type="button">
              <span>Обсудить рекламную кампанию</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
