import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Home as HomeIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  MonitorHeart as MonitorIcon,
  LocalHospital as EmergencyIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const features = [
  {
    title: 'Health Monitoring',
    description: 'Track your vital signs and health metrics in real-time. Get insights into your health trends and receive alerts for any abnormalities.',
    icon: <MonitorIcon sx={{ fontSize: 60 }} />,
    path: '/health-monitoring',
    color: '#4CAF50',
  },
  {
    title: 'Medication Management',
    description: 'Manage your medications, set reminders, and track your medication history. Never miss a dose with our smart reminder system.',
    icon: <MedicalIcon sx={{ fontSize: 60 }} />,
    path: '/medications',
    color: '#2196F3',
  },
  {
    title: 'Emergency Services',
    description: 'Quick access to emergency services and contacts. One-click calling for emergency situations and easy access to your emergency contacts.',
    icon: <EmergencyIcon sx={{ fontSize: 60 }} />,
    path: '/emergency',
    color: '#F44336',
  },
  {
    title: 'Medical Consultation',
    description: 'Connect with healthcare professionals for medical advice and consultations. Get expert guidance for your health concerns.',
    icon: <HospitalIcon sx={{ fontSize: 60 }} />,
    path: '/consultation',
    color: '#9C27B0',
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          height: isMobile ? '60vh' : '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 2,
                }}
              >
                Your Health, Our Priority
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                Comprehensive healthcare management at your fingertips. Monitor your health, manage medications, and access emergency services all in one place.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/consultation')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Get Started
              </Button>
            </Box>
          </Fade>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ ml: 2, fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {feature.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(feature.path)}
                      sx={{
                        mt: 2,
                        borderColor: feature.color,
                        color: feature.color,
                        '&:hover': {
                          borderColor: feature.color,
                          backgroundColor: `${feature.color}10`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to Take Control of Your Health?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Start managing your health today with our comprehensive healthcare platform.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/health-monitoring')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Start Monitoring
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;