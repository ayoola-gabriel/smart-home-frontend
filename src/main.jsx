import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DeviceProvider } from './DeviceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeviceProvider>
    <App />
    </DeviceProvider>
  </StrictMode>,
)
