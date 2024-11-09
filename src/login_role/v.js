


{enable_2fa_for_service_provider ? (
    <>
<div    className='bg-small-screens2  h-screen flex justify-center items-center

'>
 
 {otpSent ? (



<form    onSubmit={handleVerifyOtp} className="flex max-w-md flex-col gap-4
">


<div>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>


 Login With Your OTP
 
 <GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
 </h2>

<div className="mb-2 block playwrite-de-grund  ">
<Label htmlFor="repeat-password" value='Customer Code' />
</div>

 


<div  className='relative'>
<TextInput name="customer_code"  value={otp}  onChange={(e) => setOtp(e.target.value)}
type={seeProviderCode ? 'password' : 'text'} 
required shadow  
style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 

/>

<div  onClick={()=> setSeeProviderCode(!seeProviderCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
flex items-center pr-1 cursor-pointer'>
{ seeProviderCode  ?   <FaEyeSlash   />  : <FaEye/>


}

</div>






</div>

</div>

<Button className='playwrite-de-grund flex '  disabled={loading} type="submit">



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600 fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login, Into Your Portal</Button>
{/* <ArrowBackIcon style={{color: 'black'}} onclick={handleGoBack}/> */}
<Link  to='/choose_role'>
<p className='playwrite-de-grund text-black'>Go Back</p>
<ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
</Link> 


</form>

 ) : (


  
<form    onSubmit={handleProviderSignIn} className="flex max-w-md 
flex-col gap-4 ">


<div>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>


Login With Your Service Provider Code
<GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
</h2>

<div className="mb-2 block playwrite-de-grund  ">
<Label htmlFor="repeat-password" value='Service Provider Code' />
</div>




<div  className='relative'>
<TextInput name="provider_code"  value={providerLoginData.provider_code}    onChange={handleChange} 
type={seeProviderCode ? 'password' : 'text'} 
required shadow  
style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 

/>

<div  onClick={()=> setSeeProviderCode(!seeProviderCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
flex items-center pr-1 cursor-pointer'>
{seeProviderCode  ?   <FaEyeSlash   />  : <FaEye/>


}

</div>






</div>

</div>

<Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600
fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login In </Button>

<Link  to='/role_customer'>
<p className='playwrite-de-grund text-black'>Go Back</p>
<ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
</Link> 


</form>
 )}    

</div>

    </>
  ):  <>
  
  <div    className='bg-small-screens2 h-screen flex justify-center items-center
  '>
  
<form    onSubmit={ handleProviderSignIn} className="flex max-w-md
flex-col gap-4 ">


<div className=''>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>


Login With Your Service Provider Code
<GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
</h2>

<div className="mb-2 block playwrite-de-grund  ">
<Label htmlFor="repeat-password" value='Service Provider Code' />
</div>




<div  className='relative'>
<TextInput  name="provider_code"  value={providerLoginData.provider_code}  
  onChange={handleChange} 
type={seeProviderCode ? 'password' : 'text'}
style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 
required shadow  
/>

<div  onClick={()=> setSeeProviderCode(!seeProviderCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
flex items-center pr-1 cursor-pointer'>
{seeProviderCode  ?   <FaEyeSlash   />  : <FaEye/>


}

</div>






</div>

</div>

<Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600
fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login In </Button>

<Link  to='/role_customer'>
<p className='playwrite-de-grund text-black'>Go Back</p>
<ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
</Link> 

</form>
  </div>
  </>


















































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
    settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
     handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
     seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,
     setstoreManagerSettings,adminFormSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
     settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets
  } = useApplicationSettings()

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

    <div    className='bg-white h-screen flex justify-center items-center'>

      
{enable_2fa_for_store_manager  ?  (
  <>
{otpSent ? (


 
<form    onSubmit={handleVerifyOtp} className="flex max-w-md flex-col gap-4">


<div>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>
   

    Login With Your OTP
    
    <GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
    </h2>

<div className="mb-2 block playwrite-de-grund  ">
  <Label htmlFor="repeat-password" value='Customer Code' />
</div>

    

<div  className='relative'>
<TextInput name="otp"  value={otp}  onChange={(e) => setOtp(e.target.value)}
type={seeManagerNumber ? 'password' : 'text'} 
 required shadow  


 style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 
/>

  <div  onClick={()=> setseeManagerNumber(!seeManagerNumber)} className='absolute   inset-y-0 right-0 text-lg text-black 
  flex items-center pr-1 cursor-pointer'>
 { seeManagerNumber  ?   <FaEyeSlash   />  : <FaEye/>


}

  </div>






</div>

</div>

<Button className='playwrite-de-grund flex '  disabled={loading} type="submit">



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600 fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
 39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login Into Your Portal</Button>
<ArrowBackIcon style={{color: 'black'}}   className='cursor-pointer'  onClick={handleGoBack}/>

</form>

    ) : (
   

<form    onSubmit={handleStoreManagerSignIn} className="flex max-w-md flex-col gap-4">


<div>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl'>


Login With Your Management Number</h2>

<div className="mb-2 block playwrite-de-grund  ">
<Label htmlFor="repeat-password" value='Service Provider Code' />
</div>




<div  className='relative'>
<TextInput name="manager_number"  value={storeManagerLogin.manager_number}    onChange={handleChange} 
type={seeManagerNumber ? 'password' : 'text'} 
required shadow  


style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 
/>

<div  onClick={()=> setseeManagerNumber(!seeManagerNumber)} className='absolute   inset-y-0 right-0 text-lg text-black 
flex items-center pr-1 cursor-pointer'>
{seeManagerNumber  ?   <FaEyeSlash   />  : <FaEye/>


}

</div>






</div>

</div>

<Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600
 fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login In </Button>

<Link className='' to='/choose_role'>
    <p className='playwrite-de-grund text-black'>Go Back</p>
    <ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
    </Link> 
 

</form>
    )}    
  </>
): 
<form    onSubmit={handleStoreManagerSignIn} className="flex max-w-md flex-col gap-4">


<div>

<h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>


Login With Your Management Number
<GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
</h2>

<div className="mb-2 block playwrite-de-grund  ">
<Label className='text-lg' htmlFor="repeat-password" value='Store Manager Code' />
</div>




<div  className='relative'>

    
<TextInput name="manager_number"  value={storeManagerLogin.manager_number}    
onChange={handleChange} 
type={seeManagerNumber ? 'password' : 'text'} 
required shadow  


style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}} 
/>

<div  onClick={()=> setseeManagerNumber(!seeManagerNumber)} className='absolute   inset-y-0 right-0 text-lg text-black 
flex items-center pr-1 cursor-pointer'>
{seeManagerNumber  ?   <FaEyeSlash   />  : <FaEye/>


}

</div>






</div>

</div>

<Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>



<div role="status">
{ loading &&
<svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600
 fill-red-700`}
viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167

20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
39.0409Z" fill="currentFill"/>
</svg>
}

</div>

Login In </Button>

<Link className='' to='/choose_role'>
    <p className='playwrite-de-grund text-black'>Go Back</p>
    <ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
    </Link> 
 

</form>}

    

</div>
  
  </>
  );
}



export default StoreManagerRole





