// Auth/ProtectAuthAdmin.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import {useApplicationSettings} from '../settings/ApplicationSettings'
const ProtectAuthAdmin = () => {
  const { user,  } = useAuth();
  const {admin} = useApplicationSettings()

  // useEffect(() => {
  //   if (!user) {
  //     fetchCurrentUser();
  //   }
  // }, [user, fetchCurrentUser]);
  if (admin === false) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectAuthAdmin;
