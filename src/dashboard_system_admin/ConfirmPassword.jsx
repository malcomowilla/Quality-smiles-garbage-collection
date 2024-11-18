    
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




const ConfirmPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const [openLoad, setOpenLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  
    // const { token } = useParams();
    const { search } = useLocation()
    const token = new URLSearchParams(search).get('token');
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
        body: JSON.stringify({ email, password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        toast.success('Login successful!');
        setOpenLoad(false);
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
   <TypingAnimation text={`Weelcome to Aitechs System Admin Portal`} />

            
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
               <input
                className="w-full h-full px-3 py-3 font-san                 text-sm font-normal transition-all 
               bg-transparent border rounded-md peer
                 border-blue-gray-200 border-t-transparent 
                 text-blue-gray-700 outline outline-0
                 placeholder-shown:border   placeholder-shown:border-blue-gray-200                     placeholder-shown:border-t-blue-gray-200 
                   focus:border-2 focus:border-gray-900
                    focus:border-t-transparent focus:outline-0 
                    disabled:border-0 disabled:bg-blue-gray-50"
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
            
            
            </div>
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
                <label htmlFor="checkbox" className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="checkbox" />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                      fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="checkbox">
                  Remember Me
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" onClick={handleLoginPassword}>
              Sign In
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>








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
   <TypingAnimation text={`Weelcome to Aitechs System Admin Portal`} />

            
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
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={password}
               
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
                <label htmlFor="checkbox" className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="checkbox" />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                      fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="checkbox">
                  Remember Me
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" onClick={handleLoginEmail}>
              Sign In
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>

    
    </>
  );
};

export default ConfirmPassword;
