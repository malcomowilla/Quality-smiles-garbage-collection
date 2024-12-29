import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Routes, 
    Navigate
  } from "react-router-dom";
  
  import {useEffect, useState, useCallback, lazy,
     Suspense} from 'react'
  import { ThemeProvider } from '@mui/material/styles';
  import theme from './Theme';
  import DashboardSytemAdmin from './dashboard_system_admin/DashboardSytemAdmin'
  // import Signup from './Auth/Signup'
  const Signup = lazy(() => import ('./Auth/Signup'))
  // import {HomePage} from './Home/HomePage'
  const HomePage = lazy(() => import ('./Home/HomePage'))
  import SignIn from './Auth/SignIn'
  import TourGuide from './components/TourGuide';
  import MobileExample from './components/MobileExample'
  
  // const SignIn = lazy(()=>  import ('./Auth/SignIn'
  // ))
  const HomePageSpecificCompany = lazy(() => import ('./Home/HomePageSpecificCompany.jsx'))
  
  // import Admin from './Admin/Admin'
  
  const Admin = lazy(()=> import ('./Admin/Admin'))
  import { AnimatePresence } from 'framer-motion';
  
  
  // import Services from './services/Services'
  const Services = lazy(()=> import ('./services/Services'))
  
  
  const ContactSales = lazy(() => import ('./Home/ContactSales'))
  import {useApplicationSettings} from './settings/ApplicationSettings'
  
  // import Location from './location/Location'
  const Location = lazy(()=> import ('./location/Location'))
  const TurnByTurnNavigation = lazy(() => import('./location/TurnByTurnNavigation'))
  const LocationTracker = lazy(() => import('./location/LocationTracker'))
  // const Sublocation from './location/Sublocation'
  
  const Sublocation = lazy(()=> import ('./location/Sublocation'))
  
  // import Payment from './payment/Payment'
  const Payment = lazy(()=> import ('./payment/Payment'))
  
  // import Store from './store/Store'
  const Store = lazy(()=> import ('./store/Store'))
  
  // import Collections from './collections/Collections'
  const Collections = lazy(()=> import ('./collections/Collections'))
  
  // import CollectionRequests from './collections/CollectionRequests'
  
  const CollectionRequests = lazy(()=> import ('./collections/CollectionRequests'))
  // import Expenses from './Expenses/Expenses'
  
  const Expenses = lazy(()=> import('./Expenses/Expenses'))
  
  const Customers = lazy(()=> import('./Customers/Customers'))
  // import Customers from './Customers/Customers'
  
  // import ServiceProvider from './service_provider/ServiceProvider'
  const ServiceProvider = lazy(()=> import('./service_provider/ServiceProvider'))
  
  // import ManageUsers from './user_management/ManageUsers'
  const ManageUsers = lazy(()=> import('./user_management/ManageUsers'))
  
  // import QrCode from './QrCode/QrCode'
  
  const QrCode = lazy(()=> import('./QrCode/QrCode'))
  import QrCodeServiceProvider from './QrCode/QrCodeServiceProvider'
  // import CustomerForm from './form/CustomerForm'
  const CustomerForm = lazy(()=> import('./form/CustomerForm'))
  // import ServiceProviderForm from './form/ServiceProviderForm'
  
  const ServiceProviderForm = lazy(()=> import ('./form/ServiceProviderForm'))
  
  // import ProviderConfirmation  from './collections/ProviderConfirmation'
  const ProviderConfirmation = lazy(()=> import ('./collections/ProviderConfirmation'))
  
  // import CustomerConfirmation from './collections/CustomerConfirmation'
  const CustomerConfirmation = lazy(()=> import ('./collections/CustomerConfirmation'))
  // import ProviderCollections from './form/ProviderCollections'
  const  ProviderCollections = lazy(()=> import('./form/ProviderCollections'))
  // import CustomerRequest from './form/CustomerRequest'
  const CustomerRequest = lazy(()=> import('./form/CustomerRequest'))
  
  // import Driver from './driver/Driver'
  const Driver = lazy(()=> import('./driver/Driver'))
  //  import ChooseRole from './choose_role/ChooseRole'
   const ChooseRole = lazy(()=> import ('./choose_role/ChooseRole'))
  //  import  {GeneralSettings} from './settings/GeneralSettings'
   const GeneralSettings = lazy(()=> import ('./settings/GeneralSettings'))
  // import Dashboard from './dashboard/Dashboard'
  const Dashboard = lazy(()=> import ('./dashboard/Dashboard'))
  
  const SendEmail = lazy(()=> import ('./email/SendEmail'))
  const CustomerStats = lazy(()=> import ('./dashboard/CustomerStats'))
  const SmsSent = lazy(()=> import ('./Auth/SmsSent'))
  import { LocalizationProvider } from '@mui/x-date-pickers';
  
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
  // import CustomerRole from './login_role/CustomerRole'
  const CustomerRole = lazy(()=> import ('./login_role/CustomerRole'))
  // import ServiceProviderRole from './login_role/ServiceProviderRole'
  const ServiceProviderRole = lazy(()=> import('./login_role/ServiceProviderRole'))
  import ProtectAuth from './Auth/ProtectAuth'
  // const ProtectAuth = lazy(()=> import('./Auth/ProtectAuth'))
  import ProtectAuthProvider from './Auth/ProtectAuthProvider'
  // const ProtectAuthProvider = lazy(()=> import('./Auth/ProtectAuthProvider'))
  import NotFound from './404/NotFound'
  // const NotFound = lazy(()=> import('./404/NotFound'))
  import StoreManager from './store/StoreManager'
  
  // const StoreManager = lazy(()=> import('./store/StoreManager'))
  // const StoreManager = lazy(()=> import('./store/StoreManager'))
  import StoreManagerRole from './login_role/StoreManagerRole'
  // const StoreManagerRole = lazy(()=> import('./login_role/StoreManagerRole'))
  import StoreManagerForm  from './form/StoreManagerForm'
  // const StoreManagerForm = lazy(()=> import('./form/StoreManagerForm'))
  // import ProtectAuthStoreManager from './Auth/ProtectAuthStoreManager'
  const ProtectAuthStoreManager = lazy(()=> import('./Auth/ProtectAuthStoreManager'))
  import { Online, Offline, Detector } from "react-detect-offline";
  // import OfflineMessage from './offline_message/OfflineMessage';
  const HowItWorks = lazy(()=> import('./Home/HowItWorks'))
  const OfflineMessage = lazy(()=> import('./offline_message/OfflineMessage'))
  import OnlineMessage from './online_message/OnlineMessage'
  import AppOfflineAlert from './Alert/AppOfflineAlert'
  import Skeleton from 'react-loading-skeleton'
  import 'react-loading-skeleton/dist/skeleton.css'
  
  const ServiceProviderReports = lazy(()=> import('./components/ServiceProvider/ServiceProviderReports'))
  // import ForgotPassword from './Auth/ForgotPassword'
  
  const ForgotPassword = lazy(()=> import('./Auth/ForgotPassword'))
  // import ResetPassword from './Auth/ResetPassword'
  const ResetPassword = lazy(()=> import('./Auth/ResetPassword'))
  import ProtectAuthAdmin from './Auth/ProtectAuthAdmin'
  import ProtectAuthSystemAdmin from './Auth/ProtectAuthSystemAdmin'
  // const ProtectAuthAdmin = lazy(()=> import('./Auth/ProtectAuthAdmin'))
  import AuthSettings from './settings/AuthSettings'
  // const AuthSettings = lazy(()=> import('./settings/AuthSettings'))
  // import Sms from './sms/Sms'
  const Sms =  lazy(()=> import('./sms/Sms')) 
  const EmailOtpSent = lazy(()=> import('./Auth/EmailOtpSent'))
  // import CustomerTickets from './customer_tickets/CustomerTickets'
  const CustomerTickets = lazy(()=> import('./customer_tickets/CustomerTickets'))
  // import Passkeys from './Auth/Passkeys'
  const Passkeys =  lazy(()=> import('./Auth/Passkeys'))           
  // import PasskeySignin from './Auth/PasskeySignin'
  const PasskeySignin = lazy(()=> import ('./Auth/PasskeySignin'))         
  // import WebAuthRegistration from './Auth/WebAuthRegistration'
  const WebAuthRegistration = lazy(()=> import('./Auth/WebAuthRegistration') )
  // import StoreManagerReceived from './form/StoreManagerReceived'
  const StoreManagerReceived = lazy(()=> import ('./form/StoreManagerReceived'))
  // import CustomerPayment from './form/CustomerPayment'
  const CustomerPayment = lazy(()=> import ('./form/CustomerPayment'))
  const CustomerChat = lazy(() => import ('./chat/CustomerChat'))
  // import Calendar from './calendar/Calendar'
  const PasswordResetEmailSent = lazy(()=> import('./Auth/PasswordResetEmailSent'))
  const Calendar = lazy(()=> import ('./calendar/Calendar'))
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
  // import SignIn2FaPasskey from './Auth/SignIn2FaPasskey'
  const SignIn2FaPasskey = lazy(()=> import ('./Auth/SignIn2FaPasskey'))
  // import TicketStatus from './customer_tickets/TicketStatus'
  const TicketStatus  = lazy(()=> import('./customer_tickets/TicketStatus'))
  // import ChatMessaging from './chat/ChatMessaging'
  const ChatMessaging  = lazy(()=> import('./chat/ChatMessaging'))
  
  const BillingInfo = lazy(() => import('./billing/BillingInfo'));
  
  import { createConsumer } from "@rails/actioncable";
  import Lottie from 'react-lottie';
  import LoadingAnimation from './animation/loading_animation.json'
  import Backdrop from '@mui/material/Backdrop';
  import ChooseRoleServiceProvider from './choose_role/ChooseRoleServiceProvider'
  import LoginSytemAdmin from './dashboard_system_admin/LoginSytemAdmin'
  import ConfirmPassword from './dashboard_system_admin/ConfirmPassword'
  import { useDebounce } from 'use-debounce';
  
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
  
  
  
  const NetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState({
      isOnline: navigator.onLine,
      showMessage: true
    });
    
  
    useEffect(() => {
      const handleOnline = () => {
        setNetworkStatus({ isOnline: true, showMessage: true });
        // Auto hide online message after 3 seconds
        setTimeout(() => {
          setNetworkStatus(prev => ({ ...prev, showMessage: false }));
        }, 3000);
      };
  
      const handleOffline = () => {
        setNetworkStatus({ isOnline: false, showMessage: true });
      };
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
  
  
  }
  
  
  const App = () => {
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
     const {materialuitheme} = useApplicationSettings()
  
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
  
  
  
  
    const handleLogin = () => {
      setIsAuthenticated(true);
    };
  
  
  
  
  
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
       <TourGuide />
  <Notifications /> 
  
  <ToastContainer position='top-center' transition={Slide} autoClose={false}/>
      <AuthSettings>
      <ThemeProvider theme={materialuitheme}>
  
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  
  
  
  
         {/* <RouterProvider router={router} /> */}
         <Suspense fallback={<div> 
  
          <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
      
       </Backdrop>
       
         </div>}>
  
         </Suspense>
         <Routes>
  
  
  {/* 
         <Route  path='/signup'  element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <Signup/>
          </Suspense>
          }/> */}
  
  
  
  
  <Route  path='/contact-sales'  element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <ContactSales/>
          </Suspense>
          }/> 
  
  
  
  
  
  <Route  path='/how-it-works'  element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <HowItWorks/>
          </Suspense>
          }/> 
  
  <Route  path='/home-page'  element={ 
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <HomePageSpecificCompany/>
          </Suspense>
          }/>
  
  
  
  
  
  
  
  
  <Route index path='/' element={ 
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
           <HomePage/>
          </Suspense>
          }/>
  
  
  
  
  
  
        <Route  path='/signin'  element={ 
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <SignIn/>
          </Suspense>
          }/>
  
  
        <Route  path='/forgot_password' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <ForgotPassword/>
          </Suspense>
          }/>
  
  
  
        <Route path='/reset_password' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <ResetPassword />
          </Suspense>
          }/>
  
  
  
        <Route path='/password-reset-email-sent' element={
  
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
           <PasswordResetEmailSent />
          </Suspense>
        
          }/>
  
  
  
        <Route path='/kasspas-key' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <Passkeys />
          </Suspense>
          }/>
  
  
  
        <Route path='/kasspass-key-signin' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <PasskeySignin />
          </Suspense>
          }/>
  
  
        <Route  path='/web_authn_registration'  element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <WebAuthRegistration  />
          </Suspense>
          }/>
  
  
  
        <Route path='/signup2fa_passkey' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <SignIn2FaPasskey   />
          </Suspense>
          }/>
  
        
  
          
          <Route element={<ProtectAuthAdmin/>}>
          
  <Route  path='/admin' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}> 
     <Admin/>
     </Suspense>
     }>
  
  
  <Route  path='/admin/location' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    
    
    <Location/>
    </Suspense >
    
    }/> 
  
  <Route path='/admin/sublocation' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Sublocation/>
    </Suspense>
    
    }/>
  
  
  
  <Route path='/admin/payment' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    
    <Payment/>
    </Suspense>
    }
    
    />
  
  
  
  <Route path="/admin/customer-stats"
   element={
   
   
   <Suspense fallback={<div> 
  
    <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
  </Backdrop>
  
   </div>}>
  
   <CustomerStats />
  
  </Suspense>
   
   } />
  
  
  
  <Route path='/admin/store' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    
    <Store/>
    
    </Suspense>
    }/>
  
  
  
  
  <Route  path='/admin/collections' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Collections/>
    
    </Suspense>
    }/>
  
  
  
  
  <Route  path='/admin/turn-by-turn' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <TurnByTurnNavigation/>
          </Suspense>
          }/>
  
  
  
  
  <Route  path='/admin/location-tracker' element={
           <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      
      <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <LocationTracker
          />
          </Suspense>
          }/>
  
  
  
  
  
  <Route  path='/admin/collection-requests' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <CollectionRequests/>
    </Suspense>
    }/>
  
  
  
  <Route path='/admin/expenses' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Expenses/>
    </Suspense>
    
    }/>
  
  
  
  <Route path='/admin/customers' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Customers/>
    </Suspense>
    }/>
  
  
  
  
  
  <Route path='/admin/service-provider' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ServiceProvider/>
    </Suspense>
    }/>
  
  
  
  
  
  <Route path='/admin/service-provider/reports' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ServiceProviderReports/>
    </Suspense>
    }/>
  
  
  <Route path='/admin/user-management' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ManageUsers/>
    </Suspense>
    }/>
  
  
  <Route path='/admin/customer-confirmation' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <CustomerConfirmation/>
    </Suspense>
    }/>
  
  
  
  
  
  <Route path='/admin/send-email' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <SendEmail/>
    </Suspense>
    }/>
  
  
  
  
  <Route path='/admin/view-driver' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Driver/>
    </Suspense>
    }/>
  
  
  
    
  <Route path='/admin/general-settings' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <GeneralSettings/>
    </Suspense>
    
    }/>
  
  
  
  
  <Route path='/admin/dashboard' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Dashboard/>
    </Suspense>
    
    }/>
  
  
  
  
  <Route path='/admin/sms' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Sms />
    </Suspense>
    
    }/>
  
  
  
  
  <Route path='/admin/chat-messaging' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ChatMessaging />
    </Suspense>
    }/>
  
  
  
  <Route 
    path="/admin/billing" 
    element={
  
      <Suspense fallback={<div> 
  
        <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
     
       </div>}>
      <BillingInfo /> 
      </Suspense>
      
    } 
  />
  
  
  
  <Route path='/admin/support-tickets' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <CustomerTickets  />
    </Suspense>
    }/>
  
  
  
  
  <Route path='/admin/collection-confirm' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ProviderConfirmation />
  </Suspense>
  }/>
  
  
  
  <Route path='/admin/calendar' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <Calendar />
    </Suspense>
    }/>
  
  
  <Route path='/admin/store-managers' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <StoreManager/>
    
    </Suspense>
    }/>
  </Route>
  </Route>
  
  
  
  <Route path='/qr-code' element={
     <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <QrCode/>
    </Suspense>
    }/>
  
  
  
  
  
  
  
  <Route path='/email-sent' element={
     <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <EmailOtpSent/>
    </Suspense>
    }/>
  
  
  
  <Route path='/sms-sent' element={
     <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <SmsSent/>
    </Suspense>
    }/>
  
  
  
  <Route path='/qr-code-service-provider' element={
    <QrCodeServiceProvider />
  } />
  
  
  <Route element={<ProtectAuthProvider />}>
  <Route path='/service-provider' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ServiceProviderForm/>
    </Suspense>
    }/>
  
  
  <Route path='/provider-collecting' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <ProviderCollections/>
    </Suspense>
    }/>
  </Route>
  
  
  
  <Route element={<ProtectAuth/>}>
  
  <Route path='/customer' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <CustomerForm/>
    </Suspense>
    }
    />
  
  
  
  
  
  <Route path='/customer-chat' element={
    <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <CustomerChat/>
    </Suspense>
    }
    />
  
  
  
  <Route path='/customer-request' element={
    <Suspense fallback={<div> 
  
  <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
  </Backdrop>
  
  </div>}>
    <CustomerRequest/>
  </Suspense>
  }
    
    />
  
  
  
  <Route path='/customer-payment' element={
    <Suspense fallback={<div> 
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
   </Backdrop>
     </div>}>
    <CustomerPayment />
    </Suspense>
    }  /> 
  
  
  
  <Route  path='/customer-ticket-status' element={
   <Suspense fallback={<div> 
    <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  </Backdrop>
   </div>}>
    
    <TicketStatus />
  
    </Suspense>
  
    }/>
  </Route>
  
  
  
  
  <Route element={<ProtectAuthStoreManager/>}>
  <Route  path='/store_manager' element={
     <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <StoreManagerForm />
    </Suspense>
    }
    
    />
  
  
  
  
  
  
  
  
  
  
    
  <Route path='/store_manager_receved' element={
     <Suspense fallback={<div> 
  
      <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
   
     </div>}>
    <StoreManagerReceived />
  </Suspense>
  }
    
    />
  </Route>
  
  
  
  
        <Route path='/services' element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <Services/>
          </Suspense>
          } />
  
  
  
        <Route path='/view-driver' element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <Driver/>
          
          </Suspense>
          }/>
  
  
  
        <Route path='/role_customer' element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <ChooseRole/>
          </Suspense>
          }/>
  
  
  <Route path="/mobile" element={<MobileExample />} />
  
  
  
  
  <Route path='/login-system-admin'  element={<LoginSytemAdmin />}/>
  <Route  path='/admin_verification_login_passwword' element={<ConfirmPassword/>}/>
  
  
  
  <Route  path='/role_service_provider'  element={<ChooseRoleServiceProvider  />}/>
  
        <Route path='/customer_role'  element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <CustomerRole/>
          </Suspense>
          }/>
  
  
        <Route  path='/service_provider_role' element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <ServiceProviderRole/>
          </Suspense>
          
          }/>
        <Route  path='/store_manager_role' element={
          <Suspense fallback={<div> 
  
            <Backdrop open={true} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        
         </Backdrop>
         
           </div>}>
          <StoreManagerRole/>
          </Suspense>
          }/>
  
  
  {/* <Route path='/native-example' element={<NativeExample/>}/> */}
  
  
  
          <Route  element={<ProtectAuthSystemAdmin />}>
          
          
  <Route path='/system-admin'  element={
      <ThemeProvider theme={theme}>
    
        <DashboardSytemAdmin />
      
    </ThemeProvider>
  }/> 
          </Route> 
  
  
  
  
  
   <Route path='/login-system-admin'  element={<LoginSytemAdmin />}/> 
  
  
  {/* <Route path        ="/dashboard" element={isAuthenticated ? <DashboardSytemAdmin /> : <Navigate to="/login-system-admin" />} />
          <Route path="/" element={<Navigate to="/login-system-admin" />} /> */}
        <Route   path="*" element={<NotFound/>}/>
       
        </Routes>
       
         </LocalizationProvider>
      </ThemeProvider>
  
       </AuthSettings>
  
  {/* 
  <Detector  render={({ online }) => (
      online ? null :
        <OfflineMessage />
    )} /> */}
  
  
  
  
  {/* 
  <Detector  render={({ online }) => (
      online ? <OnlineMessage /> : null
        
    )} /> */}
  
        
  <NetworkStatus />
   
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