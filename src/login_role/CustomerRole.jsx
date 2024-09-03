

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
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




 function CustomerRole() {
  const [seeCustomerCode, setSeeCustomerCode] = useState(false)
const navigate = useNavigate()
const {customerLoginData, setCustomerLoginData, customer, setCustomer, settingsformData} = useApplicationSettings()
const [openOfflineAlert, setOfflineAlert] = useState(false)
const [loading, setloading] = useState(false)
const [open, setOpen] = useState(false);
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState('');
const [openOtp, setopenOtp] = useState(false)
const [openOtpError, setopenOtpError] = useState(false)
 const [openOtpEmail, setopenOtpEmail] = useState(false)



const handleCloseOtpEmail = ()=>{
  setopenOtpEmail(false)
}

// const {enable_2fa} = settingsformData

const storedData =  JSON.parse(localStorage.getItem('customer settings'))
const enable_2fa = storedData.enable_2fa
const send_email = storedData.send_email
const send_sms_and_email = storedData.send_sms_and_email



const handleGoBack = (e) => {
  e.preventDefault()
  navigate(-1);
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
    body: JSON.stringify({...customerLoginData, enable_2fa, send_email, send_sms_and_email})
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
    }
    
    

setCustomer(true)
localStorage.setItem('customer', true);

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
<CustomerOtpSentEmailAlert openOtpEmail={openOtpEmail} handleCloseOtpEmail={handleCloseOtpEmail} />
<CustomerLoginAlertError  handleClose={handleClose}  open={open}/>
<CustomerLoginOfflineAlert  openOfflineAlert={openOfflineAlert}  handleCloseOfflineAlert={handleCloseOfflineAlert}/>
<CustomerOtpSentAlert  openOtp={openOtp} handleCloseOtp={handleCloseOtp}
/>
<CustomerOtpAlertError  openOtpError={openOtpError} handleCloseOtpError={handleCloseOtpError}
/>

{enable_2fa ? (
  <>
<div    className='bg-white h-screen flex justify-center items-center'>
            {otpSent ? (
    

         
<form    onSubmit={handleVerifyOtp} className="flex max-w-md flex-col gap-4">
      
    
      <div>
      
        <h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>
           
      
            Login With Your OTP
            
            <GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/>
            </h2>
        
        <div className="mb-2 block playwrite-de-grund  ">
          <Label htmlFor="repeat-password" value='OTP' />
        </div>
       
            
      
      
        <div  className='relative'>
        <TextInput name="customer_code"  value={otp}      onChange={(e) => setOtp(e.target.value)}
      type={seeCustomerCode ? 'password' : 'text'} 
         required shadow  
        className='w-full pr-[-8px]' />
      
          <div  onClick={()=> setSeeCustomerCode(!seeCustomerCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
          flex items-center pr-1 cursor-pointer'>
         { seeCustomerCode  ?   <FaEyeSlash   />  : <FaEye/>
      
      
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
      </form>
      
            ) : (
           
  <form    onSubmit={handleCustomerSignIn} className="flex max-w-md flex-col gap-4">
      
    
  <div>

    <h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>
       
    
        Login With Your Customer Code
        <GoPerson className='text-green-700 text-2xl max-sm:text-3xl '/>
        </h2>
    
    <div className="mb-2 block playwrite-de-grund  ">
      <Label htmlFor="repeat-password" value='Customer Code' />
    </div>
   
        


    <div  className='relative'>
    <TextInput name="customer_code" 
     value={customerLoginData.customer_code} onChange={handleChange} type={seeCustomerCode ? 'password' : 'text'} 
     required shadow  
    className='w-full pr-[-8px]' />

      <div  onClick={()=> setSeeCustomerCode(!seeCustomerCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
      flex items-center pr-1 cursor-pointer'>
     { seeCustomerCode  ?   <FaEyeSlash   />  : <FaEye/>


}

      </div>





   
    </div>

  </div>
 

 
  <Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>
    
    

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
    
    Login In </Button>
    <Link className='' to='/choose_role'>
    <p className='playwrite-de-grund text-black'>Go Back</p>
    <ArrowBackIcon style={{color: 'black'}}  className='cursor-pointer'/>
    </Link>
</form>
            )}    

    </div>

  </>

): 


<div    className='bg-white h-screen flex justify-center items-center'>

<form    onSubmit={handleCustomerSignIn} className="flex max-w-md flex-col gap-4">
      
    
<div>

  <h2 className='text-black mb-10 playwrite-de-grund font-bold text-xl flex gap-4 max-sm:gap-1'>
     

      Login With Your Customer Code <GoPerson className='text-green-700 text-2xl max-sm:text-3xl'/></h2>
  
  <div className="mb-2 block playwrite-de-grund  ">
    <Label htmlFor="repeat-password" value='Customer Code' />
  </div>
 
      


  <div  className='relative'>
  <TextInput name="customer_code"  value={customerLoginData.customer_code} onChange={handleChange} type={seeCustomerCode ? 'password' : 'text'} 
   required shadow  
  className='w-full pr-[-8px]' />

    <div  onClick={()=> setSeeCustomerCode(!seeCustomerCode)} className='absolute   inset-y-0 right-0 text-lg text-black 
    flex items-center pr-1 cursor-pointer'>
   { seeCustomerCode  ?   <FaEyeSlash   />  : <FaEye/>


}

    </div>





 
  </div>

</div>

<Button className='playwrite-de-grund flex ' type="submit" disabled={loading}>
  
  

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
  
  Login In </Button>
  <ArrowBackIcon style={{color: 'black'}} onClick={handleGoBack} className='cursor-pointer'/>
</form>
</div>

}



    
    </>
  
  );
}



export default CustomerRole





