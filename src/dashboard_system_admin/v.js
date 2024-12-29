
import React, { useEffect, useState } from 'react';
import { fetchClients, blockClient } from './api';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import { Box,  AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from '@mui/material';




import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button,  } from '@mui/material';
import { useCallback, } from 'react'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import CustomerRegistrationForm from '../registration/CustomerRegitrationForm'
import dayjs from 'dayjs';
import  CustomerAdditionAlert from '../Alert/CustomerAdditionAlert'
import CustomerUpdatedAlert from '../Alert/CustomerUpdatedAlert'
import  DeleteCustomerConfirmation from '../registration/DeleteCustomerConfirmation'
import CustomerDeleteAlert from '../Alert/CustomerDeleteAlert'
import CustomerOfflineAlert from '../Alert/CustomerOfflineAlert'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ImSpinner9 } from "react-icons/im";
import AccessDenied from '../access_denied/AccessDenied'
import { requestPermission } from '../firebase/firebasePermission';
import {useNavigate} from 'react-router-dom'
import OneSignal from 'react-onesignal';

import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';

import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { createConsumer } from '@rails/actioncable';
import { useDebounce } from 'use-debounce';
import { IoPeople } from "react-icons/io5";









const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      setClients(data);
    };
    getClients();
  }, []);

  const handleBlock = async (clientId) => {
    await blockClient(clientId);
    setClients(clients.filter(client => client.id !== clientId));
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Clients</h2>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {clients.map(client => (
        <Card key={client.id} sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <CardContent>
            <Typography variant="h6">{client.company_name}</Typography>
            <Typography color="textSecondary">{client.active ? 'Active' : 'Blocked'}</Typography>
          </CardContent>
          <Button variant="contained" color="success" onClick={() => handleBlock(client.id)}>
            Block


<div className="flex items-center max-w-sm mx-auto p-3">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg> */}
            <IoPeople className='text-black'/>
            
        </div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
         className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search for customers..."  />
    </div>
    <button type="" className="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 
    rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
     focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
    </button>
</div>



    <MaterialTable
   
      columns={[


        { title: "Location", field: "location",
          render: (rowData) => 
            
            <>
{rowData.location === null ||  rowData.location === 'null' || rowData.location === '' 
? <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} /> : rowData.location }

            </>
        
         },
        { title: "Customer Name", field: "name" ,
          
        },
     
        {
            title: "Phone Number",
            field: "phone_number",
          },
          // {
          //   title: "Amount Paid",
          //   field: "amount_paid",
          // },
          
          // {
          //   title: "Total",
          //   field: "amount_paid",
          // },

          // {
          //   title: "Remaining Amount",
          //   field: "Remaining Amount",
          // },
      
        {
            title: "Date Registered",
            field: "date_registered",
          },

        {
          title: "Customer Code",
          field: "customer_code",
        },



        {
          title: "Collection Request Date",
          field: "formatted_request_date",
          render: (rowData) => 
            
            <>
{rowData.formatted_request_date === null ||  rowData.formatted_request_date === 'null' || rowData.formatted_request_date === '' 
? <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} /> : rowData.formatted_request_date }

            </>
        },


        {
          title: "Collection Request",
          field: "confirm_request",
          lookup: {true:  <CheckCircleIcon style={{ color: 'green' }} />, false: <CancelIcon style={{ color: 'red' }} />
},
        },

        {
          title: "Received Date",
          field: "formatted_confirmation_date",
        },



        {
title: 'Bag  Received',
field: 'bag_confirmed',
lookup: {true:  <CheckCircleIcon style={{ color: 'green' }} />, false: <CancelIcon style={{ color: 'red' }} />
},

        },
          {
        
            title: "Action",
            field: "Action",
            render: (rowData) => 

              <>
              <Box sx={{
                display: 'flex',
                gap: 2
              }}>
                              <EditButton   />

              <DeleteButton   id={rowData.id}/>
              </Box>
            

              
              </>
            
            
          }
      ]}

      onRowClick={handleRowClick} 


      actions={[
        {
          icon: () => <div  onClick={handleClickOpen}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Customer',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}

   data={customers}


      title="Customers"
      

      options={{
        paging: true,
       pageSizeOptions:[5, 10, 20, 25, 50, 100],
       pageSize: 10,
       search: false,
  

showSelectAllCheckbox: false,
showTextRowsSelected: false,
hover: true, 
selection: true,
paginationType: 'stepped',


paginationPosition: 'bottom',
exportButton: true,
exportAllData: true,
exportFileName: 'Customers',

headerStyle:{
fontFamily: 'bold',
textTransform: 'uppercase'
} ,


fontFamily: 'customers'

}}     
    />
  </div>
          </Button>
        </Card>
      ))}
    </Box>
  </motion.div>
  );
};

export default ClientList;














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
  const challenge = options.challenge;

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
      }, 3000);


      
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


















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
// import TypingAnimation from './TypingAnimation'; // Adjust the import path as necessary
// import { TextField, Button, Box, Slide, Backdrop } from '@mui/material';
// import Lottie from 'react-lottie';
// import LoadingAnimation from '../animation/loading.json';
// import EmailSentAnimation from '../animation/email_sent_animation.json'




// const LoginSytemAdmin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [openLoad, setOpenLoad] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [sentEmail, setSentEmail] = useState(false)





//   // login_system_admin
//   const handleLoginEmail = async (e) => {
//     e.preventDefault();
//     setOpenLoad(true)
//     setLoading(true)
//     try {
//       const response = await fetch('api/login_system_admin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful login
//         toast.success('Login successful!');
//         setOpenLoad(false)
//         setLoading(false)
//         setSentEmail(true)
//         // Optionally, store the token in local storage or cookies
//         // Redirect or update the UI as needed
//       } else {
//         // Handle login error
//         setOpenLoad(false)
//         setSentEmail(false)
//         setLoading(false)
//         toast.error(data.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       setOpenLoad(false)
//       setSentEmail(false)
//       setLoading(false)
//       console.error('Error during login:', error);
//       toast.error('An error occurred. Please try again later.');
//     }
//   };






//   // login_system_admin
//   const handleLoginPassword = async (e) => {
//     e.preventDefault();
//     setOpenLoad(true)
//     setLoading(true)
//     try {
//       const response = await fetch('api/login_system_admin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful login
//         toast.success('Login successful!');
//         setOpenLoad(false)
//         setLoading(false)
//         // Optionally, store the token in local storage or cookies
//         // Redirect or update the UI as needed
//       } else {
//         // Handle login error
//         setOpenLoad(false)
//         setLoading(false)
//         toast.error(data.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       setOpenLoad(false)
//       setLoading(false)
//       console.error('Error during login:', error);
//       toast.error('An error occurred. Please try again later.');
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Simulate signup logic
//     toast.success('Signup successful!');
//   };




//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: LoadingAnimation,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };



//   const defaultOptions2 = {
//     loop: true,
//     autoplay: true,
//     animationData: EmailSentAnimation,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };
//   return (

// <>

// {loading && (
//         <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//           <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
//         </Backdrop>
//       )}

// {sentEmail &&  <Lottie className='relative z-50'
//  options={defaultOptions2} height={400} width={400} />
// }

//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-[720px] mx-auto">
//         <div className="block mb-4 mx-auto border-b
//          border-slate-300 pb-2 max-w-[360px]">
//           <a 
//             target="_blank" 
//             href="https://www.material-tailwind.com/docs/html/card" 
//             className="block w-full px-4 py-2 text-center
//              text-slate-700 transition-all"
//           >
//    <TypingAnimation text={`Weelcome to Aitechs System Admin Portal`} />

            
//           </a>
          
//         </div>
//         <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
//           <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
//             <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
//               Login
//             </h3>
//           </div>
//           <div className="flex flex-col gap-4 p-6">
//             <div className="relative h-11 w-full min-w-[200px]">
               <input
               className="w-full h-full px-3 py-3 font-sans 
                 text-sm font-normal transition-all  bg-transparent border rounded-md peer
                 border-blue-gray-200 border-t-transparent 
                 text-blue-gray-700 outline outline-0
                  placeholder-shown:border
                  placeholder-shown:border-blue-gray-200 
                   placeholder-shown:border-t-blue-gray-200 
                  focus:border-2 focus:border-gray-900
                   focus:border-t-transparent focus:outline-0 
                    disabled:border-0 disabled:bg-blue-gray-50"
                
                value={email}
              onChange={(e) => setEmail(e.target.value)}
             />
//               <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                 Email
//               </label>
//             </div>
//             <div className="relative h-11 w-full min-w-[200px]">
            
            
//             </div>
//             <div className="-ml-2.5">
//               <div className="inline-flex items-center">
//                 <label htmlFor="checkbox" className="relative flex items-center p-3 rounded-full cursor-pointer">
//                   <input type="checkbox"
//                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
//                     id="checkbox" />
//                   <span
//                     className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
//                       fill="currentColor" stroke="currentColor" strokeWidth="1">
//                       <path fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"></path>
//                     </svg>
//                   </span>
//                 </label>
//                 <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="checkbox">
//                   Remember Me
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="p-6 pt-0">
//             <button
//               className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button" onClick={handleLoginEmail}>
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
//     </div>








//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-[720px] mx-auto">
//         <div className="block mb-4 mx-auto border-b
//          border-slate-300 pb-2 max-w-[360px]">
//           <a 
//             target="_blank" 
//             href="https://www.material-tailwind.com/docs/html/card" 
//             className="block w-full px-4 py-2 text-center
//              text-slate-700 transition-all"
//           >
//    <TypingAnimation text={`Weelcome to Aitechs System Admin Portal`} />

            
//           </a>
          
//         </div>
//         <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
//           <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
//             <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
//               Login
//             </h3>
//           </div>
//           <div className="flex flex-col gap-4 p-6">
//             <div className="relative h-11 w-full min-w-[200px]">
             
             
//             </div>
//             <div className="relative h-11 w-full min-w-[200px]">
//               <input
//                 className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//                 value={password}
               
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                 Password
//               </label>
//             </div>
//             <div className="-ml-2.5">
//               <div className="inline-flex items-center">
//                 <label htmlFor="checkbox" className="relative flex items-center p-3 rounded-full cursor-pointer">
//                   <input type="checkbox"
//                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
//                     id="checkbox" />
//                   <span
//                     className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
//                       fill="currentColor" stroke="currentColor" strokeWidth="1">
//                       <path fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"></path>
//                     </svg>
//                   </span>
//                 </label>
//                 <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="checkbox">
//                   Remember Me
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="p-6 pt-0">
//             <button
//               className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button" onClick={handleLoginEmail}>
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
//     </div>






//     </>
//   );
// };

// export default LoginSytemAdmin;











  {/* <BottomNavigationAction label="Invite" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Clients" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />  */}
























        import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarSystemAdmin from './SidebarSystemAdmin';
import ClientList from './ClientList';
import InviteClient from './InviteClient';
import Settings from './Settings'; // Import the Settings component
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout'; // Import Logout icon

const DashboardSytemAdmin = () => {
  const [value, setValue] = useState(0);


  const handleLogout = async () => {
    const response = await fetch('/api/logout_system_admin',{
      method: 'DELETE'
    });
  
    if (response.ok) { // Check if the response is successful
      toast.success("Logged out successfully!", { transition: Slide }); // Show toast notification
      // Optionally, redirect to the login page or home page
      setTimeout(() => {
        window.location.href = '/login-system-admin'; // Redirect after a short delay
      }, 1000); // Delay for 1 second to allow the toast to be seen
    } else {
      toast.error("Logout failed. Please try again.", { transition: Slide }); // Show error notification
    }
  }



  return (

    <>
     <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            System Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component={motion.main} sx={{ flexGrow: 1, p: 2 }}>
        {value === 0 && <InviteClient Sliding={Slide}/>}
        {value === 1 && <ClientList />}
        {value === 2 && <Settings />} {/* Add Settings component */}
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          console.log('navigat')
          setValue(newValue);
        }}
        showLabels
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'green' }}

        
      >
         <BottomNavigationAction  
          sx={{
            color: 'black', // Set the color for the label
            '& .MuiSvgIcon-root': {
              color: 'black', // Set the color for the icon
            },
          }}
         label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
        {/* <BottomNavigationAction label="Invite" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Clients" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />  */}
 <div className="block-container">
            <div className="btn-back btn-back-1"></div>
            <div className="btn-front">
              <BottomNavigationAction onClick={()=> setValue(1)} label="Invite" icon={<PeopleIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
          <div className="block-container">
            <div className="btn-back btn-back-2"></div>
            <div className="btn-front">
              <BottomNavigationAction    onClick={()=> setValue(0)}   label="Clients" icon={<DashboardIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
          <div className="block-container">
            <div className="btn-back btn-back-3"></div>
            <div className="btn-front">
              <BottomNavigationAction label="Settings"   onClick={()=> setValue(2)}    icon={<SettingsIcon sx={{ fontSize: 24 }} />} />
            </div>
          </div>
      </BottomNavigation>
    </Box>

    </>
  );
};

export default DashboardSytemAdmin;






















import React, { useState, useEffect } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  BottomNavigation, 
  BottomNavigationAction,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LockResetIcon from '@mui/icons-material/LockReset';
import ClientList from './ClientList';
import InviteClient from './InviteClient';
import Settings from './Settings';
import { ToastContainer, toast, Slide } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import ResetPassword from '../components/ResetPassword';
import UptimeDisplay from './UptimeDisplay';
import UptimeStats from './UptimeStats';

const DashboardSytemAdmin = () => {
  const [value, setValue] = useState(0);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    const response = await fetch('/api/logout_system_admin', {
      method: 'DELETE'
    });
  
    if (response.ok) {
      toast.success("Logged out successfully!", { transition: Slide });
      setTimeout(() => {
        window.location.href = '/login-system-admin';
      }, 1000);
    } else {
      toast.error("Logout failed. Please try again.", { transition: Slide });
    }
  };

  const getPageTitle = () => {
    if (showResetPassword) return "Reset Password";
    switch (value) {
      case 0: return "Uptime Stats";
      case 1: return "Invite Client";
      case 2: return "Settings";
      default: return "Dashboard";
    }
  };

  const navigationItems = [
    { label: "Uptime Stats", icon: <DashboardIcon />, value: 0 },
    { label: "Invite", icon: <PeopleIcon />, value: 1 },
    { label: "Settings", icon: <SettingsIcon />, value: 2 },
    { label: "Reset Password", icon: <LockResetIcon />, value: -1 },
  ];

  const pageTransitionVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <>
      <ToastContainer 
        position='top-center' 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        draggable 
        pauseOnHover 
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f7fa' }}>
        <CssBaseline />
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { sm: 'none' }, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                {getPageTitle()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UptimeDisplay />
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.light',
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <Box
            sx={{
              width: 250,
              pt: 2,
              bgcolor: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <List>
              {navigationItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Reset Password") {
                      setShowResetPassword(true);
                      setValue(-1);
                    } else {
                      setValue(item.value);
                      setShowResetPassword(false);
                    }
                    setDrawerOpen(false);
                  }}
                  sx={{
                    mb: 1,
                    mx: 1,
                    borderRadius: 2,
                    bgcolor: value === item.value ? 'rgba(0, 128, 0, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 128, 0, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'green' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'rgba(211, 47, 47, 0.05)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>

        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
          <AnimatePresence mode="wait">
            {showResetPassword ? (
              <ResetPassword onClose={() => setShowResetPassword(false)} />
            ) : (
              <motion.div
                key={value}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {value === 0 && <UptimeStats />}
                {value === 1 && <InviteClient />}
                {value === 2 && <Settings />}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels
          sx={{ 
            display: { xs: 'flex', sm: 'none' },
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 65,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            bgcolor: 'white',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(0, 0, 0, 0.6)',
              '&.Mui-selected': {
                color: 'green'
              }
            }
          }}
        >
          {navigationItems.slice(0, 3).map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => {
                setValue(item.value);
                setShowResetPassword(false);
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
    </>
  );
};

export default DashboardSytemAdmin;