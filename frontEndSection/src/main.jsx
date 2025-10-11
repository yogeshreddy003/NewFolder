import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CartProvider } from './keyComponents/Cart/CartContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
