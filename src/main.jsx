import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Research from './research/index.jsx'
import Blur from './blur/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Research />
    <Blur />
  </StrictMode>,
)
