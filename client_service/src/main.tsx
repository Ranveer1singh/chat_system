import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from "./theme/Theme.tsx"
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider } from "react-redux"
import { store } from "./store/index.ts"
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)
