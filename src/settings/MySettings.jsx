
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
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { IoSettingsOutline } from "react-icons/io5";







const MySettings = () => {
    const { materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,seeSettings7, setSeeSettings7,
       handleFormDataChangeForCalendar,calendarSettings, setCalendarSettings
     } = useApplicationSettings();


const { login_with_otp, login_with_web_auth, login_with_otp_email, send_password_via_sms,
  send_password_via_email,check_is_inactive,check_inactive_days,check_inactive_hrs,
  enable_2fa_for_admin,check_inactive_minutes,enable_2fa_for_admin_passkeys
} = adminFormSettings


const {

  start_in_minutes,
        start_in_hours} = calendarSettings


// const {send_manager_number_via_email , send_manager_number_via_sms, enable_2fa_for_store_manager} = storeManagerSettings
      const [seeSettings6, setSeeSettings6] = useState(false)
     const [openLoad, setOpenLoad] = useState(false)
       

     const [open, setOpen] = useState(false);
     const [openError, setOpenError] = useState(false);
     const [loading, setloading] = useState(false)
const [isloading, setisloading] = useState({
  loading1: false,
  loading2: false,
  loading3: false,
  loading4: false,
  loading5: false,
  loading6: false,
  loading7: false,
  

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
        send_sms_and_email_for_provider:storedData.send_sms_and_email_for_provider,
        enable_2fa_for_service_provider:storedData.enable_2fa_for_service_provider,
        send_email_for_provider: storedData.send_email_for_provider,
        
      
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
  
  
  
  //   const handlegetcustomerSettings = useCallback(
  //     async()=> {
  //          const storedData = JSON.parse(localStorage.getItem("customer settings"));
         
  //          const requestParams = {
  //            use_auto_generated_number:storedData.use_auto_generated_number,
  //            send_sms_and_email:storedData.send_sms_and_email,
  //            send_email: storedData.send_email,
  //            enable_2fa: storedData.enable_2fa
              
           
  //          };
  //        try {
  //          const response = await fetch(`/api/get_customer_settings?${new URLSearchParams(requestParams)}`, {
  //          method: 'GET',
  //          signal: controller.signal,  
  
  //          headers: {
  //            "Content-Type"  : 'application/json'
  //          },
  //          })
  
  //       clearTimeout(id);

  
  //          const newData = await response.json()
  //          if (response.ok) {
  //          // const use_auto_generated_number = newData.use_auto_generated_number
  //          // const prefix = newData.prefix
  //          // const minimum_digits = newData.minimum_digits
         
         
  //          const {prefix, minimum_digits, use_auto_generated_number,send_sms_and_email,send_email,
  //           enable_2fa, enable_2fa_for_service_provider} = newData[0]
  //          setsettingsformData({...settingsformData, prefix,  minimum_digits, use_auto_generated_number,
  //           send_sms_and_email,send_email, enable_2fa, enable_2fa_for_service_provider
           
  //          })
           
  //          } else {
  //          console.log('failed to fetch')
  //          }
  //          } catch (error) {
  //          console.log(error)
  //          setOpenOfflineError(true)
           
  //          }
  //        },
     
  // []
  // )
  
  
      
    
  //   useEffect(() => {
  //     handlegetcustomerSettings()
  //   }, [handlegetcustomerSettings, setsettingsformData]);
  
const handleGetCalendarSettings = useCallback(
  async() => {
    try {
      const response = await fetch('/api/get_calendar_settings')
      const newData = await response.json()
      if (response.ok) {
        console.log('data',newData)
        // const start_in_minutes = newData.start_in_minutes
        //   const start_in_hours = newData.start_in_hours

          const {start_in_hours,  start_in_minutes} = newData[0]
          setCalendarSettings((prevData)=>  ({...prevData, start_in_minutes,
            start_in_hours
             }))
      } else {
        console.log('error fetching calendar settings')
        setOpenOfflineError(true)
      }
    } catch (error) {
      console.log('error fetching calendar settings', error)
      setOpenOfflineError(true)
    }
  },
  [],
)



useEffect(() => {
  handleGetCalendarSettings()
}, [handleGetCalendarSettings]);





    const handlegetAdminSettings = useCallback(
      async()=> {
           const storedData = JSON.parse(localStorage.getItem("admin settings"));
         
           const requestParams = {
            login_with_otp:storedData.login_with_otp,
            login_with_web_auth:storedData.login_with_web_authn,
            login_with_otp_email:storedData.login_with_otp_email,
            send_password_via_email:storedData.send_password_via_email,
            send_password_via_sms:storedData.send_password_via_sms,
            check_is_inactive: storedData.check_is_inactive,
            enable_2fa_for_admin: storedData.enable_2fa_for_admin,
            enable_2fa_for_admin_passkeys: storedData.enable_2fa_for_admin_passkeys 
           
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
  






    const handleUpdateCalendarSettings = async (e) => {
      setisloading({...isloading, loading7: true})
      setOpenLoad(true)
      e.preventDefault()
      try {
        const response = await fetch('/api/create_calendar_settings', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(calendarSettings)

        })

        if (response.status === 403) {
          setOpenError(true)
        }

        const newData = await response.json()
        if (response.ok) {
          // console.log('calendarSettings', newData)
          setisloading({...isloading, loading7: false})
          setOpenLoad(false)
          setOpen(true)

          const start_in_minutes = newData.start_in_minutes
          const start_in_hours = newData.start_in_hours
          setCalendarSettings((prevData)=>  ({...prevData, start_in_minutes,
            start_in_hours
             }))

             
        } else {
          console.log('error creating calendar settings')
          setisloading({...isloading, loading7: false})
          setOpenLoad(false)
        }
      } catch (error) {
        console.log('error creating calendar settings', error)
        setisloading({...isloading, loading7: false})
        setOpenLoad(false)
      }
    } 



     const handleUpdateCustomer = async(e)=> {
      // setloading(prev => !prev)
      setisloading({...isloading, loading2: true})
      setOpenLoad(true)
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
          const send_email = newData.send_email
          const enable_2fa = newData.enable_2fa
          setOpen(true)
          setOpenLoad(false)
          // setloading(false)
          setisloading({...isloading, loading2: false})
          setsettingsformData((prevData)=>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number,send_sms_and_email,send_email,enable_2fa
             }))

             localStorage.setItem('customer settings', JSON.stringify({ use_auto_generated_number, send_sms_and_email,
              send_email, enable_2fa

             }))
          console.log('customer_data:',newData)
        } else {
          console.log('failed')
          setOpen(false)
          setOpenLoad(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading2: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
        setisloading({...isloading, loading2: false})
        // setloading(false)
        // setloading(prev => prev)
      }
     }





     
     const handleUpdateAdminSettings = async(e)=> {
      // setloading(true)
      setisloading({...isloading, loading1: true})
      setOpenLoad(true)
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
         const login_with_web_authn = newData.login_with_web_auth
         const login_with_otp_email = newData.login_with_otp_email
         const send_password_via_email = newData.send_password_via_email
         const send_password_via_sms = newData.send_password_via_sms
         const check_inactive_hrs = newData.check_inactive_hrs
         const check_is_inactive = newData.check_is_inactive
         const check_inactive_days = newData.check_inactive_days
         const enable_2fa_for_admin = newData.enable_2fa_for_admin
         const check_inactive_minutes = newData.check_inactive_minutes
         const enable_2fa_for_admin_passkeys = newData.enable_2fa_for_admin_passkeys


          setOpen(true)
          setOpenLoad(false)
          setisloading({...isloading,loading1: false})
          // setloading(false)
          setAdminFormSettings((prevData)=>  ({...prevData, login_with_otp,login_with_web_authn,
            login_with_otp_email,send_password_via_email,send_password_via_sms,
            check_inactive_hrs, check_inactive_days,check_is_inactive,enable_2fa_for_admin,check_inactive_minutes,
            enable_2fa_for_admin_passkeys
             }))


          // setAdminWebAuthSettings({...adminWebAuthSettings, login_with_web_authn})

           

             localStorage.setItem('admin settings', JSON.stringify({login_with_otp, login_with_web_authn,
              login_with_otp_email,send_password_via_email,send_password_via_sms,check_inactive_hrs,
              check_is_inactive,enable_2fa_for_admin,enable_2fa_for_admin_passkeys,
              check_inactive_days
             }))
          console.log('admin_data:',newData)
        } else {
          console.log('failed')
          setOpen(false)
          setOpenLoad(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading,loading1: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
        // setloading(false)
        setisloading({...isloading,loading1: false})
      }
     }







     const handleUpdateStoreManager = async(e)=> {
      // setloading(true)
      setisloading({...isloading, loading5: true})
      setOpenLoad(true)
      e.preventDefault()
      try {
        const response = await fetch('/api/update_store_manager',{
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
          const send_manager_number_via_email = newData.send_manager_number_via_email
          const enable_2fa_for_store_manager = newData.enable_2fa_for_store_manager
          const send_manager_number_via_sms = newData.send_manager_number_via_sms

          setOpen(true)
          // setloading(false)
          setisloading({...isloading, loading5: false})
          localStorage.setItem('store_manager_settings',  
            JSON.stringify({send_manager_number_via_sms, enable_2fa_for_store_manager, send_manager_number_via_email})
             );
          setstoreManagerSettings((prevData)=>  ({...prevData, prefix, minimum_digits, 
      send_manager_number_via_sms, enable_2fa_for_store_manager,send_manager_number_via_email
             }))
             setOpenLoad(false)

        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading5: false})
          setOpenLoad(false)
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
        // setloading(false)
        setisloading({...isloading, loading5: false})
      }
     }






     const handleUpdateTicket = async(e)=> {
      // setloading(true)
      setisloading({...isloading, loading6: true})
      setOpenLoad(true)
      e.preventDefault()
      try {
        const response = await fetch('/api/update_ticket_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsTicket)
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
          setisloading({...isloading, loading6: false})
          setsettingsTicket((prevData)=>  ({...prevData, prefix, minimum_digits, 
             }))
             setOpenLoad(false)
        } else {
          console.log('failed')
          setOpen(false)
          setOpenLoad(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading6: false})

        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
        // setloading(false)
        setisloading({...isloading, loading6: false})
      }
     }









     const handleUpdateProvider = async(e)=> {
      e.preventDefault()
      try {
        // setloading(true)
        setisloading({...isloading, loading3: true})
        setOpenLoad(true)
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
          const enable_2fa_for_service_provider = newData.enable_2fa_for_service_provider
          const send_email_for_provider = newData.send_email_for_provider
          setOpen(true)
          setOpenLoad(false)
          // setloading(false)
          setisloading({...isloading, loading3: false})
          setsettingsforProvider((prevData) =>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number_for_service_provider,send_sms_and_email_for_provider,
            send_email_for_provider,enable_2fa_for_service_provider
             }))

             localStorage.setItem('provider settings', JSON.stringify({ use_auto_generated_number_for_service_provider,
               send_sms_and_email_for_provider, enable_2fa_for_service_provider, send_email_for_provider}))
          console.log('customer_data:',newData)

        } else {
          console.log('failed')
          setOpen(false)
          setOpenLoad(false)
          // setOpenError(true)
          // setloading(false)
          setisloading({...isloading, loading3: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
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
  





   





    const handlegetTicketSettings = useCallback(
      async()=> {
         
          
         try {
           const response = await fetch(`/api/get_ticket_settings`, {
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
           setsettingsTicket({...settingsTicket, prefix,  minimum_digits
           
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
      handlegetTicketSettings()
    }, [handlegetTicketSettings]);
  












     const handleUpdateStore = async(e)=> {
      e.preventDefault()
      try {
        // setloading(true)
        setisloading({...isloading, loading4: true})
        setOpenLoad(true)
        const response = await fetch('/api/update_store_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsForStore)
        })
        const newData = await response.json()

        if (response.status === 403) {
          setOpenError(true)
        }


        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          setOpen(true)
          setOpenLoad(false)
          // setloading(false)
          setisloading({...isloading, loading4: false})
          setsettingsForStore((prevData) =>  ({...prevData, prefix, minimum_digits, 
            
             }))

            
        } else {
          console.log('failed')
          setOpen(false)
          // setOpenError(true)
          // setloading(false)
          setOpenLoad(false)
          setisloading({...isloading, loading4: false})
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
        setOpenLoad(false)
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


const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


  return (

<>


{isloading.loading1 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



{isloading.loading2 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }


{isloading.loading3 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



{isloading.loading4 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }


{isloading.loading5 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



{isloading.loading6 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



{isloading.loading7 &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }

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
      <span className="flex items-center"><IoSettingsOutline className='p-1 text-3xl'/> Admin Registration</span>
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
   
    <ThemeProvider theme={materialuitheme}>

    <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />}
     label="Require Email At Signup" />

     <Tooltip title={<p className='text-lg'>send a one time password via sms when an admin logs in via two
       factor authentication </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox onChange={handleFormDataChangeForAdmin}
         checked={login_with_otp} color="default"/>} 
      label="during two factor authentication login send otp(one time password) via sms" name='login_with_otp' />
</Tooltip>


<Tooltip title={<p className='text-lg'>send a one time password via email when an admin logs in via two
  factor authentication </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox onChange={handleFormDataChangeForAdmin}
         checked={login_with_otp_email} color="default"/>} 
      label="during two factor authentication login send otp(one time password) via email" name='login_with_otp_email' />
</Tooltip>


<Tooltip title={<p className='text-lg'>enable two factor authentication for admin </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox onChange={handleFormDataChangeForAdmin}
         checked={enable_2fa_for_admin} color="default"/>} 
      label="enable 2FA (two factor authentication) for admins (password + otp verification)" name='enable_2fa_for_admin' />
</Tooltip>


<Tooltip title={<p className='text-lg'>enable two factor authentication for admin </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox 
      checked={enable_2fa_for_admin_passkeys} onChange={handleFormDataChangeForAdmin}
         color="default"/>} 
      label="enable 2FA (two factor authentication) for admins (password + passkeys)" 
      
      name='enable_2fa_for_admin_passkeys'
      />
</Tooltip>

      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox
      checked={check_is_inactive} onChange={handleFormDataChangeForAdmin} color="default" />} 
      label="Logout  an admin after a period of inactivity"  name='check_is_inactive' />





</ThemeProvider >

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
          label="Logout Admin after a period of inactivity(hrs)"

type='number'
name='check_inactive_hrs'
onChange={handleFormDataChangeForAdmin}
value={check_inactive_hrs}
        />




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
          label="Logout Admin after a period of inactivity(days)"
value={check_inactive_days}
onChange={handleFormDataChangeForAdmin}
name='check_inactive_days'
type='number'
        />


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
          label="Logout Admin after a period of inactivity(minutes)"
value={check_inactive_minutes}
onChange={handleFormDataChangeForAdmin}
name='check_inactive_minutes'
type='number'
        />



</ThemeProvider >

        </Box>
        <ThemeProvider theme={materialuitheme}>

        <Tooltip title={<p className='text-lg'>send  password via email to a user after they get invited to the sytem</p>}>
        <FormControlLabel   name='send_password_via_email' className='dark:text-black'  control={<Checkbox color="default"
        checked={send_password_via_email} onChange={handleFormDataChangeForAdmin}/>} 
        label="Send Invite To User Via Email" />
       </Tooltip>


       <Tooltip title={<p className='text-lg'>send  password via sms to a user after they get invited to the sytem</p>}>
        <FormControlLabel  className='dark:text-black'  name='send_password_via_sms' control={<Checkbox color="default"
        checked={send_password_via_sms} onChange={handleFormDataChangeForAdmin}/>} 
        label="Send Invite To User Via Sms" />
       </Tooltip>



       <Tooltip title={<p className='text-lg'>users will be invited to the system via email and they will use passkeys during authentication(login)
       </p>}>
        <FormControlLabel  className='dark:text-black' name='login_with_web_auth'  control={<Checkbox color="default"
        onChange={handleFormDataChangeForAdmin}  checked={login_with_web_auth}/>  } 
        label="Invite users with email(users will be invited to the system via passkeys)" />
       </Tooltip>

       </ThemeProvider >

<div className='p-5'>

<button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading1 &&  <ImSpinner9 className={` ${isloading.loading1 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>


      

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
      <span className="flex items-center">   <IoSettingsOutline className='p-1 text-3xl'/>  Customer Account</span>
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



<Tooltip title={<p className='text-lg'>Here the customers  will receive 
  the customer code after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login authenticating two times instead of once,all this will be done via sms
       </p>}>
<FormControlLabel  className='dark:text-black' control={<Checkbox  color="default" 
 checked={settingsformData.send_sms_and_email} onChange={handleCustomerFormDataChange}
/>}   name='send_sms_and_email'    label="Send Customer Code Once a Customer 
Is Created(Sms)"  />

</Tooltip >

<FormControlLabel  className='dark:text-black' control={<Checkbox  color="default" 
 checked={settingsformData.enable_2fa} onChange={handleCustomerFormDataChange}
/>}   name='enable_2fa'    label="Enable 2FA(Two Factor Authentication) for customer login(otp verification)"  />



<Tooltip title={<p className='text-lg'>Here the customers  will receive 
  the customer code after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login authenticating two times instead of once,all this will be done via email
       </p>}>
<FormControlLabel name='send_email'  className='dark:text-black' checked={settingsformData.send_email} control={<Checkbox  color="default" 
  onChange={handleCustomerFormDataChange}
/>}      label="Send Customer Code Once a Customer 
Is Created(email)"  />
</Tooltip>




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
        <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading2 &&  <ImSpinner9 className={` ${isloading.loading2 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>

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
      <span className="flex items-center">
      <IoSettingsOutline className='p-1 text-3xl'/>
        Service Provider Account?</span>
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


<FormControlLabel name='enable_2fa_for_service_provider'  className=' dark:text-black'
 
       label="enable 2FA for service provider (Two Factor Authentication)"
       control={<Checkbox color="default"  onChange={handleCustomerFormDataChangeForProvider}
        checked={settingsformDataForProvider.enable_2fa_for_service_provider}/>}
      />


<Tooltip title={<p className='text-lg'>
  Here the service providers  will receive 
  the service provider code after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login authenticating two times instead of once,all this will be done via email
  </p>}>
<FormControlLabel name='send_email_for_provider'   className=' dark:text-black' 
       label="Send Service Provider
      Code Once Service Provider Has Been Created(Email)"
       control={<Checkbox color="default" onChange={handleCustomerFormDataChangeForProvider} 
       checked={settingsformDataForProvider.send_email_for_provider}/>}
      />
</Tooltip>




<Tooltip title={<p className='text-lg'>Here the service providers  will receive 
  the service provider code after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login authenticating two times instead of once,all this will be done via sms
  </p>}>
      <FormControlLabel  className=' dark:text-black' control={<Checkbox  color="default"   
       onChange={handleCustomerFormDataChangeForProvider}
      checked={settingsformDataForProvider.send_sms_and_email_for_provider
      }
      />} label="Send Service Provider
      Code Once Service Provider Has Been Created(SMS)" name='send_sms_and_email_for_provider' />
   </Tooltip>

      
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
   
            
   <TextField  name='prefix'   value={settingsformDataForProvider.prefix}  onChange={handleCustomerFormDataChangeForProvider}
     className='myTextField '
             label='Service Provider Code No Prefix' ></TextField>
           
   
   <TextField name='minimum_digits'  value={settingsformDataForProvider.minimum_digits} onChange={handleCustomerFormDataChangeForProvider} className='myTextField '   
                type='number'  label='Service Provider Code Minimum Digits(Zeros will be added to the front, eg SUB001 for
                 three digits)'></TextField>
   
           </Stack>
           <div className='p-5'>
           <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading3 &&  <ImSpinner9 className={` ${isloading.loading3 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>

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
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>  Store Number?</span>
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
        <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading4 &&  <ImSpinner9 className={` ${isloading.loading4 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>

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
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>     Store Manager?</span>
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
   <Tooltip title={<p className='text-lg'>Here the storemanagers  will receive 
  the manager number after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login authenticating two times instead of once,all this will be done via sms </p>}>
      <FormControlLabel  className='dark:text-black text-white'   control={<Checkbox 
      onChange={handleFormDataChangeForStoreManager} checked={storeManagerSettings.send_manager_number_via_sms}
          color="default"/>} 
      label="Send Manager Number Once StoreManager Has Been Created(SMS)"
 name='send_manager_number_via_sms' />
</Tooltip>


<Tooltip title={<p className='text-lg'>Here the storemanagers  will receive 
  the manager number after their account has been created to use for loging into their account, but 
  if two factor authentication (otp verification) is enabled then he will receive additional details
   (one time password) inorder to login hence authenticating two times instead of once,all this will be done via email </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox 
      checked={storeManagerSettings.send_manager_number_via_email} onChange={handleFormDataChangeForStoreManager}
          color="default"/>} 
      label="Send Manager Number Once StoreManager Has Been Created(Email)" name='send_manager_number_via_email' />
</Tooltip>



<Tooltip title={<p className='text-lg'>use two factor authentication for store manager login (password plus otp) </p>}>
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox 
      onChange={handleFormDataChangeForStoreManager} checked={storeManagerSettings.enable_2fa_for_store_manager}
          color="default"/>} 
      label="enable 2FA for store manager(otp verification)" name='enable_2fa_for_store_manager' />
</Tooltip>



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
        <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading5 &&  <ImSpinner9 className={` ${isloading.loading5 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>

        </div>

        </ThemeProvider>

  </motion.div>
  </form>










  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings6(!seeSettings6)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>  Ticket Number?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>


  <form onSubmit={handleUpdateTicket}>


  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings6 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
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

          <TextField  
          
          label='Ticket Number  Prefix' name='prefix'
           value={settingsTicket.prefix} onChange={handleFormDataChangeForTickets}></TextField>

          <TextField   
           className='myTextField'   
             type='number'  label='Ticket Number Minimum Digits(Zeros will be added to the front, eg SUB001 for
              three digits)'  name='minimum_digits'  onChange={handleFormDataChangeForTickets} value={settingsTicket.minimum_digits}></TextField>

        </Stack>
        <div className='p-5'>
        <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading6 &&  <ImSpinner9 className={` ${isloading.loading6 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>
        </div>

        </ThemeProvider>

  </motion.div>
  </form>




  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings7(!seeSettings7)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/> Calendar?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>





  <form onSubmit={handleUpdateCalendarSettings}>


  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings7 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
  aria-labelledby="accordion-open-heading-2">


   <ThemeProvider theme={materialuitheme}>


  <FormGroup>
          




</FormGroup>
        </ThemeProvider>

<ThemeProvider theme={materialuitheme}>

<p className='text-black p-3 font-light edu_ustralia_font text-lg tracking-widest'>
  Notify Admin Before An Event Starts (notify 30,10,2, 10,minutes or hrs before an event starts)</p>
        <Stack direction='column'  className='myTextField'  sx={{
           
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

          <TextField  
          value={start_in_minutes}
          name='start_in_minutes'
          onChange={handleFormDataChangeForCalendar}
          label='Minutes' 
          type='number'
           ></TextField>

          <TextField  
          onChange={handleFormDataChangeForCalendar}
          value={start_in_hours} 
          name='start_in_hours'
           className='myTextField'   
             type='number'  label='Hours' ></TextField>

        </Stack>
        <div className='p-5'>
        <button  type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
  hover:translate-y-[3px] rounded-md">
    {isloading.loading7 &&  <ImSpinner9 className={` ${isloading.loading7 && 'animate-spin'  }   `} /> } 
        UPDATE SETTINGS
      </button>
        </div>

        </ThemeProvider>

  </motion.div>
  </form>
</div>

</>
  )
}

export default MySettings

