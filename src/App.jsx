import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes, 
} from "react-router-dom";

import Signup from './Auth/Signup'
import {HomePage} from './Home/HomePage'
import SignIn from './Auth/SignIn'
import Admin from './Admin/Admin'
import Services from './services/Services'
import {useEffect, useState, useCallback} from 'react'
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
import CustomerTickets from './customer_tickets/CustomerTickets'
import Passkeys from './Auth/Passkeys'
import PasskeySignin from './Auth/PasskeySignin'
import WebAuthRegistration from './Auth/WebAuthRegistration'
import StoreManagerReceived from './form/StoreManagerReceived'
import CustomerPayment from './form/CustomerPayment'
import Calendar from './calendar/Calendar'
import { messaging, getToken , onMessage} from './firebase/firebase';
import OneSignal from 'react-onesignal';
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirebaseMessaging from './firebase/FirebaseMessaging'
import { requestPermission } from './firebase/firebasePermission';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaRegHandPointLeft } from "react-icons/fa6";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import SignIn2FaPasskey from './Auth/SignIn2FaPasskey'
import TicketStatus from './customer_tickets/TicketStatus'
import ChatMessaging from './chat/ChatMessaging'
import { createConsumer } from "@rails/actioncable";



// const router = createBrowserRouter(

//   createRoutesFromElements(
//     <>
//       <Route  path='/signup'  element={<Signup/> }/>
//       <Route index path='/'  element={<HomePage/> }/>
//       <Route  path='/signin'  element={ <SignIn/>}/>
//       <Route  path='/forgot_password' element={<ForgotPassword/>}/>
//       <Route path='/reset_password' element={<ResetPassword />}/>

      
        
//         <Route element={<ProtectAuthAdmin/>}>
        
// <Route  path='/admin' element={  <Admin/>}>
// <Route  path='/admin/location' element={<Location/>}/> 
// <Route path='/admin/sublocation' element={<Sublocation/>}/>
// <Route path='/admin/payment' element={<Payment/>}/>
// <Route path='/admin/store' element={<Store/>}/>
// <Route  path='/admin/collections' element={<Collections/>}/>
// <Route  path='/admin/collection-requests' element={<CollectionRequests/>}/>
// <Route path='/admin/expenses' element={<Expenses/>}/>
// <Route path='/admin/customers' element={<Customers/>}/>
// <Route path='/admin/service-provider' element={<ServiceProvider/>}/>
// <Route path='/admin/user-management' element={<ManageUsers/>}/>
// <Route path='/admin/customer-confirmation' element={<CustomerConfirmation/>}/>
// <Route path='/admin/view-driver' element={<Driver/>}/>
// <Route path='/admin/general-settings' element={<GeneralSettings/>}/>
// <Route path='/admin/dashboard' element={<Dashboard/>}/>
// <Route path='/admin/sms' element={<Sms />}/>
// <Route path='/admin/support-tickets' element={<CustomerTickets  />}/>
// <Route path='/admin/collection-confirm' element={<ProviderConfirmation />
// }/>

// <Route path='/admin/store-managers' element={<StoreManager/>}/>
// </Route>
// </Route>

// <Route path='/qr-code' element={<QrCode/>}/>




// <Route element={<ProtectAuthProvider />}>
// <Route path='/service-provider' element={<ServiceProviderForm/>}/>
// <Route path='/provider-collecting' element={<ProviderCollections/>}/>
// </Route>



// <Route element={<ProtectAuth/>}>

// <Route path='/customer' element={<CustomerForm/>}/> 
// <Route path='/customer-request' element={<CustomerRequest/>}/>

// </Route>



// <Route element={<ProtectAuthStoreManager/>}>
// <Route  path='/store_manager' element={<StoreManagerForm />}/>


// </Route>




//       <Route path='/services' element={<Services/>} />
//       <Route path='/view-driver' element={<Driver/>}/>
//       <Route path='/choose_role' element={<ChooseRole/>}/>

//       <Route path='/customer_role'  element={<CustomerRole/>}/>
//       <Route  path='/service_provider_role' element={<ServiceProviderRole/>}/>
//       <Route  path='/store_manager_role' element={<StoreManagerRole/>}/>
//       <Route   path="*" element={<NotFound/>}/>
//       </>
      

//   )
// )







const App = () => {
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const {openAccessDenied, currentUser, id, imagePreview, setImagePreview,
     updateFormData, setUpdateFormData} = useApplicationSettings()

    //  const cable = createConsumer("ws://localhost:4000/cable");

    //  useEffect(() => {
    //   const subscription = cable.subscriptions.create("AdminStatusChannel", {
    //     received(data) {
    //       console.log("User status updated:", data);
    //       // Update your frontend state or UI based on received data
    //     }
    //   });
  
    //   return () => {
    //     subscription.unsubscribe();
    //   };
    // }, [cable.subscriptions]);

  // const requestParams = {
  //   id:id,
    
  //  };
  
  // const fetchUpdatedProfile = useCallback(
  
     
  //   async() => {
  //     const url = "/api/updated_admin?" + new URLSearchParams(requestParams)
  //     const response = await fetch(url)
  //     const newData = await response.json()
  //     console.log('updated admin', newData)
  // try {
  //   const {email, user_name, phone_number, profile_image_url } = newData
    
  //   if (response.ok) {
  //     setUpdateFormData({...updateFormData, email, phone_number, user_name})
  //     // setUpdateFormData((prev)=> (
  //     //   {...prev, email, phone_number, user_name }
  //     // ))
  //     setImagePreview(newData.profile_image_url)
  //     console.log(`get updated adminn${newData.profile_image_url}`)
  //   } else {
  //     console.log('error geting updated admin')
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
  
  //   },
  //   [],
  // )
  
  // useEffect(() => {
  //   fetchUpdatedProfile()
    
  // }, [fetchUpdatedProfile]);










  // useEffect(() => {
  //   // Set up the onMessage handler
  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log('Message received: ', payload);
  //     // Customize how you handle the notification here
  //     // For example, display a notification or update the UI
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  
const handleCloseOfflineMessage = ()=> {
  setShowOnlineMessage(false);


}


   onMessage(messaging, (payload) => {
    const { title, body, image} = payload.notification;
    if (title|| body || image) {
      const audio = new Audio('/751326__robinhood76__13129-mystery-cash-bonus.wav')
      audio.play();
    }
    if (Notification.permission === 'granted') {
      // toast.success(
      //   <div>
      //     <div className='flex justify-center'><IoCalendarNumberOutline className='w-10 h-10 text-red-700' /></div>
      //     <p className='playwrite-de-grund font-extrabold text-xl'>Upcoming Event
      //       <div> <span className='font-thin flex gap-3'>
      //       {title}
      //       <FaRegHandPointLeft className='w-5 h-5'/>
      //         </span></div></p>
      //     <p className='playwrite-de-grund font-thin'> The event is starting in 30 minutes at <span className='font-semibold'>{body}</span></p>
      //   </div>,
      //   {
      //     icon: image,
      //     transition: Slide,
      //   }
      // );
      new Notification(title, {

        
      body,
        icon: image, // Use the image URL as the icon
      });

     
    }
    
    console.log('Message received:', payload);
  });

// useEffect(() => {
  
//   OneSignal.init({
//     appId: "9491f0f0-0f1b-4ab6-b339-6289d264eeb5"
  
//   })
//   }, []);

useEffect(() => {
  setShowOnlineMessage(true)
  
}, []);



  return (
    <>

<Notifications /> 

<ToastContainer position='top-center' transition={Slide} autoClose={false}/>
    <AuthSettings>
<LocalizationProvider dateAdapter={AdapterDayjs}>

       {/* <RouterProvider router={router} /> */}
       <Routes>
       <Route  path='/signup'  element={<Signup/> }/>
      <Route index path='/'  element={<HomePage/> }/>
      <Route  path='/signin'  element={ <SignIn/>}/>
      <Route  path='/forgot_password' element={<ForgotPassword/>}/>
      <Route path='/reset_password' element={<ResetPassword />}/>
      <Route path='/kasspas-key' element={<Passkeys />}/>
      <Route path='/kasspass-key-signin' element={<PasskeySignin />}/>
      <Route  path='/web_authn_registration'  element={<WebAuthRegistration  />}/>
      <Route path='/signup2fa_passkey' element={<SignIn2FaPasskey   />}/>

      

        
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
<Route path='/admin/chat-messaging' element={<ChatMessaging />}/>


<Route path='/admin/support-tickets' element={<CustomerTickets  />}/>
<Route path='/admin/collection-confirm' element={<ProviderConfirmation />
}/>
<Route path='/admin/calendar' element={<Calendar />}/>
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
<Route path='/customer-payment' element={<CustomerPayment />}  /> 
<Route  path='/customer-ticket-status' element={<TicketStatus />}/>
</Route>



<Route element={<ProtectAuthStoreManager/>}>
<Route  path='/store_manager' element={<StoreManagerForm />}/>
<Route path='/store_manager_receved' element={<StoreManagerReceived />}/>

</Route>




      <Route path='/services' element={<Services/>} />
      <Route path='/view-driver' element={<Driver/>}/>
      <Route path='/choose_role' element={<ChooseRole/>}/>

      <Route path='/customer_role'  element={<CustomerRole/>}/>
      <Route  path='/service_provider_role' element={<ServiceProviderRole/>}/>
      <Route  path='/store_manager_role' element={<StoreManagerRole/>}/>
      <Route   path="*" element={<NotFound/>}/>
      </Routes>
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