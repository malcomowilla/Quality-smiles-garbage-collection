// Auth/ProtectAuthAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import { useApplicationSettings } from '../settings/ApplicationSettings';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';



const ProtectAuthAdmin = () => {
  const { user } = useAuth();
  const { admin, currentUser, setCurrentUser, fetchCurrentUser } = useApplicationSettings();
  const [loading, setLoading] = useState(true);


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  useEffect(() => {
    const loadUser = async () => {
      await fetchCurrentUser();
      setLoading(false);
    };

    loadUser();
  }, [fetchCurrentUser]);

  console.log('currentUser:', currentUser);

  if (loading) {
    return <>
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </>
  }
  const isAuthenticated = currentUser && currentUser.id; // Check if currentUser has an ID or any other property that indicates authentication

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" replace={true} />;
  }
};

export default ProtectAuthAdmin;
