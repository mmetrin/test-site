import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { PasswordGate } from './app'
import './index.css'
import { DcpPage } from './pages/dcp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordGate>
      <DcpPage />
    </PasswordGate>
  </StrictMode>,
)
