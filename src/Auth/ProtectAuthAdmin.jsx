// Auth/ProtectAuthAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import { useApplicationSettings } from '../settings/ApplicationSettings';

const ProtectAuthAdmin = () => {
  const { user } = useAuth();
  const { admin, currentUser, setCurrentUser, fetchCurrentUser } = useApplicationSettings();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await fetchCurrentUser();
      setLoading(false);
    };

    loadUser();
  }, [fetchCurrentUser]);

  console.log('currentUser:', currentUser);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }
  const isAuthenticated = currentUser && currentUser.id; // Check if currentUser has an ID or any other property that indicates authentication

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" replace={true} />;
  }
};

export default ProtectAuthAdmin;
