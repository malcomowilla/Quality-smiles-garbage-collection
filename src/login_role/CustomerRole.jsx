import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {Link, useNavigate, useParams, useLocation} from "react-router-dom";
import {useState, useCallback, useEffect} from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import CustomerLoginAlertError from '../Alert/CustomerLoginAlertError'
import CustomerLoginOfflineAlert from '../Alert/CustomerLoginOfflineAlert'
import CustomerOtpSentAlert from '../Alert/CustomerOtpSentAlert'
import CustomerOtpAlertError from '../Alert/CustomerOtpAlertError'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GoPerson } from "react-icons/go";
import CustomerOtpSentEmailAlert from '../Alert/CustomerOtpSentEmailAlert'
import CustomerLogout from '../Alert/CustomerLogout'
import { motion } from "framer-motion";




 function CustomerRole() {
  const [seeCustomerCode, setSeeCustomerCode] = useState(false)
const navigate = useNavigate()
const {customerLoginData, setCustomerLoginData, customer, setCustomer, settingsformData,
  openLogoutCustomerSucessfully,
        handleCloseLogoutCustomerSuccessfully,
        setopenLoginCustomerSuccessfully,
        materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3,  setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,
       companySettings, setcompanySettings
} = useApplicationSettings()
const [openOfflineAlert, setOfflineAlert] = useState(false)
const [loading, setloading] = useState(false)
const [open, setOpen] = useState(false);
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState('');
const [openOtp, setopenOtp] = useState(false)
const [openOtpError, setopenOtpError] = useState(false)
 const [openOtpEmail, setopenOtpEmail] = useState(false)


 const {company_name, contact_info, email_info, logo_preview} = companySettings

const handleCloseOtpEmail = ()=>{
  setopenOtpEmail(false)
}

const { search } = useLocation()
    const my_customer_code = new URLSearchParams(search).get('my_customer_code');



const {enable_2fa, send_email,send_sms_and_email} = settingsformData
console.log('enable_2fa',enable_2fa)
// const {enable_2fa} = settingsformData

// const storedData =  JSON.parse(localStorage.getItem('customer settings'))
// const enable_2fa = storedData.enable_2fa
// const send_email = storedData.send_email
// const send_sms_and_email = storedData.send_sms_and_email




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




const handlegetcustomerSettings = useCallback(
  async()=> {
      
     try {
       const response = await fetch(`/api/allow_get_customer_settings`, {
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
     
     
       const {prefix, minimum_digits, use_auto_generated_number,send_sms_and_email,send_email,
        enable_2fa, enable_2fa_for_service_provider} = newData[0]
        console.log('enable myfa',enable_2fa)
       setsettingsformData({...settingsformData, prefix,  minimum_digits,
         use_auto_generated_number,
        send_sms_and_email,send_email, enable_2fa, enable_2fa_for_service_provider
       
       })
       
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
  handlegetcustomerSettings()
}, [handlegetcustomerSettings, setsettingsformData]);









const handleGoBack = (e) => {
  e.preventDefault()
  navigate('/role_customer')
};



const handleCloseOtpError = (event, reason)=> {
  if (reason === 'clickaway') {
    return;
  }
  setopenOtpError(false)
}






const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


const handleCloseOtp = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setopenOtp(false)
}




const handleCloseOfflineAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOfflineAlert(false);
};







const capitalizePrefix = (prefix)=> {

  if (prefix.startsWith('')) {
    return prefix.toUpperCase()

  }

  return prefix
  }





const handleChange = (e)=> {
const {name, value} = e.target
const capitalize_prefix = capitalizePrefix(value)
setCustomerLoginData((prevData)=> ({...prevData, [name]: capitalize_prefix}))

}




const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setloading(true);


  try {
    const response = await fetch('/api/otp_verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({...customerLoginData, otp}),
    });

    const data = await response.json();

    if (response.ok) {
      navigate('/customer');
      setloading(false);
      localStorage.setItem('customer', true);
      setopenLoginCustomerSuccessfully(true)
    } else {
      console.log('failed')
      setloading(false);
      setopenOtpError(true)

    }
  } catch (error) {
    setOfflineAlert(true)

  } finally {
    setloading(false);
  }
};








const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);











const handleCustomerSignIn = async(e)=> {
e.preventDefault()

try {
  setloading(true)
  const response = await fetch('/api/customer_login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({...customerLoginData, enable_2fa, send_email,
       send_sms_and_email,
      my_customer_code
    })
  })

  if (response.ok) {
    setloading(false)
    if (enable_2fa == 'true' || enable_2fa == true) {
      setOtpSent(true)



       
      if (send_email == true || send_email == 'true') {
        setopenOtpEmail(true)
      }

if (send_email == false || send_email == 'false' || send_email == undefined) {
  setopenOtp(true)
}
    } else if (enable_2fa == undefined || enable_2fa == null || enable_2fa == false) {
      navigate('/customer')
      setopenLoginCustomerSuccessfully(true)
      localStorage.setItem('customer', true);
    }
    
    

setCustomer(true)


  } else {
    console.log('failed')
    setOpen(true)
    setloading(false)
  }
} catch (error) {
  console.log('error', error)
  setOfflineAlert(true)
  setloading(false)

}
} 
   


  return (
<>
<CustomerLogout openLogoutCustomerSucessfully={openLogoutCustomerSucessfully}
  handleCloseLogoutCustomerSuccessfully={handleCloseLogoutCustomerSuccessfully}/>
<CustomerOtpSentEmailAlert openOtpEmail={openOtpEmail} handleCloseOtpEmail={handleCloseOtpEmail} />
<CustomerLoginAlertError  handleClose={handleClose}  open={open}/>
<CustomerLoginOfflineAlert  openOfflineAlert={openOfflineAlert}  handleCloseOfflineAlert={handleCloseOfflineAlert}/>
<CustomerOtpSentAlert  openOtp={openOtp} handleCloseOtp={handleCloseOtp}
/>
<CustomerOtpAlertError  openOtpError={openOtpError} handleCloseOtpError={handleCloseOtpError}
/>

{enable_2fa ? (
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
        <h1 className="itim-regular text-4xl max-sm:text-2xl bg-gradient-to-r 
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
                      name="customer_code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type={seeCustomerCode ? 'password' : 'text'}
                      required
                      shadow
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                      style={{backgroundColor: 'white', width: '100%'
                        , paddingRight: '40px', color: 'black'}}
                    />
                    <div onClick={() => setSeeCustomerCode(!seeCustomerCode)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                      {seeCustomerCode ? <FaEyeSlash /> : <FaEye />}
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
          <form onSubmit={handleCustomerSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login with your customer code</p>
            </div>

            <div>
              <Label htmlFor="customer_code" value="Customer Code" className="block mb-2 text-gray-700" />
              <div className="relative">
                {my_customer_code ? (
                  <TextInput
                    name="customer_code"
                    value={my_customer_code}
                    onChange={handleChange}
                    type={seeCustomerCode ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                    style={{backgroundColor: 'white', width: '100%', paddingRight: '40px'}}
                  />

                  
                ) : (
                  <TextInput
                    name="customer_code"
                    value={customerLoginData.customer_code}
                    onChange={handleChange}
                    type={seeCustomerCode ? 'password' : 'text'}
                    required
                    shadow

                    className="w-full px-4 py-3 rounded-lg border
                    t
                    focus:ring-2
                     focus:ring-green-500"
                    style={{backgroundColor: 'white', color: 'black',  width: '100%', paddingRight: '40px'}}
                  />
                )}

                
    <div onClick={() => setSeeCustomerCode(!seeCustomerCode)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeCustomerCode ? <FaEyeSlash /> : <FaEye />}
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

        <div className=" bg-gradient-to-br from-white
   to-white   min-h-screen flex
         justify-center items-center px-4 relative">

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
  <div className="relative mx-auto max-w-sm ">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 
      blur-xl opacity-70 rounded-3xl transform -translate-y-1 scale-95">
    </div>

    {/* Main content */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="relative bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm 
        border border-gray-100/20 "
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
        <h1 className="itim-regular text-3xl  bg-gradient-to-r 
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
          <form onSubmit={handleCustomerSignIn} className="flex flex-col gap-6">
            <div className="text-center">
              <GoPerson className="mx-auto text-green-600 text-4xl mb-2" />
              <h2 className="text-4xl font-bold text-gray-900
              itim-regular mb-2 ">Welcome Back</h2>
              <p className="text-gray-600 text-2xl">Login with your customer code</p>
            </div>

            <div>
              <Label htmlFor="customer_code" value="Customer Code" className="block mb-2 text-gray-700" />
              <div className="relative">
                {my_customer_code ? (
                  <TextInput
                    name="customer_code"
                    value={my_customer_code}
                    onChange={handleChange}
                    type={seeCustomerCode ? 'password' : 'text'}
                    required
                    shadow
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500"
                    style={{backgroundColor: 'white', width: '100%', paddingRight: '40px'}}
                  />

                  
                ) : (
                  <TextInput
                    name="customer_code"
                    value={customerLoginData.customer_code}
                    onChange={handleChange}
                    type={seeCustomerCode ? 'password' : 'text'}
                    required
                    shadow

                    className="w-full px-4 py-3 rounded-lg border
                    t
                    focus:ring-2
                     focus:ring-green-500"
                    style={{backgroundColor: 'white', color: 'black',  width: '100%', paddingRight: '40px'}}
                  />
                )}

                
    <div onClick={() => setSeeCustomerCode(!seeCustomerCode)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {seeCustomerCode ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent
                    
                    rounded-full animate-spin" />
                    <span className='text-2xl'>Logging in...</span>
                  </div>
                ) : (
                  <span className='text-2xl'>Login</span>
                )}
              </Button>

              <div onClick={handleGoBack} className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                <ArrowBackIcon />
                <span className='text-2xl'>Back to Selection</span>
              </div>
            </form>
          </div>
        </div>
        </>
      )}
      </>
    

  
  );
}



export default CustomerRole





