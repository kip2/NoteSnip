import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {  UIProvider} from '@yamada-ui/react'
import { ThemeProvider } from './Themes/ThemeContext.tsx'
import { SelectedThemeProvider } from './Themes/ThemeProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <ThemeProvider>
        <SelectedThemeProvider>
        <App />
        </SelectedThemeProvider>
      </ThemeProvider>
    </UIProvider>
  </StrictMode>,
)
