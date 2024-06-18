import { useState, createContext, useContext,  useEffect, useCallback } from "react"

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useNavigate, redirect} from 'react-router-dom'


const GeneralSettingsContext = createContext(null)



const ApplicationSettings = ({children}) => {
  const [phone, setPhone] = useState('');

const settingsFormDataInitialValue = {
  prefix: '',
  minimum_digits: '',
  
  use_auto_generated_number: false,
}


const settingsFormDataInitialValueForPrvider = {
  prefix: '',
  minimum_digits: '',
  
  use_auto_generated_number_for_service_provider: false
}


    const signupFormDataInitialValue ={
      user_name: '',
      password: '',
      password_confirmation: '',
      email: '',
      phone_number: phone,
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
const [settingsformData, setsettingsformData] = useState(settingsFormDataInitialValue)
const [settingsformDataForProvider, setsettingsforProvider] = useState(settingsFormDataInitialValueForPrvider)

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
  
      
const handleCustomerFormDataChange = (e)=> {
  const {type, checked, name, value} = e.target

setsettingsformData((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : value }
))
}


      
const handleCustomerFormDataChangeForProvider = (e)=> {
  const {type, checked, name, value} = e.target

  setsettingsforProvider((prevData)=> (
  {...prevData, [name]: type === 'checkbox' ?  checked : value }
))
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


  const handlegetproviderSettings  = useCallback(
            
    async()=> {
    const storedData = JSON.parse(localStorage.getItem("provider settings"));
  
    const requestParams = {
      use_auto_generated_number_for_service_provider:storedData.use_auto_generated_number_for_service_provider,
    
    };
  try {
    const response = await fetch(`/api/get_provider_settings?${new URLSearchParams(requestParams)}`, {
    method: 'GET',
    headers: {
      "Content-Type"  : 'application/json'
    },
    
    
    })
    const newData = await response.json()
    if (response.ok) {
    // const use_auto_generated_number = newData.use_auto_generated_number
    // const prefix = newData.prefix
    // const minimum_digits = newData.minimum_digits
  
  
    const {prefix, minimum_digits,  use_auto_generated_number_for_service_provider} = newData[0]
    setsettingsforProvider({...settingsformData, prefix,  minimum_digits,  use_auto_generated_number_for_service_provider
    
    })
    
    } else {
    console.log('failed to fetch')
    }
    } catch (error) {
    console.log(error)
    
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
         
         };
       try {
         const response = await fetch(`/api/get_customer_settings?${new URLSearchParams(requestParams)}`, {
         method: 'GET',
         headers: {
           "Content-Type"  : 'application/json'
         },
         
         
         })
         const newData = await response.json()
         if (response.ok) {
         // const use_auto_generated_number = newData.use_auto_generated_number
         // const prefix = newData.prefix
         // const minimum_digits = newData.minimum_digits
       
       
         const {prefix, minimum_digits, use_auto_generated_number} = newData[0]
         setsettingsformData({...settingsformData, prefix,  minimum_digits, use_auto_generated_number
         
         })
         
         } else {
         console.log('failed to fetch')
         }
         } catch (error) {
         console.log(error)
         
         }
       },
   
[]
)


    
  
  useEffect(() => {
    handlegetcustomerSettings()
  }, [handlegetcustomerSettings, setsettingsformData]);




  return (

<GeneralSettingsContext.Provider value={{isSeen, setIsSeen,seeSidebar, setSeeSideBar, theme, setTheme, 
  handleThemeSwitch, icon, setIcon, imgIcon, setImgIcon, isSeenPassWord,  setIsSeenPassword, signupFormData, setSignupFormData,
  handleFormDataChange, phone, setPhone, isloading, setloading, open, setOpen,handleClose, registrationError,materialuitheme,
   setRegistrationError, seeError, setSeeError,seeSettings1, setSeeSettings1,seeSettings2, setSeeSettings2,
   setMaterialuiTheme, darkTheme, lightTheme, seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,
   handleCustomerFormDataChange, settingsformDataForProvider, setsettingsforProvider, handleCustomerFormDataChangeForProvider,
   

  }}>
{children}
</GeneralSettingsContext.Provider>

  )
}

export default ApplicationSettings
export const useApplicationSettings = (()=> useContext(GeneralSettingsContext))
