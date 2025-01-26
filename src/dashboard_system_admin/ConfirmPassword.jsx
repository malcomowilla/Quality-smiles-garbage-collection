    
import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import TypingAnimation from './TypingAnimation'; // Adjust the import path as necessary
import { TextField, Button, Box, Slide, Backdrop } from '@mui/material';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import EmailSentAnimation from '../animation/email_sent_animation.json';
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import {useAppSettings} from '../settings/AppSettings';




const ConfirmPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const [openLoad, setOpenLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const {loginWithPasskey, setLoginWithPasskey} = useAppSettings()

    // const { token } = useParams();
    const { search } = useLocation()
    const token = new URLSearchParams(search).get('token');
    const emailSystemAdmin =  new URLSearchParams(search).get('email')
   const  encode_token = token.replace(/ /g, "+");
  // Handle email submission

  const navigate = useNavigate()




  
  function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
  }





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

      if (response.ok) {
        // Handle successful email verification
        toast.success('Email verification sent! Please check your inbox.');
        setOpenLoad(false);
        setLoading(false);
        setSentEmail(true);
        setStep(2); // Move to password step
      } else {
        // Handle email error
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
        body: JSON.stringify({  token: encode_token, email: emailSystemAdmin }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        toast.success('Login successful!');
        setOpenLoad(false);
        navigate('/continue-login')
        setLoading(false);
        // Optionally, store the token in local storage or cookies
        // Redirect or update the UI as needed
      } else {
        // Handle login error
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
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

      {loading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}




<div className="flex justify-center items-center min-h-screen">
       <div className="max-w-[720px] mx-auto">
         <div className="block mb-4 mx-auto border-b
         border-slate-300 pb-2 max-w-[360px]">
           <a 
            target="_blank" 
           href="https://www.material-tailwind.com/docs/html/card" 
           className="block w-full px-4 py-2 text-center
              text-slate-700 transition-all"
          >
   {/* <TypingAnimation text={`Weelcome to Aitechs System Admin Portal`} /> */}
<p className='text-white'>Welcome to Aitechs System Admin Portal</p>
            
         </a>
          
        </div>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
           <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
            <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
              Login
            </h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              
          
            </div>
           
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
               
            
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" onClick={handleLoginPassword}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>







    
    </>
  );
};

export default ConfirmPassword;
