import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect, useCallback} from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";
import {useApplicationSettings} from '../settings/ApplicationSettings'

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import EmailSentForgotPasswordAlert from '../Alert/EmailSentForgotPasswordAlert'
import EmailSentAlertError from '../Alert/EmailSentAlertError'

import { motion } from 'framer-motion';

const ForgotPassword = () => {

   
    const {handleChangeResetPasswordPhoneNumber, handleChangeResetPassword, 
      resetPasswordForm,
       setResetPasswordForm, companySettings,
       setcompanySettings
      } = useApplicationSettings()

       const {company_name, contact_info, email_info, logo_preview} = companySettings



    const [isSeenPassWord,  setIsSeenPassword] = useState(false)
    const {email, phone_number} = resetPasswordForm
    const [loading, setloading] = useState(false)
    const [done, setDone] = useState(false)
  const [openLoad, setOpenLoad] = useState(false);
  const [openEmailSent, setopenEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [seeEmailError, setSeeEmailError] = useState(false)
const [openEmailSentError, setopenEmailSentError] = useState(false)





        const handleCloseEmailSentError = ()=> {
          setopenEmailSentError(false)
        }



    const navigate = useNavigate()



        const handleCloseEmailSent = ()=> {
          setopenEmailSent(false)
        }

    const handleGoBack = ()=> {
        navigate(-1)
    }



    const handleForgotPassword = async(e)=> {
      e.preventDefault()
      try {
        setloading(true)
        setOpenLoad(true)
        setDone(false)
        const response = await fetch('/api/password_forgotten', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(resetPasswordForm)
        })

        const newData = await response.json()
        if (response.ok) {
          // setopenEmailSent(true)
          setTimeout(() => {
            setDone(false);
            setloading(false);
            navigate('/password-reset-email-sent');
          }, 2500);
        } else {
          setloading(false)
          setSeeEmailError(true)
          setEmailError(newData.error)
          setopenEmailSentError(true)
        }
      } catch (error) {
        console.log(error)
        setloading(false)
      }
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
      <EmailSentForgotPasswordAlert handleCloseEmailSent={handleCloseEmailSent} openEmailSent={openEmailSent} />
      <EmailSentAlertError 
        handleCloseEmailSentError={handleCloseEmailSentError} 
        openEmailSentError={openEmailSentError}
        emailError={emailError} 
        seeEmailError={seeEmailError}
      />

      {/* Loading States */}
      <Backdrop 
        open={loading || done} 
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
                src={logo_preview} 
                alt={company_name}
              />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {company_name}
              </h1>
            </motion.div>

            {/* Form Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl 
                rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
              
              <motion.div 
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 space-y-2 mb-8"
              >
                <p>Please provide your email below so we can send you the reset link.</p>
                <p>If an account exists with the provided email, you will receive a password recovery email.</p>
              </motion.div>

              <form onSubmit={handleForgotPassword} className="space-y-6">
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
                      onChange={handleChangeResetPassword}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 
                        dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                        transition-all duration-200"
                    />
                    <img 
                      src="/images/logo/icons8-gmail-100.png" 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6" 
                      alt="email" 
                    />
                  </div>
                </motion.div>

                {/* Phone Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={phone_number}
                    onChange={handleChangeResetPasswordPhoneNumber}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                      dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                      focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                      transition-all duration-200"
                  />
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-600 text-white font-medium 
                      rounded-xl shadow-lg hover:bg-emerald-700 
                      hover:shadow-emerald-500/25 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 
                      focus:ring-offset-2 disabled:opacity-50 flex items-center 
                      justify-center space-x-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <img 
                          src="/images/logo/iconsreload2.png" 
                          className="w-5 h-5 animate-spin" 
                          alt="loading" 
                        />
                        <span>Resetting Password...</span>
                      </>
                    ) : 'Reset Password'}
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
                    <RiArrowGoBackFill className="w-5 h-5" />
                    <span>Go Back</span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default ForgotPassword
