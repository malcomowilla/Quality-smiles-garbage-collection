
import { RiArrowGoBackFill } from "react-icons/ri";
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import {useState, useEffect, useCallback} from 'react'
import PasswordConfirmationAlert from '../Alert/PasswordConfirmationAlert'
import PasswordSuccesfulAlert from '../Alert/PasswordSuccesfulAlert'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import ExpiredPasswordAlert from '../Alert/ExpiredPasswordAlert'
import FailedPassword from '../Alert/FailedPassword'
import {useApplicationSettings} from '../settings/ApplicationSettings'




const ResetPassword = () => {

    const navigate = useNavigate()
    
    // const { token } = useParams();
    const { search } = useLocation()
    const token = new URLSearchParams(search).get('token');
    const {adminFormSettings, materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets} = useApplicationSettings()
  
    const {enable_2fa_for_admin_passkeys} = adminFormSettings


    const [loading, setloading] = useState(false)
    const [password, setPassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')


const [isSeenPassWord,  setIsSeenPassword] = useState(false)
const [isSeenPassWord2,  setIsSeenPassword2] = useState(false)
const [openConfirmationAlert, setopenConfirmationAlert] = useState(false)
const [passwordConfirmationError, setpasswordConfirmationError] = useState('')
const [seepasswordConfirmationError, setseepasswordConfirmationError] = useState(false)
const [expiredPassword, setexpiredPassword] = useState('')
const [seexpiredPassword, setseeexpiredPassword] = useState(false)
const [passwordError, setpasswordError] = useState('')
const [seepasswordError, setseepasswordError] = useState(false)
const [passwordSuccesful, setpasswordSuccesful] = useState('')
const [seepasswordSuccesful, setseepasswordSuccesful] = useState(false)
const [openPasswordSuccess, setopenPasswordSuccess] = useState(false)
const [done, setDone] = useState(false)
const [openLoad, setOpenLoad] = useState(false);
const [openexpiredAlert, setopenexpiredAlert] = useState(false)
const [openFailedPasswordAlert, setopenFailedPasswordAlert] = useState(false)


const handleCloseFailedPasswordAlert = ()=> {
  setopenFailedPasswordAlert(false)
}




const handleCloseexpiredAlertAlert = ()=> {
  setopenexpiredAlert(false)
}

const handleClosePasswordSuccess = ()=> {
  setopenPasswordSuccess(false)
}

const handleCloseConfirmationAlert = ()=> {
  setopenConfirmationAlert(false)
}



    const handleGoBack = ()=> {
        navigate(-1)
    }
   




    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 9000);
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
           const response = await fetch(`/api/allow_get_admin_settings?${new URLSearchParams(requestParams)}`, {
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
    




      const handleResetPassword = async(e)=> {
        e.preventDefault()
        try {
          setloading(true)
          setOpenLoad(true)
          const response = await fetch('api/password_reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password,
              password_confirmation,
              token,

            })
            
          })

          const newData = await response.json()
              if (response.ok) {

                setseepasswordConfirmationError(false)
                setseeexpiredPassword(false)
                setseepasswordError(false)
                setseepasswordSuccesful(true)
                setpasswordSuccesful(newData.message)
                setloading(false)
                setopenPasswordSuccess(true)
                setTimeout(() => {
                  setDone(true)

                  setTimeout(() => {

                    if ( enable_2fa_for_admin_passkeys ===  true  || enable_2fa_for_admin_passkeys === 'true') {
                      navigate('/signup2fa_passkey')
                    }else{
                      navigate('/signin')
                    }
                    
                  }, 2000);
                   
                  
                }, 3000);



               


              } else {
                setloading(false)
                setopenConfirmationAlert(true)
                setseepasswordConfirmationError(true)
                setseeexpiredPassword(true)
                setseepasswordError(true)
                setopenexpiredAlert(true)
                setopenFailedPasswordAlert(true)
                setpasswordConfirmationError(newData.error)
                setseepasswordSuccesful(false)
                setexpiredPassword(newData.error)
                setpasswordError(newData.error)
              }
        } catch (error) {
          setloading(false)
          setseeexpiredPassword(false)
          setseepasswordSuccesful(false)
          setseepasswordConfirmationError(false)
          setseepasswordError(false)
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

  const defaultOptions2 = {
    loop: true,
    autoplay: true, 
    animationData: AnimationDone,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
    <PasswordConfirmationAlert openConfirmationAlert={openConfirmationAlert} 
    handleCloseConfirmationAlert={handleCloseConfirmationAlert} passwordConfirmationError={passwordConfirmationError} 
    seepasswordConfirmationError={seepasswordConfirmationError} expiredPassword={expiredPassword} 
    seexpiredPassword={seexpiredPassword} passwordError={passwordError} seepasswordError={seepasswordError}/>
    
<PasswordSuccesfulAlert handleClosePasswordSuccess={handleClosePasswordSuccess} openPasswordSuccess={openPasswordSuccess} 
            seepasswordSuccesful={seepasswordSuccesful} passwordSuccesful={passwordSuccesful}/>

<ExpiredPasswordAlert expiredPassword={expiredPassword} seexpiredPassword={seexpiredPassword} openexpiredAlert={openexpiredAlert}
handleCloseexpiredAlertAlert={handleCloseexpiredAlertAlert}/>


<FailedPassword passwordError={passwordError} seepasswordError={seepasswordError} openFailedPasswordAlert={openFailedPasswordAlert}
 handleCloseFailedPasswordAlert={handleCloseFailedPasswordAlert}

 />

{loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }

    <section    className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
       ">

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className='mb-9'>
              <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
           <p className='text-black playwrite-de-grund  text-4xl '>Quality Smiles </p>    
        </a>
              </div>
      
      
        
        <div className="  rounded-lg shadow-2xl    md:mt-0 sm:max-w-[40rem] xl:p-0  w-full">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Reset Password
                </h1>
                           
              
                <form className="space-y-4 md:space-y-6"  onSubmit={handleResetPassword}>
                
                <div className='flex flex-col relative'>
                    <div className='absolute self-end bottom-0 p-2 text-black cursor-pointer'  onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
                  <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                        <label htmlFor="password" className="block mb-2   playwrite-de-grund text-lg
                         text-black"> Password</label>
                        <input  value={password}   onChange={(e)=> setPassword(e.target.value)}  
                          type={isSeenPassWord  ? 'text' : 'password'} name="password" id="password" className=" border  focus:border-2
                          text-black  playwrite-de-grund    w-full sm:text-lg rounded-lg 
                          focus:ring-green-400 
                           border-black
                           block  p-2.5  focus:border-green-700
                            "/>
                    </div>




                    
                    <div className='flex flex-col relative'>
                    <div className='absolute self-end bottom-0 p-2 text-black cursor-pointer'  
                    onClick={()=> setIsSeenPassword2(!isSeenPassWord2)}>
                  <ion-icon  name={isSeenPassWord2 ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                        <label htmlFor="password" className="block mb-2   playwrite-de-grund text-lg
                         text-black">Repeat Password</label>
                        <input onChange={(e)=>setpassword_confirmation(e.target.value)} 
                        value={password_confirmation}      type={isSeenPassWord2  ? 'text' : 'password'} name="password_confirmation
                        " id="password_confirmation" className=" border  focus:border-2
                          text-black  playwrite-de-grund    w-full sm:text-lg rounded-lg 
                          focus:ring-green-400 
                           border-black
                           block  p-2.5  focus:border-green-700
                            "/>
                    </div>
                    
                    <div className="flex items-start">
                        
                        <div  onClick={handleGoBack} className="ml-3 text-xl handlee-regular cursor-pointer text-black ">
                         
                       <RiArrowGoBackFill />
                       <p className='font-bold'>Go Back</p>
                        </div>
                    </div>
  
                    <div className='flex justify-center'>
                    <button type='submit' disabled={loading} className="btn btn-active ">Submit Password
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${loading ? 'animate-spin' : 'hidden'}`} 
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

export default ResetPassword

