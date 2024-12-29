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
import { GoPasskeyFill } from "react-icons/go";
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TypingAnimation from './TypingAnimation'
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography, Paper, 
  Snackbar, Alert } from '@mui/material';
  import { MdFingerprint } from "react-icons/md";
  import { BsFillEyeFill } from "react-icons/bs";
  import { BsFillEyeSlashFill } from "react-icons/bs";
  import FingerprintJS from '@fingerprintjs/fingerprintjs';




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
       companySettings,setcompanySettings,snackbar, setSnackbar
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

const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1146);
const [deviceFingerprint, setDeviceFingerprint] = useState('');
const SECRET_PASSPHRASE = "my-secure-passphrase"; // Replace this with a secure passphrase

console.log('device finger printing', deviceFingerprint)
useEffect(() => {
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1146);
  };

  window.addEventListener("resize", handleResize);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);


useEffect(() => {

  async function generateFingerprint() {
    let fingerprint = localStorage.getItem('deviceFingerprintStorage1');


    if (!fingerprint) {
      const canvasFingerprint = getCanvasFingerprint();
      const audioFingerprint = await getAudioContextFingerprint();
      const webGLFingerprint = getWebGLFingerprint();
      
      // Combine all fingerprints into one unique fingerprint
      const combinedFingerprint = canvasFingerprint + audioFingerprint + webGLFingerprint;
      
      // Generate a hash of the combined fingerprint (optional, for security reasons)
      const hashedFingerprint = await hashString(combinedFingerprint);
      
      setDeviceFingerprint(hashedFingerprint);
      localStorage.setItem('deviceFingerprintStorage1', deviceFingerprint);
    }
  
    
    // Send the fingerprint to the backend
  }

  generateFingerprint();
}, []);

console.log('fingerprinting', deviceFingerprint)
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px "Arial"';
  ctx.fillText('Hello, World!', 2, 2);
  return canvas.toDataURL();
}

function getAudioContextFingerprint() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  return dataArray.toString();
}

function getWebGLFingerprint() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  return vendor + " " + renderer;
}

async function hashString(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}


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
// // }

// async function generateDeviceFingerprint() {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   return result;  // This is the unique fingerprint for the device
// }

//  localStorage.setItem('deviceFingerprint', fingerprint);

// console.log('device fingerprint', generateDeviceFingerprint())
// localStorage.setItem('deviceFingerprint',  deviceFingerprint)
const  deviceFingerPrintStorage = localStorage.getItem('deviceFingerprintStorage1')
const controller = new AbortController();
const timeoutDuration = 12000; // 12 seconds

  const handleSignIn = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
    setOpenLoad(true)
    setDone(false)
    const timeoutId = setTimeout(() => {
      controller.abort();
      setloading(false);
      setOpenLoad(false);
    
    }, timeoutDuration);
    // const deviceFingerprint = await generateDeviceFingerprint();
    const users = await fetch('api/login-admin', {
      method: "POST",
      headers: {
  
        "Content-Type": "application/json",
      }, 
      signal: controller.signal,
      credentials: 'include', // Include cookies in the request
  
      
      body: JSON.stringify({...signinFormData, login_with_web_auth, login_with_otp, enable_2fa_for_admin,
        device_fingerprint:   deviceFingerPrintStorage,
        user_agent: navigator.userAgent,
         login_with_otp_email}),
  
    },
  
  
  
    )
    
    clearTimeout(timeoutId);
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      
      // const actualUserDataInJson = await users.json
      setloading(false)
    // setUser(actualUserDataInJson.admin)
    setAdmin(true)
    




    

if (enable_2fa_for_admin === true || enable_2fa_for_admin === 'true') {
  if (login_with_otp_email === true || login_with_otp_email === 'true')  {
    // setopenOtpSentEmailAlert(true)
    toast.success("A One Time Password was just sent,please check your email account ")
    navigate('/email-sent')
  }

  if (login_with_otp === true || login_with_otp === 'true') {
    navigate('/sms-sent')
    setopenOtpSentAlert(true)
  } 
    
  
  // setotpSent(true)
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
          // toast.error(actualUserDataInJson.error);
          setSnackbar({
            open: true,
            message: <p className='text-lg'>{actualUserDataInJson.error}</p>,
            severity: 'error'
          })
        setSeeError(true)
        // setSigninFormData({})
    }   

  } catch (error) {
    setloading(false)
    setOpenLoad(false)
    console.error('Error type:', error.name)
    console.error('Error message:', error.message)
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      toast.error("Server is down. Please make sure Rails server is running.");
    }
    setSeeError(false)
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
      }, 1000);
    }, 1900);




  
  setSeeError(false)
  // return redirect('/signin')
     
  
    } else {
        setloading(false)
        console.log('sigup  failed')
        // setopenOtpInvalid(true)
        if (navigator.onLine) {
          toast.error('invalid one time password,try again')
        }
        setRegistrationError(actualUserDataInJson.error)
        setSeeError(true)
    }   

  } catch (error) {
    console.error(error);
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




  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
        ...prev,
        open: false
    }));
  };
  




  return (
    <>

<Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
<ToastContainer position='top-right' transition={Slide}  autoClose={2000}

hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

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
          src={logo_preview}
        alt={company_name}
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          {company_name}
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
              whileTap={{ scale: 1.05 }}
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
                  transition-all duration-200
                  text-black dark:text-white"
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
       
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-50
   to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8"
        
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

<motion.div 
              className="text-center mb-4 p-4 bg-emerald-100 
              rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-emerald-600
              ">
                Welcome to Smart Waste Management!
              </h2>
              <p className="text-gray-700 mt-2 text-lg">
                Join the revolution in sustainable waste management. Track collections, optimize routes, and make our cities cleaner.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex flex-col items-center">
                  <img src="/images/icons/route-optimization.svg" alt="Route Optimization" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Smart Routes</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/icons/recycling.svg" alt="Recycling" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Eco-Friendly</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/icons/analytics.svg" alt="Analytics" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Real-time Analytics</span>
                </div>
              </div>
            </motion.div>
              <div className="text-center mb-4">
                <p className='font-mono text-2xl dark:text-white   font-bold'>Welcome To {company_name} </p>

          {/* <TypingAnimation text={`Weelcome to ${company_name}`} /> */}
        </div>
            </motion.div>

            {/* Login Form */}
            <motion.div 
              variants={itemVariants}
            
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-2xl 
          shadow-xl p-8 mb-10"

            >
                        <h1 className="text-3xl font-bold text-gray-900
                         dark:text-white mb-6">Sign In</h1>

              <form onSubmit={handleSignIn} className="space-y-6">
                
                {/* Email Input */}
                <motion.div 
                whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                  className="space-y-2 text-gray-900"
                >
                  <label className="text-sm font-medium 
                         text-black dark:text-white">
                    Email
                  </label>
                  
                  <motion.div className="relative " whileHover={{ scale: 1.05 }}>
                    <input
                      type="email"
                      name='email'
                      value={email}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border 
                      border-gray-200 
                        focus:border-emerald-500 focus:ring-2
                         focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50
                         dark:bg-gray-700 text-black dark:text-white"
                      placeholder="Enter your email"
                    />
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-3 top-[20%]
                      transform -translate-y-1/2"
                    >
                      <img src="/images/logo/icons8-gmail-100.png" 
                      className="w-6 h-6" alt="email" />
                    </motion.span>
                  </motion.div>
                </motion.div>
  {/* Password Input */}
  <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                    name='password'
                      type={isSeenPassWord ? 'password' : 'text'}
                      value={password}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                      placeholder="Enter your password"
                    />
                   <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsSeenPassword(!isSeenPassWord)}
                      className="absolute right-3 top-[20%] transform 
                      -translate-y-1/2"
                    >
                         {isSeenPassWord ? 
                         <BsFillEyeSlashFill className='text-2xl text-white'/>
                          : <BsFillEyeFill className='text-2xl text-white'/>}
                    </motion.button>
                  </div>
                </motion.div>


                {/* Login Button */}
                <motion.button
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 
                    text-white rounded-lg font-medium shadow-lg hover:from-emerald-600 
                    hover:to-emerald-700 transition-all duration-300 relative overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 group"
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <img src="/images/logo/iconsreload2.png" className="w-5 h-5 animate-spin mr-2" alt="loading" />
                      <span>Preparing your dashboard...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <ion-icon name="enter-outline" className="mr-2 text-xl" />
                      Sign In
                    </span>
                  )}
                </motion.button>

                {/* Additional Options */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col space-y-4 items-center mt-6"
                >
                 <Link 
                    to="/forgot_password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors
                      flex items-center space-x-2"
                  >
                    <ion-icon name="key-outline" className="text-lg" />
                    <span className='text-lg'>Reset Password</span>
                  </Link>
                  <Link 
                    to="/kasspass-key-signin"
                    className="flex items-center space-x-2 text-sm text-emerald-600 
                      hover:text-emerald-500 transition-colors"
                  >
                    <GoPasskeyFill className="w-4 h-4" />
                    <span className='text-lg'>Sign in with passkey</span>
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
       
       
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        className="min-h-screen bg-gradient-to-br from-emerald-50 to-white 
          dark:from-gray-900 dark:to-gray-800"
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
                className="w-40 h-40 mb-4 rounded-full shadow-lg transform hover:scale-105 
                transition-transform " 
                src={logo_preview}
                alt={company_name}
               
              />
               <motion.div 
              className={`text-center mt-5 p-4 bg-emerald-100 
              rounded-lg shadow-lg   ${isSmallScreen ? 'block' : 'hidden'}`}
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-emerald-600">
                 Smart Waste Management!
              </h2>
              <p className="text-gray-700 mt-2 text-2xl">
                Join the revolution in sustainable waste management. Track collections,
                 optimize routes, and make our cities cleaner.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex flex-col items-center">
                  <img src="/images/icons/route-optimization.svg" alt="Route Optimization" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Smart Routes</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/icons/recycling.svg" alt="Recycling" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Eco-Friendly</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/images/icons/analytics.svg" alt="Analytics" className="w-8 h-8" />
                  <span className="text-sm text-emerald-600">Real-time Analytics</span>
                </div>
              </div>
            </motion.div>
              {/* <h1 className="text-3xl font-bold dark:text-white text-black ">
                {company_name}
              </h1> */}
            </motion.div>
            <div className="text-center mb-4">
          {/* <TypingAnimation text={`Weelcome to ${company_name}`} /> */}
          <p className='font-mono text-2xl dark:text-white   font-bold'>Welcome To {company_name} </p>
        </div>
                {/* Login Form */}
                <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl
               shadow-xl 
                backdrop-blur-lg backdrop-filter p-8 relative
                 overflow-hidden"
            >
  <h1 className="text-3xl font-bold text-gray-900
   dark:text-white mb-6">Sign In</h1>

              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Input */}
                <motion.div 
                  variants={itemVariants}
                  className="space-y-2 "
                  whileHover={{ scale: 1.05 }}
                >
                  <label className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name='email'
                      value={email}
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg 
                      border text-xl
                       border-gray-200  text-black
                        dark:text-white
                        focus:border-emerald-500 focus:ring-2
                         focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50
                         dark:bg-gray-700"
                      placeholder="Enter your email"
                    />
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-3 top-[40%]
                      transform -translate-y-1/2"
                    >
                      <img src="/images/logo/icons8-gmail-100.png"
                       className="w-6 h-6" alt="email" />
                    </motion.span>
                  </div>
                </motion.div>
                  {/* Password Input */}
                  <motion.div 
                  variants={itemVariants}
                  className="space-y-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <label className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isSeenPassWord ? 'password' : 'text'}
                      value={password}
                      name='password'
                      onChange={handleFormDataChangeSignin}
                      className="w-full px-4 py-3 rounded-lg 
                      border border-gray-200 text-xl
                        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                        transition-all duration-200 bg-gray-50 dark:bg-gray-700
                        text-black dark:text-white"
                      placeholder="Enter your password"
                      
                      />
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsSeenPassword(!isSeenPassWord)}
                      className="absolute right-3 top-[40%] transform 
                      -translate-y-1/2"
                    >
                         {isSeenPassWord ? 
                         <BsFillEyeSlashFill className='text-2xl text-white'/>
                          : <BsFillEyeFill className='text-2xl text-white'/>}
                    </motion.button>
                  </div>
                </motion.div>
                  {/* Login Button */}
                  <motion.button
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 
                    text-white rounded-lg font-medium shadow-lg hover:from-emerald-600 
                    hover:to-emerald-700 transition-all duration-300 relative overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 group"
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <img src="/images/logo/iconsreload2.png" className="w-5 h-5 animate-spin mr-2" alt="loading" />
                      <span>Preparing your dashboard...</span>
                    </div>
                  ) : (
                    <span className="flex text-2xl items-center
                     justify-center">
                      <ion-icon name="enter-outline" 
                      className="mr-2 " />
                      Sign In
                    </span>
                  )}
                </motion.button>

                {/* Additional Options */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col space-y-4 items-center mt-6"
                >
                  <Link 
                    to="/forgot_password"
                    className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors
                      flex items-center space-x-2"
                  >
                    <ion-icon style={{ color: "inherit",
                      width: "1.9em",
                      height: "1.9em",
                     }} name="key-outline"
                     className="text-lg" />
                    <span className='text-2xl'>Forgot Password?</span>
                  </Link>
                  <Link 
                    to="/kasspass-key-signin"
                    className="flex items-center space-x-2 text-sm  
                      hover:text-emerald-500 transition-colors group"
                  >
                    <GoPasskeyFill className="w-6 h-6 
                    group-hover:rotate-12 transition-transform
                    text-emerald-600" />
                    <span className='text-2xl text-emerald-600'>Quick Access 
                      with Passkey</span>
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
