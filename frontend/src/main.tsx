import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {  UIProvider} from '@yamada-ui/react'
import { ThemeProvider } from './Themes/ThemeContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UIProvider>
  </StrictMode>,
)
