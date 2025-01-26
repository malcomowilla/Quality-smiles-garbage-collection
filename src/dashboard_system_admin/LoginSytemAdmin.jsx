
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import TypingAnimation from './TypingAnimation'; // Adjust the import path as necessary
import { TextField, Button, Box, Slide, Backdrop } from '@mui/material';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import EmailSentAnimation from '../animation/email_sent_animation.json';
import {useNavigate} from 'react-router-dom'
import { Lock } from '@mui/icons-material'; // Import an icon from Material-UI or any other icon library
import { GoPasskeyFill } from "react-icons/go";
import toaster, { Toaster } from 'react-hot-toast';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {useAppSettings} from '../settings/AppSettings';



const LoginSytemAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [passkey, setPasskey] = useState(''); // State for passkey
  const [step, setStep] = useState(1); // 1 for email, 2 for password, 3 for passkey
  const [openLoad, setOpenLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [passkeyCreated, setPasskeyCreated] = useState(false); // Track if passkey is created
  const [emailVerified, setEmailVerified] = useState(false); // Track if passkey is created
const navigate = useNavigate()
const {currentSystemAdmin, systemAdminEmail} = useApplicationSettings()
const {loginWithPasskey, setLoginWithPasskey} = useAppSettings()

  // Check if the user already has a passkey



  
  useEffect(() => {
    const checkPasskeyStatus = async () => {
      const sysEmail =  localStorage.getItem('system_admin_email')

      const response = await fetch(`api/check_passkey_status?email=${sysEmail}`, {
        method: 'GET',
       
      });

      if (response.ok) {
        const data = await response.json();
        setPasskeyCreated(data.passkeyExists); // Set state based on response
      }
    };

      checkPasskeyStatus();
    
  }, [navigate]);



  useEffect(() => {
    const sysEmail =  localStorage.getItem('system_admin_email')
    const checkEmailStatus = async () => {
      const response = await fetch(`api/check_email_already_verified?email=${sysEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmailVerified(data.email_verified)
       

      }
    };

    checkEmailStatus();
    
  }, []);



  
  async function authenticateWebAuthn(web_auth_email) {
    setOpenLoad(true);
      setLoading(true);
    const response = await fetch('/api/webauthn/authenticate_register_system_admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: web_auth_email})
    })  
  
    const options = await response.json();
    const challenge = options.challenge;
  
  
  
    if (response.ok) {
      setLoading(false);
      setOpenLoad(false)
      
    
    } else {
     
      toast.error(options.error || 'passkey creation failed');
          setOpenLoad(false)
          setLoading(false);
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
        challenge: challenge,
        type: credential.type,
        response: {
          clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON),
          authenticatorData: arrayBufferToBase64Url(credential.response.authenticatorData),
          signature: arrayBufferToBase64Url(credential.response.signature),
          userHandle: arrayBufferToBase64Url(credential.response.userHandle)
        }
  
  
      };
  
  
  
  
      const createResponse = await fetch('/api/webauthn/verify_register_system_admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential:credentialJson, email: web_auth_email, 
        
            })
      });
  
  const newData = await createResponse.json()
  
      if (createResponse.ok) {
        setLoading(false);
        setOpenLoad(false)
        navigate('/system-admin')
        // setTimeout(() => {
        //   // setDone(true);
        //   // setloading(false);
        //   setTimeout(() => {
        //     navigate('/admin/location')
        //   }, 1000);
        // }, 2500);
        console.log('message', newData.message)
      } else {
        setLoading(false);
      setOpenLoad(false)
        toast.error(newData.error || 'passkey creation failed');
        console.log(`passkey error =>${newData.error}`)
      }
    } catch (err) {
      setLoading(false);
      setOpenLoad(false)
      toast.error('An error occurred. Please try again later.');
      console.error('Error during WebAuthn credential creation:', err);
    }
  }
  



  // Handle email submission
  const handleLoginEmail = async (e) => {
    e.preventDefault();
    setOpenLoad(true);
    setLoading(true);
    try {
      const response = await fetch('api/login_system_admin_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
localStorage.setItem('system_admin_email', email)
      if (response.ok) {

        if (!emailVerified) {
          toast.success('Email verification sent! Please check your inbox.');
          setSentEmail(true);
        }
        
        setOpenLoad(false);
        setLoading(false);
        
        setStep(2); // Move to password step
      } else {
        setOpenLoad(false);
        setLoading(false);
        toast.error(data.error || 'Email verification failed. Please try again.');
      }
    } catch (error) {
      setOpenLoad(false);
      setLoading(false);
      console.error('Error during email verification:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };



  useEffect(() => {
    const getLoginWithPasskey = async () => {
     try {
       const response = await fetch('/api/get_login_with_passkey');
       const data = await response.json();
       if (response.ok) {
         const { login_with_passkey } = data[0]
         setLoginWithPasskey(login_with_passkey);
       }
     } catch (error) {
       console.error('Error fetching login with passkey:', error);
     }
   };
   getLoginWithPasskey() 
    }, []);




  // Handle password submission
  const handleLoginPassword = async (e) => {
    e.preventDefault();
    setOpenLoad(true);
    setLoading(true);
    try {
      const response = await fetch('api/login_system_admin_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');

        if (loginWithPasskey === 'true' || loginWithPasskey === true) {
          authenticateWebAuthn(email)
        }else{
          navigate('/system-admin')
        }
        
        setOpenLoad(false);
        setLoading(false);
        setStep(3); // Move to passkey step
      } else {
        setOpenLoad(false);
        setLoading(false);
        toast.error(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setOpenLoad(false);
      setLoading(false);
      console.error('Error during login:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };





  function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
  }
  
  async function signupWithWebAuthn(e) {
    e.preventDefault();
    setOpenLoad(true);
    setLoading(true);
    const response = await fetch('/api/webauthn/register_system_admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email })
    });
  
    const options = await response.json();
    const challenge = options.challenge;
  
    if (response.ok) {
      
      setOpenLoad(false);
      setLoading(false);
    } else {
      setOpenLoad(false);
      setLoading(false);
      toast.error(options.error || 'passkey creation failed');
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
          name: "aitechs",
        },
        // origin: 'http://localhost:5173',
        // origin: 'https://aitechs-sas-garbage-solution.onrender.com',
        rawId: arrayBufferToBase64Url(credential.rawId),
        type: credential.type,
        response: {
          attestationObject: arrayBufferToBase64Url(credential.response.attestationObject),
          clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON)
        },
        challenge: challenge
  
      };
  
  
      
  
      const createResponse = await fetch('/api/webauthn/create_register_system_admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialJson,
           email, })
      });
  
      const data = await createResponse.json();
  
  
      if (createResponse.ok) {
       
        toast.success('created passkey sucessfully');
       
        setOpenLoad(false);
        setLoading(false);
  
        
      } else {
        console.log('signup failed');
        // setRegistrationError(options.errors);
        setOpenLoad(false);
        setLoading(false);
        toast.error(data.error || 'passkey creation failed');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
      setOpenLoad(false);
      setLoading(false);
      console.error('Error during WebAuthn credential creation:', err);
    }
  }
  
  

  




  




  
  



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: EmailSentAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>

<Toaster 
 position="top-center"

/>

      {loading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}
{/* 
{sentEmail && (
  <>
    {emailVerified ? (
      null
    ):     <Lottie className='relative z-50' options={defaultOptions2} height={200} width={200} />
}
  </>
)} */}


{sentEmail && !emailVerified && (
  <Lottie className='relative z-50' options={defaultOptions2} height={200} width={200} />
)}



      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="max-w-[720px] mx-auto">
          <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
            {/* <TypingAnimation text={`Welcome to Aitechs System Admin Portal`} /> */}
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textAlign: 'center', margin: '20px 0' }}>
  Welcome to Aitechs System Admin Portal
</p>
          </div>
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
            <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
              <h3 className="block font-sans text-3xl antialiased font-semibold 
              leading-snug tracking-normal text-white">
                Login
              </h3>
            </div>
            
            <div className="flex flex-col gap-4 p-6">
              {step === 1 ? (
                <>
                 
                 <div className="relative z-0 w-full mb-5">
        <input
        placeholder='Enter Email Adress'
          type="email"
          name="email"
          value={email}
                      onChange={(e) => setEmail(e.target.value)}
          className="pt-3 pb-2 block w-full px-0 mt-0  text-black  bg-transparent
           border-0 border-b-2 
          appearance-none focus:outline-none focus:ring-0 focus:border-black
           border-gray-200"
        />
      </div>
                  <div className="p-6 pt-0">
                    <button
                      className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={handleLoginEmail}
                    >
                      {emailVerified ? 'Login With Email' : 'Send Verification Email'}
                    </button>
                  </div>
                </>
              ) : step === 2  &&  (
                <>
<div className="relative z-0 w-full mb-5">
      <div className="flex items-center">
        <Lock className="absolute left-3 top-2.5 text-gray-400" /> {/* Icon positioned inside the input */}
        <input
          type="password" // Ensure the input type is password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="pt-3 pb-2 block w-full px-10 mt-0 bg-transparent border-0 border-b-2 
          appearance-none focus:outline-none focus:ring-0 focus:border-black
           border-gray-200"
        />
      </div>
    </div>
                  <div className="p-6 pt-0">
                    <button
                      className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={handleLoginPassword}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      </div>
    </>
  );
};

export default LoginSytemAdmin;