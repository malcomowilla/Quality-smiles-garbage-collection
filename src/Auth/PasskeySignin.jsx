import {Link, useNavigate,  useParams, useLocation} from  'react-router-dom'
import {useState, useEffect, useCallback} from 'react'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { motion ,  useMotionValue, useTransform } from "framer-motion"

import {useApplicationSettings} from '../settings/ApplicationSettings'

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import { RiArrowGoBackFill } from "react-icons/ri";
import SinupInvalidOtpAlert from '../Alert/SinupInvalidOtpAlert'
import {useAuth} from '../settings/AuthSettings'
import { IoArrowUndoSharp } from "react-icons/io5";
import PasskeyError from '../Alert/PasskeyError'







const PasskeySignin = () => {

  const { setPhone, phone, isloading,
    
    setloading,fetchCurrentUser, 
     setAdmin,setTheme, setopenLoginSuccess, user, checkEmail, imagePreview,
     setUpdateFormData,updateFormData,setImagePreview,
     setAdminPermission,  openLogoutSuccess,handleCloseLogoutSuccess,
     handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
     
     materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
       seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
       settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
        handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
        seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
        setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
        settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets
    } = useApplicationSettings()



console.log('my user', user)



  const navigate = useNavigate()
const goBack = useNavigate()
  const [done, setDone] = useState(false)
const [seeError, setSeeError] = useState(false)


  const adminWebAuthData = {
    email: '',
    user_name: '',
    phone_number: '' 
  }



  const [signupFormData, setsignupFormData] = useState(adminWebAuthData)
  const [registrationError,  setRegistrationError] = useState('')
  const [openLoad, setOpenLoad] = useState(false);
  const [otpSent, setotpSent] = useState(false)
const [otp, setOtp] = useState('')
const [openOtpInvalid, setopenOtpInvalid] = useState(false)
const [passkeyError, setpasskeyError] = useState(null)
const [openPasskeyError, setopenPasskeyError] = useState(false)
const {phone_number,  }= signupFormData
const email = checkEmail
const emailValue = useMotionValue(email)

  const emailWidth = useTransform(emailValue, value => value ? '350px' : '400px');
  
const { search } = useLocation()
const my_user_name = new URLSearchParams(search).get('my_user_name');
const  handleCloseOtpInvalid = ()=> {
  setopenOtpInvalid(false)
}



const handleClosePasskeyError = ()=>{
  setopenPasskeyError(false)
}

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true, 
    animationData: AnimationDone,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



const handleGoBack = (e)=> {
  e.preventDefault()
  goBack(-1)
}

// api/login-admin

// https://quality-smile-garbabe-collection-backend-1jcd.onrender.com/login-admin


const {user_name} = signupFormData




function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
}



async function authenticateWebAuthn(e) {
  e.preventDefault();
  setloading(true);
  setOpenLoad(true);
  setDone(false);

  const response = await fetch('/api/webauthn/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, user_name, my_user_name  })
  })

  const options = await response.json();




  if (response.ok) {
    setloading(false)

    setOpenLoad(false)
    setSeeError(false)
setDone(false)



  
  setSeeError(false)
  } else {
    setloading(false)
        setRegistrationError(options.error)
        setSeeError(true)
        setOpenLoad(false)
        setDone(false);
  }


  // function base64UrlToBase64(base64Url) {
  //   if (typeof base64Url !== 'string') {
  //     throw new TypeError('Expected base64Url to be a string');
  //   }
  //   return base64Url.replace(/_/g, '/').replace(/-/g, '+');
  // }

  function base64UrlToUint8Array(base64Url) {
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') + padding;
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


  // function base64UrlToBase64(base64Url) {
  //   return base64Url.replace(/_/g, '/').replace(/-/g, '+');
  // }

  // if (typeof options.allowCredentials.id === 'string') {
  //   options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  // }  


  // if (options.allowCredentials) {
  //   options.allowCredentials = options.allowCredentials.map(cred => ({
  //     ...cred,
  //     id: Uint8Array.from(atob(base64UrlToBase64(cred.id)), c => c.charCodeAt(0))
  //   }));
  // }

  // if (typeof options.challenge === 'string') {
  //   options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  // }


  const publicKey = {
    ...options,
    challenge: base64UrlToUint8Array(options.challenge),
    allowCredentials: options.allowCredentials.map(cred => ({
      ...cred,
      id: base64UrlToUint8Array(cred.id)
    }))
  };


  try {
    // const credentialSignin = await navigator.credentials.get({ publicKey: options });
    const credential = await navigator.credentials.get({ publicKey: publicKey });


    // Prepare the credential response
    const credentialJson = {
      id: credential.id,
      rawId: arrayBufferToBase64Url(credential.rawId),
      type: credential.type,
      response: {
        clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON),
        authenticatorData: arrayBufferToBase64Url(credential.response.authenticatorData),
        signature: arrayBufferToBase64Url(credential.response.signature),
        userHandle: arrayBufferToBase64Url(credential.response.userHandle)
      }


    };


    

    const createResponse = await fetch('/api/webauthn/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential:credentialJson, email, user_name, my_user_name  })
    });

const newData = await createResponse.json()

    if (createResponse.ok) {
      setSeeError(false);
      setOpenLoad(false);
      setloading(false);
      fetchCurrentUser()
    setTheme("light")
    setopenLoginSuccess(true)
    setTimeout(() => {
      setDone(true);
      setloading(false);
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 2000);
    }, 2500);
      // setTimeout(() => {
      //   // setDone(true);
      //   // setloading(false);
      //   setTimeout(() => {
      //     navigate('/admin/location')
      //   }, 1000);
      // }, 2500);
    } else {
      setloading(false);
      // setRegistrationError(options.errors);
      setSeeError(true);
      setOpenLoad(false);
      setopenPasskeyError(true)
      setpasskeyError(newData.error)
      console.log(`passkey error =>${newData.error}`)
    }
  } catch (err) {
    setloading(false);
    setSeeError(true);
    setOpenLoad(false);
    console.error('Error during WebAuthn credential creation:', err);
  }
}




const handleChange = (e)=> {
  const {name, id, value} = e.target
  setsignupFormData((prevData)=> (
    {...prevData, [name]: value }
  ))
}


  
const storedData = JSON.parse(localStorage.getItem("ojijo"));
    
const fetchUpdatedProfile = useCallback(
  
   
  async() => {
    const requestParams = {
            id:storedData.id,
          
          }
    
    const url = "/api/allow_get_updated_admin?" + new URLSearchParams(requestParams)
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

  return (
    <>

    
    
    <PasskeyError   passkeyError={passkeyError} openPasskeyError={openPasskeyError} 
handleClosePasskeyError={handleClosePasskeyError}/>

{isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }
    <section    className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
     bg-passkey   ">

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className='mb-9'>
              <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
            {/* <img className="w-20 h-20 mr-2   rounded-full" src={imagePreview} alt="logo"/> */}
           <p className='text-black playwrite-de-grund  text-4xl '>Quality Smiles </p>    
        </a>
              </div>
      
        <h2 className=" text-2xl  leading-tight tracking-tight text-wrap playwrite-de-grund   font-bold mb-4 text-gray-900    ">
          Sign-In With Passkeys

          </h2>
        
        <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  ">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Login Into Your Account 
                </h1>
                <div className='flex flex-row '>
          <p className='text-black playwrite-de-grund text-xl'>Don't have an account?
             <Link to={`/kasspas-key?my_user_name=${user_name}`}><span className='underline'>Sign Up</span></Link> </p>

          </div>
                <form className="space-y-4 md:space-y-6 " onSubmit={authenticateWebAuthn}>
                
                    <div className='flex flex-col relative'>
                    <p className='handlee-regular  text-rose-800 
                                               tracking-widest text-xl'> { seeError && registrationError}</p>
                        <label htmlFor="email" className="block mb-2  playwrite-de-grund text-xl 
                         text-gray-900 ">Your username</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <motion.input
                           
                  onChange={  (e)=> {
                    handleChange(e)
                    emailValue.set(e.target.value)
                  } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="user_name"  value={user_name} id="user_name" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />
  
                    </div>




                    <div>
                        {/* <label htmlFor="number" className="block mb-2 playwrite-de-grund text-lg 
                         text-gray-900 ">Your Phone Number</label> */}
                        {/* <PhoneInput value={phone}
        onChange={setPhone}   type="text" name="email" id="email" className="border  focus:border-2
        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
        sm:text-lg border-black
         block w-full p-2.5  focus:border-green-700
                            "
  
                            /> */}

  
                    </div>


                    
                    {/* <div className="flex items-start">
                        <div className="flex items-center h-5">
                         <p className='playwrite-de-grund  text-black underline decoration-2 hover:no-underline
                          cursor-pointer'>
                          Recover Your Account</p>
                        
                        </div>
                    </div> */}
  

                    <IoArrowUndoSharp className='w-10 h-10 cursor-pointer text-white' onClick={handleGoBack}/>

                    <div className='flex justify-center'>
                    <button type='submit
                    ' className="btn btn-active
                     playwrite-de-grund
                  bg-green-700
                       text-white
                    ">Login
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}
                    alt="reload" />
                  </button>  
                    </div>
  
                 
                </form>
            </div>
        </div>
    </div>
    
  </section>
</>





  )
}

export default PasskeySignin
