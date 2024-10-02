
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
import { IoArrowUndoSharp } from "react-icons/io5";


const Passkeys = () => {
  const network = useNetworkState();
const goBack = useNavigate()
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
    handleFormDataChange,
    setPhone,
    phone,
    
    setloading,
    open,
    setOpen,
    handleClose,
    checkEmail,
    handleChangePhoneNumber,
    setImagePreview,
    imagePreview,
    setUpdateFormData,updateFormData

  } = useApplicationSettings();



  const navigate = useNavigate();
  const [screenload, setscreenload] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [done, setDone] = useState(false)
 const [isloading, setisloading] = useState(false)
 const [registrationError, setRegistrationError,] = useState('')
    const [usernameError, setUserNameError] = useState('')
const [seeError, setSeeError] = useState(false)

const webAuthData={
  email: '',
  user_name: '',
  phone_number: ''
}

const email = checkEmail
const [signupFormData, setsignupFormData] = useState(webAuthData)
const handleGoBack = ()=> {
    goBack(-1)
}




const {   user_name, phone_number } = signupFormData;

  useEffect(() => {
    setscreenload(true);
  }, []);


  // api/signup-admin

const handleChange = (e) => {

  const {name, id, value} = e.target
  setsignupFormData((prevData)=> (
    {...prevData, [name]: value}
  ))
}

  function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
  }

  async function registerWebAuthn(e) {
    e.preventDefault();
    setisloading(true);
    setOpenLoad(true);
    setDone(false);
  
    const response = await fetch('/api/webauthn/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  user_name })
    });
  
    const options = await response.json();
  

    if (response.ok) {
      setisloading(false);
      setOpenLoad(false);
      setDone(false);
      setSeeError(false);
    } else {
      setisloading(false);
      setOpenLoad(false);
      setSeeError(true);
      setDone(false);
      setRegistrationError(options.email);
      setUserNameError(options.user_name)
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

    console.log('options.challenge:',options.challenge )
  
    try {
      const credential = await navigator.credentials.create({ publicKey: options });
  
  
      // Prepare the credential response
      const credentialJson = {
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
        body: JSON.stringify({ credential: credentialJson, email, user_name})
      });
  
      const createResponseJson = await createResponse.json();
  

      if (createResponse.ok) {
        setOpen(true);
        setSeeError(false);
        setsignupFormData('')
        setOpenLoad(false);
        setisloading(false);
        
        setTimeout(() => {
          setDone(true);
          setloading(false);



          setTimeout(() => {
            navigate('/kasspass-key-signin');
          }, 2000);
        }, 5000);


        
      } else {
        setisloading(false);
        console.log('signup failed');
        setOpen(false);
        // setRegistrationError(options.errors);
        setSeeError(true);
        setOpenLoad(false);
      }
    } catch (err) {
      setisloading(false);
      setOpen(false);
      setSeeError(true);
      setOpenLoad(false);
      console.error('Error during WebAuthn credential creation:', err);
    }
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
          className=" h-screen relative z-50 grid 
        xl:grid-cols-1 max-sm:grid-cols-1 max-sm:bg-small-screens max-md:bg-small-screens md:bg-small-screens"
        >
          <SignupAlert open={open} handleClose={handleClose} />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-2 text-2xl font-semibold text-white">
              {/* <img className="w-20 h-20 mr-2 rounded-full" src="/images/logo/logo-small.png" alt="logo" /> */}

          <img src={imagePreview} alt="logo" className='w-20 h-20 mr-2 rounded-full' />
              <p className='playwrite-de-grund'>{ 'Quality Smiles'}</p>
            </a>
            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl leading-tight playwrite-de-grund tracking-wide  text-white md:text-2xl">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={registerWebAuthn}>
                  <div className="flex flex-col relative">
                    {/* <label htmlFor="email" className="block mb-2 text-xl playwrite-de-grund text-white">
                      Your email
                    </label> */}
                    {/* <div className="absolute self-end bottom-0 p-2">
                      <img src="/images/logo/icons8-gmail-100.png" className="w-8 h-8" alt="gmail" />
                    </div> */}
                    {/* <p className="handlee-regular text-rose-800 tracking-widest text-lg uppercase">
                      {seeError && registrationError}
                    </p> */}
                    {/* <input
                      type="email"
                      value={email}
                      onChange={(e)=>handleChange(e)}
                      name="email"
                      id="email"
                      className="border bg-transparent focus:border text-white rounded-lg focus:ring-green-400 
                      handlee-regular sm:text-lg border-black block w-full max-w-xl p-2.5 focus:border-green-700"
                    /> */}
                  </div>
                

                  <div className="flex flex-col relative">
                    <div className="absolute self-end bottom-0 p-2">
                      <img src="/images/logo/icons8-username-64.png" className="w-8 h-8" alt="username" />
                    </div>
                    <label htmlFor="user_name" className="block mb-2 text-xl playwrite-de-grund text-white">
                      Your Username
                    </label>
                    <p className="handlee-regular uppercase text-rose-800 tracking-widest text-lg">
                      {seeError && usernameError}
                    </p>
                    <input
                      value={user_name}
                      onChange={(e)=>handleChange(e)}
                      type="text"
                      name="user_name"
                      className="border focus:border text-white handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black block w-full p-2.5 focus:border-green-700"
                    />



{/* 
<label htmlFor="email" className="block mb-2 text-xl playwrite-de-grund text-white">
                      Your Email
                    </label>
                    <p className="handlee-regular uppercase text-rose-800 tracking-widest text-lg">
                      {seeError && usernameError}
                    </p>
                    <input
                      value={email}
                      onChange={(e)=>handleChange(e)}
                      type="text"
                      name="email"
                      className="border focus:border text-white handlee-regular sm:text-lg rounded-lg focus:ring-green-400 bg-transparent border-black block w-full p-2.5 focus:border-green-700"
                    /> */}
                  </div>

               
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
                      <Link className="underline" to="/kasspass-key-signin">
                        Login here
                      </Link>
                    </a>
                  </p >
                    <IoArrowUndoSharp className='w-10 h-10 cursor-pointer text-white' onClick={handleGoBack}/>
                </form>
              </div>
            </div>
          </div>
        </section>
      
    </SkeletonTheme>
  );
};

export default Passkeys;


