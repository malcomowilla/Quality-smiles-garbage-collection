import React, { useState, useEffect } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  BottomNavigation, 
  BottomNavigationAction,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LockResetIcon from '@mui/icons-material/LockReset';
import ClientList from './ClientList';
import InviteClient from './InviteClient';
import Settings from './Settings';
import { ToastContainer, toast, Slide } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import ResetPassword from '../components/ResetPassword';
import UptimeDisplay from './UptimeDisplay';
import UptimeStats from './UptimeStats';

const DashboardSytemAdmin = () => {
  const [value, setValue] = useState(0);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    const response = await fetch('/api/logout_system_admin', {
      method: 'DELETE'
    });
  
    if (response.ok) {
      toast.success("Logged out successfully!", { transition: Slide });
      setTimeout(() => {
        window.location.href = '/login-system-admin';
      }, 1000);
    } else {
      toast.error("Logout failed. Please try again.", { transition: Slide });
    }
  };

  const getPageTitle = () => {
    if (showResetPassword) return "Reset Password";
    switch (value) {
      case 0: return "System Statistics";
      case 1: return "Client Management";
      case 2: return "Settings";
      case 3: return "Invite Client";
      default: return "Dashboard";
    }
  };

  const navigationItems = [
    { label: "Stats", icon: <DashboardIcon />, value: 0 },
    // { label: "Clients", icon: <PeopleIcon />, value: 1 },
    { label: "Settings", icon: <SettingsIcon />, value: 2 },
    { label: "Reset Password", icon: <LockResetIcon />, value: -1 },
    { label: "Invite Client", icon: <PeopleIcon />, value: 3 },
  ];

  const pageTransitionVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <>
      <ToastContainer 
        position='top-center' 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        draggable 
        pauseOnHover 
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f7fa' }}>
        <CssBaseline />
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { sm: 'none' }, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                {getPageTitle()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UptimeDisplay />
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.light',
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Side Navigation for larger screens */}
          <Box
            component="nav"
            sx={{
              width: 250,
              flexShrink: 0,
              display: { xs: 'none', sm: 'block' },
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              bgcolor: 'white',
            }}
          >
            <List sx={{ pt: 2 }}>
              {navigationItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Reset Password") {
                      setShowResetPassword(true);
                      setValue(-1);
                    } else {
                      setValue(item.value);
                      setShowResetPassword(false);
                    }
                  }}
                  sx={{
                    mb: 1,
                    mx: 1,
                    borderRadius: 2,
                    bgcolor: value === item.value ? 'rgba(0, 128, 0, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 128, 0, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'green' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'rgba(211, 47, 47, 0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>

          {/* Mobile drawer */}
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
            sx={{ display: { sm: 'none' } }}
          >
            <Box
              sx={{
                width: 250,
                pt: 2,
                bgcolor: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <List>
                {navigationItems.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    onClick={() => {
                      if (item.label === "Reset Password") {
                        setShowResetPassword(true);
                        setValue(-1);
                      } else {
                        setValue(item.value);
                        setShowResetPassword(false);
                      }
                      setDrawerOpen(false);
                    }}
                    sx={{
                      mb: 1,
                      mx: 1,
                      borderRadius: 2,
                      bgcolor: value === item.value ? 'rgba(0, 128, 0, 0.1)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(0, 128, 0, 0.05)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'green' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
                <ListItem
                  button
                  onClick={handleLogout}
                  sx={{
                    mb: 1,
                    mx: 1,
                    borderRadius: 2,
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'rgba(211, 47, 47, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'error.main' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>

          {/* Main content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
            <AnimatePresence mode="wait">
              {showResetPassword ? (
                <ResetPassword onClose={() => {
                  setShowResetPassword(false);
                  setValue(0);
                }} />
              ) : (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {value === 0 && <UptimeStats />}
                  {value === 1 && <ClientList />}
                  {value === 2 && <Settings />}
                  {value === 3 && <InviteClient />}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {/* Bottom navigation for mobile */}
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels
          sx={{ 
            display: { xs: 'flex', sm: 'none' },
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 65,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            bgcolor: 'white',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(0, 0, 0, 0.6)',
              '&.Mui-selected': {
                color: 'green'
              }
            }
          }}
        >
          {navigationItems.slice(0, 3).map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => {
                setValue(item.value);
                setShowResetPassword(false);
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
    </>
  );
};

export default DashboardSytemAdmin;