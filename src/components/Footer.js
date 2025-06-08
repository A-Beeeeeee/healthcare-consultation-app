import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Healthcare Consultation
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Your trusted partner in healthcare management. We provide comprehensive solutions for monitoring your health, managing medications, and accessing emergency services.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                Home
              </Link>
              <Link href="/consultation" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                Consultation
              </Link>
              <Link href="/health-monitoring" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                Health Monitoring
              </Link>
              <Link href="/medications" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                Medications
              </Link>
              <Link href="/emergency" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                Emergency
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon />
                <Typography variant="body2">support@healthcare.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon />
                <Typography variant="body2">
                  123 Healthcare Street<br />
                  Medical District, MD 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Healthcare Consultation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;