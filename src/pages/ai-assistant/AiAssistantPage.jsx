import aiAssistantImage from '../../assets/funnel-journey/ai-assistant.png'
import { LightGlowCanvas } from '../../features/light-glow'
import { usePageScrollRestoration } from '../../shared/lib/usePageScrollRestoration'

import './AiAssistantPage.css'

export function AiAssistantPage() {
  usePageScrollRestoration()

  return (
    <main className="ai-assistant-page">
      <section className="ai-assistant-page__content" aria-label="ИИ-ассистент для запуска рекламной кампании">
        <LightGlowCanvas />
        <img src={aiAssistantImage} alt="ИИ-ассистент поможет создать и запустить рекламную кампанию" />
      </section>
    </main>
  )
}
