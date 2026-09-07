import { FunnelJourneyPage } from '../pages/funnel-journey'
import { PasswordGate } from './PasswordGate'

export function App() {
  return (
    <PasswordGate>
      <FunnelJourneyPage />
    </PasswordGate>
  )
}
