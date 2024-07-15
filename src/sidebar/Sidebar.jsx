

import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import AppsIcon from '@mui/icons-material/Apps';
import PlaceIcon from '@mui/icons-material/Place';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion"
import {useState, useEffect, useCallback} from 'react'
import { FcSms } from "react-icons/fc";

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
        height: '250px'
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
      canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting

    } = useApplicationSettings()


   

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
      <img src="/images/logo/logo-small.png " className='w-[60px] h-[60px] rounded-full' alt="quality-smiles-logo" />

      <MenuOpenSharpIcon  onClick={()=> setSeeSideBar(!seeSidebar)} style={{ width: '40px', height: '40px' }}/>
      </div>
      <div className='mt-4'>
      <hr className='border-1 opacity-25' />

      </div>
      <div className='mt-5 text-white text-2xl'>Admin</div>
      <ul className="space-y-2 font-medium mt-2">
         <li>
            <a href="#" className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
              <img src="/images/logo/icons8-dashboard-64.png"  className='w-8 h-8 bg-white rounded-full' alt="dashboard" />
               <span className="ms-3 text-lg"><Link to='/admin/dashboard'>Dashboard</Link></span>
            </a>
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
                  <li  >

                     <a href="#" className="flex items-center w-full p-1  transition duration-75 rounded-lg 
                     pl-11 group hover:bg-neutral-300
                     hover:bg-opacity-25 text-white gap-x-2">
                      <img src="/images/logo/icons8-chat-100.png" className='w-10 h-10' alt="chat" />

                        Chat</a>
                  </li>
                  <li >
                     <a href="#" className="flex items-center  gap-x-2 w-full p-1 transition duration-75 
                     rounded-lg pl-11 group hover:bg-neutral-300
                     hover:bg-opacity-25 text-white ">
                                             <img src="/images/logo/icons8-calendar-64.png" alt="calender" className='w-8 h-8' />

                        Calendar</a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center  gap-x-2 w-full p-2  transition duration-75 rounded-lg 
                     pl-11 group  text-white hover:bg-neutral-300
                     hover:bg-opacity-25">
                        <img src="/images/logo/icons8-email-48.png" alt="email" className='w-8 h-8' />

                        Email</a>
                  </li>

                  <li>
                     <a href="#" className="flex  gap-x-2 items-center w-full p-2  transition duration-75 rounded-lg 
                     pl-11 group hover:bg-neutral-300
                     hover:bg-opacity-25 text-white ">
                              <img src="/images/logo/icons8-task-48.png" alt="task" className='w-8 h-8' />

                        Tasks</a>
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
         <hr className='border-1 opacity-25'  />
         <div className='mt-5 text-white text-2xl'>{'Location'}</div>

         <li >

            <a href="#" className="flex items-center p-2  rounded-lg text-white    mt-4 hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/icons8-location-48.png" className='w-5 h-5' alt="" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/location'>{'Location'}</Link></span>
               
            </a>
         </li>

         </>




         <li>
            <a href="#" className="flex items-center p-2  rounded-lg text-white  hover:bg-neutral-300
            hover:bg-opacity-25
              group">
               <AirlineStopsIcon  className=' group-hover:text-white'/>
               <span className="flex-1 ms-3 whitespace-nowrap  text-lg"><Link to='/admin/sublocation'>Sub Location</Link></span>
            </a>
         </li>


         <hr className='border-1 opacity-25' />
         <div className='mt-5 text-white text-2xl'>Store</div>


         <li>
            <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/icons8-store-64.png" alt="wallet" className='w-8 h-8' />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/store'>Store</Link></span>
            </a>
         </li>


         <li>
            <a  className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/1376035_blond_insurer_manager_marketer_person_icon.png" alt="wallet" className='w-8 h-8' />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/store-managers'>Store Manager</Link></span>
            </a>
         </li>

         <hr className='border-1 opacity-25' />
         <div className='mt-5 text-white text-2xl'>Payments</div>

         <li>
            <a href="#" className="flex items-center p-2  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25
              group">
             <img src="/images/logo/icons8-travel-portable-cash-storage-holder-purse-accessory-28.png" alt="wallet" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/payment'>Payments</Link></span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-1  rounded-lg text-white hover:bg-neutral-300
            hover:bg-opacity-25 group">
             <img src="/images/logo/icons8-invoice-64.png" alt="invoice"  className='w-8 h-8' />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg">Invoices</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-1  rounded-lg text-white hover:bg-neutral-300
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
            <a href="#" className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-taxes-64.png"  className='w-8 h-8' alt="exenses" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/expenses'>Expenses</Link></span>
            </a>
         </li>
         <div className='mt-5 text-white text-2xl'>Customers</div>

         <hr className='border-1 opacity-25' />
         <li>
            <a href="#" className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
              <img src="/images/logo/icons8-customers-100.png" className='w-10 h-10' alt="customers" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg" ><Link to='/admin/customers'>Customers</Link></span>
            </a>
         </li>

         <li>
            <a href="#" className="flex items-center p-2  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-worker-50.png" className='w-8 h-8' alt="worker" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/service-provider'>Service Providers</Link></span>
            </a>
         </li>
         
       
         <hr className='border-1 opacity-25' />
         <div className='mt-3 text-white text-2xl'>User Invitation</div>
         <li>
            <a className="flex items-center p-1  rounded-lg
             text-white hover:bg-neutral-300
             hover:bg-opacity-25 group">
               <img src="/images/logo/icons8-user-100.png" className='w-10 h-10' alt="users" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/user-management'>Manage Users</Link></span>
            </a>
         </li>

         <hr className='border-1 opacity-25' />
         <div className='mt-3 text-white text-2xl'>SMS</div>
         <li>
            <a className="flex items-center p-1  rounded-lg
             text-white hover:bg-neutral-300
             hover:bg-opacity-25 group">

               <div className='bg-white rounded-full p-3'>
               <FcSms   className='w-5 h-5' />
               </div>
               
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/sms'>Manage SMS</Link></span>
            </a>
         </li>

         
      { user === 'super_administrator' || canreadSetting  === true  || canManageSetting == true ? (
         <>

<div className='translate-y-[10px] '>

         <hr className='border-1 opacity-25' />

            
         
            <div className='text-white text-2xl'>Settings</div> 

         <li >
            <a href="#" className="flex items-center p-1  rounded-lg text-white
             hover:bg-neutral-300
             hover:bg-opacity-25 group">
             <img src="/images/logo/icons8-settings-48.png"   className='w-10 h-10' alt="settings" />
               <span className="flex-1 ms-3 whitespace-nowrap text-lg"><Link to='/admin/general-settings'>Settings
               </Link></span>
            </a>
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