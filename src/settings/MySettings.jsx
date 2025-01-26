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
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import CompanySettingsCreateAlert from '../Alert/CompanySettingsCreateAlert'
import { AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
import { createTheme,  } from '@mui/material';
import toaster, { Toaster } from 'react-hot-toast';

import ThemeSettings from './ThemeSettings';




// openCreateAlert, handleCloseCreateAlert

const SettingsCheckbox = ({ label, description, checked, onChange, name }) => (
  <div className="mb-4 p-4  rounded-lg shadow-sm">
    <FormControlLabel
      className="dark:text-black text-white mb-1"
      control={
        <Checkbox 
          checked={checked}
          onChange={onChange}
          name={name}
          color="default"
        />
      }
      label={<span className="font-medium">{label}</span>}
    />
    <p className="ml-8 text-sm text-white dark:text-black">
      {description}
    </p>
  </div>
);

const MySettings = () => {
    const { materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,seeSettings7, setSeeSettings7,
       handleFormDataChangeForCalendar,calendarSettings,
        setCalendarSettings,
       companySettings, setcompanySettings,
        setMaterialuiTheme,setSnackbar
     } = useApplicationSettings();

     const navigate = useNavigate()
const { login_with_otp, login_with_web_auth, login_with_otp_email, send_password_via_sms,
  send_password_via_email,check_is_inactive,check_inactive_days,check_inactive_hrs,
  enable_2fa_for_admin,check_inactive_minutes,enable_2fa_for_admin_passkeys
} = adminFormSettings


const {

  start_in_minutes,
        start_in_hours} = calendarSettings


// const {send_manager_number_via_email , send_manager_number_via_sms, enable_2fa_for_store_manager} = storeManagerSettings
      const [seeSettings6, setSeeSettings6] = useState(false)
      const [seeSettings8, setSeeSettings8] = useState(false)
     const [openLoad, setOpenLoad] = useState(false)
       

     const [open, setOpen] = useState(false);
     const [openError, setOpenError] = useState(false);
     const [loading, setloading] = useState(false)
    const [openCreateAlert, setOpenCreateAlert] = useState(false)
const [isloading, setisloading] = useState({
  loading1: false,
  loading2: false,
  loading3: false,
  loading4: false,
  loading5: false,
  loading6: false,
  loading7: false,
  loading8: false,
  

})


const [themeColors, setThemeColors] = useState({
  primary_color: materialuitheme.palette.primary.main || '#1976d2',
  secondary_color: materialuitheme.palette.secondary.main || '#dc004e',
  background_color: materialuitheme.palette.background.default || '#ffffff',
  text_color: materialuitheme.palette.text.primary || '#000000',
  sidebar_color: '#f5f5f5',
  header_color: '#2196f3',
  accent_color: '#ff4081',
  sidebar_menu_items_background_color_active: '#008000',
});



useEffect(() => {
  // Update Material-UI theme when theme colors change
  setMaterialuiTheme(createTheme({
    palette: {
      primary: {
        main: themeColors.primary_color,
      },
      secondary: {
        main: themeColors.secondary_color,
      },
      background: {
        default: themeColors.background_color,
      },
      text: {
        primary: themeColors.text_color,
      },
    },
  }));
}, [themeColors]);


const {company_name, contact_info, email_info, customer_support_email, agent_email,
   customer_support_phone_number} = companySettings


const handleFormDataChangeForCompany = (e) => {
  setcompanySettings((prevData)=> ({...prevData, [e.target.name]: e.target.value}))
}

const handleCloseCreateAlert = () => {
  setOpenCreateAlert(false)
}




const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setcompanySettings(prevData => ({
      ...prevData,
      logo: file,
      logo_preview: URL.createObjectURL(file)
    }));
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
        const { contact_info, company_name, email_info, logo_url,
          customer_support_phone_number,agent_email ,customer_support_email
         } = newData
        setcompanySettings((prevData)=> ({...prevData, 
          contact_info, company_name, email_info,
          customer_support_phone_number,agent_email ,customer_support_email,
        
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



const handleCreateCompanySettings = async (e) => {
  e.preventDefault()
try {
  setisloading({...isloading, loading8: true})
  const formData = new FormData();
  formData.append('company_name', companySettings.company_name);
  formData.append('contact_info', companySettings.contact_info);
  formData.append('email_info', companySettings.email_info);
  formData.append('agent_email', companySettings.agent_email);
  formData.append('customer_support_phone_number', companySettings.customer_support_phone_number);
  formData.append('customer_support_email', companySettings.customer_support_email);




  if (companySettings.logo) {
    formData.append('logo', companySettings.logo);
  }
  const response = await fetch('/api/company_settings', {
    method: 'POST',
   
    body: formData
  })


  const newData = await response.json()
  if (response.ok) {
    console.log('company settings created', newData)
    const { contact_info, company_name, email_info, logo_url,
      agent_email,customer_support_email,customer_support_phone_number  ,
      
     } =
     newData;


    setisloading({...isloading, loading8: false})

toast.success("company settings updated successfully")
    setcompanySettings(prevData => ({
      ...prevData, 
      contact_info, 
      company_name, 
      customer_support_phone_number,
      customer_support_email,
      agent_email,
      email_info,
      logo_preview: logo_url
    }));
    setOpenCreateAlert(true)
  } else {
    setisloading({...isloading, loading8: false})


    console.log('failed to create company settings')
  }
} catch (error) {
  console.log('error creating company settings',error)
  setisloading({...isloading, loading8: false})
}
}






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



      if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
          adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );


          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
          navigate('/signup2fa_passkey')
       
        }else{
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );


          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
           navigate('/signin')
           
       
        }
      }




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


           if (response.status === 401) {
            if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
              adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
              // toast.error(
              //   <div>
              //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
              //       <div> <span className='font-thin flex gap-3'>
                 
              //         </span></div></p>
              //   </div>,
               
              // );
              setSnackbar({
                open: true,
                message: <p className='text-lg'>Session expired please Login Again</p>,
                severity: 'error'
              })
              navigate('/signup2fa_passkey')
           
            }else{
              // toast.error(
              //   <div>
              //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
              //       <div> <span className='font-thin flex gap-3'>
                 
              //         </span></div></p>
              //   </div>,
               
              // );

              setSnackbar({
                open: true,
                message: <p className='text-lg'>Session expired please Login Again</p>,
                severity: 'error'
              })
               navigate('/signin')
               
           
            }
          }
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
        // setloading(false)
        setisloading({...isloading, loading2: false})
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



const getTicketSettings = useCallback(async () => {
  try {
    const response = await fetch('/api/get_ticket_settings')
    const data = await response.json()
    if (response.ok) {
      const prefix = data[0].prefix
      const minimum_digits = data[0].minimum_digits
      setsettingsTicket((prevData)=>  ({...prevData, prefix, minimum_digits, 
         }))
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
  }
}, []);

useEffect(() => {
  getTicketSettings()
}, [getTicketSettings]);



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




const handlegetcustomerSettings = useCallback(
  async()=> {
     
      
     try {
       const response = await fetch(`/api/get_customer_settings`, {
       method: 'GET',
       signal: controller.signal,  

       headers: {
         "Content-Type"  : 'application/json'
       },
       })

  


       const newData = await response.json()


       if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
          adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );

          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
          navigate('/signup2fa_passkey')
        
       
        }else{
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );


          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
           navigate('/signin')
          
           
       
        }
      }







       if (response.ok) {
       // const use_auto_generated_number = newData.use_auto_generated_number
       // const prefix = newData.prefix
       // const minimum_digits = newData.minimum_digits
     
     
       const {prefix, minimum_digits, use_auto_generated_number,send_sms_and_email,send_email,
        enable_2fa, enable_2fa_for_service_provider} = newData[0]
       setsettingsformData({...settingsformData, prefix,  minimum_digits, use_auto_generated_number,
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


useEffect(() => {
  // Set the logo_preview to the logo image in index.html if needed
  const logoElement = document.getElementById('favicon');
  if (logoElement && companySettings.logo_preview) {
    logoElement.href = companySettings.logo_preview
  }
}, [companySettings.logo_preview]); 


  return (

<>
<ToastContainer position='bottom-center' transition={Slide}  autoClose={10000}/>

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





{isloading.loading8 &&  <Backdrop open={openLoad} 
sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} 
  width={400} />
    
     </Backdrop>
  }

<div id="accordion-open" data-accordion="open" className='mt-9'>
  <SettingsAlert open={open} handleClose={handleClose}/>
  <SettingsAlertError openError={openError} handleCloseError={handleCloseError}/>
<SettingsOffLineAlert   handleCloseOfflineError={handleCloseOfflineError}
 openOfflineError={openOfflineError}/>


 <CompanySettingsCreateAlert  openCreateAlert={openCreateAlert}
  handleCloseCreateAlert={handleCloseCreateAlert}/>
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

    <SettingsCheckbox
      label="Login with OTP"
      description="When enabled, administrators will receive a one-time 
      password via SMS during two-factor authentication login. This adds an extra layer of security by requiring both password and SMS verification."
      checked={login_with_otp}
      onChange={handleFormDataChangeForAdmin}
      name="login_with_otp"
    />

    <SettingsCheckbox
      label="Login with Email OTP"
      description="When enabled, administrators will receive a one-time password via email during two-factor authentication login. This provides an alternative verification method using email instead of SMS."
      checked={login_with_otp_email}
      onChange={handleFormDataChangeForAdmin}
      name="login_with_otp_email"
    />

    <SettingsCheckbox
      label="Enable Two-Factor Authentication (2FA)"
      description="Requires administrators to verify their identity using both a password and a verification code. This significantly enhances account security by adding an additional verification step."
      checked={enable_2fa_for_admin}
      onChange={handleFormDataChangeForAdmin}
      name="enable_2fa_for_admin"
    />

    <SettingsCheckbox
      label="Enable Two-Factor Authentication for Admin Passkeys"
      description="Allows administrators to use passkeys in addition to passwords for two-factor authentication. This provides an extra layer of security."
      checked={enable_2fa_for_admin_passkeys}
      onChange={handleFormDataChangeForAdmin}
      name="enable_2fa_for_admin_passkeys"
    />

    <SettingsCheckbox
      label="Logout an admin after a period of inactivity"
      description="When enabled, administrators will be logged out automatically after a specified period of inactivity."
      checked={check_is_inactive}
      onChange={handleFormDataChangeForAdmin}
      name="check_is_inactive"
    />

    </ThemeProvider>

      <Box
       className='dark:text-black myTextField'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '120ch' },
      }}
      noValidate
    >
<ThemeProvider theme={materialuitheme}>


{/* Admin Inactivity Settings */}
<div className="space-y-6 p-4  rounded-lg shadow-sm">
  <h3 className="text-lg font-medium text-white dark:text-black">Inactivity Timeout Settings</h3>
  
  <div className="space-y-4">
    <div>
      <TextField 
        sx={{
          width: '100%',
          '& label.Mui-focused': { color: 'gray' },
          '& .MuiOutlinedInput-root': {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderWidth: '3px'
            }
          }
        }}
        id="inactive-hours"
        label="Logout After Inactivity (Hours)"
        type="number"
        name="check_inactive_hrs"
        onChange={handleFormDataChangeForAdmin}
        value={check_inactive_hrs}
        helperText="Automatically log out administrators after this many hours of inactivity. Enter 0 to disable hour-based logout."
      />
    </div>

    <div>
      <TextField 
        sx={{
          width: '100%',
          '& label.Mui-focused': { color: 'gray' },
          '& .MuiOutlinedInput-root': {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderWidth: '3px'
            }
          }
        }}
        id="inactive-days"
        label="Logout After Inactivity (Days)"
        type="number"
        name="check_inactive_days"
        onChange={handleFormDataChangeForAdmin}
        value={check_inactive_days}
        helperText="Automatically log out administrators after this many days of inactivity. Useful for long-term security. Enter 0 to disable day-based logout."
      />
    </div>

    <div>
      <TextField 
        sx={{
          width: '100%',
          '& label.Mui-focused': { color: 'gray' },
          '& .MuiOutlinedInput-root': {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderWidth: '3px'
            }
          }
        }}
        id="inactive-minutes"
        label="Logout After Inactivity (Minutes)"
        type="number"
        name="check_inactive_minutes"
        onChange={handleFormDataChangeForAdmin}
        value={check_inactive_minutes}
        helperText="Automatically log out administrators after this many minutes of inactivity. Recommended for high-security environments. Enter 0 to disable minute-based logout."
      />
    </div>
  </div>

  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mt-4">
    <p className="text-sm text-gray-600 dark:text-gray-300">
      <strong>How it works:</strong> The system will log out administrators after any of these time periods are reached. 
      For example, setting 2 hours, 1 day, and 30 minutes will trigger a logout after either 2 hours, 1 day, or 30 minutes 
      of inactivity, whichever comes first.
    </p>
  </div>
</div>

{/* User Invitation Settings */}
<div className="space-y-6 p-4  rounded-lg shadow-sm mt-6">
  <h3 className="text-lg font-medium text-white dark:text-black">User Invitation Settings</h3>

  <div className="space-y-4">
    <div className="p-4  rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox
            checked={send_password_via_email}
            onChange={handleFormDataChangeForAdmin}
            name="send_password_via_email"
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium">Send Invite Via Email</p>
            <p className="text-sm text-white dark:text-black mt-1">
              When enabled, new users will receive their login credentials and initial password through email. 
              This is the recommended method for business email addresses.
            </p>
          </div>
        }
      />
    </div>

    <div className="p-4 rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox
            checked={send_password_via_sms}
            onChange={handleFormDataChangeForAdmin}
            name="send_password_via_sms"
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium">Send Invite Via SMS</p>
            <p className="text-sm text-white dark:text-black mt-1">
              When enabled, new users will receive their login credentials and initial password through SMS. 
              This method ensures immediate delivery to mobile devices and is useful when email access is limited.
            </p>
          </div>
        }
      />
    </div>
  </div>

  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md mt-4">
    <p className="text-sm text-yellow-800 dark:text-yellow-200">
      <strong>Security Note:</strong> It's recommended to enable at least one invitation method to ensure 
      new users can securely receive their login credentials. For maximum security, consider enabling both 
      methods for critical user accounts.
    </p>
  </div>
</div>
</ThemeProvider >

        </Box>
        <ThemeProvider theme={materialuitheme}>

      



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
          

    <SettingsCheckbox
      label="Auto-Generated Customer Code"
      description="Automatically generates unique identification codes for customers. This ensures consistent and organized customer numbering across the system."
      checked={settingsformData.use_auto_generated_number}
      onChange={handleCustomerFormDataChange}
      name="use_auto_generated_number"
    />


<SettingsCheckbox
  label="Send Customer Code via SMS"
  description="Automatically sends the customer's unique code via SMS when their account is created. If 2FA is enabled, they will also receive one-time passwords for login verification."
  checked={settingsformData.send_sms_and_email}
  onChange={handleCustomerFormDataChange}
  name="send_sms_and_email"
/>

<SettingsCheckbox
  label="Enable 2FA for Customer Login"
  description="Allows customers to use two-factor authentication for login. This adds an extra layer of security by requiring both a password and a verification code."
  checked={settingsformData.enable_2fa}
  onChange={handleCustomerFormDataChange}
  name="enable_2fa"
/>


<SettingsCheckbox
  label="Send Customer Code via Email"
  description="Automatically sends the customer's unique code via email when their account is created. If 2FA is enabled, they will also receive one-time passwords for login verification."
  checked={settingsformData.send_email}
  onChange={handleCustomerFormDataChange}
  name="send_email"
/>




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



<TextField name='sequence_value' onChange={handleCustomerFormDataChange} value={settingsformData.sequence_value}
  className='myTextField'   
             type='number'  label='customer code current count'></TextField>

<Alert severity="info">
  <p className='font-bold text-lg'>Set Customer Code starting value</p>
  <p>use this value to set the value from which customer code should start</p>
    </Alert>
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
     dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-3" aria-expanded="false" aria-controls="accordion-open-body-3">
      <span className="flex items-center">
      <IoSettingsOutline className='p-1 text-3xl'/>
        Service Provider Account</span>
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
          
      <SettingsCheckbox
        label="Auto-Generated Provider Code"
        description="Automatically generates unique identification codes for service providers, ensuring consistent and organized provider numbering."
        checked={settingsformDataForProvider.use_auto_generated_number_for_service_provider}
        onChange={handleCustomerFormDataChangeForProvider}
        name="use_auto_generated_number_for_service_provider"
      />


<SettingsCheckbox
  label="Enable 2FA for Service Provider"
  description="Requires service providers to verify their identity using both a password and a verification code. This significantly enhances account security by adding an additional verification step."
  checked={settingsformDataForProvider.enable_2fa_for_service_provider}
  onChange={handleCustomerFormDataChangeForProvider}
  name="enable_2fa_for_service_provider"
/>

{/* Service Provider Notification Settings */}
<div className="space-y-6 p-4 rounded-lg shadow-sm">
  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Service Provider Communication Settings</h3>

  <div className="space-y-4">
    <div className="p-4  rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox
            checked={settingsformDataForProvider.send_email_for_provider}
            onChange={handleCustomerFormDataChangeForProvider}
            name="send_email_for_provider"
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium text-white dark:text-black">Send Provider Code Via Email</p>
            <p className="text-sm text-white dark:text-black  mt-1">
              When enabled, service providers will receive:
              <ul className="list-disc ml-5 mt-2">
                <li>Their unique provider code immediately after account creation</li>
                <li>Login credentials and access instructions</li>
                <li>Two-factor authentication codes (if 2FA is enabled)</li>
                <li>Important account notifications and updates</li>
              </ul>
              Best for providers who regularly check their email.
            </p>
          </div>
        }
      />
    </div>

    <div className="p-4 rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox
            checked={settingsformDataForProvider.send_sms_and_email_for_provider}
            onChange={handleCustomerFormDataChangeForProvider}
            name="send_sms_and_email_for_provider"
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium  text-white dark:text-black">Send Provider Code Via SMS</p>
            <p className="text-sm text-white dark:text-black  mt-1">
              When enabled, service providers will receive:
              <ul className="list-disc ml-5 mt-2">
                <li>Their unique provider code via text message</li>
                <li>Mobile-friendly login instructions</li>
                <li>SMS-based verification codes (if 2FA is enabled)</li>
                <li>Time-sensitive notifications</li>
              </ul>
              Recommended for immediate delivery and providers who are frequently mobile.
            </p>
          </div>
        }
      />
    </div>
  </div>

  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mt-4">
    <p className="text-sm text-blue-800 dark:text-blue-200">
      <strong>Communication Tip:</strong> For optimal provider communication:
      <ul className="list-disc ml-5 mt-2">
        <li>Enable both email and SMS for critical notifications</li>
        <li>Use email for detailed instructions and documentation</li>
        <li>Use SMS for urgent updates and time-sensitive information</li>
        <li>Consider your providers' preferred communication methods</li>
      </ul>
    </p>
  </div>
</div>
            </FormGroup>

{/* Service Provider Code Settings */}
<div className="space-y-6 p-4  rounded-lg shadow-sm mt-6">
  <h3 className="text-lg font-medium text-white dark:text-black">Service Provider Code Configuration</h3>

  <div className="space-y-4">
    <div>
      <TextField  
        name='prefix'   
        value={settingsformDataForProvider.prefix}  
        onChange={handleCustomerFormDataChangeForProvider}
        className='myTextField'
        label='Service Provider Code Prefix'
        fullWidth
        sx={{
          '& label.Mui-focused': { color: 'black' },
          '& .MuiOutlinedInput-root': {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderWidth: '3px'
            }
          }
        }}
        helperText={
          <div className="mt-1">
            <p>The prefix that will appear at the start of every service provider code.</p>
            <ul className="list-disc ml-4 mt-1 text-sm text-white dark:text-black">
              <li>Example: Using prefix "SP" will generate codes like SP001, SP002</li>
              <li>Keep it short and meaningful (2-3 characters recommended)</li>
              <li>Use uppercase letters for better readability</li>
            </ul>
          </div>
        }
      />
    </div>

    <div>
      <TextField 
        name='minimum_digits'  
        value={settingsformDataForProvider.minimum_digits} 
        onChange={handleCustomerFormDataChangeForProvider} 
        className='myTextField'   
        type='number'  label='Minimum Digits for Provider Code'
        fullWidth
        sx={{
          '& label.Mui-focused': { color: 'black' },
          '& .MuiOutlinedInput-root': {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderWidth: '3px'
            }
          }
        }}
        helperText={
          <div className="mt-1">
            <p>The minimum number of digits that will follow the prefix in the provider code.</p>
            <ul className="list-disc ml-4 mt-1 text-sm text-white dark:text-black">
              <li>Example: Setting 3 digits with prefix "SP" will generate: SP001, SP002, ..., SP999</li>
              <li>Leading zeros will be added automatically to maintain the specified length</li>
              <li>Choose based on your expected number of providers:</li>
              <ul className="list-circle ml-6 mt-1">
                <li>3 digits: Up to 999 providers</li>
                <li>4 digits: Up to 9,999 providers</li>
                <li>5 digits: Up to 99,999 providers</li>
              </ul>
            </ul>
          </div>
        }
      />
    </div>
  </div>

  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md mt-4">
    <p className="text-sm text-yellow-800 dark:text-yellow-200">
      <strong>Format Example:</strong> With prefix "SP" and 3 minimum digits:
      <ul className="list-disc ml-5 mt-2">
        <li>First provider: SP001</li>
        <li>Tenth provider: SP010</li>
        <li>Hundredth provider: SP100</li>
      </ul>
      <strong>Note:</strong> Changes to these settings will only affect newly created provider codes, 
      existing codes will remain unchanged.
    </p>
  </div>

  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mt-4">
    <p className="text-sm text-blue-800 dark:text-blue-200">
      <strong>Best Practices:</strong>
      <ul className="list-disc ml-5 mt-2">
        <li>Choose a prefix that clearly identifies service providers (e.g., SP, PRV, DOC)</li>
        <li>Set minimum digits based on your expected growth</li>
        <li>Keep the total code length (prefix + digits) manageable</li>
        <li>Consider using memorable patterns for easier reference</li>
      </ul>
    </p>
  </div>
</div>

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
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>Store Number</span>
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
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>Store Manager</span>
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

    

{/* Store Manager Settings */}
<div className="space-y-6 p-4  rounded-lg shadow-sm">
  <h3 className="text-lg font-medium text-white dark:text-black">Store Manager Security & Communication</h3>

  <div className="space-y-4">
    {/* SMS Notification Setting */}
    <div className="p-4  rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox 
            onChange={handleFormDataChangeForStoreManager} 
            checked={storeManagerSettings.send_manager_number_via_sms}
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium text-white dark:text-black">Send Manager Number via SMS</p>
            <p className="text-sm text-white dark:text-black  mt-1">
              When enabled, store managers will receive:
              <ul className="list-disc ml-5 mt-2">
                <li>Their unique manager ID via text message upon account creation</li>
                <li>Initial login credentials and setup instructions</li>
                <li>SMS-based verification codes for two-factor authentication (if enabled)</li>
                <li>Important security notifications and updates</li>
              </ul>
              <p className="mt-2 text-sm italic">Recommended for immediate access and enhanced security</p>
            </p>
          </div>
        }
        name="send_manager_number_via_sms"
      />
    </div>

    {/* Email Notification Setting */}
    <div className="p-4 rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox 
            checked={storeManagerSettings.send_manager_number_via_email}
            onChange={handleFormDataChangeForStoreManager}
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium text-white dark:text-black">Send Manager Number via Email</p>
            <p className="text-sm text-white dark:text-black  mt-1">
              When enabled, store managers will receive:
              <ul className="list-disc ml-5 mt-2">
                <li>Their unique manager ID via email upon account creation</li>
                <li>Detailed account setup documentation</li>
                <li>Email-based verification codes for two-factor authentication (if enabled)</li>
                <li>System access instructions and security guidelines</li>
              </ul>
              <p className="mt-2 text-sm italic">Best for maintaining a permanent record of account details</p>
            </p>
          </div>
        }
        name="send_manager_number_via_email"
      />
    </div>

    {/* 2FA Setting */}
    <div className="p-4  rounded-md">
      <FormControlLabel
        className="mb-2"
        control={
          <Checkbox 
            onChange={handleFormDataChangeForStoreManager} 
            checked={storeManagerSettings.enable_2fa_for_store_manager}
            color="default"
          />
        }
        label={
          <div>
            <p className="font-medium text-white dark:text-black">Enable Two-Factor Authentication (2FA)</p>
            <p className="text-sm text-white dark:text-black  mt-1">
              When enabled:
              <ul className="list-disc ml-5 mt-2">
                <li>Store managers must verify their identity using two different methods</li>
                <li>Each login requires both password and a verification code</li>
                <li>Verification codes can be sent via SMS or email (based on settings above)</li>
                <li>Provides enhanced protection against unauthorized access</li>
              </ul>
              <p className="mt-2 text-sm italic">Highly recommended for protecting sensitive store operations</p>
            </p>
          </div>
        }
        name="enable_2fa_for_store_manager"
      />
    </div>
  </div>

  {/* Security Tips Section */}
  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mt-4">
    <p className="text-sm text-blue-800 dark:text-blue-200">
      <strong>Security Recommendations:</strong>
      <ul className="list-disc ml-5 mt-2">
        <li>Enable both SMS and email notifications for redundancy</li>
        <li>Always enable 2FA for store managers handling sensitive data</li>
        <li>Regularly review and update security settings</li>
        <li>Train store managers on security best practices</li>
      </ul>
    </p>
  </div>

  {/* Important Notes */}
  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md mt-4">
    <p className="text-sm text-yellow-800 dark:text-yellow-200">
      <strong>Important Notes:</strong>
      <ul className="list-disc ml-5 mt-2">
        <li>Changes to these settings affect new accounts only</li>
        <li>Existing store managers will need to be manually updated</li>
        <li>At least one notification method should be enabled</li>
        <li>2FA settings can be individually overridden for specific managers if needed</li>
      </ul>
    </p>
  </div>
</div>


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
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>Ticket Number</span>
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
              three digits)'  name='minimum_digits'  onChange={handleFormDataChangeForTickets} 
              value={settingsTicket.minimum_digits}></TextField>

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
    <button type="button"   onClick={()=> setSeeSettings7(!seeSettings7)} className="flex items-center justify-between
     w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>Calendar</span>
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

<p className='text-black p-3 font-light edu_ustralia_font text-lg tracking-widest'>
  Notify Admin Before An Event Starts (notify 30,10,2, 10,minutes or hrs before an event starts)</p>
        <Stack direction='column' className='myTextField' sx={{
          '& .MuiTextField-root': { 
            m: 1, 
            width: '90ch',  
            marginTop: '30px',  
            '& label.Mui-focused': {
              color: 'black',
              fontSize: '16px'
            },
            '& .MuiOutlinedInput-root': {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                borderWidth: '3px'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              }
            } 
          },
        }} spacing={{xs: 1, sm: 2}}>

          <TextField  
          value={start_in_minutes}
          name='start_in_minutes'
          onChange={handleFormDataChangeForCalendar}
          label='Minutes' 
          type='number'
           >

            
           </TextField>

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

















  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings8(!seeSettings8)} className="flex items-center justify-between
     w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="
     #accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/> 
      Company </span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>


  <form onSubmit={handleCreateCompanySettings}>
    <motion.div variants={variantDiv} 
      transition={{duration:0.5, ease: "easeInOut"}} 
      initial='hidden' 
      animate={seeSettings8 ? "visible" : "hidden"} 
      id="accordion-open-body-2" 
      className={''} 
      aria-labelledby="accordion-open-heading-2">

      <ThemeProvider theme={materialuitheme}>
        <p className='text-black p-3 font-light edu_ustralia_font text-lg tracking-widest'>
          Company Settings
        </p>
        
        <Stack direction='column' className='myTextField' sx={{
          '& .MuiTextField-root': { 
            m: 1, 
            width: '90ch',  
            marginTop: '30px',  
            '& label.Mui-focused': {
              color: 'black',
              fontSize: '16px'
            },
            '& .MuiOutlinedInput-root': {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                borderWidth: '3px'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              }
            } 
          },
        }} spacing={{xs: 1, sm: 2}}>

          {/* Existing text fields */}
          <TextField  
            name='company_name'
            value={company_name}
            onChange={handleFormDataChangeForCompany}
            label='Company Name' 
            type='text'
          />

          <TextField  
            onChange={handleFormDataChangeForCompany}
            name='email_info'
            value={email_info}
            label='Email Info' 
            type='text'
          />

          <TextField  
            onChange={handleFormDataChangeForCompany}
            name='contact_info'
            value={contact_info}
            label='Company Contact Info' 
            type='text'
          />


<TextField  
            onChange={handleFormDataChangeForCompany}
            name='agent_email'
            value={agent_email}
            label='Agent Email' 
            type='text'
          />


<TextField  
            onChange={handleFormDataChangeForCompany}
            name='customer_support_phone_number'
            value={customer_support_phone_number} 
            label='Customer Support Phone Number'
            type='text'
          />




<TextField  
            onChange={handleFormDataChangeForCompany}
            name='customer_support_email'
            value={customer_support_email} 
            label='Customer Support Email'  
            type='text'
          />

          {/* Add the new image upload section */}
          <div className="flex flex-col gap-4 p-4">
            <label className="text-lg font-medium  dark:text-black text-white">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="logo-upload"
            />
            
            <label 
              htmlFor="logo-upload"
              className="flex items-center justify-center p-4 border-2
               border-dashed border-gray-300 rounded-lg cursor-pointer
                hover:border-gray-400"
            >
              {companySettings.logo_preview ? (
                <div className="relative">
                  <img 
                    src={companySettings.logo_preview}
                    alt="Logo preview" 
                    className="max-w-xs max-h-48 object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setcompanySettings(prev => ({...prev, logo: null, logo_preview: null}));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-gray-500">
                  <p>Click to upload company logo</p>
                  <p className="text-sm">PNG, JPG up to 5MB</p>
                </div>
              )}
            </label>
          </div>

        </Stack>

        <div className='p-5'>
          <button type='submit' className="px-6 py-2 font-medium bg-black text-white w-fit transition-all
            shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px]
            hover:translate-y-[3px] rounded-md">
            {isloading.loading8 && <ImSpinner9 className={`${isloading.loading8 && 'animate-spin'}`} />} 
            UPDATE SETTINGS
          </button>
        </div>

      </ThemeProvider>
    </motion.div>
  </form>




  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings8(!seeSettings8)} className="flex items-center justify-between
     w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center">  <IoSettingsOutline className='p-1 text-3xl'/>Theme Customization</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>

  <motion.div variants={variantDiv} 
      transition={{duration:0.5, ease: "easeInOut"}} 
      initial='hidden' 
      animate={seeSettings8 ? "visible" : "hidden"} 
      id="accordion-open-body-2" 
      className={''} 
      aria-labelledby="accordion-open-heading-2">

      <ThemeProvider theme={materialuitheme}>
      <ThemeSettings />

      </ThemeProvider>
    </motion.div>

</div>

</>
  )
}

export default MySettings
