import { createTheme, ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D6936', // Your brand forest green
      light: '#A5D6A7',
      dark: '#1e4624',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2D6936',
    },
    background: {
      default: '#F8F9F8', // The light off-white from your screenshot
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  shape: {
    borderRadius: 12, // More rounded, friendly UI
  },
});
export default theme