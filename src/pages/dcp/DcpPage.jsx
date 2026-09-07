import { DcpHeroSection } from '../../features/dcp-hero-section'
import { DcpServiceModeSection } from '../../features/dcp-service-mode-section'
import './DcpPage.css'

export function DcpPage() {
  return (
    <main className="dcp-page">
      <DcpHeroSection />
      <DcpServiceModeSection />
    </main>
  )
}
