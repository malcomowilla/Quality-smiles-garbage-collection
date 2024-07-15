
import {  ThemeProvider } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { motion } from "framer-motion"
import { useApplicationSettings } from '../settings/ApplicationSettings';
import SettingsAlert from '../Alert/SettingsAlert'
import SettingsAlertError from '../Alert/SettingsAlertError'
import SettingsOffLineAlert from '../Alert/SettingsOffLineAlert'
import { ImSpinner9 } from "react-icons/im";
import {useEffect, useCallback, useState} from 'react'
import AccessDenied from '../access_denied/AccessDenied'
import Tooltip from '@mui/material/Tooltip';








const MySettings = () => {
    const { materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin
     } = useApplicationSettings();


const { login_with_otp} = adminFormSettings

      

       

     const [open, setOpen] = useState(false);
     const [openError, setOpenError] = useState(false);
     const [loading, setloading] = useState(false)
const [isloading, setisloading] = useState({
  loading1: false,
  loading2: false,
  loading3: false,
  loading4: false,
  loading5: false,
  

})

     const handleClose = (event, reason) => {
       if (reason === 'clickaway') {
         return;
       }
   
       setOpen(false);
     };



     const handleCloseError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenError(false);
    };


    const handleCloseOfflineError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenOfflineError(false);
    };





    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 9000);
    
  
  
  
  
  
  
  
  
  
    const handlegetproviderSettings  = useCallback(
              
      async()=> {
      const storedData = JSON.parse(localStorage.getItem("provider settings"));
    
      const requestParams = {
        use_auto_generated_number_for_service_provider:storedData.use_auto_generated_number_for_service_provider,
        send_sms_and_email_for_provider:storedData.send_sms_and_email_for_provider
      
      };
    try {
      const response = await fetch(`/api/get_provider_settings?${new URLSearchParams(requestParams)}`, {
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
  
    
      const {prefix, minimum_digits,  use_auto_generated_number_for_service_provider, send_sms_and_email_for_provider} = newData[0]
      setsettingsforProvider({...settingsformData, prefix,  minimum_digits, 
         use_auto_generated_number_for_service_provider, send_sms_and_email_for_provider
      
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
  
  
  
    const handlegetcustomerSettings = useCallback(
      async()=> {
           const storedData = JSON.parse(localStorage.getItem("customer settings"));
         
           const requestParams = {
             use_auto_generated_number:storedData.use_auto_generated_number,
             send_sms_and_email:storedData.send_sms_and_email 
           
           };
         try {
           const response = await fetch(`/api/get_customer_settings?${new URLSearchParams(requestParams)}`, {
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
         
         
           const {prefix, minimum_digits, use_auto_generated_number,send_sms_and_email} = newData[0]
           setsettingsformData({...settingsformData, prefix,  minimum_digits, use_auto_generated_number,
            send_sms_and_email
           
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
  




    const handlegetAdminSettings = useCallback(
      async()=> {
           const storedData = JSON.parse(localStorage.getItem("admin settings"));
         
           const requestParams = {
            login_with_otp:storedData.login_with_otp,
           
           };
         try {
           const response = await fetch(`/api/get_settings_for_admin?${new URLSearchParams(requestParams)}`, {
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
           const login_with_otp = newData.login_with_otp 
         
         
          //  const {login_with_otp} = newData[0]
           setAdminFormSettings({...adminFormSettings, login_with_otp
           
           })
           
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
    }, [handlegetAdminSettings, setAdminFormSettings]);
  









     const handleUpdateCustomer = async(e)=> {
      // setloading(prev => !prev)
      setisloading({...isloading, loading2: true})
      e.preventDefault()
      try {
        const response = await fetch('/api/update_customer_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsformData)
        })
        const newData = await response.json()

        if (response.status === 403) {
          setOpenError(true)
        }
        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          const use_auto_generated_number = newData.use_auto_generated_number
          const send_sms_and_email = newData.send_sms_and_email
          setOpen(true)
          // setloading(false)
          setisloading({...isloading, loading2: false})
          setsettingsformData((prevData)=>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number,send_sms_and_email
             }))

             localStorage.setItem('customer settings', JSON.stringify({ use_auto_generated_number, send_sms_and_email}))
          console.log('customer_data:',newData)
        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading2: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setisloading({...isloading, loading2: false})
        // setloading(false)
        // setloading(prev => prev)
      }
     }





     
     const handleUpdateAdminSettings = async(e)=> {
      // setloading(true)
      setisloading({...isloading, loading1: true})
      e.preventDefault()
      try {
        const response = await fetch('/api/admin_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(adminFormSettings)
        })
        const newData = await response.json()


        if (response.status === 403) {
          setOpenError(true)
        }
        if (response.ok) {
          const login_with_otp = newData.login_with_otp
         
          setOpen(true)
          // setloading(false)
          setAdminFormSettings((prevData)=>  ({...prevData, login_with_otp
             }))

             localStorage.setItem('admin settings', JSON.stringify({login_with_otp}))
          console.log('admin_data:',newData)
        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading,loading1: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        // setloading(false)
        setisloading({...isloading,loading1: false})
      }
     }







     const handleUpdateStoreManager = async(e)=> {
      // setloading(true)
      setisloading({...isloading, loading5: true})
      e.preventDefault()
      try {
        const response = await fetch('/api/update_store_manager',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsformData)
        })
        const newData = await response.json()


        if (response.status === 403) {
          setOpenError(true)
        }
        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          setOpen(true)
          // setloading(false)
          setisloading({...isloading, loading5: false})
          setstoreManagerSettings((prevData)=>  ({...prevData, prefix, minimum_digits, 
             }))

        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading5: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        // setloading(false)
        setisloading({...isloading, loading5: false})
      }
     }









     const handleUpdateProvider = async(e)=> {
      e.preventDefault()
      try {
        // setloading(true)
        setisloading({...isloading, loading3: true})
        const response = await fetch('/api/update_provider_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsformDataForProvider)
        })
        const newData = await response.json()

        if (response.status === 403) {
          setOpenError(true)
        }


        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          const use_auto_generated_number_for_service_provider = newData.use_auto_generated_number_for_service_provider
          const send_sms_and_email_for_provider = newData.send_sms_and_email_for_provider
          setOpen(true)
          // setloading(false)
          setisloading({...isloading, loading3: false})
          setsettingsforProvider((prevData) =>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number_for_service_provider,send_sms_and_email_for_provider
             }))

             localStorage.setItem('provider settings', JSON.stringify({ use_auto_generated_number_for_service_provider,
               send_sms_and_email_for_provider}))
          console.log('customer_data:',newData)

        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading3: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        // setloading(false)
        setisloading({...isloading, loading3: false})
      }
     }














     const handlegetstoreSettings = useCallback(
      async()=> {
         
          
         try {
           const response = await fetch(`/api/get_store_settings`, {
           method: 'GET',
           signal: controller.signal,  
  
           headers: {
             "Content-Type"  : 'application/json'
           },
           })
  

  
           const newData = await response.json()
           if (response.ok) {
           // const use_auto_generated_number = newData.use_auto_generated_number
           // const prefix = newData.prefix
           // const minimum_digits = newData.minimum_digits
         
         
           const {prefix, minimum_digits} = newData[0]
           setsettingsForStore({...settingsForStore, prefix,  minimum_digits
           
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
      handlegetstoreSettings()
    }, [handlegetstoreSettings]);
  





    const handlegetstoreManagerSettings = useCallback(
      async()=> {
         
          
         try {
           const response = await fetch(`/api/get_store_manager`, {
           method: 'GET',
           signal: controller.signal,  
  
           headers: {
             "Content-Type"  : 'application/json'
           },
           })
  

  
           const newData = await response.json()
           if (response.ok) {
           // const use_auto_generated_number = newData.use_auto_generated_number
           // const prefix = newData.prefix
           // const minimum_digits = newData.minimum_digits
         
         
           const {prefix, minimum_digits} = newData[0]
           setstoreManagerSettings({...storeManagerSettings, prefix,  minimum_digits
           
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
      handlegetstoreManagerSettings()
    }, [handlegetstoreManagerSettings]);
  













     const handleUpdateStore = async(e)=> {
      e.preventDefault()
      try {
        // setloading(true)
        setisloading({...isloading, loading4: true})
        const response = await fetch('/api/update_store_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(storeManagerSettings)
        })
        const newData = await response.json()

        if (response.status === 403) {
          setOpenError(true)
        }


        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          setOpen(true)
          // setloading(false)
          setisloading({...isloading, loading4: false})
          setsettingsForStore((prevData) =>  ({...prevData, prefix, minimum_digits, 
            
             }))

            
        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading4: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        // setloading(false)
        setisloading({...isloading, loading4: false})
      }
     }

const variantDiv = {
  hidden: {
    opacity: 0,
    overflow: 'hidden',
    height: 0
    
  },

  visible: {
    opacity: 1,
    overflow: 'hidden',
    height: 'auto'
  }
}




  return (



<div id="accordion-open" data-accordion="open" className='mt-9'>
  <SettingsAlert open={open} handleClose={handleClose}/>
  <SettingsAlertError openError={openError} handleCloseError={handleCloseError}/>
<SettingsOffLineAlert   handleCloseOfflineError={handleCloseOfflineError} openOfflineError={openOfflineError}/>
  <h2 id="accordion-open-heading-1">


    <button type="button" onClick={()=> setSeeSettings1(!seeSettings1)}   className="flex items-center justify-between 
    w-full p-5 font-medium rtl:text-right
      border border-b-0 border-gray-200 rounded-t-xl  text-white  focus:ring-4 focus:ring-gray-200
      dark:focus:ring-gray-800
      dark:border-gray-700 dark:text-gray-900 hover:dark:text-white hover:text-black hover:bg-gray-100
       dark:hover:bg-gray-800 gap-3"
       data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 hover:text-white  " fill="currentColor"
       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8
        0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 
        0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg> Admin Registration</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>




<form onSubmit={handleUpdateAdminSettings}>
  <motion.div   variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings1 ? "visible" : "hidden"}  id="" 
  className={`
   `}
   >
    <div className="p-5 border border-b-0 border-gray-200 ">
   

    <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />}
     label="Require Email At Signup" />

     <Tooltip title={<p className='text-lg'>require your users to login with a one time password/two factor authentication </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox onChange={handleFormDataChangeForAdmin}
         checked={login_with_otp} color="default"/>} 
      label="Allow Login With OTP(one time password)/2FA" name='login_with_otp' />
</Tooltip>

      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />} 
      label="Logout User on exit or after a period of inactivity" />

<Tooltip title={<p className='text-lg'>emails with .co.ke will be rejected, for example  otoshisan@arigato.co.ke </p>} arrow>
    
    
<FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />} 
      label="Use Strict Email Validation"  /> </Tooltip>
      <Box
       className='dark:text-black myTextField'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '120ch' },
      }}
      noValidate
    >
<ThemeProvider theme={materialuitheme}>

<TextField sx={{
  '& label.Mui-focused':{
    color: 'gray'
  },
width: {
xs: '30%'
},

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px'
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
},
}}
          id="outlined-multiline-flexible"
          label="Logout User after a period of inactivity(hrs)"

type='number'
        />
</ThemeProvider >

        </Box>

        <Tooltip title={<p className='text-lg'>send welcome sms to admin after they get registered to the sytem</p>}>
        <FormControlLabel  className='dark:text-black'  control={<Checkbox color="default"/>} l
        label="Send Welcome Message After Registration(SMS)" />
       </Tooltip>
<div className='p-5'>
        <button type='submit'  disabled={isloading.loading1} className="btn dark:btn  btn-outline hover:dark:text-white">
        {isloading.loading1 &&  <ImSpinner9 className={` ${isloading.loading1 && 'animate-spin'  }   `} /> } 

          UPDATE SETTINGS</button>

        </div>
    </div>
  </motion.div>
  </form>







  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings2(!seeSettings2)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 hover:text-white  " fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 
       1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"></path></svg>Customer Account</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>

<form onSubmit={handleUpdateCustomer}>

  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings2 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
  aria-labelledby="accordion-open-heading-2">


   <ThemeProvider theme={materialuitheme}>


  <FormGroup>
          

    <FormControlLabel   className=' dark:text-black' sx={{
       width:{
        xs: '25%',
        sm: '30%',
        marginTop: 20
        
      }
    }}  control={<Checkbox color="default" />} label="Automatically Send Reminder SMS for Expiring Payments"  />



<FormControlLabel  className=' dark:text-black' control={<Checkbox color="default" onChange={handleCustomerFormDataChange}

checked={settingsformData.use_auto_generated_number}
/>}   label="Use Auto GeneratedNumber 
 As Customer Code"  name='use_auto_generated_number'/>


<FormControlLabel  className='dark:text-black' control={<Checkbox  color="default" 
 checked={settingsformData.send_sms_and_email} onChange={handleCustomerFormDataChange}
/>}   name='send_sms_and_email'    label="Send Customer Code Once Account 
Is Created Is Created(SMS/Email)"  />



</FormGroup>
        </ThemeProvider>

<ThemeProvider theme={materialuitheme}>

        <Stack direction='row'  className='myTextField'  sx={{
           
        '& .MuiTextField-root': { m: 1, width: '90ch',    '& label.Mui-focused': {
          color: 'black',
          fontSize: '16px'
          },
      '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px',
          },
       '&.Mui-focused fieldset':  {
          borderColor: 'black', 
          
        }
      } },
      }}   spacing={{
          xs: 1,
          sm: 2
        }}>

          <TextField  name='prefix' 
          
          label='Customer Code  Prefix' onChange={handleCustomerFormDataChange} value={settingsformData.prefix}></TextField>

          <TextField name='minimum_digits' onChange={handleCustomerFormDataChange} value={settingsformData.minimum_digits}  className='myTextField'   
             type='number'  label='Customer Code Minimum Digits(Zeros will be added to the front, eg SUB001 for
              three digits)'></TextField>

        </Stack>
        <div className='p-5'>
        <button type='submit'  disabled={isloading.loading2} className="btn dark:btn  btn-outline hover:dark:text-white">
        {isloading.loading2 &&  <ImSpinner9 className={` ${isloading.loading2 && 'animate-spin'  }   `} /> } 

          UPDATE SETTINGS</button>

        </div>

        </ThemeProvider>

  </motion.div>
</form>

  <h2 id="accordion-open-heading-3">
    <button type="button"  onClick={()=> setSeeSettings3(!seeSettings3)} className="flex items-center justify-between w-full p-5 font-medium 
    rtl:text-right text-white border dark:text-black border-gray-200 focus:ring-4 hover:text-black focus:ring-gray-200
     dark:focus:ring-gray-800 dark:border-gray-700 dark:hover:text-white hover:bg-gray-100 
     dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-3" aria-expanded="false" 
     aria-controls="accordion-open-body-3">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0
        00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 
        0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Service Provider Account?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>

  
  <motion.div className='p-3' variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings3 ? "visible" : "hidden"} id="accordion-open-body-3"
   aria-labelledby="accordion-open-heading-3">

<ThemeProvider theme={materialuitheme}>





<form onSubmit={handleUpdateProvider}>
  <FormGroup>
          
      <FormControlLabel  name='use_auto_generated_number_for_service_provider' className=' dark:text-black' 
      control={<Checkbox color="default"  onChange={handleCustomerFormDataChangeForProvider}
      checked={settingsformDataForProvider.use_auto_generated_number_for_service_provider}/>
    
    
    } label="Use Auto GeneratedNumber As Service Provider Code"  />

      <FormControlLabel  className=' dark:text-black' control={<Checkbox  color="default"   
       onChange={handleCustomerFormDataChangeForProvider}
      checked={settingsformDataForProvider.send_sms_and_email_for_provider
      }
      />} label="Send Service Provider
      Code Once Account Is Created Is Created(SMS/Email)" name='send_sms_and_email_for_provider' />
   
      
      </FormGroup>
  <Stack direction='row'  className='myTextField'  sx={{
           
           '& .MuiTextField-root': { m: 1, width: '90ch', textTransform: 'uppercase',   '& label.Mui-focused': {
             color: 'black',
             fontSize: '16px'
             },
         '& .MuiOutlinedInput-root': {
           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
             borderColor: "black",
             borderWidth: '3px',
             },
          '&.Mui-focused fieldset':  {
             borderColor: 'black', 
             
           }
         } },
         }}   spacing={{
             xs: 1,
             sm: 2
           }}>
   
            
   <TextField  name='prefix'      value={settingsformDataForProvider.prefix}  onChange={handleCustomerFormDataChangeForProvider}
     className='myTextField '
             label='Service Provider Code No Prefix' ></TextField>
           
   
   <TextField name='minimum_digits'  value={settingsformDataForProvider.minimum_digits} onChange={handleCustomerFormDataChangeForProvider} className='myTextField '   
                type='number'  label='Service Provider Code Minimum Digits(Zeros will be added to the front, eg SUB001 for
                 three digits)'></TextField>
   
           </Stack>
           <div className='p-5'>
         <button type='submit'  disabled={isloading.loading3} className="btn dark:btn  btn-outline hover:dark:text-white">
        {isloading.loading3 &&  <ImSpinner9 className={` ${isloading.loading3 && 'animate-spin'  }   `} /> } 

          UPDATE SETTINGS</button>

        </div>
        </form>
           </ThemeProvider>

  </motion.div>




  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings4(!seeSettings4)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 hover:text-white  " fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 
       1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"></path></svg>Store Number?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>


  <form onSubmit={handleUpdateStore}>


  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings4 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
  aria-labelledby="accordion-open-heading-2">


   <ThemeProvider theme={materialuitheme}>


  <FormGroup>
          




</FormGroup>
        </ThemeProvider>

<ThemeProvider theme={materialuitheme}>

        <Stack direction='row'  className='myTextField'  sx={{
           
        '& .MuiTextField-root': { m: 1, width: '90ch',  marginTop: '30px',  '& label.Mui-focused': {
          color: 'black',
          fontSize: '16px'
          },
      '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px',
          },
       '&.Mui-focused fieldset':  {
          borderColor: 'black', 
          
        }
      } },
      }}   spacing={{
          xs: 1,
          sm: 2
        }}>

          <TextField  name='prefix' 
          
          label='Store Number  Prefix' onChange={handleStoreFormDataChange} value={settingsForStore.prefix}   ></TextField>

          <TextField name='minimum_digits' onChange={handleStoreFormDataChange} value={settingsForStore.minimum_digits} 
           className='myTextField'   
             type='number'  label='Store Number Minimum Digits(Zeros will be added to the front, eg SUB001 for
              three digits)'></TextField>

        </Stack>
        <div className='p-5'>
        <button type='submit'  disabled={isloading.loading4} className="btn dark:btn  btn-outline hover:dark:text-white">
        {isloading.loading4 &&  <ImSpinner9 className={` ${isloading.loading4 && 'animate-spin'  }   `} /> } 

          UPDATE SETTINGS</button>

        </div>

        </ThemeProvider>

  </motion.div>
  </form>






  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings5(!seeSettings5)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 hover:text-white  " fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 
       1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"></path></svg>Store Manager?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>


  <form onSubmit={handleUpdateStoreManager}>


  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings5 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
  aria-labelledby="accordion-open-heading-2">


   <ThemeProvider theme={materialuitheme}>


  <FormGroup>
          




</FormGroup>
        </ThemeProvider>

<ThemeProvider theme={materialuitheme}>

        <Stack direction='row'  className='myTextField'  sx={{
           
        '& .MuiTextField-root': { m: 1, width: '90ch',  marginTop: '30px',  '& label.Mui-focused': {
          color: 'black',
          fontSize: '16px'
          },
      '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px',
          },
       '&.Mui-focused fieldset':  {
          borderColor: 'black', 
          
        }
      } },
      }}   spacing={{
          xs: 1,
          sm: 2
        }}>

          <TextField  name='prefix' 
          
          label='Store Manager  Prefix' onChange={handleFormDataChangeForStoreManager} value={storeManagerSettings.prefix} ></TextField>

          <TextField name='minimum_digits' onChange={handleFormDataChangeForStoreManager} value={storeManagerSettings.minimum_digits} 
           className='myTextField'   
             type='number'  label='Store Manager Minimum Digits(Zeros will be added to the front, eg SUB001 for
              three digits)'></TextField>

        </Stack>
        <div className='p-5'>
         <button type='submit'  disabled={isloading.loading5} className="btn dark:btn  btn-outline hover:dark:text-white">
        {isloading.loading5 &&  <ImSpinner9 className={` ${isloading.loading5 && 'animate-spin'  }   `} /> } 

          UPDATE SETTINGS</button>

        </div>

        </ThemeProvider>

  </motion.div>
  </form>
</div>

  )
}

export default MySettings

