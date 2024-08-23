import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// El signo de (!) es para desirle de alguna manera a typescript que nuestroe elemento no va a ser null
// (!) "Assertion not null" o tambien se le conoce como "non null assertion operator"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
