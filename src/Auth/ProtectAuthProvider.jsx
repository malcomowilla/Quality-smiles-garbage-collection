
import { useContext, useEffect } from 'react';
import { Navigate , useNavigate, Outlet} from 'react-router-dom';
import {useApplicationSettings} from '../settings/ApplicationSettings'

const ProtectAuthProvider = () => {

const {serviceProvider} = useApplicationSettings()











return serviceProvider ? <Outlet/> :  <Navigate to='/service_provider_role' replace={true} />

    // if (customer === undefined) {
    //     return null;
    //   }
    
    //   if (!customer) {
    
    //     return <Navigate to='/customer_role' replace />;
    //   }
    
    //   return children;
    };


export default ProtectAuthProvider



