import { useState, createContext, useContext,  useEffect, useCallback } from "react"

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs';


const GeneralSettingsContext = createContext(null)


const ApplicationSettings = ({children}) => {
  const navigate = useNavigate()

  const [phone, setPhone] = useState('');

const settingsFormDataInitialValue = {
  prefix: '',
  minimum_digits: '',
  
  use_auto_generated_number: false,
  send_sms_and_email: false,
  send_email: false,
  enable_2fa: false
}


const ticketNumberFormDataInitialValue = {
  prefix: '',
  minimum_digits: '',
  
}


const settingsFormDataInitialValueForPrvider = {
  prefix: '',
  minimum_digits: '',
  send_sms_and_email_for_provider: false,

  use_auto_generated_number_for_service_provider: false,
  send_email_for_provider: false,
  enable_2fa_for_service_provider: false

}


const resetPasswordInitialValue = {
  phone_number: '',
  email: ''
}

const storeMnagerFormData = {
  prefix: '',
  minmum_digits: '',
  send_manager_number_via_sms: false,
  send_manager_number_via_email: false,
  enable_2fa_for_store_manager: false

} 



const storeSettingsInitialValue = {
  prefix: '',
  minimum_digits: '',
}

const customerData = {
  name: '',
  email: '',
  
  phone_number: '',
  customer_code: '',
  location: '',
  amount_paid: '',
  date_registered: dayjs(new Date())
 
}

    const signupFormDataInitialValue ={
      user_name: '',
      password: '',
      password_confirmation: '',
      email: '',
      phone_number: '',
      otp: ''
    }




    const signinFormDataInitialValue ={
      user_name: '',
      password: '',
      password_confirmation: '',
      email: '',
      phone_number: '',
      otp: ''
    }


    const providerFormData = {
      name: '',
      provider_code: '',
      email: '',
      phone_number: '',
      status: '',
      date_registered: dayjs(new Date()),
      location: ''
    }


    const customerLogin = {
      customer_code: '',
      otp: ''
    }



    const providerLogin = {
      provider_code: '',
      otp: ''
    }




    const locationData = {
      location_name: '',
      sub_location: '',
      location_code: ''

    }

    
    const storeFormData = {
      amount_of_bags:  '',
      location: '',
      store_number: '',
      sub_location: ''
    }


    const storeManagerData = {
      name: '',
      phone_number: '',
      email: '',
     
      location: '',
      sub_location: ''
    }




    const storeManagerLoginData = {
      manager_number: '',
      otp: ''
    }


    const adminDataSettings = {
      login_with_otp: false,
      enable_2fa_for_admin: false,
      login_with_web_auth: false,
      login_with_otp_email:  false,
      send_password_via_email: false,
      send_password_via_sms: false,
      check_is_inactive: false,
      check_inactive_hrs: '',
      check_inactive_days: '',
      check_inactive_minutes: ''

    } 

    
    const [isSeen, setIsSeen] = useState(false)
    const [seeSidebar, setSeeSideBar] = useState(false)
    const [theme, setTheme] = useState('light')
    const [icon, setIcon] = useState(false)
const [imgIcon, setImgIcon] = useState(false)
const [isSeenPassWord,  setIsSeenPassword] = useState(false)
const [signupFormData, setSignupFormData] = useState(signupFormDataInitialValue)
const [signinFormData, setSigninFormData] = useState(signinFormDataInitialValue)
const [isloading, setloading] = useState(false)
const [open, setOpen] = useState(false);
const [registrationError, setRegistrationError] = useState('')
const [seeError, setSeeError] = useState(false)
const [materialuitheme, setMaterialuiTheme] = useState('dark')
const [seeSettings1, setSeeSettings1] = useState(false)
const [seeSettings2, setSeeSettings2] = useState(false)
const [seeSettings3, setSeeSettings3] = useState(false)
const [seeSettings4, setSeeSettings4] = useState(false)
const [seeSettings5, setSeeSettings5] = useState(false)

const [settingsformData, setsettingsformData] = useState(settingsFormDataInitialValue)
const [settingsformDataForProvider, setsettingsforProvider] = useState(settingsFormDataInitialValueForPrvider)
const [openOfflineError, setOpenOfflineError] = useState(false)
const  [customerformData, setcustomerformData] = useState(customerData)
const [seeCustomerCode, setSeeCustomerCode] = useState(false)
const [customers, setGetCustomers] = useState([])
const [updatedMessage, setUpdatedMessage] = useState('')
const [updatedMessageProvider, setUpdatedMessageProvider] = useState('')
const [seeProviderCode, setProviderCode] = useState(false)

const [providerformData,  setproviderformData] = useState(providerFormData)
const [providers, setGetProviders] = useState([])
const [customerConfirmation, setCustomerConfirmation] = useState()
const [customerLatitude, setCustomerLatitude] = useState('')
const  [customerLongitude, setCustomerLongitude] = useState('')
const [plusCode, setPlusCode] = useState('');
const [customerLoginData, setCustomerLoginData] = useState(customerLogin)
const [providerLoginData, setproviderLoginData] = useState(providerLogin)
const [locationForm, setLocationForm] = useState(locationData)
const [locations, setlocations] = useState([])
const [sublocations, setSubLocations] = useState([])
const [sublocationForm, setSubLocationForm] = useState(locationData)
const [settingsForStore, setsettingsForStore] = useState(storeSettingsInitialValue)
const [storeForm, setStoreForm] = useState(storeFormData)
const [storeManagerForm, setStoreManagerForm] = useState(storeManagerData)
const [storeManagerSettings, setstoreManagerSettings] = useState(storeMnagerFormData)
const [storeManagerLogin, setStoreManagerLogin] = useState(storeManagerLoginData)
const [otpSent, setotpSent] = useState(false)
const [adminFormSettings, setAdminFormSettings] = useState(adminDataSettings)
 const [resetPasswordForm, setResetPasswordForm] = useState(resetPasswordInitialValue)
 const [openAccessDenied, setopenopenAccessDenied] = useState(false)
 const [openAccessDenied2, setopenopenAccessDenied2] = useState(false)
 const [openAccessDenied3, setopenopenAccessDenied3] = useState(false)
 const [smsBalance, setSmsBalance] = useState('')
 const [seelocation, setseelocation] = useState(false)
const [adminPermission, setAdminPermission] = useState({})
const [user, setUser] = useState('')
const [canreadSetting, setCanReadSetting] = useState('')
  const [canManageSetting, setCanManageSetting] = useState('')
const [canManageSms, setCanManageSms] = useState('')
const [canReadSms, setCanReadSms] = useState('')
const [canManageSmsTemplates, setCanManageSmsTemplates] = useState('')
const [canReadSmsTemplates, setCanReadSmsTemplates] = useState('')
const [currentUser, setCurrentUser] = useState('')
const [settingsTicket,  setsettingsTicket] = useState(ticketNumberFormDataInitialValue)
 const [user_name, setUserName] = useState('')
 const [id, setAdminId] = useState(null)
 const [imagePreview, setImagePreview] = useState(null)
const [openLoginSuccess, setopenLoginSuccess] = useState(false)
const [openLogoutSuccess, setopenLogoutSuccess] = useState(false)
 const [canReadLocation, setCanReadLocation] = useState('')
 const [canManageLocation,setCanManageLocation] = useState('')
 const [canReadSubLocation, setCanReadSubLocation] = useState('')
 const [canManageSubLocation, setCanManageSubLocation] = useState('')
 const [canReadStore, setCanReadStore] = useState('')
 const [canManageStore, setCanManageStore] = useState('')
 const [canManageStoreManager, setCanManageStoreManager] = useState('')
 const [canReadStoreManager, setCanReadStoreManager]= useState('')
 const [canManageCustomers, setCanManageCustomers] = useState('')
 const [canReadCustomers, setCanReadCustomers] = useState('')
 const [canManageServiceProviders, setCanManageServiceProviders] = useState('')
 const [canReadServiceProviders, setCanReadServiceProviders] = useState('')
 const [canManageTickets, setCanManageTickets] = useState('')
 const [canReadTickets, setCanReadTickets] = useState('')
 const [canManageCalendar, setCanManageCalendar] = useState('')
const [canReadCalendar, setCanReadCalendar] = useState('') 



const handleCloseLogoutSuccess = ()=>{
  setopenLogoutSuccess(false)
}
 
 const handleCloseLoginSuccess = ()=>{
  setopenLoginSuccess(false)
 }

 const formData = {
  email: '',
  password: '',
  profile_image: imagePreview,
  user_name: '',
  phone_number: '',
  
  }

 const [updateFormData, setUpdateFormData] = useState(formData)

const storeManagerFormData = {
  number_of_bags_delivered: '',
  number_of_bags_received: ''

}

const [storeManagerSet, setStoreManagerSet] = useState(storeManagerData)


 const [admin, setAdmin] = useState(() => {
  const savedCustomer = localStorage.getItem('acha umbwakni');
  return savedCustomer ? true : false;
});


const [customer, setCustomer] = useState(() => {
  const savedCustomer = localStorage.getItem('customer');
  return savedCustomer ? true : false;
});


const [serviceProvider, setserviceProvider] = useState(() => {
  const savedProvider = localStorage.getItem('service provider');
  return savedProvider ? true : false;
});




const [storeManager, setstoreManager] = useState(() => {
  const savedStoreManager = localStorage.getItem('store manager');
  return savedStoreManager ? true : false;
});



useEffect(() => {
  if (admin) {
    localStorage.setItem('acha umbwakni', true);
  } else {
    localStorage.removeItem('acha umbwakni');
  }
}, [admin]);



useEffect(() => {
  if (storeManager) {
    localStorage.setItem('store manager', true);
  } else {
    localStorage.removeItem('store manager');
  }
}, [storeManager]);













useEffect(() => {
  if (serviceProvider) {
    localStorage.setItem('service provider', true);
  } else {
    localStorage.removeItem('service provider');
  }
}, [serviceProvider]);







useEffect(() => {
  if (customer) {
    localStorage.setItem('customer', true);
  } else {
    localStorage.removeItem('customer');
  }
}, [customer]);






const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'dark')
        setMaterialuiTheme(theme === 'light' ? darkTheme : lightTheme);

      }
  
      

      
      const capitalizePrefix = (prefix)=> {
        if (prefix.startsWith('')) {
          return prefix.toUpperCase()
      
        }
      
        return prefix
        }



const handleStoreFormDataChange = (e)=> {
  const {type, checked, name, value} = e.target
const capitalize_prefix = capitalizePrefix(value) 
setsettingsForStore((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
))
}


const handleCustomerFormDataChange = (e)=> {
  const {type, checked, name, value} = e.target
const capitalize_prefix = capitalizePrefix(value) 
setsettingsformData((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
))
}


      
const handleCustomerFormDataChangeForProvider = (e)=> {
  const {type, checked, name, value} = e.target
  const capitalize_prefix = capitalizePrefix(value) 

  setsettingsforProvider((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
))
}




      
const handleFormDataChangeForStoreManager = (e)=> {
  const {type, checked, name, value} = e.target
  const capitalize_prefix = capitalizePrefix(value) 

  setstoreManagerSettings((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
))
}


    
const handleFormDataChangeForTickets = (e)=> {
  const {type, checked, name, value} = e.target
  const capitalize_prefix = capitalizePrefix(value)
  setsettingsTicket((prevData)=> (
  // {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
  {...prevData, [name]: capitalize_prefix}

))
}

// check_inactive_hrs: '',
// check_inactive_days: '',

// check_inactive_minutes: ''


const handleFormDataChangeForAdmin = (e) => {
  const { type, checked, name, value } = e.target;

  // Log the value to the console
  console.log('value', value);

  setAdminFormSettings((prevData) => {
    let updatedData = { ...prevData };
    let updatedSettings = { ...prevData, [name]: value };

console.log('check_inactive_hrs', updatedData .check_inactive_hrs)
    // Handle specific cases for check_inactive_minutes, check_inactive_hrs, and check_inactive_days
    if (name === 'check_inactive_minutes') {
      updatedSettings.check_inactive_days = ''
      updatedSettings.check_inactive_hrs = ''
      
    } else if (name === 'check_inactive_hrs') {
      
        updatedSettings.check_inactive_minutes = ''
        updatedSettings.check_inactive_days = ''
      
    } else if (name === 'check_inactive_days') {
        updatedSettings.check_inactive_minutes = ''
        updatedSettings.check_inactive_hrs = ''
      
    }

    // Update the value for the changed field
    updatedSettings[name] = type === 'checkbox' ? checked : value;

    // Update enable_2fa_for_admin based on the checked value
   

    console.log('enaaaable 2fa true or false=>', updatedData.enable_2fa_for_admin);
    console.log("is it true or false=>", checked);

    return updatedSettings;
  });
};


const convertToKenyanFormat = (number) => {
  if (number.startsWith('0')) {
    return '+254' + number.substring(1)
  }


 
  return number;
};


const handleChangePhoneNumber = (e)=> {
  const {name, value} = e.target

  if (value.length <= 13) {
    const kenyanFormat = convertToKenyanFormat(value)
  setSignupFormData({... signupFormData, [name]: kenyanFormat})
  }
  


}




const handleChangePhoneNumberSignin = (e)=> {
  const {name, value} = e.target

  if (value.length <= 13) {
    const kenyanFormat = convertToKenyanFormat(value)
  setSigninFormData({... signinFormData, [name]: kenyanFormat})
  }
  


}

const handleChangeResetPasswordPhoneNumber = (e)=> {
  const {name, value} = e.target

  if (value.length <= 13) {
    const kenyanFormat = convertToKenyanFormat(value)
    setResetPasswordForm({... resetPasswordForm, [name]: kenyanFormat})
  }

}



const handleChangeResetPassword = (e) => {
  const {name, value} = e.target
  setResetPasswordForm({... resetPasswordForm, [name]: value})
}

      const handleFormDataChange = (e)=> {
const {name, value} = e.target

setSignupFormData({... signupFormData, [name]: value})
      }



      const handleFormDataChangeSignin = (e)=> {
        const {name, value} = e.target
        console.log('writing email=>', name)
        setSigninFormData((prevData)=> ({...prevData, [name]: value}))
        // setSigninFormData({... signinFormData, [name]: value})
        
              }



   useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    
    }
    }, [theme]);


  useEffect(() => {
    setSignupFormData((prevState) => ({
      ...prevState,
      phone_number: phone,
    }));
  }, [phone]);









const handleChangeStoreSet = (e)=> {
  const {name, value} = e.target
  setStoreManagerSet((prev)=> ({
    ...prev, [name]: value
  }))
}






  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',  // Background color for the entire DataGrid
            color: 'black',  // Text color for the entire DataGrid
          },
          columnHeaders: {
            backgroundColor: 'lightgray',  // Background color for the header
            color: 'black',  // Text color for the header
          },
          cell: {
            backgroundColor: 'white',  // Background color for the cells
            color: 'black',  // Text color for the cells
          },
          footerContainer: {
            backgroundColor: 'white',  // Background color for the footer
            color: 'black',  // Text color for the footer
          },
        },
      },
    },
  });




const darkTheme = createTheme({
    palette: {
        mode: 'dark',
      },
      components: {
        MuiTable: {
          styleOverrides: {
            root: {
              backgroundColor:'black',  // Background color for the entire DataGrid
              color: 'white',  // Text color for the entire DataGrid
            },
            columnHeaders: {
              backgroundColor: 'black',  // Background color for the header
              color: 'white',  // Text color for the header
            },
            cell: {
              backgroundColor: 'black',  // Background color for the cells
              color: 'white',  // Text color for the cells
            },
            footerContainer: {
              backgroundColor: 'white',  // Background color for the footer
              color: 'white',  // Text color for the footer
            },
          },
        },
      },
   
  });



  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
     
     setMaterialuiTheme(darkTheme)
     setTheme('dark')
    } else {
     setTheme('light')
    }
   }, [])


  const controller = new AbortController();
  // const id = setTimeout(() => controller.abort(), 9000);
  







  // useEffect(() => {
  //   const savedCustomer = localStorage.getItem('customer');
  //   if (savedCustomer) {
  //     setCustomer(JSON.parse(savedCustomer));
  //     console.log('data id',  customer)

  //   }


  // }, [setCustomer, customer]);





//   const handlegetproviderSettings  = useCallback(
            
//     async()=> {
//     const storedData = JSON.parse(localStorage.getItem("provider settings"));
  
//     const requestParams = {
//       use_auto_generated_number_for_service_provider:storedData.use_auto_generated_number_for_service_provider,
    
//     };
//   try {
//     const response = await fetch(`/api/get_provider_settings?${new URLSearchParams(requestParams)}`, {
//     method: 'GET',
//     signal: controller.signal,  

//     headers: {
//       "Content-Type"  : 'application/json'
//     },
    
    
//     })

//     clearTimeout(id);

//     const newData = await response.json()
//     if (response.ok) {
//     // const use_auto_generated_number = newData.use_auto_generated_number
//     // const prefix = newData.prefix
//     // const minimum_digits = newData.minimum_digits
//     setOpenOfflineError(false)

  
//     const {prefix, minimum_digits,  use_auto_generated_number_for_service_provider} = newData[0]
//     setsettingsforProvider({...settingsformData, prefix,  minimum_digits,  use_auto_generated_number_for_service_provider
    
//     })
    
//     } else {
//     console.log('failed to fetch')
//     setOpenOfflineError(false)

//     }
//     } catch (error) {
//     console.log(error)
//     setOpenOfflineError(true)
    
//     }
//   },
    
//           []
//         )



//     useEffect(() => {
//       handlegetproviderSettings()
//     }, [handlegetproviderSettings, setsettingsforProvider])



//   const handlegetcustomerSettings = useCallback(
//     async()=> {
//          const storedData = JSON.parse(localStorage.getItem("customer settings"));
       
//          const requestParams = {
//            use_auto_generated_number:storedData.use_auto_generated_number,
         
//          };
//        try {
//          const response = await fetch(`/api/get_customer_settings?${new URLSearchParams(requestParams)}`, {
//          method: 'GET',
//          signal: controller.signal,  

//          headers: {
//            "Content-Type"  : 'application/json'
//          },
//          })


//          clearTimeout(id);

//          const newData = await response.json()
//          if (response.ok) {
//          // const use_auto_generated_number = newData.use_auto_generated_number
//          // const prefix = newData.prefix
//          // const minimum_digits = newData.minimum_digits
       
       
//          const {prefix, minimum_digits, use_auto_generated_number} = newData[0]
//          setsettingsformData({...settingsformData, prefix,  minimum_digits, use_auto_generated_number
         
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















console.log('admin_id', id)

const fetchCurrentUser = 
useCallback(
  async() => {

      try {
          const response = await fetch('/api/current_user', {
            method: 'GET',
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Fetched user data:', data.user);
            setUser(data.user.role);
            setAdminId(data.user.id)
            setCanReadSetting(data.user.can_read_settings)
            setCanManageSetting(data.user.can_manage_settings)
            setCanManageCalendar(data.user.can_manage_calendar)
            setCanReadCalendar(data.user.can_read_calendar)
            setCanManageTickets(data.user.can_manage_tickets)
            setCanReadStoreManager(data.user.can_read_store_manager)
            setCanManageStoreManager(data.user.can_manage_store_manager)
            setCanReadTickets(data.user.can_read_tickets)
            setCanManageServiceProviders(data.user.can_manage_service_provider)
            setCanReadServiceProviders(data.user.can_read_service_provider)
            setCanManageCustomers(data.user.can_manage_customers)
            setCanReadCustomers(data.user.can_read_customers)
            setCurrentUser(data.user)
            setCanManageStore(data.user.can_manage_store)
            setCanReadStore(data.user.can_read_store)
            setCanManageLocation(data.user.can_manage_location)
            setCanReadLocation(data.user.can_read_location)
            setCanManageSubLocation(data.user.can_manage_sub_location)
            setCanReadSubLocation(data.user.can_read_sub_location)
            setUserName(data.user.user_name)
            setCanManageSmsTemplates(data.user.can_manage_sms_templates)
            setCanReadSmsTemplates(data.user.can_read_sms_templates)
            setCanReadSms(data.user.can_read_sms)
            setCanManageSms(data.can_manage_sms)

            // setUser(data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
          setUser(null);
        }
  },
  [],
)



useEffect(() => {
  fetchCurrentUser()
}, [fetchCurrentUser]);


const handlegetstoreManagerSettings = useCallback(
  
  async()=> {
    const storeManager  = JSON.parse(localStorage.getItem('store_manager_settings'))
      
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
     
     
       const {prefix, minimum_digits, 
        } = newData[0]
       const send_manager_number_via_email = storeManager.send_manager_number_via_email
       const send_manager_number_via_sms = storeManager.send_manager_number_via_sms
       const enable_2fa_for_store_manager  = storeManager.enable_2fa_for_store_manager 

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
 
[setstoreManagerSettings]
)


  

useEffect(() => {
  handlegetstoreManagerSettings()
}, [handlegetstoreManagerSettings,setstoreManagerSettings]);





// useEffect(() => {
//   // Listen for changes in the authentication state


// if (currentUser) {
//       navigate('/admin/customers')
//     }      
 


//   // Clean up the subscription when the component unmounts
// }, [navigate, currentUser]); 





  return (

<GeneralSettingsContext.Provider value={{isSeen, setIsSeen,seeSidebar, setSeeSideBar, theme, setTheme, 
  handleThemeSwitch, icon, setIcon, imgIcon, setImgIcon, isSeenPassWord,  setIsSeenPassword, signupFormData, setSignupFormData,
  handleFormDataChange, phone, setPhone, isloading, setloading, open, setOpen,handleClose, registrationError,materialuitheme,
   setRegistrationError, seeError, setSeeError,seeSettings1, setSeeSettings1,seeSettings2, setSeeSettings2,
   setMaterialuiTheme, darkTheme, lightTheme, seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,
   handleCustomerFormDataChange, settingsformDataForProvider, setsettingsforProvider, handleCustomerFormDataChangeForProvider,
   openOfflineError, setOpenOfflineError, customers, setGetCustomers, customerformData, setcustomerformData,
   seeCustomerCode, setSeeCustomerCode,
   updatedMessage, setUpdatedMessage, providerformData,  setproviderformData,providers, setGetProviders,updatedMessageProvider,
    setUpdatedMessageProvider,seeProviderCode, setProviderCode,customerLongitude, setCustomerLongitude,
  customerLatitude, setCustomerLatitude,plusCode, setPlusCode, customerLoginData, setCustomerLoginData,customer, setCustomer,
  providerLoginData, setproviderLoginData, serviceProvider, setserviceProvider,locationForm, setLocationForm,locations, 
  setlocations, sublocations, setSubLocations,sublocationForm, setSubLocationForm,settingsForStore, setsettingsForStore,
  handleStoreFormDataChange,seeSettings4, setSeeSettings4,storeForm, setStoreForm, storeManagerForm, setStoreManagerForm,
  seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager, storeManagerSettings, setstoreManagerSettings,
  storeManagerLogin, setStoreManagerLogin,storeManager, setstoreManager, otpSent, setotpSent
  ,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,handleChangePhoneNumber,resetPasswordForm, 
  setResetPasswordForm,handleChangeResetPasswordPhoneNumber, handleChangeResetPassword,openAccessDenied, setopenopenAccessDenied,
  openAccessDenied2, setopenopenAccessDenied2,openAccessDenied3, setopenopenAccessDenied3,admin, setAdmin,smsBalance, 
  setSmsBalance,seelocation, setseelocation,adminPermission, setAdminPermission,setUser,user,
  canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting, canReadSms, canManageSms,canManageSmsTemplates,
  canReadSmsTemplates,currentUser, setCurrentUser,fetchCurrentUser,settingsTicket,setsettingsTicket,handleFormDataChangeForTickets,
  storeManagerSet, setStoreManagerSet, handleChangeStoreSet,signinFormData, setSigninFormData,
  handleFormDataChangeSignin,user_name,id,imagePreview, setImagePreview,updateFormData, setUpdateFormData,openLoginSuccess,
   setopenLoginSuccess,handleCloseLoginSuccess,openLogoutSuccess, setopenLogoutSuccess,
    handleCloseLogoutSuccess,handleChangePhoneNumberSignin,canReadCalendar,canManageCalendar,canReadTickets,canManageTickets,
    canReadServiceProviders,canManageServiceProviders,canReadCustomers,canManageCustomers,canReadStoreManager,canManageStoreManager,
    canManageStore,canReadStore,canManageSubLocation,canReadSubLocation,canReadLocation,canManageLocation




  }}>


{children}
</GeneralSettingsContext.Provider>

  )
}

export default ApplicationSettings
 const useApplicationSettings = (()=> useContext(GeneralSettingsContext))
export {useApplicationSettings}                                                                                                                                                                                                                                                                                                                                                                                                                                                 