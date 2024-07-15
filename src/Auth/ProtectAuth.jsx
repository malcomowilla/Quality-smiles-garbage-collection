
import { useContext, useEffect } from 'react';
import { Navigate , useNavigate, Outlet} from 'react-router-dom';
import {useApplicationSettings} from '../settings/ApplicationSettings'

const ProtectAuth = () => {

const {customer, setCustomer} = useApplicationSettings()











return customer ? <Outlet/> :  <Navigate to='/customer_role' replace />

    // if (customer === undefined) {
    //     return null;
    //   }
    
    //   if (!customer) {
    
    //     return <Navigate to='/customer_role' replace />;
    //   }
    
    //   return children;
    };


export default ProtectAuth



