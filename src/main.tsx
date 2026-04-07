import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // <- O SEGREDO ESTÁ AQUI!
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)