import { useState } from 'react'

import { LightRibbonCanvas } from '../../features/light-ribbon'
import './TintLabPage.css'

export function TintLabPage() {
  const [renderKey, setRenderKey] = useState(0)

  return (
    <main className="tint-lab">
      <LightRibbonCanvas key={renderKey} />

      <header className="tint-lab__header">
        <p>Тестовый стенд</p>
        <h1>Световой поток</h1>
      </header>

      <div className="tint-lab__note">
        <p>
          Объёмная нижняя лента, тонкий верхний кант и локальный блик рисуются отдельными
          кривыми — поэтому форма остаётся похожей на референс, а не превращается в конус.
        </p>
        <button onClick={() => setRenderKey((currentKey) => currentKey + 1)} type="button">
          Перезапустить анимацию
        </button>
      </div>
    </main>
  )
}
