import {Link, useNavigate} from  'react-router-dom'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { useState } from 'react';

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import SignupAlert from '../Alert/SignupAlert'







const Signup = () => {
  const {isSeenPassWord,  setIsSeenPassword, signupFormData, handleFormDataChange, setPhone,
     phone,isloading, registrationError, setRegistrationError,setSignupFormData,
    setloading, open, setOpen,handleClose, seeError, setSeeError  } = useApplicationSettings()
const {email, password,  password_confirmation, user_name}= signupFormData
const navigate = useNavigate()


const handleSignUp = async (e) => {
 

    e.preventDefault()
    
  try {
    setloading(true)
  
    const users = await fetch('api/signup-admin', {
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
      setOpen(true)
      setSeeError(false)
      setSignupFormData('')
    console.log(actualUserDataInJson)
  setTimeout(() => {
    navigate('/signin')
  }, 7000);
  // return redirect('/signin')
      // localStorage.setItem("jwt", actualUserDataInJson.jwt);
      // console.log(actualUserDataInJson)
  
    } else {
        setloading(false)
        console.log('sigup  failed')
        setOpen(false)
        console.log(actualUserDataInJson.errors)
        setRegistrationError(actualUserDataInJson.errors)
        setSeeError(true)
    }   

  } catch (error) {
    console.log(error.name === 'AbortError');
    setloading(false)
    setOpen(false)
    setSeeError(false)
  }
  }

  return (
<section className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1  max-sm:grid-cols-1  max-sm:bg-small-screens max-md:bg-small-screens md:bg-small-screens ">
      
      <SignupAlert  open={open} handleClose={handleClose}/>
  <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
      <a href="#" className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-20 h-20 mr-2 rounded-full " src="/images/logo/logo-small.png" alt="logo"/>
         <p className='text-white text-5xl handlee-regular '>Quality Smiles </p>    
      </a>
      <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
        
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:bg-white rounded-lg">
              <h1 className="text-xl font-bold leading-tight handlee-regular  tracking-wide  text-white md:text-2xl ">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={handleSignUp}>
              
                  <div className='flex flex-col relative'>
                      <label htmlFor="email" className="block mb-2 text-2xl handlee-regular  text-white ">Your email</label>
                      <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>
                     <p className='handlee-regular text-rose-800 tracking-widest text-lg uppercase'> {seeError && registrationError.email} </p>


                      <input type="email" value={email}  onChange={handleFormDataChange} name="email" id="email" className="border
                       bg-transparent  focus:border
                        text-white  rounded-lg focus:ring-green-400 handlee-regular sm:text-lg  border-black
                         block w-full p-2.5  focus:border-green-700
                          "
                          
                          />

                  </div>









                  <div>
                      <label  className="block mb-2   text-white handlee-regular text-2xl">Your PhoneNumber</label>
                      <PhoneInput       
     value={phone}
        onChange={setPhone}
          
            name="phone_number" id="phone_number" className=" border  focus:border-2
                        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
                        sm:text-lg border-black
                         block w-full p-2.5  focus:border-green-700
                          "

                          />

                  </div>



                  <div className='flex flex-col relative'>
                  <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-username-64.png"  className='w-8 h-8' alt="username" />

                      </div>
                      <label htmlFor="user_name" className="block mb-2 text-2xl handlee-regular text-white ">Your Username</label>
                     <p className='handlee-regular uppercase text-rose-800 tracking-widest text-lg'>{ seeError && registrationError.user_name}</p> 

                      <input value={user_name}  onChange={handleFormDataChange} type="text" name="user_name"  className=" border  
                      focus:border
                        text-white  handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black
                         block w-full p-2.5  focus:border-green-700
                          "

                          />

                  </div>



                  <div className='flex flex-col relative'>
                  <div className='absolute self-end bottom-0 p-2'  onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
                  <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                      <label htmlFor="password" className="block mb-2 text-2xl handlee-regular font-medium text-white">
                        Password</label>
                      <p   className='handlee-regular uppercase text-rose-800 tracking-widest text-lg'>{ seeError && registrationError.password}</p>    

                      <input  value={password}   
                       onChange={handleFormDataChange}  
                          type={isSeenPassWord  ? 'password' : 'text'} name="password" id="password"className=" border  focus:border-2
                        text-white  handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black
                         block w-full p-2.5  focus:border-green-700
                          "/>
                  </div>



                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-2xl handlee-regular font-medium text-white
                       ">Confirm password</label>
                                            
                                               <p className='handlee-regular uppercase text-rose-800 
                                               tracking-widest text-lg'> { seeError && registrationError.password_confirmation}</p>   

                      <input  value={password_confirmation}  onChange={handleFormDataChange}  type="password"
                       name="password_confirmation" id="password_confirmation"
                      className=" border  focus:border-2
                      text-white  handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black
                       block w-full p-2.5  focus:border-green-700
                        "
                        />
                  </div>
                

                  <div className='flex justify-center'>
                  <button type='submit' className="btn btn-success ">Create Account
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
                  </button>

                  </div>

                  <p className="text-lg font-extrabold text-white ">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline 
                      dark:text-primary-500"><Link  className='underline'  to='/signin'>Login here</Link></a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Signup