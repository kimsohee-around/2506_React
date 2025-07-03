import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// import App from "./App_V1";
// import App from "./ArrayTest";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
