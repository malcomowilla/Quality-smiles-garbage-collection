import {Link, useNavigate} from  'react-router-dom'
import {useState} from 'react'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { motion ,  useMotionValue, useTransform } from "framer-motion"

import {useApplicationSettings} from '../settings/ApplicationSettings'









const SignIn = () => {

  const {isSeenPassWord,  setIsSeenPassword,  setPhone, phone, signupFormData,isloading, handleFormDataChange,
    seeError, setSeeError, registrationError,
    setRegistrationError,
    setloading,} = useApplicationSettings()

  const {email, password, }= signupFormData
  const navigate = useNavigate()

  const [emailFocused, setEmailFocused] = useState(false);


  const emailValue = useMotionValue(email)
  const passwordValue = useMotionValue(password)

  const emailWidth = useTransform(emailValue, value => value ? '400px' : '300px');
  const passwordWidth = useTransform(passwordValue, value => value ? '400px' : '300px');

  const handleSignIn = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
  
    const users = await fetch('api/login-admin', {
      method: "POST",
      headers: {
  
        "Content-Type": "application/json",
      }, 
      credentials: 'include', // Include cookies in the request
  
  
      body: JSON.stringify(signupFormData),
  
    },
  
  
  
    )
    
  
  
    let  actualUserDataInJson = await users.json()
  
    if (users.ok) {
      // const actualUserDataInJson = await users.json
      setloading(false)
    console.log(actualUserDataInJson)
  navigate('/admin/location')
  setSeeError(false)
  // return redirect('/signin')
     
  
    } else {
        setloading(false)
        console.log('sigup  failed')
        setRegistrationError(actualUserDataInJson.error)
        setSeeError(true)
    }   

  } catch (error) {
    console.log(error.name === 'AbortError');
    setloading(false)
    setSeeError(false)
  }
  }

  return (
    <section    className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
     bg-small-screens2   ">

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className='mb-9'>
              <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
           <p className='text-black handlee-regular  text-4xl '>Quality Smiles </p>    
        </a>
              </div>
      
        <h2 className=" text-2xl  leading-tight tracking-widest text-wrap handlee-regular   font-bold mb-4 text-gray-900    ">
          Sign-In to your account and start managing your organization

          </h2>
        
        <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  ">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  handlee-regular  tracking-tight text-gray-900 md:text-2xl ">
                    Login Into Your Account 
                </h1>
                <div className='flex flex-row '>
          <p className='text-black handlee-regular text-xl'>Don't have an account? <Link to='/signup'><span className='underline'>Sign Up</span></Link> </p>

          </div>
                <form className="space-y-4 md:space-y-6 " onSubmit={handleSignIn }>
                
                    <div className='flex flex-col relative'>
                    <p className='handlee-regular  text-rose-800 
                                               tracking-widest text-xl'> { seeError && registrationError}</p>
                        <label htmlFor="email" className="block mb-2  handlee-regular text-xl font-extrabold 
                         text-gray-900 ">Your email</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <motion.input
                           
                  type="email"
                  onChange={  (e)=> {
                    handleFormDataChange(e)
                    emailValue.set(e.target.value)
                  } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="email"  value={email} id="email" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />
  
                    </div>




                    <div>
                        <label htmlFor="number" className="block mb-2  handlee-regular text-lg font-extrabold 
                         text-gray-900 ">Your Phone Number</label>
                        <PhoneInput value={phone}
        onChange={setPhone}   type="text" name="email" id="email" className="border  focus:border-2
        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
        sm:text-lg border-black
         block w-full p-2.5  focus:border-green-700
                            "
  
                            />
  
                    </div>


                    <div className='flex flex-col relative'>
                    <div className='absolute self-end bottom-0 p-2 text-white'  onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
                  <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                        <label htmlFor="password" className="block mb-2  font-extrabold   handlee-regular text-lg
                         text-black">Password</label>
                        <motion.input       transition={{duration:5, ease: "easeOut",
  }}   onChange={(e)=>{
    handleFormDataChange(e)
    passwordValue.set(e.target.value)
  }} value={password} type={isSeenPassWord  ? 'password' : 'text'} name="password" id="password"className=" border  focus:border-2
                          text-white  handlee-regular   transition-all duration-1000 sm:text-lg rounded-lg 
                          focus:ring-green-400 bg-transparent
                           border-black
                           block  p-2.5  focus:border-green-700
                            "/>
                    </div>
                    
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <motion.input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border
                           border-gray-300
                           rounded
                           bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
                            dark:border-gray-600 dark:focus
                           :ring-primar
                           y-600 dark:ring-offset-gray-800"/>
                        </div>
                        <div className="ml-3 text-lg handlee-regular ">
                          <label htmlFor="terms" className="font-light text-black">Remember Me 
                          </label>
                        </div>
                    </div>
  
                    <div className='flex justify-center'>
                    <button type='submit' className="btn btn-outline btn-success ">Login
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
                  </button>  
                    </div>
  
                 
                </form>
            </div>
        </div>
    </div>
    
  </section>
  )
}

export default SignIn
