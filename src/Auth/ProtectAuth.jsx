
import { useContext, useEffect,useState } from 'react';
import { Navigate , useNavigate, Outlet} from 'react-router-dom';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';



const ProtectAuth = () => {

const {customer, setCustomer,
    handleGetCustomer,customerProfileData

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
      await handleGetCustomer();
      setLoading(false);
    };

    loadUser();
  }, [handleGetCustomer]);



  if (loading) {
    return <>
        <Lottie className='relative z-50' options={defaultOptions}
         height={400} width={400} />
    
     </>
  }
  const isAuthenticated = customerProfileData && customerProfileData.id
  // Check if currentUser has an ID or any other property that indicates authentication

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/customer_role" replace={true} />;
  }

// return customer ? <Outlet/> :  <Navigate to='/customer_role' replace />

    // if (customer === undefined) {
    //     return null;
    //   }
    
    //   if (!customer) {
    
    //     return <Navigate to='/customer_role' replace />;
    //   }
    
    //   return children;
    };


export default ProtectAuth



