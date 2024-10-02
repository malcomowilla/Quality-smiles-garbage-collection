

import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import AppsIcon from '@mui/icons-material/Apps';
import PlaceIcon from '@mui/icons-material/Place';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion"
import {useState, useEffect, useCallback} from 'react'
import { FcSms } from "react-icons/fc";
import Lottie from 'react-lottie';
import ChatAnimation from '../animation/chats2.json'
import { BsChatSquareText } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';





const Sidebar = () => {
   const variantUl = {
      hidden: {
        opacity: 0,
        overflow: 'hidden',
        height: 0
        
      },
    

      

      visible: {
        opacity: 1,
        overflow: 'hidden',
        height: '100px'
      }


    
    }

    const variantAside = {
      hidden: {
       width: '0px'
         
       },
     
       visible: {
        
         width: '256px'
       }


       
    }
    

    
   const {isSeen, setIsSeen, seeSidebar, setSeeSideBar,seelocation, user, setUser,
      canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting,canReadSms, canManageSms,
      canReadCalendar,canManageCalendar,canReadTickets,canManageTickets,
    canReadServiceProviders,canManageServiceProviders,canReadCustomers,canManageCustomers,canReadStoreManager,canManageStoreManager,
    canManageStore,canReadStore,canManageSubLocation,canReadSubLocation,canReadLocation,canManageLocation,
      imagePreview, user_name

    } = useApplicationSettings()


   console.log('user name', user_name)
  const defaultOptions = {
   loop: true,
   autoplay: true, 
   animationData: ChatAnimation,
   rendererSettings: {
     preserveAspectRatio: 'xMidYMid slice'
   }
 };






 function stringToColor(string) {
   let hash = 0;
   let i;
 
   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
     hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }
 
   let color = '#';
 
   for (i = 0; i < 3; i += 1) {
     const value = (hash >> (i * 8)) & 0xff;
     color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */
 
   return color;
 }
 
 function stringAvatar(name) {

   const nameParts = name.split(' ').filter(Boolean)


   return {
     sx: {
       bgcolor: stringToColor(name),
     },
     children: nameParts.length > 1  ? 
`${nameParts[0][0]}${nameParts[1][0]}` 
      : nameParts.length === 1
      ? `${nameParts[0][0]}` 
      : '?',  // Fallback
     
   //   `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
   }
 }







  return (

<>


<motion.aside  variants={variantAside} transition={{duration:0.4, ease: "easeInOut",
  }} initial='hidden' animate={seeSidebar  ? "hidden" : "visible"}  id="sidebar-multi-level-sidebar" className={`fixed  
  kalam-light
     top-0 left-0 z-40
  h-screen  
 
 sm:translate-x-0 overflow-x-hidden  cursor-pointer  `}>
   <div  data-theme="forest" className="h-full px-3 py-4  scrollbar-thumb-green-900 scrollbar-track-slate-500 overflow-x-hidden 
     dark:bg-teal-800 scrollbar-thin overflow-y-auto">

      <div className='p-3 flex justify-between text-white'>
      {/* <img src={imagePreview} className='w-[60px] h-[60px] rounded-full shadow-xl' alt="quality-smiles-logo" /> */}
      <Avatar {...stringAvatar(user_name.toString())}   style={{width: 60, height: 60}}/>
      <MenuOpenSharpIcon  onClick={()=> setSeeSideBar(!seeSidebar)} style={{ width: '40px', height: '40px' }}/>
      </div>
      <div className='mt-4'>
      <hr className='border-1 opacity-25' />

      </div>
      <div className='mt-5 text-white text-2xl'>Admin</div>
      <ul className="space-y-2 font-medium mt-2">
         <li>
         <Link to='/admin/dashboard'>
            <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
              <img src="/images/logo/icons8-dashboard-64.png"  className='w-8 h-8 bg-white rounded-full' alt="dashboard" />
               <span className="ms-3 text-lg">Dashboard</span>
            </a>
            </Link>
         </li>
         <li>
            <button   onClick={()=>setIsSeen(!isSeen)} type="button" className="flex items-center w-full p-1 text-base
              transition duration-75 
            rounded-lg group hover:bg-neutral-300
            hover:bg-opacity-25 text-white " aria-controls="dropdown-example"
             data-collapse-toggle="dropdown-example">
                <img src="/images/logo/icons8-application-48.png"  className='w-8 h-8' alt="" />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg">Application</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>


            <motion.ul    id="dropdown-example"   variants={variantUl} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={isSeen ? "visible" : "hidden"} className={` py-2 space-y-2  
             `}>
                 
                 {canManageCalendar === true || canReadCalendar === 
                 true || user === 'super_administrator'  || user === 'administrator'?  (
                   <li >
                   <Link to='/admin/calendar' className="flex items-center  gap-x-2 w-full p-1 transition duration-75 
                   rounded-lg pl-11 group hover:bg-neutral-300
                   hover:bg-opacity-25 text-white ">
                                           <img src="/images/logo/icons8-calendar-64.png" alt="calender" className='w-8 h-8' />

                      Calendar</Link>
                </li>
               
                 ): null}
                 

               


                  <li >
                  <Link to='/admin/chat-messaging'     
                    className="flex items-center gap-x-4  w-full p-1 transition duration-75 
                   rounded-lg pl-11 group hover:bg-neutral-300
                   hover:bg-opacity-25 text-white ">
{/* 
<Lottie style={{display: 'flex', justifyItems: 'center',  justifyContent: 'center', }} 
  options={defaultOptions} width={30} height={30}/> */}
  <BsChatSquareText className='w-8 h-8' />
<p>Chats</p>
                     </Link>

                     
                  </li>

                 
            </motion.ul>
         </li>



         <hr className='border-1 opacity-25'  />
         <div className='mt-5 text-white text-2xl'>View Driver</div>

         <li >

<a className="flex items-center p-2  rounded-lg text-white    mt-4 hover:bg-neutral-300
hover:bg-opacity-25
  group">
 <img src="/images/logo/icons8-garbage-truck-64.png" className='w-8 h-8' alt="driver" />
   <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/view-driver'>Driver</Link></span>
   
</a>
</li>

   <>
      <>


<hr className='border-1 opacity-25'  />
{user === 'super_administrator' || canManageLocation === true || canReadLocation === true || user === 'administrator' ? (
   
<div className='mt-5 text-white text-2xl'>{'Location'}</div>

): ''}
         
{user === 'super_administrator' || canManageLocation === true || canReadLocation === true || user === 'administrator' ? (
    <li >
    <Link to='/admin/location'>
       <a  className="flex items-center p-2  rounded-lg text-white    mt-4 hover:bg-neutral-300
       hover:bg-opacity-25
         group">
        <img src="/images/logo/icons8-location-48.png" className='w-5 h-5' alt="" />
          <span className="flex-1 ms-3 whitespace-nowrap text-lg">{'Location'}</span>
          
       </a>
       </Link>
    </li>
): ''}
        
      </>
       

         </>



{user === 'super_administrator' || user ===  'administrator' || canManageSubLocation === true
 || canReadSubLocation === true  ? (
   <>

<li>
<Link to='/admin/sublocation'>
            <a  className="flex items-center p-2  rounded-lg text-white  hover:bg-neutral-300
            hover:bg-opacity-25
              group">
               <AirlineStopsIcon  className=' group-hover:text-white'/>
               <span className="flex-1 ms-3 whitespace-nowrap  text-lg">Sub Location</span>
            </a>
            </Link>
         </li>
   </>
): null}
        




      <>

<hr className='border-1 opacity-25' />

{user === 'super_administrator' || user ===  'administrator' ||
 canManageStore === true || canReadStore === true ? (
   <div className='mt-5 text-white text-2xl'>Store</div>
 ) : ''}
        



{user === 'super_administrator' || user ===  'administrator' ||
 canManageStore === true || canReadStore === true ? (
   <li>
   <Link to='/admin/store'>
      <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
      hover:bg-opacity-25
        group">
       <img src="/images/logo/icons8-store-64.png" alt="wallet" className='w-8 h-8' />
         <span className="flex-1 ms-3 whitespace-nowrap text-lg">Store</span>
      </a>
      </Link>
   </li>
 ): ''}
        

      </>
        


{user === 'super_administrator' || user === 'administrator' || canManageStoreManager === true || 
canReadStoreManager === true ? (
   <>

<li>
<Link to='/admin/store-managers'>
            <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/1376035_blond_insurer_manager_marketer_person_icon.png" alt="wallet" className='w-8 h-8' />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Store Manager</span>
            </a>
            </Link>
         </li>
   </>
):  null}
        


         <hr className='border-1 opacity-25' />
         <div className='mt-5 text-white text-2xl'>Payments</div>

         <li>
         <Link to='/admin/payment'>
            <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/icons8-travel-portable-cash-storage-holder-purse-accessory-28.png" alt="wallet" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Payments</span>
            </a>
            </Link>
         </li>
         <li>
            <a  className="flex items-center p-1  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25 group">
             <img src="/images/logo/icons8-invoice-64.png" alt="invoice"  className='w-8 h-8' />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Invoices</span>
            </a>
         </li>
         <li>
            <a  className="flex items-center p-1  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/icons8-report-64.png" className='w-8 h-8' alt="report" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Payments Report</span>
            </a>
         </li>
         <li>

         {/* <hr className='border-1 opacity-25' />
         <div className='mt-5 text-white text-2xl'>Collections</div>

            <a  className="flex items-center mt-2 p-1 rounded-lg  group text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
              <img src="/images/logo/icons8-garbage-bag-64.png" className=' w-8 h-8
               ' alt="collection-bag" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/customer-confirmation'>Customer Confirmation</Link></span>
            </a> */}


         </li>

         {/* <li>
            <a href="#" className="flex items-center p-1   group rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25">
            <img src="/images/logo/icons8-recycling-bag-70.png" className='w-8 h-8'  alt="plastic-bag" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">
                  <Link to='/admin/collection-confirm'> Provider Confirmation</Link></span>
            </a>
         </li> */}


{/* 
         <li>
            <a href="#" className="flex items-center p-1   group rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25">
            <img src="/images/logo/icons8-recycling-bag-70.png" className='w-8 h-8'  alt="plastic-bag" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">
                  <Link to='/admin/collections'>Provider Collections</Link></span>
            </a>
         </li>


         <li>
            <a href="#" className="flex items-center p-1  group rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25">
            <img src="/images/logo/icons8-message-65.png" className='w-8 h-8'  alt="plastic-bag" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/collection-requests'>Garbage Requests</Link></span>
            </a>
         </li> */}

         <hr className='border-1 opacity-25' />
         <div className='mt-5 text-white text-2xl'>Finances And Accounts</div>

         <li>
         <Link to='/admin/expenses'>
            <a  className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-taxes-64.png"  className='w-8 h-8' alt="exenses" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Expenses</span>
            </a>
            </Link>
         </li>

            <>
{user === 'super_administrator' || user === 'administrator' || canManageCustomers === true || canReadCustomers === true
? (
   <div className='mt-5 text-white text-2xl'>Customers</div>

): null
}



<hr className='border-1 opacity-25' />

{user === 'super_administrator' || user === 'administrator' || canManageCustomers === true || canReadCustomers === true 
? (
   <li>
<Link to='/admin/customers'>
   <a  className="flex items-center p-1  rounded-lg text-white
    hover:bg-neutral-300
    hover:bg-opacity-25 group">
     <img src="/images/logo/icons8-customers-100.png" className='w-10 h-10' alt="customers" />
      <span className="flex-1 ms-3 whitespace-nowrap text-lg" >Customers</span>
      
   </a>
   </Link>
</li>

): null}


            </>

        



{ user === 'super_administrator' || user === 'administrator' || canManageServiceProviders === true 
|| canReadServiceProviders === true ? (
   <>
 <li>
 <Link to='/admin/service-provider'>
            <a  className="flex items-center p-2  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-worker-50.png" className='w-8 h-8' alt="worker" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Service Providers</span>
            </a>
            </Link>
         </li>

   </>
): null
        
}



         

         <>
  <hr className='border-1 opacity-25' />
         <div className='mt-3 text-white text-2xl'>User Invitation</div>
         <li>
         <Link to='/admin/user-management'>
            <a className="flex items-center p-1  rounded-lg
             text-white hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-user-100.png" className='w-10 h-10' alt="users" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Manage Users</span>
            </a>
            </Link>
         </li>
         </>
      



{ user === 'super_administrator'  || canReadSms === true || canManageSms === true ?(
   <>
 <hr className='border-1 opacity-25' />
         <div className='mt-3 text-white text-2xl'>SMS</div>
         <li>
         <Link to='/admin/sms'>
            <a className="flex items-center p-1  rounded-lg
             text-white hover:bg-neutral-300
             hover:bg-opacity-25 group">

               <div className='bg-white rounded-full p-3'>
               <FcSms   className='w-5 h-5' />
               </div>
               
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Manage SMS</span>
            </a>
            </Link>
         </li>

   </>
):  null
        
}


<hr className='border-1 opacity-25' />
{user === 'super_administrator' || user === 'administrator' || canManageTickets === true || canReadTickets === true
|| user === 'agent'
? (
   <div className='mt-5 text-white text-2xl'>Customer Support Tickets</div>

):
null
}


{user === 'super_administrator' || user === 'administrator' || canManageTickets === true || canReadTickets === true
|| user === 'agent'

? (
   <li>
         <Link to='/admin/support-tickets'>   <a  className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/support.png"  className='w-8 h-8' alt="exenses" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Tickets</span>
            </a></Link>
         </li>
): null}





         
      { user === 'super_administrator'  
       || canreadSetting  === true  || canManageSetting == true ? (
         <>

<div className='translate-y-[10px] '>

         <hr className='border-1 opacity-25' />

            
         
            <div className='text-white text-2xl'>Settings</div> 

         <li >
         <Link to='/admin/general-settings'>
            <a  className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
             <img src="/images/logo/icons8-settings-48.png"   className='w-10 h-10' alt="settings" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Settings
               </span>
            </a>
            </Link>
         </li>
         </div>

         </>
      ): null
         
}
      </ul>
   </div>
</motion.aside>

</>
  )
}

export default Sidebar