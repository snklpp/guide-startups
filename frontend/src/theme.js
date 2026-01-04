import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914', // Classic Red
      light: '#FF1F1F',
      dark: '#B20710',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#050505',
      paper: '#101010',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF', // Cool Gray
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '10px 28px',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          boxShadow: '0 4px 14px 0 rgba(229, 9, 20, 0.39)',
          '&:hover': {
            backgroundColor: '#FF1F1F',
            boxShadow: '0 6px 20px rgba(229, 9, 20, 0.23)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
