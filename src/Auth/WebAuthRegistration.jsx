import {Link, useNavigate, useLocation} from  'react-router-dom'
import {useState, useEffect} from 'react'

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







const WebAuthRegistration = () => {

  const { setPhone, phone, isloading,
    
    setloading, 
     setAdmin, adminFormSettings} = useApplicationSettings()



console.log('adminset',adminFormSettings)



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

const {email,phone_number, user_name }= signupFormData

const emailValue = useMotionValue(email)

  const emailWidth = useTransform(emailValue, value => value ? '350px' : '400px');
  const { search } = useLocation()
    const my_email = new URLSearchParams(search).get('email');
    const my_user_name = new URLSearchParams(search).get('user_name');
    console.log('my email:', my_email)
    console.log('my username:', my_user_name)
const  handleCloseOtpInvalid = ()=> {
  setopenOtpInvalid(false)
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

  const response = await fetch('/api/webauthn/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ my_email, my_user_name })
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

  function base64UrlToBase64(base64Url) {
    return base64Url.replace(/_/g, '/').replace(/-/g, '+');
  }

  if (typeof options.user.id === 'string') {
    options.user.id = Uint8Array.from(atob(base64UrlToBase64(options.user.id)), c => c.charCodeAt(0));
  }

  if (typeof options.challenge === 'string') {
    options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  }


  // if (options.allowCredentials) {
  //   options.allowCredentials = options.allowCredentials.map(cred => ({
  //     ...cred,
  //     id: Uint8Array.from(atob(base64UrlToBase64(cred.id)), c => c.charCodeAt(0))
  //   }));
  // }

  if (typeof options.challenge === 'string') {
    options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
  }


  // const publicKey = {
  //   ...options,
  //   challenge: base64UrlToUint8Array(options.challenge),
  //   allowCredentials: options.allowCredentials.map(cred => ({
  //     ...cred,
  //     id: base64UrlToUint8Array(cred.id)
  //   }))
  // };


  try {
    // const credentialSignin = await navigator.credentials.get({ publicKey: options });
    const credential = await navigator.credentials.create({ publicKey: options });


    // Prepare the credential response
    const credentialJson = {
      // id: credential.id,
      // rawId: arrayBufferToBase64Url(credential.rawId),
      // type: credential.type,
      // response: {
      //   clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON),
      //   authenticatorData: arrayBufferToBase64Url(credential.response.authenticatorData),
      //   signature: arrayBufferToBase64Url(credential.response.signature),
      //   userHandle: arrayBufferToBase64Url(credential.response.userHandle)
      // }

      id: credential.id,
      rp: {
        name: "quality-smiles",
      },
      origin: 'http://localhost:5173',
      rawId: arrayBufferToBase64Url(credential.rawId),
      type: credential.type,
      response: {
        attestationObject: arrayBufferToBase64Url(credential.response.attestationObject),
        clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON)
      },


    };


    

    const createResponse = await fetch('/api/webauthn/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: credentialJson, my_email, my_user_name })
    });



    if (createResponse.ok) {
      setTimeout(() => {
        setDone(true);
        setloading(false);



        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }, 5000);
    } else {
      setloading(false);
      // setRegistrationError(options.errors);
      setOpenLoad(false);
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


  

  return (
    <>

    


{isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }
    <section    className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
     bg-small-screens2   ">

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className='mb-9'>
              <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
           <p className='text-black playwrite-de-grund  text-4xl '>Quality Smiles </p>    
        </a>
              </div>
      
        <h2 className=" text-2xl  leading-tight tracking-tight text-wrap playwrite-de-grund   font-bold mb-4 text-gray-900    ">
          Enter With Passkeys

          </h2>
        
        <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  ">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Enter Into Your Account 
                </h1>
                <div className='flex flex-row '>

          </div>
                <form className="space-y-4 md:space-y-6 " onSubmit={authenticateWebAuthn}>
                
                    <div className='flex flex-col relative'>
                    <p className='handlee-regular  text-rose-800 
                                               tracking-widest text-xl'> { seeError && registrationError}</p>
                        <label htmlFor="email" className="block mb-2  playwrite-de-grund text-xl 
                         text-gray-900 ">Your email</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <motion.input
                           
                  type="email"
                  onChange={  (e)=> {
                    handleChange(e)
                    emailValue.set(e.target.value)
                  } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="email"  value={my_email} id="email" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />

<label htmlFor="email" className="block mb-2  playwrite-de-grund text-xl 
                         text-gray-900 ">Your User Name</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <motion.input
                           
                  onChange={  (e)=> {
                    handleChange(e)
                  } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="user_name"  value={my_user_name} id="user_name" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />


                            





  
                    </div>




                  
                    
                   
  

                    <IoArrowUndoSharp className='w-10 h-10 cursor-pointer text-white' onClick={handleGoBack}/>

                    <div className='flex justify-center'>
                    <button type='submit' className="btn btn-active ">Continue
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
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

export default WebAuthRegistration
