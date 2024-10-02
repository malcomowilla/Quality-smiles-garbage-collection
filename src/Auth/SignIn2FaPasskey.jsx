import {Link, useNavigate, useParams, useLocation} from  'react-router-dom'
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
import LogoutSuccess from '../Alert/LogoutSuccess'
import OtpSentSmsAlert from '../Alert/OtpSentSmsAlert'
import OtpSentEmailAlert from '../Alert/OtpSentEmailAlert'
import LogoutSession from '../Alert/LogoutSession'

// openLogoutSession, handleCloseLogoutSession,LogoutSession

// OtpSentEmailAlert openOtpSentEmailAlert, handleCloseOtpSentEmailAlert



const SignIn2FaPasskey = () => {

  const {isSeenPassWord,  setIsSeenPassword,  setPhone, phone,isloading, signinFormData,
    handleFormDataChangeSignin,
    seeError, setSeeError, registrationError,
    setRegistrationError,
    setloading, adminFormSettings, handleChangePhoneNumber, admin, setAdmin,adminPermission, 
    setAdminPermission, fetchCurrentUser, setTheme,  openLogoutSuccess,handleCloseLogoutSuccess,
    handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
    setopenLoginSuccess,user,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,user_name,
       openLogoutSession, handleCloseLogoutSession
 } = useApplicationSettings()






const {setUser, isUserLogedIn, setIsUserLoggedIn} = useAuth()
// const {login_with_otp, login_with_web_auth} = adminFormSettings
  const {email, password,phone_number } = signinFormData
  const navigate = useNavigate()

  const [emailFocused, setEmailFocused] = useState(false);
  const [done, setDone] = useState(false)
  
  const emailValue = useMotionValue(email)
  const passwordValue = useMotionValue(password)

  const emailWidth = useTransform(emailValue, value => value ? '350px' : '400px');
  const passwordWidth = useTransform(passwordValue, value => value ? '300px' : '350px');

  const [openLoad, setOpenLoad] = useState(false);
  const [otpSent, setotpSent] = useState(false)
const [otp, setOtp] = useState('')
const [openOtpInvalid, setopenOtpInvalid] = useState(false)
const [openOtpSentAlert, setopenOtpSentAlert] = useState(false)
const [openOtpSentEmailAlert, setopenOtpSentEmailAlert] = useState(false)


const {login_with_otp,  enable_2fa_for_admin_passkeys, login_with_web_auth, login_with_otp_email, send_password_via_sms,
  check_is_inactive, check_inactive_hrs,check_inactive_days, check_inactive_minutes,enable_2fa_for_admin
} = adminFormSettings







const handlegetAdminSettings = useCallback(
  async()=> {
     
       

     try {
       const response = await fetch(`/api/allow_get_admin_settings`, {
       method: 'GET',

       
       headers: {
         "Content-Type"  : 'application/json'
       },
       })



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
      console.log('enable_2fa_for_admin_passkeys2', enable_2fa_for_admin_passkeys)
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






const  handleCloseOtpSentEmailAlert = ()=>{
  setopenOtpSentEmailAlert(false)
}






const handleCloseOtpSentAlert = ()=> {
  setopenOtpSentAlert(false)
}

// const storedDataJson = localStorage.getItem("admin settings");
// const storedData = storedDataJson ? JSON.parse(storedDataJson) : {};         
//   const login_with_otp = storedData.login_with_otp 
//  const login_with_web_auth = storedData.login_with_web_authn 
// const login_with_otp_email = storedData.login_with_otp_email  
// const enable_2fa_for_admin = storedData.enable_2fa_for_admin
// const enable_2fa_for_admin_passkeys = storedData.enable_2fa_for_admin_passkeys




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
  // navigate(-1)
  setotpSent(false)
}


useEffect(() => {
  setIsUserLoggedIn(true)
}, [setIsUserLoggedIn]);

// api/login-admin

// https://quality-smile-garbabe-collection-backend-1jcd.onrender.com/login-admin



useEffect(() => {
  
  setRegistrationError('')
}, [setRegistrationError]);




// useEffect(() => {
  
// if (enable_2fa_for_admin === true || enable_2fa_for_admin === 'true') {
//   localStorage.setItem('acha umbwakni', false);
// }
//   return () => {
    
//   };
// }, []);


const signedWithPasskey = JSON.parse(localStorage.getItem('passkey') )
console.log('signedWithPasskey',signedWithPasskey)


console.log('enable_2fa_for_admin_passkeys', enable_2fa_for_admin_passkeys)

  const handleSignIn = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
    setOpenLoad(true)
    setDone(false)
    const users = await fetch('api/login-admin', {
      method: "POST",
      headers: {
  
        "Content-Type": "application/json",
      }, 
      credentials: 'include', // Include cookies in the request
  
      
      body: JSON.stringify({...signinFormData, login_with_web_auth, login_with_otp, enable_2fa_for_admin, login_with_otp_email}),
  
    },
  
  
  
    )
    
  
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      
      
      // const actualUserDataInJson = await users.json
      setloading(false)
    // setUser(actualUserDataInJson.admin)
    setAdmin(true)
    
    localStorage.setItem('passkey', true)

if (enable_2fa_for_admin_passkeys === true || enable_2fa_for_admin_passkeys === 'true') {
 
  // navigate(`/kasspass-key-signin?my_user_name=${user_name}`)

  navigate(`/kasspass-key-signin`)

//  if (signedWithPasskey === 'true' || signedWithPasskey === true ) {
  
//   navigate(`/kasspass-key-signin?my_user_name=${user_name}`)
//  }else{
//   navigate('/kasspas-key')
//  }
  
}
    

  
  setSeeError(false)
  // return redirect('/signin')
     
  
    } else {
        setloading(false)
        console.log('signin  failed')
        setRegistrationError(actualUserDataInJson.error)
        setSeeError(true)
        // setSigninFormData({})
    }   

  } catch (error) {
    console.log(error.name === 'AbortError');
    setloading(false)
    setSeeError(false)
    // setSigninFormData('')
  }
  }






  return (
    <>

<LogoutSession  openLogoutSession={openLogoutSession} handleCloseLogoutSession={handleCloseLogoutSession}/>

<OtpSentEmailAlert  openOtpSentEmailAlert={openOtpSentEmailAlert}  handleCloseOtpSentEmailAlert={handleCloseOtpSentEmailAlert}/>
    <OtpSentSmsAlert handleCloseOtpSentAlert={handleCloseOtpSentAlert}   openOtpSentAlert={openOtpSentAlert}
    />
    <LogoutSuccess openLogoutSuccess={openLogoutSuccess} handleCloseLogoutSuccess={handleCloseLogoutSuccess} />

    

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
          Sign-In to your account and start managing your organization

          </h2>
        
        <div className="rounded-lg shadow   md:mt-0 sm:max-w-[40rem] xl:p-0 ">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Login Into Your Account 
                </h1>
             
                <form className="space-y-4 md:space-y-6 " onSubmit={handleSignIn}>
                
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
                    handleFormDataChangeSignin(e)
                    emailValue.set(e.target.value)
                  } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="email"  value={email} id="email" 
                        className={` border  focus:border-2 
                          text-white  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />
  
                    </div>



{enable_2fa_for_admin === true || enable_2fa_for_admin === 'true' ? (
   <div>
   <label htmlFor="number" className="block mb-2 playwrite-de-grund text-lg 
    text-gray-900 ">Your Phone Number</label>
   {/* <PhoneInput value={phone}
onChange={setPhone}   type="text" name="email" id="email" className="border  focus:border-2
text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
sm:text-lg border-black
block w-full p-2.5  focus:border-green-700
       "

       /> */}


<input value={phone_number}
onChange={handleChangePhoneNumber}   type="text" name="phone_number" id="phone_number" className="border  focus:border-2
text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
sm:text-lg border-black
block w-full p-2.5  focus:border-green-700
       "

       />

</div>

): '' }
                   
                   {/* type={isSeenPassWord  ? 'password' : 'text'} */}
                    <div className='flex flex-col relative'>
                    <div className='absolute self-end bottom-0 p-2 text-white' 
                     onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
                  <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                        <label htmlFor="password" className="block mb-2   playwrite-de-grund text-lg
                         text-black">Password</label>
                        <motion.input       transition={{duration:5, ease: "easeOut",
  }}   onChange={(e)=>{
    handleFormDataChangeSignin(e)
    passwordValue.set(e.target.value)
  }} value={password} type='password' name="password" id="password"className="border 
   focus:border-2
                          text-white  handlee-regular   transition-all duration-1000 sm:text-lg rounded-lg 
                          focus:ring-green-400 bg-transparent
                           border-black
                           block  p-2.5  focus:border-green-700
                            "/>
                    </div>
                    
                       
                        <div className="ml-3 text-lg handlee-regular flex gap-x-7">
                          
                          <Link to='/forgot_password'> <p className='text-lg tracking-wide font-bold 
                          underline text-white
                          '>Forgot your password?</p></Link>
                        </div>
                        
  {!enable_2fa_for_admin_passkeys ? (
     <div>
     <Link  className='text-white font-extrabold  text-lg tracking-wider handlee-regular
      underline' to='/kasspass-key-signin'>login with passkey? </Link>
   </div>
  ) : ''}
       

                    <div className='flex justify-center'>
                    <button type='submit' className="btn btn-active ">Login
                  
                  <img src="/images/logo/iconsreload2.png"  
                  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
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

export default SignIn2FaPasskey



