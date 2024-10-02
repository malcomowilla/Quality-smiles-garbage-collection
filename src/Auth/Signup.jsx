import { Link, useNavigate } from 'react-router-dom';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { useState, useEffect, useCallback } from 'react';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SignupAlert from '../Alert/SignupAlert';
import { useNetworkState } from 'react-use';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import AnimationDone from '../animation/done_tick-animation.json'


const Signup = () => {
  const network = useNetworkState();

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

  const {
    isSeenPassWord,
    setIsSeenPassword,
    signupFormData,
    handleFormDataChange,
    setPhone,
    phone,
    setSignupFormData,
    setloading,
    open,
    setOpen,
    handleClose,
    
    handleChangePhoneNumber,
    imagePreview,
    setUpdateFormData,setImagePreview,updateFormData

  } = useApplicationSettings();
  const { email, password, password_confirmation, user_name, phone_number } = signupFormData;
  const navigate = useNavigate();
  const [screenload, setscreenload] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [done, setDone] = useState(false)
 const [isloading, setisloading] = useState(false)
 const [registrationError, setRegistrationError] = useState('')
const [seeError, setSeeError] = useState(false)
const [ isSeenPassWord1,setIsSeenPassword1] = useState(false)
  






  useEffect(() => {
    setscreenload(true);
  }, []);


  // api/signup-admin





  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setisloading(true);
      setOpenLoad(true)
      setDone(false)
      const users = await fetch('api/signup-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...signupFormData, phone}),
      });

      let actualUserDataInJson = await users.json();

      if (users.ok) {
        setOpen(true);
        setSeeError(false);
        setSignupFormData('');
        console.log(actualUserDataInJson);
 
  

  setTimeout(() => {
    setDone(true);
    setloading(false);
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  }, 5000);
 

       



      } else {
        setisloading(false);
        console.log('signup failed');
        setOpen(false);
        console.log(actualUserDataInJson.errors);
        setRegistrationError(actualUserDataInJson.errors);
        setSeeError(true);
      }
    } catch (error) {
      console.log(error.name === 'AbortError');
      setisloading(false);
      setOpen(false);
      setSeeError(false);
    }
  };



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
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
     


{/* 
     {isloading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          {!done ? (
            <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
          ) : (
            <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
          )}
        </Backdrop>
      )} */}







{isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
<Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
}

{done  &&  <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions2} height={400} width={400} />
    
     </Backdrop> }

        <section
          className="bg-gray-50 h-screen relative z-50 grid 
        xl:grid-cols-1 max-sm:grid-cols-1 max-sm:bg-small-screens max-md:bg-small-screens md:bg-small-screens"
        >
          <SignupAlert open={open} handleClose={handleClose} />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-2 text-2xl font-semibold text-white">
              {/* <img className="w-20 h-20 mr-2 rounded-full" src="/images/logo/logo-small.png" alt="logo" /> */}

              <img src={imagePreview}  className='w-20 h-20 rounded-full'  alt="logo" />
              <p className='playwrite-de-grund'>Quality Smiles</p>
            </a>
            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg">
                <h1 className="text-xl leading-tight playwrite-de-grund tracking-wide text-white md:text-2xl">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                  <div className="flex flex-col relative">
                    <label htmlFor="email" className="block mb-2 text-xl playwrite-de-grund text-white">
                      Your email
                    </label>
                    <div className="absolute self-end bottom-0 p-2">
                      <img src="/images/logo/icons8-gmail-100.png" className="w-8 h-8" alt="gmail" />
                    </div>
                    <p className="handlee-regular text-rose-800 tracking-widest text-lg uppercase">
                      {seeError && registrationError.email}
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={handleFormDataChange}
                      name="email"
                      id="email"
                      className="border bg-transparent focus:border text-white rounded-lg focus:ring-green-400 handlee-regular sm:text-lg border-black block w-full p-2.5 focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xl playwrite-de-grund text-white">Your PhoneNumber</label>
                    {/* <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      name="phone_number"
                      id="phone_number"
                      className="border focus:border-2 text-white rounded-lg focus:ring-green-400 bg-transparent handlee-regular sm:text-lg border-black block w-full p-2.5 focus:border-green-700"
                    /> */}




<input
                      value={phone_number}
                      onChange={handleChangePhoneNumber}
                      name="phone_number"
                      id="phone_number"
                      className="border focus:border-2 text-white rounded-lg focus:ring-green-400 bg-transparent handlee-regular sm:text-lg border-black block w-full p-2.5 focus:border-green-700"
                    />
                  </div>

                  <div className="flex flex-col relative">
                    <div className="absolute self-end bottom-0 p-2">
                      <img src="/images/logo/icons8-username-64.png" className="w-8 h-8" alt="username" />
                    </div>
                    <label htmlFor="user_name" className="block mb-2 text-xl playwrite-de-grund text-white">
                      Your Username
                    </label>
                    <p className="handlee-regular uppercase text-rose-800 tracking-widest text-lg">
                      {seeError && registrationError.user_name}
                    </p>
                    <input
                      value={user_name}
                      onChange={handleFormDataChange}
                      type="text"
                      name="user_name"
                      className="border focus:border text-white handlee-regular sm:text-lg 
                      rounded-lg focus:ring-green-400 bg-transparent border-black block w-full p-2.5
                       focus:border-green-700"
                    />
                  </div>

                  <div className="flex flex-col relative">
                    <div className="absolute self-end bottom-0 p-2" onClick={() => setIsSeenPassword(!isSeenPassWord)}>
                      <ion-icon    style={{color: 'white'}}  name={isSeenPassWord ? 'eye-outline' : 'eye-off-outline'}></ion-icon>
                    </div>
                    <label htmlFor="password" className="block mb-2 text-xl playwrite-de-grund font-medium text-white">
                      Password
                    </label>
                    <p className="handlee-regular uppercase text-rose-800 tracking-widest text-lg">
                      {seeError && registrationError.password}
                    </p>
                    <input
                      value={password}
                      onChange={handleFormDataChange}
                      type={isSeenPassWord ? 'password' : 'text'}
                      name="password"
                      id="password"
                      className="border focus:border-2 text-white handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black block w-full p-2.5 focus:border-green-700"
                    />
                  </div>

                  <div className='flex flex-col relative'>
                  <div className="absolute self-end bottom-0 p-2" onClick={() => setIsSeenPassword1(!isSeenPassWord1)}>
                      <ion-icon style={{color: 'white'}} name={isSeenPassWord1 ? 'eye-outline' : 'eye-off-outline'}></ion-icon>
                    </div>
                    <label htmlFor="confirm-password" className="block mb-2 text-xl playwrite-de-grund font-medium text-white">
                      Confirm password
                    </label>
                    <p className="handlee-regular uppercase text-rose-800 tracking-widest text-lg">
                      {seeError && registrationError.password_confirmation}
                    </p>
                    <input
                      value={password_confirmation}
                      onChange={handleFormDataChange}
                      type= 'password'
                      name="password_confirmation"
                      id="password_confirmation"
                      className="border focus:border-2 text-white handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black block w-full p-2.5 focus:border-green-700"
                    />
                  </div>
                  {/* type={isSeenPassWord1 ? 'password' : 'text'} */}
                  <div className="flex justify-center">
                    <button type="submit" className="btn btn-active playwrite-de-grund">
                      Create Account
                      <img
                        src="/images/logo/iconsreload2.png"
                        className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}
                        alt="reload"
                      />
                    </button>
                  </div>

                  <p className="text-lg font-extrabold playwrite-de-grund text-white">
                    Already have an account?{' '}
                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      <Link className="underline" to="/signin">
                        Login here
                      </Link>
                    </a>
                  </p >


                  <p className="text-lg font-extrabold playwrite-de-grund text-white hover:underline cursor-pointer">
                   <Link to='/kasspas-key'> Signing Up With Passkeys?</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      
    </SkeletonTheme>
  );
};

export default Signup;
