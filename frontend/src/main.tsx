import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {  UIProvider} from '@yamada-ui/react'
import { ThemeProvider } from './Themes/ThemeContext.tsx'
import { SelectedThemeProvider } from './Themes/ThemeProvider.tsx'
import { CodeProvider } from './Code/CodeProvider.tsx'
import { LanguageProvider } from './Languages/LanguageProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <ThemeProvider>
        <SelectedThemeProvider>
          <CodeProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </CodeProvider>
        </SelectedThemeProvider>
      </ThemeProvider>
    </UIProvider>
  </StrictMode>,
)
