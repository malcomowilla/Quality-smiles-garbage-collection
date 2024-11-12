import { Link, useNavigate } from 'react-router-dom';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { useState, useEffect, useCallback } from 'react';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SignupAlert from '../Alert/SignupAlert';
import { useNetworkState } from 'react-use';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import { IoArrowUndoSharp } from "react-icons/io5";

import { motion } from 'framer-motion';

const Passkeys = () => {
  const network = useNetworkState();
const goBack = useNavigate()
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

  const {
    isSeenPassWord,
    setIsSeenPassword,
    handleFormDataChange,
    setPhone,
    phone,
    
    setloading,
    open,
    setOpen,
    handleClose,
    checkEmail,
    handleChangePhoneNumber,
    setImagePreview,
    imagePreview,
    setUpdateFormData,updateFormData,
    setcompanySettings,
    companySettings

  } = useApplicationSettings();

  const {company_name, contact_info, email_info, logo_preview} = companySettings


  const navigate = useNavigate();
  const [screenload, setscreenload] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [done, setDone] = useState(false)
 const [isloading, setisloading] = useState(false)
 const [registrationError, setRegistrationError,] = useState('')
    const [usernameError, setUserNameError] = useState('')
const [seeError, setSeeError] = useState(false)

const webAuthData={
  email: '',
  user_name: '',
  phone_number: ''
}

const email = checkEmail
const [signupFormData, setsignupFormData] = useState(webAuthData)
const handleGoBack = ()=> {
    goBack(-1)
}




const {   user_name, phone_number } = signupFormData;

  useEffect(() => {
    setscreenload(true);
  }, []);


  // api/signup-admin

const handleChange = (e) => {

  const {name, id, value} = e.target
  setsignupFormData((prevData)=> (
    {...prevData, [name]: value}
  ))
}

  function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
  }

  async function registerWebAuthn(e) {
    e.preventDefault();
    setisloading(true);
    setOpenLoad(true);
    setDone(false);
  
    const response = await fetch('/api/webauthn/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  user_name })
    });
  
    const options = await response.json();
  

    if (response.ok) {
      setisloading(false);
      setOpenLoad(false);
      setDone(false);
      setSeeError(false);
    } else {
      setisloading(false);
      setOpenLoad(false);
      setSeeError(true);
      setDone(false);
      setRegistrationError(options.email);
      setUserNameError(options.user_name)
    }





    function base64UrlToBase64(base64Url) {
      return base64Url.replace(/_/g, '/').replace(/-/g, '+');
    }
  
    if (typeof options.user.id === 'string') {
      options.user.id = Uint8Array.from(atob(base64UrlToBase64(options.user.id)), c => c.charCodeAt(0));
    }
  
    if (typeof options.challenge === 'string') {
      options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
    }

    console.log('options.challenge:',options.challenge )
  
    try {
      const credential = await navigator.credentials.create({ publicKey: options });
  
  
      // Prepare the credential response
      const credentialJson = {
        id: credential.id,
        rp: {
          name: "aitechs",
        },
        origin: '"https://aitechs-sas-garbage-solution.onrender.com',
        rawId: arrayBufferToBase64Url(credential.rawId),
        type: credential.type,
        response: {
          attestationObject: arrayBufferToBase64Url(credential.response.attestationObject),
          clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON)
        },


      };


      
  
      const createResponse = await fetch('/api/webauthn/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialJson, email, user_name})
      });
  
      const createResponseJson = await createResponse.json();
  

      if (createResponse.ok) {
        setOpen(true);
        setSeeError(false);
        setsignupFormData('')
        setOpenLoad(false);
        setisloading(false);
        
        setTimeout(() => {
          setDone(true);
          setloading(false);



          setTimeout(() => {
            navigate('/kasspass-key-signin');
          }, 2000);
        }, 5000);


        
      } else {
        setisloading(false);
        console.log('signup failed');
        setOpen(false);
        // setRegistrationError(options.errors);
        setSeeError(true);
        setOpenLoad(false);
      }
    } catch (err) {
      setisloading(false);
      setOpen(false);
      setSeeError(true);
      setOpenLoad(false);
      console.error('Error during WebAuthn credential creation:', err);
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
        damping: 15
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <SignupAlert open={open} handleClose={handleClose} />
      
      {/* Loading States */}
      {isloading && (
        <Backdrop 
          open={openLoad} 
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: 'blur(8px)'
          }}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}

      {done && (
        <Backdrop 
          open={openLoad} 
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: 'blur(8px)'
          }}
        >
          <Lottie options={defaultOptions2} height={400} width={400} />
        </Backdrop>
      )}

      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
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
              src={logo_preview} 
              alt={company_name}
              className="w-24 h-24 rounded-2xl shadow-lg ring-4 ring-emerald-100/50"
            />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {company_name}
            </h1>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl 
              shadow-xl p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Create Your Passkey
            </h2>

            <form onSubmit={registerWebAuthn} className="space-y-6">
              {/* Username Input */}
              <motion.div 
                variants={itemVariants}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                {seeError && (
                  <p className="text-rose-500 text-sm font-medium">
                    {usernameError}
                  </p>
                )}
                <div className="relative">
                  <input
                    value={user_name}
                    onChange={handleChange}
                    name="user_name"
                    className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 
                      dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 
                      focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                      transition-all duration-200"
                    placeholder="Enter username"
                  />
                  <img 
                    src="/images/logo/icons8-username-64.png" 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    alt="username" 
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4 pt-4"
              >
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
                      <span>Creating Account...</span>
                    </>
                  ) : 'Create Account'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGoBack}
                  className="w-full flex items-center justify-center space-x-2 
                    py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 
                    dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 
                    dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <IoArrowUndoSharp className="w-5 h-5" />
                  <span>Go Back</span>
                </motion.button>
              </motion.div>

              {/* Sign In Link */}
              <motion.div 
                variants={itemVariants}
                className="text-center pt-4"
              >
                <Link 
                  to="/kasspass-key-signin"
                  className="text-emerald-600 hover:text-emerald-700 
                    font-medium transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Passkeys;


