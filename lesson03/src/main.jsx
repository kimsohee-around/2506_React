import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // 최종
// import App from './App_V1'
import { EffectAndRef, FocusInput, PreviousValue } from './RefHookTest'
// import App from "./ArrayTest";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* ref 훅 테스트 */}
    {/* <FocusInput/> */}
    {/* <EffectAndRef /> */}
    {/* <PreviousValue /> */}
  </StrictMode>
)
