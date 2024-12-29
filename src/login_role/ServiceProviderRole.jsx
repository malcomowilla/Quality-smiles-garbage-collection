import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect,useCallback} from 'react'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ProviderOtpSentAlert from '../Alert/ProviderOtpSentAlert'
import ProviderLoginAlert from '../Alert/ProviderLoginAlert'
import  ProviderInvalidCodeAlert from '../Alert/ProviderInvalidCodeAlert'
import  ProviderInvalidOtpAlert from '../Alert/ProviderInvalidOtpAlert'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GoPerson } from "react-icons/go";
import ServiceProviderLogout from '../Alert/ServiceProviderLogout'
import ProviderOtpSentEmailAlert from '../Alert/ProviderOtpSentEmailAlert'
import { motion } from "framer-motion";




 function ServiceProviderRole() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [seeProviderCode, setSeeProviderCode] = useState(false)
  const {providerLoginData, setproviderLoginData, serviceProvider, setserviceProvider
    ,settingsformDataForProvider,openServiceProviderLogoutSuccesful,handleCloseServiceProviderLogoutSuccesful,
    setopenServiceProviderLoginSuccesful,settingsformData,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
    seeSettings3, setSeeSettings3,  setsettingsformData,  handleCustomerFormDataChange,
 setsettingsforProvider, openOfflineError,  setOpenOfflineError,
     handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
     seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
     setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
     settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets, companySettings } 
    = useApplicationSettings()

    const {company_name, contact_info, email_info, logo_preview} = companySettings


  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [openOtp, setopenOtp] = useState(false)
  const [openProviderLoginAlert, setopenProviderLoginAlert] = useState(false)
const [openProviderInvalidCode, setopenProviderInvalidCode] = useState(false)
const [openProviderInvalidOtp, setopenProviderInvalidOtp] = useState(false)
const [openProviderOtpSentEmailAlert, setopenProviderOtpSentEmailAlert] = useState(false)


// settingsformDataForProvider,enable_2fa_for_service_provider


const handleCloseProviderOtpSentEmailAlert = ()=>{
  setopenProviderOtpSentEmailAlert(false) 
}

const {send_sms_and_email_for_provider, send_email_for_provider, enable_2fa_for_service_provider} = settingsformDataForProvider
console.log('enable_2fa_for_service_provider',enable_2fa_for_service_provider)
// const storedData = JSON.parse(localStorage.getItem('provider settings'))

// const send_sms_and_email_for_provider = storedData.send_sms_and_email_for_provider
// const send_email_for_provider = storedData.send_email_for_provider
// const enable_2fa_for_service_provider = storedData.enable_2fa_for_service_provider

const  handleCloseProviderInvalidOtp = (event, reason)=> {

  if (reason === 'clickaway') {
    return;
  }
  setopenProviderInvalidOtp(false)
}
  
const handleCloseProviderInvalidCode = (event, reason) => {


  if (reason === 'clickaway') {
    return;
  }
  setopenProviderInvalidCode(false)
}

   const handleCloseProviderLoginAlert = (event, reason)=> {

    if (reason === 'clickaway') {
      return;
    }
    setopenProviderLoginAlert(false)
   }



  const handleCloseOtp = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setopenOtp(false)
  }


  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 9000);


  const handlegetproviderSettings  = useCallback(
              
    async()=> {
    const storedData = JSON.parse(localStorage.getItem("provider settings"));
  
    const requestParams = {
      use_auto_generated_number_for_service_provider:storedData.use_auto_generated_number_for_service_provider,
      send_sms_and_email_for_provider:storedData.send_sms_and_email_for_provider,
      enable_2fa_for_service_provider:storedData.enable_2fa_for_service_provider,
      send_email_for_provider: storedData.send_email_for_provider,
      
    
    };
  try {
    const response = await fetch(`/api/allow_get_settings_for_provider?${new URLSearchParams(requestParams)}`, {
    method: 'GET',
    signal: controller.signal,  
  
    headers: {
      "Content-Type"  : 'application/json'
    },
    
    
    })
  
    clearTimeout(id);
  
    const newData = await response.json()
    if (response.ok) {
    // const use_auto_generated_number = newData.use_auto_generated_number
    // const prefix = newData.prefix
    // const minimum_digits = newData.minimum_digits
    setOpenOfflineError(false)
  
  
    const {prefix, minimum_digits,  use_auto_generated_number_for_service_provider, 
      send_sms_and_email_for_provider, send_email_for_provider, enable_2fa_for_service_provider} = newData[0]
    setsettingsforProvider({...settingsformData, prefix,  minimum_digits, 
       use_auto_generated_number_for_service_provider, send_sms_and_email_for_provider,
       send_email_for_provider,enable_2fa_for_service_provider
    
    })
    
    } else {
    console.log('failed to fetch')
    setOpenOfflineError(false)
  
    }
    } catch (error) {
    console.log(error)
    setOpenOfflineError(true)
    
    }
  },
    
          []
        )
  
  
  
    useEffect(() => {
      handlegetproviderSettings()
    }, [handlegetproviderSettings, setsettingsforProvider])
  




  const handleGoBack = (e) => {
    e.preventDefault()
    navigate(-1);
  };







  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setloading(true);
  
  
    try {
      const response = await fetch('/api/otp_verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...providerLoginData, otp}),
      });
  
  
      if (response.ok) {
        navigate('/service-provider');
        setloading(false);
        setopenServiceProviderLoginSuccesful(true)
  
      } else {
        console.log('failed')
        setloading(false);
        setopenProviderInvalidOtp(true)

  
      }
    } catch (error) {
console.log(error)  
setopenProviderLoginAlert(true)
    } finally {
      setloading(false);
    }
  };












  const handleProviderSignIn = async(e)=> {
    e.preventDefault()
    
    try {
      setloading(true)
      const response = await fetch('/api/service_provider_login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: 'include',
    
        body: JSON.stringify({...providerLoginData,
           send_sms_and_email_for_provider, send_email_for_provider, enable_2fa_for_service_provider})
      })
    
      if (response.ok) {
        setloading(false)
        setOtpSent(true);

        setserviceProvider(true)

        if (enable_2fa_for_service_provider === false  || enable_2fa_for_service_provider === undefined 
          || enable_2fa_for_service_provider === null || enable_2fa_for_service_provider === 'false'
          
        ) {
          setopenOtp(false)
          navigate('/service-provider')
          localStorage.setItem('service provider', true);
          setopenServiceProviderLoginSuccesful(true)


        } else  {
          
          
          if (send_email_for_provider === true || send_email_for_provider === 'true') {
            setopenProviderOtpSentEmailAlert(true)
          }


          if (send_sms_and_email_for_provider === true || send_sms_and_email_for_provider === 'true') {
            setopenOtp(true)
          }
   
        }
        
    
      } else {
        console.log('failed')
        setloading(false)
        setopenProviderInvalidCode(true)
      }
    } catch (error) {
      console.log('error', error)
      setloading(false)
      setopenProviderLoginAlert(true)
    }
    } 














  const capitalizePrefix = (prefix)=> {

    if (prefix.startsWith('')) {
      return prefix.toUpperCase()
  
    }
  
    return prefix
    }
  
  
  
  
  
  const handleChange = (e)=> {
  const {name, value} = e.target
  const capitalize_prefix = capitalizePrefix(value)
  setproviderLoginData((prevData)=> ({...prevData, [name]: capitalize_prefix}))
  
  }


  return (

    <>

    <ServiceProviderLogout  handleCloseServiceProviderLogoutSuccesful={handleCloseServiceProviderLogoutSuccesful}   
    
    openServiceProviderLogoutSuccesful={openServiceProviderLogoutSuccesful}


    />

<ProviderOtpSentEmailAlert  openProviderOtpSentEmailAlert={openProviderOtpSentEmailAlert}
  handleCloseProviderOtpSentEmailAlert={handleCloseProviderOtpSentEmailAlert} />
<ProviderOtpSentAlert  openOtp={openOtp}  handleCloseOtp={handleCloseOtp}/>
<ProviderLoginAlert  openProviderLoginAlert={openProviderLoginAlert} handleCloseProviderLoginAlert={handleCloseProviderLoginAlert}/>
<ProviderInvalidCodeAlert  openProviderInvalidCode={openProviderInvalidCode}
 handleCloseProviderInvalidCode={handleCloseProviderInvalidCode}/>
<ProviderInvalidOtpAlert openProviderInvalidOtp={openProviderInvalidOtp} handleCloseProviderInvalidOtp={handleCloseProviderInvalidOtp} />



{enable_2fa_for_service_provider ? (
        <>


{otpSent  ? (
  <>
     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
            <div className="w-full bg-white shadow-sm py-4 px-4 flex flex-col items-center">
            <motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
  className="absolute w-full sm:top-[420px] xl:top-[80px] lg:top-[420px] max-sm:top-[420px]"
>
  <div className="relative mx-auto max-w-sm">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 
      blur-xl opacity-70 rounded-3xl transform -translate-y-4 scale-95">
    </div>

    {/* Main content */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="relative bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm 
        border border-gray-100/20"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-fit"
      >
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md"></div>
        <img 
          src={logo_preview} 
          alt="logo" 
          className="relative w-24 h-24 rounded-full object-contain 
            shadow-lg ring-4 ring-white"
        />
      </motion.div>

      {/* Company Name */}
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center"
      >
        <h1 className="itim-regular text-2xl max-sm:text-2xl bg-gradient-to-r 
          from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent 
          font-bold tracking-wide">
          {company_name}
        </h1>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 
          rounded-full mx-auto mt-2">
        </div>
      </motion.div>
    </motion.div>
  </div>
</motion.div>
            </div>

            <div className="flex-1 flex justify-center items-center px-4">
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <div className="text-center">
                  <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                  <p className="text-gray-600">Check your device for the code</p>
                </div>

                <div>
                  <Label htmlFor="otp" value="OTP" className="block mb-2 text-gray-700" />
                  <div className="relative">
                    <TextInput
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type={seeProviderCode ? 'password' : 'text'}
                      required
                      shadow
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                      style={{backgroundColor: 'white', width: '100%'
                        , paddingRight: '40px', color: 'black'}}
                    />
                    <div onClick={() => setSeeProviderCode(!seeProviderCode)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                      {seeProviderCode ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>


                <Button type="submit" disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Login'
                  )}
                </Button>
              </form>
            </div>
          </div>
  </>
) : <>

<div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex
         justify-center items-center px-4 relative">

<motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
  className="absolute w-full sm:top-[420px] xl:top-[80px] lg:top-[420px] max-sm:top-[420px]"
>
  <div className="relative mx-auto max-w-sm">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 
      blur-xl opacity-70 rounded-3xl transform -translate-y-1 scale-95">
    </div>

    {/* Main content */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="relative bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm 
        border border-gray-100/20"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-fit"
      >
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md"></div>
        <img 
          src={logo_preview} 
          alt="logo" 
          className="relative w-24 h-24 rounded-full object-contain 
            shadow-lg ring-4 ring-white"
        />
      </motion.div>

      {/* Company Name */}
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center"
      >
        <h1 className="itim-regular text-2xl max-sm:text-2xl bg-gradient-to-r 
          from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent 
          font-bold tracking-wide">
          {company_name}
        </h1>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 
          rounded-full mx-auto mt-2">
        </div>
      </motion.div>
    </motion.div>
  </div>
</motion.div>

         

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleProviderSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login with your service provider code</p>
            </div>

            <div>
              <Label htmlFor="customer_code" value="Customer Code" className="block
               mb-2 text-gray-700" />
              <div className="relative">
                {seeProviderCode ? (
                  <TextInput
                    name="provider_code"
                  value={providerLoginData.provider_code}
                    onChange={handleChange}
                    type={seeProviderCode ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                    style={{backgroundColor: 'white', width: '100%', paddingRight: '40px'}}
                  />

                  
                ) : (
                  <TextInput
                    name="provider_code"
                    value={providerLoginData.provider_code}
                    onChange={handleChange}
                    type={seeProviderCode ? 'password' : 'text'}
                    required
                    shadow

                    className="w-full px-4 py-3 rounded-lg border
                    t
                    focus:ring-2
                     focus:ring-green-500"
                    style={{backgroundColor: 'white', color: 'black',  width: '100%', paddingRight: '40px'}}
                  />
                )}

                
    <div onClick={() => setSeeProviderCode(!seeProviderCode)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeProviderCode ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>

              <div onClick={handleGoBack} className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <ArrowBackIcon />
                <span>Back to Selection</span>
              </div>
            </form>
          </div>
        </div>
</>


}

       
        </>
      ) : (

        
<>

        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex
         justify-center items-center px-4 relative">

<motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
  className="absolute w-full sm:top-[420px] xl:top-[80px] lg:top-[420px] max-sm:top-[420px]"
>
  <div className="relative mx-auto max-w-sm">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 
      blur-xl opacity-70 rounded-3xl transform -translate-y-1 scale-95">
    </div>

    {/* Main content */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="relative bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm 
        border border-gray-100/20"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-fit"
      >
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md"></div>
        <img 
          src={logo_preview} 
          alt="logo" 
          className="relative w-24 h-24 rounded-full object-contain 
            shadow-lg ring-4 ring-white"
        />
      </motion.div>

      {/* Company Name */}
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center"
      >
        <h1 className="itim-regular text-4xl  bg-gradient-to-r 
          from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent 
          font-bold tracking-wide">
          {company_name}
        </h1>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 
          rounded-full mx-auto mt-2">
        </div>
      </motion.div>
    </motion.div>
  </div>
</motion.div>

         

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleProviderSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className=" font-bold text-gray-900
              itim-regular mb-2 text-4xl">Welcome Back</h2>
              <p className="text-gray-600 text-xl">Login with your service provider code</p>
            </div>

            <div>
              <Label htmlFor="provider_code" value="Customer Code" 
              className="block mb-2 text-gray-700" />
              <div className="relative">
                {seeProviderCode ? (
                  <TextInput
                    name="provider_code"
                    value={providerLoginData.provider_code}
                    onChange={handleChange}
                    type={seeProviderCode ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3 rounded-lg text-xl
                    border focus:ring-2 focus:ring-green-500"
                    style={{backgroundColor: 'white', width: '100%', paddingRight: '40px'}}
                  />

                  
                ) : (
                  <TextInput
                    name="provider_code"
                    value={providerLoginData.provider_code}
                    onChange={handleChange}
                    type={seeProviderCode ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3  text-xl rounded-lg border
                    focus:ring-2
                     focus:ring-green-500"
                    style={{backgroundColor: 'white', color: 'black',  
                      width: '100%', paddingRight: '40px',
                    fontSize: '1.5rem'
                    }}
                  />
                )}

                
    <div onClick={() => setSeeProviderCode(!seeProviderCode)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeProviderCode ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white 
                py-3 rounded-lg">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent
                     rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  <p className='text-xl'>Login</p>
                )}
              </Button>

              <div onClick={handleGoBack} className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <ArrowBackIcon />
                <span className='text-xl'>Back to Selection</span>
              </div>
            </form>
          </div>
        </div>
        </>
      )}

  
  
  </>
  );
}



export default ServiceProviderRole
