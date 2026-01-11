import {createTheme, ThemeProvider} from "@mui/material" 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';

// Register the custom element
defineElement(lottie.loadAnimation);

const theme = createTheme({})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
