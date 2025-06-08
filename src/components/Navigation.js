import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  MonitorHeart as MonitorIcon,
  LocalHospital as EmergencyIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Consultation', path: '/consultation', icon: <HospitalIcon /> },
  { name: 'Health Monitoring', path: '/health-monitoring', icon: <MonitorIcon /> },
  { name: 'Medications', path: '/medications', icon: <MedicalIcon /> },
  { name: 'Emergency', path: '/emergency', icon: <EmergencyIcon /> },
  { name: 'Community', path: '/community', icon: <PeopleIcon /> },
];

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Healthcare Consultation
        </Typography>
      </Box>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            key={page.name}
            component={RouterLink}
            to={page.path}
            selected={location.pathname === page.path}
            sx={{
              color: 'inherit',
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
            {/* Logo - Desktop */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <HospitalIcon sx={{ fontSize: 32 }} />
              Healthcare Consultation
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: 280,
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>

            {/* Logo - Mobile */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <HospitalIcon sx={{ fontSize: 28 }} />
              Healthcare
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  startIcon={page.icon}
                  sx={{
                    my: 2,
                    color: 'text.primary',
                    display: 'flex',
                    mx: 1,
                    px: 2,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                    },
                    ...(location.pathname === page.path && {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                    }),
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Right Side Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Notifications">
                <IconButton color="inherit" sx={{ color: 'text.primary' }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    alt="User" 
                    src="/static/images/avatar/2.jpg"
                    sx={{ 
                      width: 40, 
                      height: 40,
                      border: '2px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navigation;