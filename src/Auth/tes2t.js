import {Link, useNavigate,  useParams, useLocation} from  'react-router-dom'
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
import { IoArrowUndoSharp } from "react-icons/io5";
import PasskeyError from '../Alert/PasskeyError'
import { FaRegUser } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';






const PasskeySignin = () => {

  const { setPhone, phone, isloading,
    
    setloading,fetchCurrentUser, 
     setAdmin,setTheme, setopenLoginSuccess, user, checkEmail, imagePreview,
     setUpdateFormData,updateFormData,setImagePreview,
     setAdminPermission,  openLogoutSuccess,handleCloseLogoutSuccess,
     handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
     
     materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
       seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
       settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
        handleCustomerFormDataChangeForProvider,settingsForStore,
         setsettingsForStore,handleStoreFormDataChange,
        seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
        setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
        settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,
        companySettings, setcompanySettings
    } = useApplicationSettings()

    const {company_name, contact_info, email_info, logo_preview} = companySettings


console.log('my user', user)



  const navigate = useNavigate()
const goBack = useNavigate()
  const [done, setDone] = useState(false)
const [seeError, setSeeError] = useState(false)

const app_theme = localStorage.getItem('theme_normal')

  const adminWebAuthData = {
    email: '',
    user_name: '',
    phone_number: '' 
  }



  const [signupFormData, setsignupFormData] = useState(adminWebAuthData)
  const [registrationError,  setRegistrationError] = useState('')
  const [openLoad, setOpenLoad] = useState(false);
  const [otpSent, setotpSent] = useState(false)
const [otp, setOtp] = useState('')
const [openOtpInvalid, setopenOtpInvalid] = useState(false)
const [passkeyError, setpasskeyError] = useState(null)
const [openPasskeyError, setopenPasskeyError] = useState(false)
const {phone_number,  }= signupFormData
const email = checkEmail
const emailValue = useMotionValue(email)

  const emailWidth = useTransform(emailValue, value => value ? '350px' : '400px');
  
const { search } = useLocation()
const my_user_name = new URLSearchParams(search).get('my_user_name');
const  handleCloseOtpInvalid = ()=> {
  setopenOtpInvalid(false)
}



const handleClosePasskeyError = ()=>{
  setopenPasskeyError(false)
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
  goBack(-1)
}

// api/login-admin

// https://quality-smile-garbabe-collection-backend-1jcd.onrender.com/login-admin


const {user_name} = signupFormData




function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
}



async function authenticateWebAuthn(e) {
  e.preventDefault();
  setloading(true);
  setOpenLoad(true);
  setDone(false);

  const response = await fetch('/api/webauthn/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, user_name, my_user_name  })
  })

  const options = await response.json();
  const challenge = options.challenge;



  if (response.ok) {
    setloading(false)

    setOpenLoad(false)
    setSeeError(false)
setDone(false)



  
  setSeeError(false)
  } else {
    setloading(false)
        setRegistrationError(options.error)
        setSeeError(true)
        setOpenLoad(false)
        setDone(false);
  }


  // function base64UrlToBase64(base64Url) {
  //   if (typeof base64Url !== 'string') {
  //     throw new TypeError('Expected base64Url to be a string');
  //   }
  //   return base64Url.replace(/_/g, '/').replace(/-/g, '+');
  // }

  function base64UrlToUint8Array(base64Url) {
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') + padding;
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


  // function base64UrlToBase64(base64Url) {
  //   return base64Url.replace(/_/g, '/').replace(/-/g, '+');
  // }

  // if (typeof options.allowCredentials.id === 'string') {
  //   options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  // }  


  // if (options.allowCredentials) {
  //   options.allowCredentials = options.allowCredentials.map(cred => ({
  //     ...cred,
  //     id: Uint8Array.from(atob(base64UrlToBase64(cred.id)), c => c.charCodeAt(0))
  //   }));
  // }

  // if (typeof options.challenge === 'string') {
  //   options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  // }


  const publicKey = {
    ...options,
    challenge: base64UrlToUint8Array(options.challenge),
    allowCredentials: options.allowCredentials.map(cred => ({
      ...cred,
      id: base64UrlToUint8Array(cred.id)
    }))
  };


  try {
    // const credentialSignin = await navigator.credentials.get({ publicKey: options });
    const credential = await navigator.credentials.get({ publicKey: publicKey });


    // Prepare the credential response
    const credentialJson = {
      id: credential.id,
      rawId: arrayBufferToBase64Url(credential.rawId),
      challenge: challenge,
      type: credential.type,
      response: {
        clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON),
        authenticatorData: arrayBufferToBase64Url(credential.response.authenticatorData),
        signature: arrayBufferToBase64Url(credential.response.signature),
        userHandle: arrayBufferToBase64Url(credential.response.userHandle)
      }


    };




    const createResponse = await fetch('/api/webauthn/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential:credentialJson, email, 
        user_name, my_user_name,
          })
    });

const newData = await createResponse.json()

    if (createResponse.ok) {
      setSeeError(false);
      setOpenLoad(false);
      setloading(false);
      fetchCurrentUser()
    setTheme(app_theme)
    setopenLoginSuccess(true)
    navigate('/admin/dashboard')
      // setTimeout(() => {
      //   // setDone(true);
      //   // setloading(false);
      //   setTimeout(() => {
      //     navigate('/admin/location')
      //   }, 1000);
      // }, 2500);
    } else {
      setloading(false);
      // setRegistrationError(options.errors);
      setSeeError(true);
      setOpenLoad(false);
toast.error(newData.error, {
  duration: 6000})
      setpasskeyError(newData.error)
      console.log(`passkey error =>${newData.error}`)
    }
  } catch (err) {
    setloading(false);
    setSeeError(true);
    setOpenLoad(false);
    console.error('Error during WebAuthn credential creation:', err);
  }
}




const handleChange = (e)=> {
  const {name, id, value} = e.target
  setsignupFormData((prevData)=> (
    {...prevData, [name]: value }
  ))
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
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
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
        damping: 15,
        stiffness: 100
      }
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

<Toaster position="top-center" />

      <PasskeyError 
        passkeyError={passkeyError} 
        openPasskeyError={openPasskeyError} 
        handleClosePasskeyError={handleClosePasskeyError}
      />

      {isloading && (
        <Backdrop 
          open={openLoad} 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}
      
      {done && (
        <Backdrop 
          open={openLoad} 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Lottie options={defaultOptions2} height={400} width={400} />
        </Backdrop>
      )}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-emerald-50 to-white 
          dark:from-gray-900 dark:to-gray-800 relative"
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-md"
          >
            {/* Logo Section */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                className="w-24 h-24 rounded-2xl shadow-lg ring-4 ring-emerald-100 
                  dark:ring-emerald-900/20" 
                src={logo_preview} 
                alt={company_name}
              />
              <h1 className="mt-4 text-3xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-emerald-600 to-emerald-800">
                {company_name}
              </h1>
            </motion.div>

            {/* Passkey Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl 
                shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center mb-6 
                bg-gradient-to-r from-emerald-600 to-emerald-800 
                bg-clip-text text-transparent">
                Sign in with Passkey
              </h2>

              <form onSubmit={authenticateWebAuthn} className="space-y-6">
                {seeError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-50 text-red-600 text-sm"
                  >
                    {registrationError}
                  </motion.div>
                )}

                {/* Username Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 
                    dark:text-gray-300">
                    Username
                  </label>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <input
                      type="text"
                      name="user_name"
                      required
                      value={user_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-700 
                        border-2 border-gray-200 dark:border-gray-600 rounded-xl
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                        transition-all duration-200"
                      placeholder="Enter username"
                    />
                    <FaRegUser className="absolute left-4 top-1/2 transform 
                      -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-600 text-white font-medium 
                      rounded-xl shadow-lg hover:bg-emerald-700 
                      hover:shadow-emerald-500/25 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 
                      focus:ring-offset-2 disabled:opacity-50 
                      disabled:cursor-not-allowed flex items-center justify-center 
                      space-x-2"
                    disabled={isloading}
                  >
                    {isloading ? (
                      <>
                        <img 
                          src="/images/logo/iconsreload2.png" 
                          className="w-5 h-5 animate-spin" 
                          alt="loading" 
                        />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue with Passkey</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoBack}
                    className="w-full flex items-center justify-center space-x-2 
                      py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 
                      dark:text-gray-200 font-medium rounded-xl 
                      hover:bg-gray-200 dark:hover:bg-gray-600 
                      transition-all duration-200"
                  >
                    <IoArrowUndoSharp className="w-5 h-5" />
                    <span>Go Back</span>
                  </motion.button>
                </div>

                {/* Sign Up Link */}
                <motion.div 
                  variants={itemVariants}
                  className="text-center pt-4"
                >
                  {/* <Link 
                    to={`/kasspas-key?my_user_name=${user_name}`}
                    className="text-emerald-600 hover:text-emerald-700 
                      font-medium transition-colors"
                  >
                    Don't have a passkey? Set up now
                  </Link> */}
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

export default PasskeySignin
