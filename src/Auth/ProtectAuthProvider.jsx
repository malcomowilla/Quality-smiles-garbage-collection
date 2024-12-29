
import { useContext, useEffect, useState } from 'react';
import { Navigate , useNavigate, Outlet} from 'react-router-dom';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';




const ProtectAuthProvider = () => {

const {serviceProvider, providerData,
    handleGetServiceProvider
} = useApplicationSettings()
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
      await handleGetServiceProvider();
      setLoading(false);
    };

    loadUser();
  }, [ handleGetServiceProvider]);


  if (loading) {
    return <>
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </>
  }
  const isAuthenticated = providerData && providerData.id; // Check if currentUser has an ID or any other property that indicates authentication

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/service_provider_role" replace={true} />;
  }



// return serviceProvider ? <Outlet/> :  <Navigate to='/service_provider_role' replace={true} />

 
    };


export default ProtectAuthProvider



