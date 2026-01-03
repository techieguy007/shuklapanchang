import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initProtection } from './utils/protect'

// Initialize protection
initProtection()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
