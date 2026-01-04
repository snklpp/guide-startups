import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DomainExplorer from './pages/DomainExplorer';
import IdeaDetail from './pages/IdeaDetail';
import Dashboard from './pages/Dashboard';

// Placeholder components for now
const Footer = () => (
  <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    © 2026 AI Startup Ideas Explorer. Built for Builders.
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/domains" element={<DomainExplorer />} />
              <Route path="/idea/:ideaId" element={<IdeaDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
