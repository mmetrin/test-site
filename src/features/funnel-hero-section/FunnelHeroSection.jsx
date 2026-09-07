import './FunnelHeroSection.css'
import { FunnelHeroVisual } from './FunnelHeroVisual'
import { FunnelHeroBackground } from './FunnelHeroBackground'
import chevronIcon from '../../assets/figma/dcp/chevron-down.svg'
import mtsLogo from '../../../logos/main-mts.svg'
import { usePageReady } from '../../shared/lib/usePageReady'
import { ActionButton } from '../../shared/ui/action-button/ActionButton'

const navigationItems = [
  { label: 'Решения', hasChevron: true },
  { label: 'Платформы', hasChevron: true },
  { label: 'Медиа', hasChevron: false },
  { label: 'Контакты', hasChevron: false },
]

const facts = [
  { detail: 'от самого крупного оператора страны', text: 'активной аудитории', suffix: '+', unit: 'млн', value: '65' },
  { detail: 'для формирования сегмента', text: 'параметров ЦА', value: '5 000' },
  { detail: 'сегментов', text: 'уже готовых', suffix: '+', value: '350' },
]

function HeaderLogo() {
  return (
    <a className="funnel-hero__logo" href="#top" aria-label="MTS Ads">
      <img src={mtsLogo} alt="МТС Ads" />
    </a>
  )
}

export function FunnelHeroSection() {
  const isReady = usePageReady()

  return (
    <section className={`funnel-hero${isReady ? ' funnel-hero--ready' : ''}`} id="top" aria-labelledby="funnel-hero-title">
      <FunnelHeroBackground />
      <div className="funnel-hero__inner">
        <header className="funnel-hero__header">
          <HeaderLogo />

          <nav className="funnel-hero__navigation" aria-label="Основная навигация">
            {navigationItems.map((item) => (
              <a className="funnel-hero__navigation-link" href="#top" key={item.label}>
                {item.label}
                {item.hasChevron && <img src={chevronIcon} alt="" />}
              </a>
            ))}
          </nav>

          <ActionButton className="funnel-hero__header-button" size="medium">
            Запустить рекламу
          </ActionButton>
        </header>

        <div className="funnel-hero__copy">
          <div>
            <h1 id="funnel-hero-title">
              Единое решение <strong>для продвижения бизнеса</strong> любого масштаба
            </h1>
            <p>
              Крупнейшие компании уже растят бизнес с помощью инструментов <strong>MTS ADS</strong>
            </p>
          </div>

          <ActionButton className="funnel-hero__cta">Запустить рекламу с MTS ADS</ActionButton>
        </div>

        <FunnelHeroVisual />

        <div className="funnel-hero__facts" aria-label="Преимущества MTS Ads">
          {facts.map((fact) => (
            <article className="funnel-hero__fact" key={fact.value}>
              <p className="funnel-hero__fact-value">
                {fact.value}
                {fact.suffix && <span className="funnel-hero__fact-suffix">{fact.suffix}</span>}
                {fact.unit && <span>{fact.unit}</span>}
              </p>
              <p className="funnel-hero__fact-text">
                <span className="funnel-hero__fact-text-accent">{fact.text}</span>
                {fact.detail && (
                  <>
                    <br />
                    <span>{fact.detail}</span>
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
