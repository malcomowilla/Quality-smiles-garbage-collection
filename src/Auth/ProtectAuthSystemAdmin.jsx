
// Auth/ProtectAuthAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import { useApplicationSettings } from '../settings/ApplicationSettings';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import Backdrop from '@mui/material/Backdrop';


const ProtectAuthSystemAdmin = () => {
  const { user } = useAuth();



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { 
    
    currentSystemAdmin, setCurrntSystemAdmin,
    fectCurrentSystemAdmin } = useApplicationSettings();
  const [loading, setLoading] = useState(true);
  const [openLoad, setopenLoad] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      await fectCurrentSystemAdmin();
      setLoading(false);
      setopenLoad(false)
    };

    loadUser();
  }, [fectCurrentSystemAdmin]);


  if (loading) {
    return <>
      <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
      </Backdrop>
    
     </>
  }
  const isAuthenticated = currentSystemAdmin && currentSystemAdmin.id; // Check if currentUser has an ID or any other property that indicates authentication

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login-system-admin" replace={true} />;
  }
};

export default ProtectAuthSystemAdmin;
