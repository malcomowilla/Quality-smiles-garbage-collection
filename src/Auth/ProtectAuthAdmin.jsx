// Auth/ProtectAuthAdmin.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import {useApplicationSettings} from '../settings/ApplicationSettings'


const ProtectAuthAdmin = ({children}) => {
  const { user,  } = useAuth();
  const {admin, currentUser, setCurrentUser, fetchCurrentUser} = useApplicationSettings()
// admin === true
  // useEffect(() => {
  //   if (currentUser === '') {
  //     fetchCurrentUser();
  //   }
  // }, [currentUser, fetchCurrentUser]);





  console.log('currentUser:', currentUser)
  // if ( currentUser === '') {
  //   return <Navigate to="/signin" replace />;
  // }

  // return <Outlet />;


  if(admin){

    return <Outlet />;


}

    return  <Navigate to="/signin" replace={true} />
};

export default ProtectAuthAdmin;
