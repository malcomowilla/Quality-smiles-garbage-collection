import {Link, useNavigate, useParams, useLocation} from  'react-router-dom'
import {useState, useEffect, useCallback} from 'react'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { motion ,  useMotionValue, useTransform } from "framer-motion"

import {useApplicationSettings} from '../settings/ApplicationSettings'

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import { RiArrowGoBackFill } from "react-icons/ri";
import SinupInvalidOtpAlert from '../Alert/SinupInvalidOtpAlert'
import {useAuth} from '../settings/AuthSettings'
import LogoutSuccess from '../Alert/LogoutSuccess'
import OtpSentSmsAlert from '../Alert/OtpSentSmsAlert'
import OtpSentEmailAlert from '../Alert/OtpSentEmailAlert'
import LogoutSession from '../Alert/LogoutSession'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import * as React from 'react';
import { GoPasskeyFill } from "react-icons/go";
import { FaPhone } from "react-icons/fa";

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';



// openLogoutSession, handleCloseLogoutSession,LogoutSession

// OtpSentEmailAlert openOtpSentEmailAlert, handleCloseOtpSentEmailAlert



const SignIn2FaPasskey = () => {

  const {isSeenPassWord,  setIsSeenPassword,  setPhone, phone,isloading, signinFormData,
    handleFormDataChangeSignin,
    seeError, setSeeError, registrationError,
    setRegistrationError,
    setloading, adminFormSettings, handleChangePhoneNumber, admin, setAdmin,adminPermission, 
    setAdminPermission, fetchCurrentUser, setTheme,  openLogoutSuccess,handleCloseLogoutSuccess,
    handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
    setopenLoginSuccess,user,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,user_name,
       openLogoutSession, handleCloseLogoutSession
 } = useApplicationSettings()






const {setUser, isUserLogedIn, setIsUserLoggedIn} = useAuth()
// const {login_with_otp, login_with_web_auth} = adminFormSettings
  const {email, password,phone_number } = signinFormData
  const navigate = useNavigate()

  const [emailFocused, setEmailFocused] = useState(false);
  const [done, setDone] = useState(false)
  
  const emailValue = useMotionValue(email)
  const passwordValue = useMotionValue(password)

  const emailWidth = useTransform(emailValue, value => value ? '350px' : '400px');
  const passwordWidth = useTransform(passwordValue, value => value ? '300px' : '350px');

  const [openLoad, setOpenLoad] = useState(false);
  const [otpSent, setotpSent] = useState(false)
const [otp, setOtp] = useState('')
const [openOtpInvalid, setopenOtpInvalid] = useState(false)
const [openOtpSentAlert, setopenOtpSentAlert] = useState(false)
const [openOtpSentEmailAlert, setopenOtpSentEmailAlert] = useState(false)


const {login_with_otp,  enable_2fa_for_admin_passkeys, login_with_web_auth, login_with_otp_email, send_password_via_sms,
  check_is_inactive, check_inactive_hrs,check_inactive_days, check_inactive_minutes,enable_2fa_for_admin
} = adminFormSettings







const handlegetAdminSettings = useCallback(
  async()=> {
     
       

     try {
       const response = await fetch(`/api/allow_get_admin_settings`, {
       method: 'GET',

       
       headers: {
         "Content-Type"  : 'application/json'
       },
       })



       const newData = await response.json()
       if (response.ok) {
       // const use_auto_generated_number = newData.use_auto_generated_number
       // const prefix = newData.prefix
       const login_with_otp = newData[0].login_with_otp 
       const login_with_web_auth = newData[0].login_with_web_auth
       const login_with_otp_email = newData[0].login_with_otp_email
       const send_password_via_email = newData[0].send_password_via_email
       const send_password_via_sms = newData[0].send_password_via_sms
       const check_is_inactive = newData[0].check_is_inactive
       const check_inactive_hrs = newData[0].check_inactive_hrs
       const check_inactive_minutes = newData[0].check_inactive_minutes
       const enable_2fa_for_admin = newData[0].enable_2fa_for_admin
       const enable_2fa_for_admin_passkeys = newData[0].enable_2fa_for_admin_passkeys
       const check_inactive_days = newData[0].check_inactive_days
     
      //  const {login_with_otp} = newData[0]
      console.log('enable_2fa_for_admin_passkeys2', enable_2fa_for_admin_passkeys)
       setAdminFormSettings((prevData)=> ({...prevData, login_with_otp,login_with_web_auth,
        login_with_otp_email,send_password_via_email, send_password_via_sms, check_is_inactive,
        check_inactive_hrs,enable_2fa_for_admin,check_inactive_minutes,enable_2fa_for_admin_passkeys,
        check_inactive_days
       }))
     
       
       } else {
       console.log('failed to fetch')
       setOpenOfflineError(true)
       }
       } catch (error) {
       console.log(error)
       setOpenOfflineError(true)
       
       }
     },
 
[]
)


  

useEffect(() => {
  handlegetAdminSettings()
}, [handlegetAdminSettings]);






const  handleCloseOtpSentEmailAlert = ()=>{
  setopenOtpSentEmailAlert(false)
}






const handleCloseOtpSentAlert = ()=> {
  setopenOtpSentAlert(false)
}

// const storedDataJson = localStorage.getItem("admin settings");
// const storedData = storedDataJson ? JSON.parse(storedDataJson) : {};         
//   const login_with_otp = storedData.login_with_otp 
//  const login_with_web_auth = storedData.login_with_web_authn 
// const login_with_otp_email = storedData.login_with_otp_email  
// const enable_2fa_for_admin = storedData.enable_2fa_for_admin
// const enable_2fa_for_admin_passkeys = storedData.enable_2fa_for_admin_passkeys




const  handleCloseOtpInvalid = ()=> {
  setopenOtpInvalid(false)
}



  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true, 
    animationData: AnimationDone,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



const handleGoBack = (e)=> {
  e.preventDefault()
  // navigate(-1)
  setotpSent(false)
}


useEffect(() => {
  setIsUserLoggedIn(true)
}, [setIsUserLoggedIn]);

// api/login-admin

// https://quality-smile-garbabe-collection-backend-1jcd.onrender.com/login-admin



useEffect(() => {
  
  setRegistrationError('')
}, [setRegistrationError]);




// useEffect(() => {
  
// if (enable_2fa_for_admin === true || enable_2fa_for_admin === 'true') {
//   localStorage.setItem('acha umbwakni', false);
// }
//   return () => {
    
//   };
// }, []);


const signedWithPasskey = JSON.parse(localStorage.getItem('passkey') )
console.log('signedWithPasskey',signedWithPasskey)


console.log('enable_2fa_for_admin_passkeys', enable_2fa_for_admin_passkeys)

  const handleSignIn = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
    setOpenLoad(true)
    setDone(false)
    const users = await fetch('api/login-admin', {
      method: "POST",
      headers: {
  
        "Content-Type": "application/json",
      }, 
      credentials: 'include', // Include cookies in the request
  
      
      body: JSON.stringify({...signinFormData, login_with_web_auth, login_with_otp, enable_2fa_for_admin, login_with_otp_email}),
  
    },
  
  
  
    )
    
  
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      
      
      // const actualUserDataInJson = await users.json
      setloading(false)
    // setUser(actualUserDataInJson.admin)
    setAdmin(true)
    
    localStorage.setItem('passkey', true)

if (enable_2fa_for_admin_passkeys === true || enable_2fa_for_admin_passkeys === 'true') {
 
  // navigate(`/kasspass-key-signin?my_user_name=${user_name}`)

  navigate(`/kasspass-key-signin`)

//  if (signedWithPasskey === 'true' || signedWithPasskey === true ) {
  
//   navigate(`/kasspass-key-signin?my_user_name=${user_name}`)
//  }else{
//   navigate('/kasspas-key')
//  }
  
}
    

  
  setSeeError(false)
  // return redirect('/signin')
     
  
    } else {
        setloading(false)
        console.log('signin  failed')
        setRegistrationError(actualUserDataInJson.error)
        toast.error(actualUserDataInJson.error);
        setSeeError(true)
        // setSigninFormData({})
    }   

  } catch (error) {
    console.log(error.name === 'AbortError');
    setloading(false)
    setSeeError(false)
    // setSigninFormData('')
  }
  }




  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <ToastContainer position='top-center' transition={Slide} autoClose={8000} />
      <LogoutSession openLogoutSession={openLogoutSession} handleCloseLogoutSession={handleCloseLogoutSession} />
      <OtpSentEmailAlert openOtpSentEmailAlert={openOtpSentEmailAlert} handleCloseOtpSentEmailAlert={handleCloseOtpSentEmailAlert} />
      <OtpSentSmsAlert handleCloseOtpSentAlert={handleCloseOtpSentAlert} openOtpSentAlert={openOtpSentAlert} />
      <LogoutSuccess openLogoutSuccess={openLogoutSuccess} handleCloseLogoutSuccess={handleCloseLogoutSuccess} />

      {/* Loading States */}
      <Backdrop 
        open={isloading || done} 
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(8px)'
        }}
      >
        <Lottie 
          options={done ? defaultOptions2 : defaultOptions} 
          height={400} 
          width={400} 
        />
      </Backdrop>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-emerald-50 to-white 
          dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-md space-y-8"
          >
            {/* Logo Section */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                className="w-20 h-20 rounded-full shadow-lg ring-4 ring-emerald-50" 
                src="/images/logo/logo-small.png" 
                alt="logo"
              />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                Quality Smiles
              </h1>
            </motion.div>

            {/* Form Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl 
                rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        handleFormDataChangeSignin(e);
                        emailValue.set(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                        transition-all duration-200"
                    />
                    <img 
                      src="/images/logo/icons8-gmail-100.png" 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                      alt="email" 
                    />
                  </div>
                </motion.div>

                {/* Phone Input (Conditional) */}
                {(enable_2fa_for_admin === true || enable_2fa_for_admin === 'true') && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Phone Number
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        name="phone_number"
                        value={phone_number}
                        onChange={handleChangePhoneNumber}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 
                          dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                          focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                          transition-all duration-200"
                      />
                      <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    </div>
                  </motion.div>
                )}

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={isSeenPassWord ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={(e) => {
                        handleFormDataChangeSignin(e);
                        passwordValue.set(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                        transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSeenPassword(!isSeenPassWord)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <ion-icon 
                        name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}
                        style={{ width: 20, height: 20 }}
                      />
                    </button>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-600 text-white font-medium 
                      rounded-xl shadow-lg hover:bg-emerald-700 
                      hover:shadow-emerald-500/25 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 
                      focus:ring-offset-2 disabled:opacity-50 flex items-center 
                      justify-center space-x-2"
                    disabled={isloading}
                  >
                    {isloading ? (
                      <>
                        <img 
                          src="/images/logo/iconsreload2.png" 
                          className="w-5 h-5 animate-spin" 
                          alt="loading" 
                        />
                        <span>Signing in...</span>
                      </>
                    ) : 'Sign In'}
                  </motion.button>

                  {!enable_2fa_for_admin_passkeys && (
                    <Link 
                      to="/kasspass-key-signin"
                      className="block text-center text-emerald-600 
                        hover:text-emerald-700 font-medium transition-colors"
                    >
                      Sign in with passkey
                    </Link>
                  )}
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default SignIn2FaPasskey;



