import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './styles/global.css';

// Lazy load components
const Homepage = lazy(() => import('./pages/Homepage'));
const SymptomsList = lazy(() => import('./pages/SymptomsList'));
const ConsultationForm = lazy(() => import('./pages/ConsultationForm'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const MedicationManagement = lazy(() => import('./components/MedicationManagement'));
const HealthMonitoring = lazy(() => import('./components/HealthMonitoring'));
const Emergency = lazy(() => import('./components/Emergency'));
const Community = lazy(() => import('./components/Community'));

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Loading component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/symptoms" element={<SymptomsList />} />
                <Route path="/consultation" element={<ConsultationForm />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/medications" element={<MedicationManagement />} />
                <Route path="/health-monitoring" element={<HealthMonitoring />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/community" element={<Community />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;