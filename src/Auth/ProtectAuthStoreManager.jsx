
import { useContext, useEffect } from 'react';
import { Navigate , useNavigate, Outlet} from 'react-router-dom';
import {useApplicationSettings} from '../settings/ApplicationSettings'

const ProtectAuthStoreManager = () => {

const {storeManager} = useApplicationSettings()











return storeManager ? <Outlet/> :  <Navigate to='/store_manager_role' replace />

    // if (customer === undefined) {
    //     return null;
    //   }
    
    //   if (!customer) {
    
    //     return <Navigate to='/customer_role' replace />;
    //   }
    
    //   return children;
    };


export default ProtectAuthStoreManager



