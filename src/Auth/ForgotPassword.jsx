import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";
import {useApplicationSettings} from '../settings/ApplicationSettings'

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'
import EmailSentForgotPasswordAlert from '../Alert/EmailSentForgotPasswordAlert'
import EmailSentAlertError from '../Alert/EmailSentAlertError'

 
const ForgotPassword = () => {

   
    const {handleChangeResetPasswordPhoneNumber, handleChangeResetPassword, resetPasswordForm,
       setResetPasswordForm} = useApplicationSettings()
    const [isSeenPassWord,  setIsSeenPassword] = useState(false)
    const {email, phone_number} = resetPasswordForm
    const [loading, setloading] = useState(false)
    const [done, setDone] = useState(false)
  const [openLoad, setOpenLoad] = useState(false);
  const [openEmailSent, setopenEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [seeEmailError, setSeeEmailError] = useState(false)
const [openEmailSentError, setopenEmailSentError] = useState(false)





        const handleCloseEmailSentError = ()=> {
          setopenEmailSentError(false)
        }



    const navigate = useNavigate()



        const handleCloseEmailSent = ()=> {
          setopenEmailSent(false)
        }

    const handleGoBack = ()=> {
        navigate(-1)
    }



    const handleForgotPassword = async(e)=> {
      e.preventDefault()
      try {
        setloading(true)
        setOpenLoad(true)
    setDone(false)
        const response = await fetch('/api/password_forgotten', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },

          body: JSON.stringify(resetPasswordForm)
        })

        const newData = await response.json()
        if (response.ok) {
          setopenEmailSent(true)
          setTimeout(() => {
            setDone(false);
            
            setloading(false);
            setTimeout(() => {
             
            }, 2000);
          }, 2500);
        } else {
          setloading(false)
          setSeeEmailError(true)
          setEmailError(newData.error)
          setopenEmailSentError(true)
        }
      } catch (error) {
        console.log(error)
        setloading(false)
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
        


  {loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
  
  {done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    
    <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
      
       </Backdrop> }
<EmailSentForgotPasswordAlert  handleCloseEmailSent={handleCloseEmailSent} openEmailSent={openEmailSent}/>
        <EmailSentAlertError handleCloseEmailSentError={handleCloseEmailSentError} openEmailSentError={openEmailSentError}
        
        emailError={emailError} seeEmailError={seeEmailError}/>
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
      
      
        
        <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  w-full">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Reset Password
                </h1>
                            <div className='max-w-sm space-y-6 text-black playwrite-de-grund text-lg'>
                            <p>Please provide your email below so we send you the reset link.</p>
                            <p>If an account exists with the provided email, you will receive a password recovery email.</p>
                            </div>
              
                <form className="space-y-4 md:space-y-6 " onSubmit={handleForgotPassword}>
                
                    <div className='flex flex-col relative'>
                    <p className='handlee-regular  text-rose-800 
                                               tracking-widest text-xl'> </p>
                        <label htmlFor="email" className="block mb-2  playwrite-de-grund text-xl 
                         text-gray-900 ">Your email</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <input
                        value={email}
                           onChange={handleChangeResetPassword}
                  type="email"
                  
                name="email"  id="email" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />
  
                    </div>




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


<input onChange={handleChangeResetPasswordPhoneNumber}
value={phone_number}
          type="text" name="phone_number" id="phone_number" className="border  focus:border-2
        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
        sm:text-lg border-black
         block w-full p-2.5  focus:border-green-700
                            "
  
                            />
  
                    </div>


                  
                    
                    <div className="flex items-start">
                        
                        <div  onClick={handleGoBack} className="ml-3 text-xl handlee-regular cursor-pointer text-black ">
                         
                       <RiArrowGoBackFill />
                       <p className='font-bold'>Go Back</p>
                        </div>
                    </div>
  
                    <div className='flex justify-center'>
                    <button type='submit' className="btn btn-active ">Reset Password
                  
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

export default ForgotPassword







































