import {Link, useNavigate} from  'react-router-dom'
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
import { FaPhone } from "react-icons/fa";

import { GoPasskeyFill } from "react-icons/go";
import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
// openLogoutSession, handleCloseLogoutSession,LogoutSession
// OtpSentEmailAlert openOtpSentEmailAlert, handleCloseOtpSentEmailAlert

// localStorage.setItem('logoutMessage', true)

const SignIn = () => {

  const {isSeenPassWord,  setIsSeenPassword,  setPhone, phone,isloading, signinFormData,
    handleFormDataChangeSignin,
    seeError, setSeeError, registrationError,
    setRegistrationError,imagePreview,
    setloading, adminFormSettings, handleChangePhoneNumber, admin, setAdmin,adminPermission, 
    setAdminPermission, fetchCurrentUser, setTheme,  openLogoutSuccess,handleCloseLogoutSuccess,
    handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,setUpdateFormData,setImagePreview,
    setopenLoginSuccess,user,updateFormData,
    
    
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,
       companySettings,setcompanySettings
 } = useApplicationSettings()
 const {company_name, contact_info, email_info, logo_preview} = companySettings


 console.log('adminset',adminFormSettings)

 const [openLogoutSession, setopenLogoutSession] = useState(false)



 const handleCloseLogoutSession = () => {
   setopenLogoutSession(false)
 }
const {login_with_otp, login_with_web_auth, login_with_otp_email,
  enable_2fa_for_admin
} = adminFormSettings

const {setUser, isUserLogedIn, setIsUserLoggedIn} = useAuth()
// const {login_with_otp, login_with_web_auth} = adminFormSettings
  const {email, password,phone_number, user_name } = signinFormData
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
 
[setAdminFormSettings, setOpenOfflineError]
)


  

useEffect(() => {
  handlegetAdminSettings()
}, [handlegetAdminSettings]);




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




const app_theme = localStorage.getItem('theme_normal')


// if (dark_theme  === 'dark') {
  
//   setTheme('dark')
// }

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
  
      
      body: JSON.stringify({...signinFormData, login_with_web_auth, login_with_otp, enable_2fa_for_admin,
         login_with_otp_email}),
  
    },
  
  
  
    )
    
  
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      
      
      // const actualUserDataInJson = await users.json
      setloading(false)
    // setUser(actualUserDataInJson.admin)
    setAdmin(true)
    




    

if (enable_2fa_for_admin === true || enable_2fa_for_admin === 'true') {
  if (login_with_otp_email === true || login_with_otp_email === 'true')  {
    setopenOtpSentEmailAlert(true)
  }

  if (login_with_otp === true || login_with_otp === 'true') {
    
    setopenOtpSentAlert(true)
  } 
    
  
  setotpSent(true)
  localStorage.setItem('acha umbwakni', false);

  
} else if(enable_2fa_for_admin === false || enable_2fa_for_admin === undefined || enable_2fa_for_admin === null
   || enable_2fa_for_admin === 'false') {




  navigate('/admin/dashboard')
  localStorage.setItem('acha umbwakni', true);
setopenLoginSuccess(true)
fetchCurrentUser()
      // setTheme("light")
      setTheme(app_theme)
      console.log('admin',actualUserDataInJson.can_manage_settings
      )
      setAdminPermission(actualUserDataInJson.can_manage_settings
      )
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






  const handleVerifyOtp = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
    setOpenLoad(true)
    setDone(false)
    const users = await fetch('api/otp-verification', {
      method: "POST",
      headers: {
  
        "Content-Type": "application/json",
      }, 
      credentials: 'include', // Include cookies in the request
  
  
      body: JSON.stringify({...signinFormData, otp, phone}),
  
    },
  
  
  
    )
    
  
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      // const actualUserDataInJson = await users.json
      setloading(false)
    console.log(actualUserDataInJson)
    localStorage.setItem('acha umbwakni', true);
    fetchCurrentUser()
    setTheme(app_theme)
    setopenLoginSuccess(true)
    setTimeout(() => {
      setDone(true);
      setloading(false);
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 2000);
    }, 2500);




  
  setSeeError(false)
  // return redirect('/signin')
     
  
    } else {
        setloading(false)
        console.log('sigup  failed')
        setopenOtpInvalid(true)
        setRegistrationError(actualUserDataInJson.error)
        setSeeError(true)
    }   

  } catch (error) {
    console.log(error.name === 'AbortError');
    setloading(false)
    setSeeError(false)
  }
  }








  const storedData = JSON.parse(localStorage.getItem("ojijo"));
    
  const fetchUpdatedProfile = useCallback(
    
     
    async() => {
      const requestParams = {
              id:storedData.id,
            
            }
      

      const url = "/api/allow_get_updated_admin?" + new URLSearchParams(requestParams)
      const response = await fetch(url)
      const newData = await response.json()
      console.log('updated admin', newData)
  try {
    const {email, user_name, phone_number, profile_image } = newData
    
    if (response.ok) {
      setUpdateFormData({...updateFormData, email, phone_number, user_name, profile_image})
      // setUpdateFormData((prev)=> (
      //   {...prev, email, phone_number, user_name }
      // ))
      setImagePreview(newData.profile_image)
      console.log(`get updated adminn${newData.profile_image_url}`)
    } else {
      console.log('error geting updated admin')
    }
  } catch (error) {
    console.log(error)
  }
  
    },
    [],
  )
  
  useEffect(() => {
    fetchUpdatedProfile()
    
  }, [fetchUpdatedProfile]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    }
  };






  const handleGetCompanySettings = useCallback(
    async(abortController) => {
      try {
        const response = await fetch('/api/get_company_settings', {
          signal: abortController.signal // Add the abort signal to the fetch
        })
        const newData = await response.json()
        if (response.ok) {
          // setcompanySettings(newData)
  
          const { contact_info, company_name, email_info, logo_url } = newData
          setcompanySettings((prevData)=> ({...prevData, 
            contact_info, company_name, email_info,
          
            logo_preview: logo_url
          }))
  
          console.log('company settings fetched', newData)
        }else{
          console.log('failed to fetch company settings')
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.log("error fetching company settings", error)
        }
      }
    },
    [setcompanySettings],
  )
  
  useEffect(() => {
    const abortController = new AbortController()
    
    handleGetCompanySettings(abortController)
    
    return () => {
      // This cleanup function runs when component unmounts
      abortController.abort()
    }
  }, [handleGetCompanySettings])












  return (
    <>

<ToastContainer position='top-center' transition={Slide}  autoClose={10000}/>

<LogoutSession openLogoutSession={openLogoutSession} handleCloseLogoutSession={handleCloseLogoutSession} />
<OtpSentEmailAlert  openOtpSentEmailAlert={openOtpSentEmailAlert}  handleCloseOtpSentEmailAlert={handleCloseOtpSentEmailAlert}/>
    <OtpSentSmsAlert handleCloseOtpSentAlert={handleCloseOtpSentAlert}   openOtpSentAlert={openOtpSentAlert}
    />
    <LogoutSuccess openLogoutSuccess={openLogoutSuccess} handleCloseLogoutSuccess={handleCloseLogoutSuccess} />
{enable_2fa_for_admin ? (
  <>
  
  
{otpSent ?  (
  <>


 <SinupInvalidOtpAlert  openOtpInvalid={openOtpInvalid} handleCloseOtpInvalid={handleCloseOtpInvalid} />


  {isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }

  
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }
   


       <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="min-h-screen bg-gradient-to-br from-emerald-50
   to-white dark:from-gray-900 dark:to-gray-800"
>
  <div className="flex flex-col items-center justify-center min-h-screen px-4">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Logo Section */}
      <motion.div 
        className="flex flex-col items-center mb-8"
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
       {/* OTP Card */}
       <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 backdrop-blur-lg"
      >
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Enter Verification Code
        </h2>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter the code we sent you
            </label>
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type={isSeenPassWord ? 'password' : 'text'}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  passwordValue.set(e.target.value)
                }}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest 
                  bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 
                  dark:border-gray-600 rounded-xl focus:ring-2 
                  focus:ring-emerald-500 focus:border-transparent
                  transition-all duration-200"
                maxLength="6"
                placeholder="••••••"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsSeenPassword(!isSeenPassWord)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                    text-gray-400 hover:text-gray-600 dark:text-gray-500 
                    dark:hover:text-gray-300"
                >
                  <ion-icon 
                    name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}
                    className="w-6 h-6"
                  />
                </motion.button>
              </div>
            </div>
  
            {/* Verify Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 
                text-white font-medium rounded-xl shadow-lg 
                hover:shadow-emerald-500/25 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-emerald-500 
                focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isloading}
            >
              {isloading ? (
                <div className="flex items-center justify-center space-x-2">
                  <img 
                    src="/images/logo/iconsreload2.png" 
                    className="w-5 h-5 animate-spin" 
                    alt="loading" 
                  />
                  <span>Verifying...</span>
                  </div>
            ) : 'Verify Code'}
          </motion.button>

          {/* Back Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoBack}
            className="w-full flex items-center justify-center space-x-2 
              py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 
              dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 
              dark:hover:bg-gray-600 transition-all duration-200"
          >
            <RiArrowGoBackFill className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  </div>
</motion.section>


  </>
) : <>




{isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }
   
       <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 
          dark:from-gray-900 dark:to-gray-800"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-md"
          >
            {/* Logo and Title */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center mb-8"
            >
              <img 
                className="w-20 h-20 mb-4 rounded-full shadow-lg transform hover:scale-105 transition-transform" 
                src="/images/logo/logo-small.png" 
                alt="logo"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                AITechs Solutions
              </h1>
            </motion.div>

            {/* Login Form */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                backdrop-blur-lg backdrop-filter p-8"
            >
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Input */}
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                      placeholder="Enter your email"
                    />
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <img src="/images/logo/icons8-gmail-100.png" className="w-6 h-6" alt="email" />
                    </motion.span>
                  </div>
                </motion.div>
  {/* Password Input */}
  <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isSeenPassWord ? 'password' : 'text'}
                      value={password}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                      placeholder="Enter your password"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsSeenPassword(!isSeenPassWord)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <ion-icon name={isSeenPassWord ? "eye-outline" : "eye-off-outline"} />
                    </motion.button>
                  </div>
                </motion.div>


                {/* Login Button */}
                <motion.button
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-500 text-white rounded-lg
                    font-medium shadow-lg hover:bg-emerald-600 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <img src="/images/logo/iconsreload2.png" className="w-5 h-5 animate-spin mr-2" alt="loading" />
                      Signing in...
                    </div>
                  ) : 'Sign In'}
                </motion.button>

                {/* Additional Options */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col space-y-4 items-center mt-6"
                >
                  <Link 
                    to="/forgot_password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                  <Link 
                    to="/kasspass-key-signin"
                    className="flex items-center space-x-2 text-sm text-emerald-600 
                      hover:text-emerald-500 transition-colors"
                  >
                    <GoPasskeyFill className="w-4 h-4" />
                    <span>Sign in with passkey</span>
                  </Link>
                  </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
</>}
  </>
): <>



{isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }

       <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-emerald-50
   to-white dark:from-emerald-900 dark:to-gray-800"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 
        mx-auto h-screen">
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-md"
          >
            {/* Logo and Title */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center mb-8"
            >
              <img 
                className="w-20 h-20 mb-4 rounded-full shadow-lg transform hover:scale-105 transition-transform" 
                src={logo_preview}
                alt={company_name}
              />
              <h1 className="text-3xl font-bold dark:text-white text-black ">
                {company_name}
              </h1>
            </motion.div>

                {/* Login Form */}
                <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                backdrop-blur-lg backdrop-filter p-8"
            >
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Input */}
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name='email'
                      value={email}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                      placeholder="Enter your email"
                    />
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <img src="/images/logo/icons8-gmail-100.png" className="w-6 h-6" alt="email" />
                    </motion.span>
                  </div>
                </motion.div>
                  {/* Password Input */}
                  <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isSeenPassWord ? 'password' : 'text'}
                      value={password}
                      name='password'
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                      placeholder="Enter your password"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsSeenPassword(!isSeenPassWord)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <ion-icon name={isSeenPassWord ? "eye-outline" : "eye-off-outline"} />
                    </motion.button>
                  </div>
                </motion.div>
                  {/* Login Button */}
                  <motion.button
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-500 text-white rounded-lg
                    font-medium shadow-lg hover:bg-emerald-600 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <img src="/images/logo/iconsreload2.png" className="w-5 h-5 animate-spin mr-2" alt="loading" />
                      Signing in...
                    </div>
                  ) : 'Sign In'}
                </motion.button>

                {/* Additional Options */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col space-y-4 items-center mt-6"
                >
                  <Link 
                    to="/forgot_password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                  <Link 
                    to="/kasspass-key-signin"
                    className="flex items-center space-x-2 text-sm text-emerald-600 
                      hover:text-emerald-500 transition-colors"
                  >
                    <GoPasskeyFill className="w-4 h-4" />
                    <span>Sign in with passkey</span>
                  </Link>
                  </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
 
</> }




  </>
  )
}

export default SignIn
