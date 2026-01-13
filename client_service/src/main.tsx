import {createTheme, CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material" 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from "./theme/Theme.tsx"



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
