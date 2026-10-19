import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { CompareProvider } from './context/CompareContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
