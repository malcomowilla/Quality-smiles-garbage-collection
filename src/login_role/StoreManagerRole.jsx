
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
import StoreManagerOtp from '../Alert/StoreManagerOtp';
import StoreManagerLoginAlertErrorOffline  from '../Alert/StoreManagerLoginAlertErrorOffline'
import StoreManagerInvalidManagerNumber  from '../Alert/StoreManagerInvalidManagerNumber'
import StoreManagerInvalidOtpAlert from '../Alert/StoreManagerInvalidOtpAlert'
import { GoPerson } from "react-icons/go";
import StoreManagerLogout from '../Alert/StoreManagerLogout'
import StoreManagerOtpEmail from '../Alert/StoreManagerOtpEmail'
import { motion } from "framer-motion";


// openOtpEmailSent, handleCloseOtpEmailSent StoreManagerOtpEmail


 function StoreManagerRole() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [seeManagerNumber, setseeManagerNumber] = useState(false)
  const {storeManagerLogin, setStoreManagerLogin, setstoreManager, 
    storeManagerSettings, sendManagerNumberViaSms,setopenStoreManagerLogin,
    openStoreManagerLogout, handleCloseStoreManagerLogout,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
    seeSettings3, setSeeSettings3,  setsettingsformData,  handleCustomerFormDataChange,
    settingsformDataForProvider, setsettingsforProvider, openOfflineError, 
     setOpenOfflineError,
     handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,
     handleStoreFormDataChange,
     seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,
     handleFormDataChangeForStoreManager,
     setstoreManagerSettings,adminFormSettings, setAdminFormSettings, 
     handleFormDataChangeForAdmin,
     settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,
     companySettings
  } = useApplicationSettings()



  const {company_name, contact_info, email_info, logo_preview} = companySettings


const {send_manager_number_via_sms, send_manager_number_via_email, 
  enable_2fa_for_store_manager
} = storeManagerSettings

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [openOtp, setopenOtp] = useState(false)
  const [openProviderLoginAlert, setopenProviderLoginAlert] = useState(false)
const [openProviderInvalidCode, setopenProviderInvalidCode] = useState(false)
const [openProviderInvalidOtp, setopenProviderInvalidOtp] = useState(false)
const [openOtpEmailSent, setopenOtpEmailSent] = useState(false)

const handleCloseOtpEmailSent = ()=>{
  setopenOtpEmailSent(false) 
}



const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);


const handlegetstoreManagerSettings = useCallback(
  
  async()=> {
    const storeManager  = JSON.parse(localStorage.getItem('store_manager_settings'))
      
     try {
       const response = await fetch(`/api/allow_get_settings_for_store_manager`, {
       method: 'GET',
       signal: controller.signal,  

       headers: {
         "Content-Type"  : 'application/json'
       },
       })


       if (response.status === 401) {
        navigate('/signin')
      }
       const newData = await response.json()
       if (response.ok) {
       // const use_auto_generated_number = newData.use_auto_generated_number
       // const prefix = newData.prefix
       // const minimum_digits = newData.minimum_digits
     
     
       const {prefix, minimum_digits,send_manager_number_via_email,send_manager_number_via_sms, enable_2fa_for_store_manager
        } = newData[0]
      //  const send_manager_number_via_email = storeManager.send_manager_number_via_email
      //  const send_manager_number_via_sms = storeManager.send_manager_number_via_sms
      //  const enable_2fa_for_store_manager  = storeManager.enable_2fa_for_store_manager 
console.log('enable_2fa_for_store_manager', enable_2fa_for_store_manager)
       setstoreManagerSettings((prev)=> ({
        ...prev,
        prefix,  minimum_digits,
        send_manager_number_via_email, send_manager_number_via_sms,enable_2fa_for_store_manager 
       }))

       } else {
       console.log('failed to fetch')
       }
       } catch (error) {
       console.log(error)
       setOpenOfflineError(true)
       
       }
     },
 
[]
)


  

useEffect(() => {
  handlegetstoreManagerSettings()
}, [handlegetstoreManagerSettings,setstoreManagerSettings]);






const  handleCloseProviderInvalidOtp = (event, reason)=> {

  if (reason === 'clickaway') {
    return;
  }
  setopenProviderInvalidOtp(false)
}




// const {enable_2fa_for_store_manager, send_manager_number_via_email,send_manager_number_via_sms} = storeManagerSettings
  
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




  const handleGoBack = (e) => {
    e.preventDefault()
    navigate(-1);
  };





  // useEffect(() => {
  //  const storedData = JSON.parse(localStorage.getItem('store_manager_settings'),  
  //      );


  //      const enable_2fa_for_store_managers = storedData.enable_2fa_for_store_manager
  //      const send_manager_number_via_emails = storedData.send_manager_number_via_emails
  //      console.log('send_manager_number_via_email=>',send_manager_number_via_emails)
  // }, [])



//   const storedDataInJson = localStorage.getItem('store_manager_settings')
// const storedData = storedDataInJson ? JSON.parse(storedDataInJson) : {}


// const enable_2fa_for_store_manager = storedData.enable_2fa_for_store_manager
// const send_manager_number_via_email = storedData.send_manager_number_via_email
// const send_manager_number_via_sms = storedData.send_manager_number_via_sms
// console.log('send_manager_number_via_email=>',storedData.send_manager_number_via_email)


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setloading(true);
  
  
    try {
      const response = await fetch('/api/verify_store_manager_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...storeManagerLogin, otp}),
      });
  
  
      if (response.ok) {
        
        setloading(false);
        localStorage.setItem('store manager', true);
        navigate('/store_manager');
        setopenStoreManagerLogin(true)
  
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










// console.log('enable_2fa_for_store_manager=>',enable_2fa_for_store_manager)
// console.log('send_manager_number_via_sms=>',send_manager_number_via_sms)
// console.log('send_manager_number_via_email=>',send_manager_number_via_email)


  const handleStoreManagerSignIn = async(e)=> {
    e.preventDefault()
    
    try {
      setloading(true)
      const response = await fetch('/api/store_managers_login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: 'include',
    
        body: JSON.stringify({...storeManagerLogin, send_manager_number_via_sms, send_manager_number_via_email, 
          enable_2fa_for_store_manager
        })
      })
    
      if (response.ok) {
        setloading(false)
        // setopenOtpEmailSent
if (enable_2fa_for_store_manager == true) {
  setOtpSent(true);

  if (send_manager_number_via_email === true || send_manager_number_via_email === 'true') {
    setopenOtpEmailSent(true)
  }

  if (send_manager_number_via_sms === true || send_manager_number_via_sms === 'true') {
    setopenOtp(true)
  }
} else if (enable_2fa_for_store_manager == false) {
  localStorage.setItem('store manager', true);
  navigate('/store_manager');
  setopenStoreManagerLogin(true)
  
}
        setstoreManager(true)
        
    
    
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
  setStoreManagerLogin((prevData)=> ({...prevData, [name]: capitalize_prefix}))
  
  }


  return (

    <>

<StoreManagerOtpEmail handleCloseOtpEmailSent={handleCloseOtpEmailSent}
 openOtpEmailSent={openOtpEmailSent}
/>

    <StoreManagerLogout openStoreManagerLogout={openStoreManagerLogout} handleCloseStoreManagerLogout={handleCloseStoreManagerLogout}
    />
<StoreManagerOtp openOtp={openOtp} handleCloseOtp={handleCloseOtp}/>
<StoreManagerLoginAlertErrorOffline  openProviderLoginAlert={openProviderLoginAlert} handleCloseProviderLoginAlert={handleCloseProviderLoginAlert}/>
< StoreManagerInvalidManagerNumber  openProviderInvalidCode={openProviderInvalidCode}
 handleCloseProviderInvalidCode={handleCloseProviderInvalidCode}/>
<StoreManagerInvalidOtpAlert openProviderInvalidOtp={openProviderInvalidOtp} handleCloseProviderInvalidOtp={handleCloseProviderInvalidOtp} />

{enable_2fa_for_store_manager  ? (
        <>


{otpSent  ? (
  <>
     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen
      flex flex-col">
            <div className="w-full bg-white shadow-sm py-4 px-4 flex flex-col 
            items-center">
            <motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
  className="absolute w-full sm:top-[420px] xl:top-[80px] lg:top-[420px] 
  max-sm:top-[420px]"
>
  <div className="relative mx-auto max-w-sm">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white
     to-blue-100 
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
                      type={seeManagerNumber? 'password' : 'text'}
                      required
                      shadow
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2
                       focus:ring-green-500"
                      style={{backgroundColor: 'white', width: '100%'
                        , paddingRight: '40px', color: 'black'}}
                    />
                    <div onClick={() => setseeManagerNumber(!seeManagerNumber)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                      {seeManagerNumber ? <FaEyeSlash /> : <FaEye />}
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
          <form onSubmit={handleStoreManagerSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login with your manager number</p>
            </div>

            <div>
              <Label htmlFor="manager_number" value="Manager Number" className="block mb-2 text-gray-700" />
              <div className="relative">
                {storeManagerLogin.manager_number ? (
                  <TextInput
                    name="manager_number"
                    value={storeManagerLogin.manager_number}
                    onChange={handleChange}
                    type={seeManagerNumber ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                    style={{backgroundColor: 'white', width: '100%', paddingRight: '40px'}}
                  />

                  
                ) : (
                  <TextInput
                    name="manager_number"
                    value={storeManagerLogin.manager_number}
                    onChange={handleChange}
                    type={seeManagerNumber ? 'password' : 'text'}
                    required
                    shadow

                    className="w-full px-4 py-3 rounded-lg border
                    t
                    focus:ring-2
                     focus:ring-green-500"
                    style={{backgroundColor: 'white', color: 'black',  width: '100%', paddingRight: '40px'}}
                  />
                )}

                
    <div onClick={() => setseeManagerNumber(!seeManagerNumber)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeManagerNumber ? <FaEyeSlash /> : <FaEye />}
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
          <form onSubmit={handleStoreManagerSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className="text-xl font-bold text-gray-900
              itim-regular mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login with your manager number</p>
            </div>

            <div>
              <Label htmlFor="manager_number" value="Manager Number"
               className="block mb-2 text-gray-700" />
              <div className="relative">
              

              <TextInput name="manager_number"  value={storeManagerLogin.manager_number}    
onChange={handleChange} 
type={seeManagerNumber ? 'password' : 'text'} 
required shadow  


style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 
/>
                
    <div onClick={() => setseeManagerNumber(!seeManagerNumber)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeManagerNumber ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 
                rounded-lg">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent
                     rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>

              <div onClick={handleGoBack} className="flex items-center justify-center 
              gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <ArrowBackIcon />
                <span>Back to Selection</span>
              </div>
            </form>
          </div>
        </div>
        </>
      )}
  
  </>
  );
}



export default StoreManagerRole





