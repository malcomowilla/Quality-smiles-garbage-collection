import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Signup from './Auth/Signup'
import {HomePage} from './Home/HomePage'
import SignIn from './Auth/SignIn'
import Admin from './Admin/Admin'
import Services from './services/Services'
import {useEffect, useState} from 'react'
import {useApplicationSettings} from './settings/ApplicationSettings'
import Location from './location/Location'
import Sublocation from './location/Sublocation'
import Payment from './payment/Payment'
import Store from './store/Store'
import Collections from './collections/Collections'
import CollectionRequests from './collections/CollectionRequests'
import Expenses from './Expenses/Expenses'
import Customers from './Customers/Customers'
import ServiceProvider from './service_provider/ServiceProvider'
import ManageUsers from './user_management/ManageUsers'
import QrCode from './QrCode/QrCode'
import CustomerForm from './form/CustomerForm'
import ServiceProviderForm from './form/ServiceProviderForm'
import ProviderConfirmation  from './collections/ProviderConfirmation'
import CustomerConfirmation from './collections/CustomerConfirmation'
import ProviderCollections from './form/ProviderCollections'
import CustomerRequest from './form/CustomerRequest'
import Driver from './driver/Driver'
 import ChooseRole from './choose_role/ChooseRole'
 import  {GeneralSettings} from './settings/GeneralSettings'
import Dashboard from './dashboard/Dashboard'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CustomerRole from './login_role/CustomerRole'
import ServiceProviderRole from './login_role/ServiceProviderRole'
import ProtectAuth from './Auth/ProtectAuth'
import ProtectAuthProvider from './Auth/ProtectAuthProvider'
import NotFound from './404/NotFound'
import StoreManager from './store/StoreManager'
import StoreManagerRole from './login_role/StoreManagerRole'
import StoreManagerForm  from './form/StoreManagerForm'
import ProtectAuthStoreManager from './Auth/ProtectAuthStoreManager'
import { Online, Offline, Detector } from "react-detect-offline";
import OfflineMessage from './offline_message/OfflineMessage';
import OnlineMessage from './online_message/OnlineMessage'
import AppOfflineAlert from './Alert/AppOfflineAlert'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'
import ProtectAuthAdmin from './Auth/ProtectAuthAdmin'
import AuthSettings from './settings/AuthSettings'
import Sms from './sms/Sms'



const router = createBrowserRouter(

  createRoutesFromElements(
    <>
      <Route  path='/signup'  element={<Signup/> }/>
      <Route index path='/'  element={<HomePage/> }/>
      <Route  path='/signin'  element={ <SignIn/>}/>
      <Route  path='/forgot_password' element={<ForgotPassword/>}/>
      <Route path='/reset_password' element={<ResetPassword />}/>

      
        
        <Route element={<ProtectAuthAdmin/>}>
        
<Route  path='/admin' element={  <Admin/>}>
<Route  path='/admin/location' element={<Location/>}/> 
<Route path='/admin/sublocation' element={<Sublocation/>}/>
<Route path='/admin/payment' element={<Payment/>}/>
<Route path='/admin/store' element={<Store/>}/>
<Route  path='/admin/collections' element={<Collections/>}/>
<Route  path='/admin/collection-requests' element={<CollectionRequests/>}/>
<Route path='/admin/expenses' element={<Expenses/>}/>
<Route path='/admin/customers' element={<Customers/>}/>
<Route path='/admin/service-provider' element={<ServiceProvider/>}/>
<Route path='/admin/user-management' element={<ManageUsers/>}/>
<Route path='/admin/customer-confirmation' element={<CustomerConfirmation/>}/>
<Route path='/admin/view-driver' element={<Driver/>}/>
<Route path='/admin/general-settings' element={<GeneralSettings/>}/>
<Route path='/admin/dashboard' element={<Dashboard/>}/>
<Route path='/admin/sms' element={<Sms />}/>
<Route path='/admin/collection-confirm' element={<ProviderConfirmation />
}/>

<Route path='/admin/store-managers' element={<StoreManager/>}/>
</Route>
</Route>

<Route path='/qr-code' element={<QrCode/>}/>




<Route element={<ProtectAuthProvider />}>
<Route path='/service-provider' element={<ServiceProviderForm/>}/>
<Route path='/provider-collecting' element={<ProviderCollections/>}/>
</Route>



<Route element={<ProtectAuth/>}>

<Route path='/customer' element={<CustomerForm/>}/> 
<Route path='/customer-request' element={<CustomerRequest/>}/>

</Route>



<Route element={<ProtectAuthStoreManager/>}>
<Route  path='/store_manager' element={<StoreManagerForm />}/>


</Route>




      <Route path='/services' element={<Services/>} />
      <Route path='/view-driver' element={<Driver/>}/>
      <Route path='/choose_role' element={<ChooseRole/>}/>

      <Route path='/customer_role'  element={<CustomerRole/>}/>
      <Route  path='/service_provider_role' element={<ServiceProviderRole/>}/>
      <Route  path='/store_manager_role' element={<StoreManagerRole/>}/>
      <Route   path="*" element={<NotFound/>}/>
      </>
      

  )
)







const App = () => {
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const {openAccessDenied} = useApplicationSettings()


  
const handleCloseOfflineMessage = ()=> {
  setShowOnlineMessage(false);

}



useEffect(() => {
  setShowOnlineMessage(true)
  
}, []);


// useEffect(() => {
//   const isOnlinePreviouslyShown = localStorage.setItem('isOnlineShown', 'true');
//   if (isOnlinePreviouslyShown) {
//     setShowOnlineMessage(true)

//   }
//   // const isOnlinePreviouslyShown = localStorage.getItem('isOnlineShown');
//   // if (!isOnlinePreviouslyShown) {
//   //   setShowOnlineMessage(true);
//   //   localStorage.setItem('isOnlineShown', 'true');
//   //   setTimeout(() => {
//   //     setShowOnlineMessage(false);
//   //   }, 5000); 
//   // }
// }, []);


  return (
    <>

    <AuthSettings>
<LocalizationProvider dateAdapter={AdapterDayjs}>

       <RouterProvider router={router} />

       </LocalizationProvider>

     </AuthSettings>


<Detector  render={({ online }) => (
    online ? null :
      <OfflineMessage />
  )} />

{
 
}
      

{/* 

{
  <Online>
        <AppOfflineAlert showOnlineMessage={showOnlineMessage} handleCloseOfflineMessage={handleCloseOfflineMessage}/> 
        </Online> 
} */}
      

    </>
  )
}

export default App