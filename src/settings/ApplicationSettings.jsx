import { useState, createContext, useContext,  useEffect, useCallback } from "react"

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useNavigate, redirect} from 'react-router-dom'
import dayjs from 'dayjs';


const GeneralSettingsContext = createContext(null)



const ApplicationSettings = ({children}) => {
  const [phone, setPhone] = useState('');

const settingsFormDataInitialValue = {
  prefix: '',
  minimum_digits: '',
  
  use_auto_generated_number: false,
  send_sms_and_email: false
}


const settingsFormDataInitialValueForPrvider = {
  prefix: '',
  minimum_digits: '',
  send_sms_and_email_for_provider: false,

  use_auto_generated_number_for_service_provider: false
}


const resetPasswordInitialValue = {
  phone_number: '',
  email: ''
}

const storeMnagerFormData = {
  prefix: '',
  minmum_digits: ''

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
      login_with_otp: false
    } 

    
    const [isSeen, setIsSeen] = useState(false)
    const [seeSidebar, setSeeSideBar] = useState(false)
    const [theme, setTheme] = useState('light')
    const [icon, setIcon] = useState(false)
const [imgIcon, setImgIcon] = useState(false)
const [isSeenPassWord,  setIsSeenPassword] = useState(false)
const [signupFormData, setSignupFormData] = useState(signupFormDataInitialValue)
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



    
const handleFormDataChangeForAdmin = (e)=> {
  const {type, checked, name, value} = e.target
  const capitalize_prefix = capitalizePrefix(value) 

  setAdminFormSettings((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : capitalize_prefix }
))

}



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


  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
     setTheme('dark')
    } else {
     setTheme('light')
    }
   }, [setTheme]);


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




  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 9000);
  







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
            console.log('Fetched user data:', data.user.can_read_settings);
            setUser(data.user.role);
            setCanReadSetting(data.user.can_read_settings)
            setCanManageSetting(data.user.can_manage_settings
            )

            // setUser(data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
          setUser(null);
        }
  },
  [setUser],
)








useEffect(() => {
  fetchCurrentUser()
}, [fetchCurrentUser,user]);
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
  canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting



  }}>


{children}
</GeneralSettingsContext.Provider>

  )
}

export default ApplicationSettings
export const useApplicationSettings = (()=> useContext(GeneralSettingsContext))
