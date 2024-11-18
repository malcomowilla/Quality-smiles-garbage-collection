import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarSystemAdmin from './SidebarSystemAdmin';
import ClientList from './ClientList';
import InviteClient from './InviteClient';
import Settings from './Settings'; // Import the Settings component
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout'; // Import Logout icon

const DashboardSytemAdmin = () => {
  const [value, setValue] = useState(0);


  const handleLogout = async () => {
    const response = await fetch('/api/logout_system_admin',{
      method: 'DELETE'
    });
  
    if (response.ok) { // Check if the response is successful
      toast.success("Logged out successfully!", { transition: Slide }); // Show toast notification
      // Optionally, redirect to the login page or home page
      setTimeout(() => {
        window.location.href = '/login-system-admin'; // Redirect after a short delay
      }, 1000); // Delay for 1 second to allow the toast to be seen
    } else {
      toast.error("Logout failed. Please try again.", { transition: Slide }); // Show error notification
    }
  }



  return (

    <>
     <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            System Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component={motion.main} sx={{ flexGrow: 1, p: 2 }}>
        {value === 0 && <InviteClient Sliding={Slide}/>}
        {value === 1 && <ClientList />}
        {value === 2 && <Settings />} {/* Add Settings component */}
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          console.log('navigat')
          setValue(newValue);
        }}
        showLabels
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'green' }}

        
      >
         <BottomNavigationAction  
          sx={{
            color: 'black', // Set the color for the label
            '& .MuiSvgIcon-root': {
              color: 'black', // Set the color for the icon
            },
          }}
         label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
        {/* <BottomNavigationAction label="Invite" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Clients" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />  */}
 <div className="block-container">
            <div className="btn-back btn-back-1"></div>
            <div className="btn-front">
              <BottomNavigationAction onClick={()=> setValue(1)} label="Invite" icon={<PeopleIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
          <div className="block-container">
            <div className="btn-back btn-back-2"></div>
            <div className="btn-front">
              <BottomNavigationAction    onClick={()=> setValue(0)}   label="Clients" icon={<DashboardIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
          <div className="block-container">
            <div className="btn-back btn-back-3"></div>
            <div className="btn-front">
              <BottomNavigationAction label="Settings"   onClick={()=> setValue(2)}    icon={<SettingsIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
      </BottomNavigation>
    </Box>

    </>
  );
};

export default DashboardSytemAdmin;