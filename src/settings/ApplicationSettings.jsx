import { useState, createContext, useContext,  useEffect, useCallback } from "react"

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs';
import { createConsumer } from '@rails/actioncable';
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { useNotifications } from '../context/NotificationContext';
import useSound from 'use-sound';
import notificationSound from '/751326__robinhood76__13129-mystery-cash-bonus.wav'; // Add your sound file





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
  enable_2fa: false,
  sequence_value: ''
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
      enable_2fa_for_admin_passkeys: false,
      login_with_web_auth: false,
      login_with_otp_email:  false,
      send_password_via_email: false,
      send_password_via_sms: false,
      check_is_inactive: false,
      check_inactive_hrs: '',
      check_inactive_days: '',
      check_inactive_minutes: ''
    } 



    const calendarSettingsData = {
      start_in_minutes: '',
      start_in_hours: ''
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
const [seeSettings7, setSeeSettings7] = useState(false)
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
 const [chat_user_name, setChatUserName] = useState('')
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
const [openLocationAlertError, setopenLocationAlertError] = useState(false)
const [openLogoutCustomerSucessfully, setopenLogoutCustomerSucessfully] = useState(false)
const [openLoginCustomerSuccessfully, setopenLoginCustomerSuccessfully] = useState(false)
const [openServiceProviderLogoutSuccesful, setopenServiceProviderLogoutSuccesful] = useState(false)
const [openServiceProviderLoginSuccesful, setopenServiceProviderLoginSuccesful] = useState(false)
const [openStoreManagerLogin, setopenStoreManagerLogin] = useState(false)
const [openStoreManagerLogout, setopenStoreManagerLogout] = useState(false)
const [signedUpPassKey, setSignedUpPassKey] = useState(false)
const [checkEmail, setCheckEmail] = useState(null)
const [calendarSettings, setCalendarSettings] = useState(calendarSettingsData)
const [logoutMessage, setlogoutmessage] = useState(false)
const [openLogoutSession, setopenLogoutSession] = useState(false)
const [providerData, setProviderData] = useState(null);
const [customerProfileData, setCustomerProfileData] = useState(null);
const [messages, setMessages] = useState([])

const [notificationsEnabled, setNotificationsEnabled] = useState(false);

const [isWindowFocused, setIsWindowFocused] = useState(true);
const { addNotification } = useNotifications();

const [playNotification] = useSound(notificationSound, { volume: 0.5 });

const companyInfo  = {
  company_name: '',
  contact_info: '',
  email_info: '',
  logo: null, 
  logo_preview: null 
}

const [companySettings, setcompanySettings] = useState(companyInfo)
const [isOpenProvider, setIsOpenProvider] = useState(false)
const [customerId, setCustomerId] = useState('')


useEffect(() => {
  setChatUserName(user_name)
  
}, [user_name]);

const handleCloseLogoutSession = () => {
  setopenLogoutSession(false)
}


const handleCloseStoreManagerLogout = ()=> {
  setopenStoreManagerLogout(false)
}




const handleCloseStoreManagerLogin = ()=> {
  setopenStoreManagerLogin(false)
}




const handleCloseServiceProviderLoginSuccesful = ()=>  {
  setopenServiceProviderLoginSuccesful(false)
}









const handleCloseServiceProviderLogoutSuccesful = ()=> {
  setopenServiceProviderLogoutSuccesful(false)
}





const handleCloseLoginCustomerSuccessfully = ()=> {
  setopenLoginCustomerSuccessfully(false)
}


const handleCloseLogoutCustomerSuccessfully = ()=> {
  setopenLogoutCustomerSucessfully(false) 
}


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




// start_in_minutes
//       start_in_hours


const handleFormDataChangeForCalendar = (e) => {
  const { type, name, value } = e.target;

  setCalendarSettings((prevData) => {
    let updatedSettings = { ...prevData, [name]: value };

if (name === 'start_in_minutes') {
  updatedSettings.start_in_hours = ''
}

if (name === 'start_in_hours') {
  updatedSettings.start_in_minutes = ''
}

return updatedSettings

  })


  
}



const handleFormDataChangeForAdmin = (e) => {
  const { type, checked, name, value } = e.target;


  // login_with_otp

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
      
    }else if (name === 'enable_2fa_for_admin'){
      updatedSettings.login_with_otp_email = true
      updatedSettings.enable_2fa_for_admin_passkeys = false
      
      
    }else if (name === 'login_with_otp'){
      updatedSettings.enable_2fa_for_admin = true
      updatedSettings.enable_2fa_for_admin_passkeys = false
    }else if (name === 'login_with_otp_email'){
      updatedSettings.enable_2fa_for_admin = true
    }else  if (name === 'enable_2fa_for_admin_passkeys'){
      updatedSettings.enable_2fa_for_admin = false
      updatedSettings.login_with_otp = false
    }

    // Update the value for the changed field
    updatedSettings[name] = type === 'checkbox' ? checked : value;

    // Update enable_2fa_for_admin based on the checked value
   

    console.log("is it true or false=>", name );

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
    const dark_theme = localStorage.getItem('theme_normal')
    if (dark_theme  === 'dark') {
      setMaterialuiTheme(darkTheme)
      setTheme('dark')
    }
     
     
    } else {
      const dark_theme = localStorage.getItem('theme_normal')
      if (dark_theme  === 'light') {
        setTheme('light')
      }
    
    }
   }, [])







  const controller = new AbortController();


  const getLocation = 
  useCallback(
    async() => {
  
      try {
        const response = await fetch('/api/get_locations', {
          signal: controller.signal,  
  
        })
        clearTimeout(id);
  
        const newData = await response.json()
  
        if (response.status === 401) {
          if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
            adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
            toast.error(
              <div>
                <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                  <div> <span className='font-thin flex gap-3'>
               
                    </span></div></p>
              </div>,
             
            );
            navigate('/signup2fa_passkey')
            setopenLogoutSession(true)
         
          }else{
            toast.error(
              <div>
                <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                  <div> <span className='font-thin flex gap-3'>
               
                    </span></div></p>
              </div>,
             
            );
             navigate('/signin')
             setopenLogoutSession(true)
             
         
          }
        }
  
        if (response.status === 403) {
          setopenLocationAlertError(true)
          // setopenopenAccessDenied(true)
          setseelocation(false)
  
  
        }
        if (response.ok) {
          setlocations(newData)
          console.log('customer data', newData)
          setseelocation(true)
        } else {
          console.log('error')
          setseelocation(true)
          
        }
      } catch (error) {
        console.log(error)
        setopenLocationAlertError(true)
        setseelocation(true)
  
      }
    },
    [],
  )
  
  
  
  useEffect(() => {
    getLocation()
  }, [getLocation]);






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
            console.log('Fetched user data:', data.user.user_name);
            setCheckEmail(data.user.email)
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
console.log('my ',data)
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


       if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys) {
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
          navigate('/signup2fa_passkey')
          setopenLogoutSession(true)
        }else{
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
           navigate('/signin')
           setopenLogoutSession(true)
       
        }
       
      }



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


useEffect(() => {
  const handleStorageChange = (event) => {
    // Add detailed logging
    console.log('Storage Event:', event);
    console.log('Current Path:', window.location.pathname);
    
    // Check if we're in the customer portal by checking the current URL
    const isCustomerPortal = window.location.pathname.startsWith('/customer') 
    console.log('Is Customer Portal:', isCustomerPortal);
    console.log('Event Key:', event.key);
    
    if (event.key === 'acha umbwakni' && !isCustomerPortal) {
      const acha_umbwakni = localStorage.getItem('acha umbwakni');
      console.log('Acha Umbwakni Value:', acha_umbwakni);
      
      if (!acha_umbwakni || acha_umbwakni === 'null') {
        console.log('Should Redirect:', true);
        console.log('2FA Enabled:', adminFormSettings.enable_2fa_for_admin_passkeys);
        
        // Only redirect if we're NOT in the customer portal
        if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
            adminFormSettings.enable_2fa_for_admin_passkeys === 'true') {
          console.log('Redirecting to: /signup2fa_passkey');
          navigate('/signup2fa_passkey');
        } else {
          console.log('Redirecting to: /signin');
          navigate('/signin');
        }
      }
    }
  };

  // Listen for changes in localStorage across tabs
  window.addEventListener('storage', handleStorageChange);

  // Add immediate check for localStorage value
  const checkStorage = () => {
    console.log('Checking storage...');
    const acha_umbwakni = localStorage.getItem('acha umbwakni');
    console.log('Current acha_umbwakni value:', acha_umbwakni);
  };
  checkStorage();

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, [navigate, adminFormSettings.enable_2fa_for_admin_passkeys]);





useEffect(() => {
  const handleStorageChange = (event) => {
    // Add detailed logging
    // console.log('Storage Event:', event);
    // console.log('Current Path:', window.location.pathname);
    
    // Check if we're in the customer portal by checking the current URL
    const adminPortal = window.location.pathname.startsWith('/admin') 
    // console.log('Is Customer Portal:', adminPortal);
    // console.log('Event Key:', event.key);
    
    if (event.key === 'customer' && !adminPortal) {
      const customer = localStorage.getItem('customer');
      // console.log('Customer Value:', customer);
      
      if (!customer || customer === 'null') {
        // console.log('Should Redirect:', true);
        // console.log('2FA Enabled:', adminFormSettings.enable_2fa_for_admin_passkeys);
        navigate('/customer_role');
        // Only redirect if we're NOT in the customer portal
      
      }
    }
  };

  // Listen for changes in localStorage across tabs
  window.addEventListener('storage', handleStorageChange);

  // Add immediate check for localStorage value
  const checkStorage = () => {
    console.log('Checking storage...');
    const acha_umbwakni = localStorage.getItem('acha umbwakni');
    console.log('Current acha_umbwakni value:', acha_umbwakni);
  };
  checkStorage();

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, [navigate, adminFormSettings.enable_2fa_for_admin_passkeys]);


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
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
          navigate('/signup2fa_passkey')
          setopenLogoutSession(true)
       
        }else{
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
           navigate('/signin')
           setopenLogoutSession(true)
           
       
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





const handlegetcustomerSettings = useCallback(
  async()=> {
       const storedData = JSON.parse(localStorage.getItem("customer settings"));
     
       const requestParams = {
         use_auto_generated_number:storedData.use_auto_generated_number,
         send_sms_and_email:storedData.send_sms_and_email,
         send_email: storedData.send_email,
         enable_2fa: storedData.enable_2fa
          
       
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


       if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
          adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
          navigate('/signup2fa_passkey')
          setopenLogoutSession(true)
       
        }else{
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
           navigate('/signin')
           setopenLogoutSession(true)
           
       
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


  if (response.status === 401) {
    if (adminFormSettings.enable_2fa_for_admin_passkeys) {
     
      toast.error(
        <div>
          <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
            <div> <span className='font-thin flex gap-3'>
         
              </span></div></p>
        </div>,
       
      );
   
      navigate('/signup2fa_passkey')
      // setlogoutmessage(true)
      // localStorage.setItem('logoutMessage', true)
      setopenLogoutSession(true)
    }else{
      toast.error(
        <div>
          <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
            <div> <span className='font-thin flex gap-3'>
         
              </span></div></p>
        </div>,
       
      );
       navigate('/signin')
    // setlogoutmessage(true)
    // localStorage.setItem('logoutMessage', true)
    setopenLogoutSession(true)
    }
   
  }





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


// useEffect(() => {
//   // Listen for changes in the authentication state


// if (currentUser) {
//       navigate('/admin/customers')
//     }      
 


//   // Clean up the subscription when the component unmounts
// }, [navigate, currentUser]); 



const handlegetstoreManagerSettingsAllow = useCallback(
  
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





      //  if (response.status === 401) {
      //   if (adminFormSettings.enable_2fa_for_admin_passkeys) {
         
      //     toast.error(
      //       <div>
      //         <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
      //           <div> <span className='font-thin flex gap-3'>
             
      //             </span></div></p>
      //       </div>,
           
      //     );
       
      //     navigate('/signup2fa_passkey')
      //     // setlogoutmessage(true)
      //     // localStorage.setItem('logoutMessage', true)
      //     setopenLogoutSession(true)
      //   }else{
      //     toast.error(
      //       <div>
      //         <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
      //           <div> <span className='font-thin flex gap-3'>
             
      //             </span></div></p>
      //       </div>,
           
      //     );
      //      navigate('/signin')
      //   // setlogoutmessage(true)
      //   // localStorage.setItem('logoutMessage', true)
      //   setopenLogoutSession(true)
      //   }
       
      // }
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
  handlegetstoreManagerSettingsAllow()
}, [handlegetstoreManagerSettingsAllow ,setstoreManagerSettings]);




    const storedData = JSON.parse(localStorage.getItem("ojijo"));
    
    const fetchUpdatedProfile = useCallback(
      
       
      async() => {
        const requestParams = {
                id:storedData.id,
              
              }
        

        const url = "/api/updated_admin?" + new URLSearchParams(requestParams)
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
  


    // const URL = 'ws://localhost:4000/cable';
    // const consumer = createConsumer(URL);
    // const cable = createConsumer("ws://localhost:4000/cable");

  //   useEffect(() => {
  //    const subscription = cable.subscriptions.create("AdminStatusChannel", {
  //      received(data) {
  //        console.log("User status updated:", data);
  //        // Update your frontend state or UI based on received data
  //      }
  //    });
 
  //    return () => {
  //      subscription.unsubscribe();
  //    };
  //  }, [cable.subscriptions]);

    
    


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
  


  const handleCustomerLogout = async() => {

    try {
      const response = await fetch('/api/logout_customer', {
        method: 'DELETE',
        credentials: 'include'
  
      })
  if (response.ok) {
    navigate('/customer_role')
    setopenLogoutCustomerSucessfully(true)
    localStorage.removeItem('customer');
  
  } else {
    console.log('failed')
  }
  
    } catch (error) {
      console.log(error)
      setOpen(true)
    }
  }
  


  const handleLogout = async(e) => {
    e.preventDefault()
        try {
          const response = await fetch('/api/logout_service_provider', {
            method: 'DELETE',
            credentials: 'include'
      
          })
    
    
    
          
      if (response.ok) {
        navigate('/service_provider_role')
        localStorage.removeItem('service provider');
        setopenServiceProviderLogoutSuccesful(true)
      
      } else {
        console.log('failed')
      }
      
        } catch (error) {
          console.log(error)
        }
      }
      

const handleGetServiceProvider = useCallback(
  async() => {
    const response = await fetch('/api/get_current_service_provider', {
    })
    const newData = await response.json()
    if (response.ok) {
      setProviderData(newData)
    }
  },
  [],
)

useEffect(() => {
    
  handleGetServiceProvider()
  
}, [handleGetServiceProvider]);





const handleGetCustomer = useCallback(
  async() => {
    const response = await fetch('/api/get_current_customer', {
    })
    const newData = await response.json()
    if (response.ok) {
      setCustomerProfileData(newData)
      setCustomerId(newData.id)
    }
  },
  [],
)

useEffect(() => {
    
  handleGetCustomer()
  
 
}, [handleGetCustomer]);




const isCurrentUser = useCallback((message) => {
  if (message.customer_id && id) {
    return message.customer_id.toString() === id.toString();
  }
  return false;
}, [id]);



const cable = createConsumer("ws://localhost:4000/cable");
  useEffect(() => {
   const subscription = cable.subscriptions.create("MessageChannel", {
    connected() {
        console.log("Connected to private WebSocket!");
      },
      received(data) {
        console.log("Message received:", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        
        // Add notification
        if (!isCurrentUser(data)) {
          addNotification({
            sender: data.sender_info?.name || 'Unknown',
            message: data.content,
            time: new Date().toLocaleTimeString(),
          });
          
          // Play sound if window not focused
          if (!isWindowFocused && notificationsEnabled) {
            playNotification();
          }
        }
      },
      disconnected() {
        console.log("Disconnected from private WebSocket!");
      },
     
   });

   return () => {
     subscription.unsubscribe();
     // Reset title when component unmounts
     document.title = "Chat";
   };
 }, [cable.subscriptions, isWindowFocused, notificationsEnabled,
   playNotification, addNotification, isCurrentUser]);





  return (

<GeneralSettingsContext.Provider value={{isSeen, setIsSeen,seeSidebar, setSeeSideBar, theme, setTheme, 
  handleThemeSwitch, icon, setIcon, imgIcon, setImgIcon, isSeenPassWord,  setIsSeenPassword, signupFormData,
   setSignupFormData,
  handleFormDataChange, phone, setPhone, isloading, setloading, open, setOpen,handleClose, registrationError
  ,materialuitheme,
   setRegistrationError, seeError, setSeeError,seeSettings1, setSeeSettings1,seeSettings2, setSeeSettings2,
   setMaterialuiTheme, darkTheme, lightTheme, seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,
   handleCustomerFormDataChange, settingsformDataForProvider, setsettingsforProvider, 
   handleCustomerFormDataChangeForProvider,
   openOfflineError, setOpenOfflineError, customers, setGetCustomers, customerformData, setcustomerformData,
   seeCustomerCode, setSeeCustomerCode,
   updatedMessage, setUpdatedMessage, providerformData,  setproviderformData,providers, setGetProviders,
   updatedMessageProvider,
    setUpdatedMessageProvider,seeProviderCode, setProviderCode,customerLongitude, setCustomerLongitude,
  customerLatitude, setCustomerLatitude,plusCode, setPlusCode, customerLoginData, setCustomerLoginData,customer, 
  setCustomer,
  providerLoginData, setproviderLoginData, serviceProvider, setserviceProvider,locationForm, setLocationForm,locations, 
  setlocations, sublocations, setSubLocations,sublocationForm, setSubLocationForm,settingsForStore, setsettingsForStore,
  handleStoreFormDataChange,seeSettings4, setSeeSettings4,storeForm, setStoreForm, storeManagerForm, setStoreManagerForm,
  seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager, storeManagerSettings, setstoreManagerSettings,
  storeManagerLogin, setStoreManagerLogin,storeManager, setstoreManager, otpSent, setotpSent
  ,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,handleChangePhoneNumber,resetPasswordForm, 
  setResetPasswordForm,handleChangeResetPasswordPhoneNumber, handleChangeResetPassword,openAccessDenied,
   setopenopenAccessDenied,
  openAccessDenied2, setopenopenAccessDenied2,openAccessDenied3, setopenopenAccessDenied3,admin, setAdmin,smsBalance, 
  setSmsBalance,seelocation, setseelocation,adminPermission, setAdminPermission,setUser,user,
  canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting, canReadSms, canManageSms,canManageSmsTemplates,
  canReadSmsTemplates,currentUser, setCurrentUser,fetchCurrentUser,settingsTicket,setsettingsTicket,handleFormDataChangeForTickets,
  storeManagerSet, setStoreManagerSet, handleChangeStoreSet,signinFormData, setSigninFormData,
  handleFormDataChangeSignin,user_name,id,imagePreview, setImagePreview,updateFormData, setUpdateFormData,openLoginSuccess,
   setopenLoginSuccess,handleCloseLoginSuccess,openLogoutSuccess, setopenLogoutSuccess,logoutMessage, setlogoutmessage,
    handleCloseLogoutSuccess,handleChangePhoneNumberSignin,canReadCalendar,canManageCalendar,canReadTickets,canManageTickets,
    canReadServiceProviders,canManageServiceProviders,canReadCustomers,canManageCustomers,canReadStoreManager,canManageStoreManager,
    canManageStore,canReadStore,canManageSubLocation,canReadSubLocation,canReadLocation,canManageLocation,
    openLocationAlertError, setopenLocationAlertError,openLogoutCustomerSucessfully,handleCloseLogoutCustomerSuccessfully,
    setopenLogoutCustomerSucessfully,openLoginCustomerSuccessfully,handleCloseLoginCustomerSuccessfully,
    setopenLoginCustomerSuccessfully,openServiceProviderLogoutSuccesful, handleCloseServiceProviderLogoutSuccesful,
    setopenServiceProviderLogoutSuccesful,openServiceProviderLoginSuccesful, handleCloseServiceProviderLoginSuccesful,
    setopenServiceProviderLoginSuccesful,openStoreManagerLogin, handleCloseStoreManagerLogin ,setopenStoreManagerLogin,
    openStoreManagerLogout, handleCloseStoreManagerLogout,setopenStoreManagerLogout,signedUpPassKey, setSignedUpPassKey,
    checkEmail,seeSettings7, setSeeSettings7, handleFormDataChangeForCalendar,calendarSettings, setCalendarSettings,
    openLogoutSession, handleCloseLogoutSession,setopenLogoutSession,chat_user_name,
    companySettings, setcompanySettings, providerData,
    setProviderData,handleLogout,handleCustomerLogout,customerProfileData,
    setCustomerProfileData, isOpenProvider, setIsOpenProvider,customerId,setCustomerId,
    messages, setMessages, isCurrentUser,notificationsEnabled, setNotificationsEnabled,isWindowFocused, setIsWindowFocused

     

  }}>


{children}
</GeneralSettingsContext.Provider>

  )
}

export default ApplicationSettings
 const useApplicationSettings = (()=> useContext(GeneralSettingsContext))
export {useApplicationSettings}                                                                                                                                                                                                                                                                                                                                                                                                                                                 