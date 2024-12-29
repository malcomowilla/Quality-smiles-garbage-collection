import React from 'react'
import { useState } from 'react';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { useLocation } from 'react-router-dom';
import { GrTicket } from "react-icons/gr";
import {Link} from 'react-router-dom'
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineSms } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FaPerson } from "react-icons/fa6";



const BottomNavigation = () => {

    const [activeItem, setActiveItem] = useState('Dashboard');
    const {currentUser, isOpenEditProfile, setisOpenEditProfile,
        setSeeSideBar,setIsSidebarVisible,
        user, setUser,
      canreadSetting, setCanReadSetting,canManageSetting, setCanManageSetting,canReadSms, canManageSms,
      canReadCalendar,canManageCalendar,canReadTickets,canManageTickets,
    canReadServiceProviders,canManageServiceProviders,canReadCustomers,canManageCustomers,canReadStoreManager,
    canManageStoreManager,
    canManageStore,canReadStore,canManageSubLocation,canReadSubLocation,canReadLocation,canManageLocation,
      imagePreview, user_name, setIsOpenProvider, canReadDashboard,
      canReadServiceProviderStats,
      canManagageIndividualEmail,
      canManageUsers, canReadUsers,
      bottomNavigation, setBottomNavigation,
      canReadCustomerStats
    } = useApplicationSettings()
    const location = useLocation();

  return (  
    <>
{bottomNavigation  ? (
    <>



{location.pathname.includes('/admin') && !location.pathname.includes('/admin/chat-messaging') ? (
  <div className='flex justify-center '>
      

  <div className="border-b border-gray-200 dark:border-gray-700 fixed bottom-0
   dark:bg-black bg-white  z-50">
      <ul  className="flex flex-wrap -mb-px text-sm font-medium text-center ">


          <li className="me-2" onClick={() => {
            setisOpenEditProfile(true)
            setActiveItem('Profile')
            
          } }>
              <a href="#" className={`inline-flex items-center justify-center  p-4 
                 hover:border-b-2 text-lg
              rounded-t-lg 
              ${activeItem === 'Profile' && 'dark:text-green-500 border-b-2  text-green-500' } 
              `}>
  
  
                  <svg className="w-5 h-5 me-2  hover:dark:text-gray-600 hover:dark:border-gray-300
                   dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 
                      0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0
                       1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>Profile
              </a>
          </li>

{user === 'super_administrator' || canReadDashboard ? (
  <Link to='/admin/dashboard'>
  <li className="me-2" onClick={() => {
     setActiveItem('Dashboard')
     if (window.innerWidth < 1150) {
       
        setSeeSideBar('hidden');
        setIsSidebarVisible('hidden'); // Hide the sidebar
      }
  } }>
      <a href="#" className={`inline-flex items-center text-lg justify-center p-4 
       hover:border-b-2 rounded-t-lg  ${activeItem === 'Dashboard' && 'dark:text-green-500 border-b-2  text-green-500' } 
         group`} aria-current="page">
          <svg className="w-5 h-5 me-2 " aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 
              7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857
               0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169
                10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 
                0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 
                1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 
                10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857
                 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
          </svg>Dashboard
      </a>
  </li>
  </Link>
): null}

        


{user === 'super_administrator' || canreadSetting || canManageSetting ? (

<Link to='admin/general-settings'>
          <li className="me-2" onClick={() => {
            setActiveItem('Settings')
            if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          }  }>
              <a href="#" className={`inline-flex items-center justify-center p-4 hover:border-b-2 
               rounded-t-lg  text-xl
                ${activeItem === 'Settings' && 'dark:text-green-500  border-b-2 text-green-500' } group`}>
                  <svg className={`w-5 h-5 me-2 text-gray-400 
                   dark:text-gray-500 
                   ${activeItem === 'Settings' && 'dark:text-green-500   text-green-500' }
                   `}
                   
                   aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1
                       0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 
                       11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2
                        0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1
                         0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243
                          3.243 0 0 0 13.25 5.5Z"/>
                  </svg>Settings
              </a>
          </li>
</Link>
) : null}



{user === 'super_administrator' || user === 'administrator'  || user === 'agent'
|| user === 'customer_support' || canManageTickets || canReadTickets   ? (

<Link to='admin/support-tickets' >  
          <li className="me-2" onClick={() => {
            setActiveItem('Tickets')
             if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Tickets' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>Tickets</p>
                    <GrTicket className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>
) : null}






{user === 'super_administrator' || canManagageIndividualEmail ? (

<Link to='admin/send-email' >  
          <li className="me-2" onClick={() => {
            setActiveItem('Email')
             if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Email' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-xl'>Email</p>
                    <AiOutlineMail className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>

) : null}



{user === 'super_administrator' || canReadSms || canManageSms ? (

<Link to='admin/sms' >  
          <li className="me-2" onClick={() => {
            setActiveItem('SMS')
            if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'SMS' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>SMS</p>
                    <MdOutlineSms className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>
): null}






{user === 'super_administrator' || canManageUsers || canReadUsers  ? (
    <Link to='admin/user-management' >  
          <li className="me-2" onClick={() => {
            setActiveItem('Users')
            if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Users' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>Users</p>
                    < FaRegUser className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>
): null}




{user === 'super_administrator'   || canReadCustomerStats ? (
    <Link to='admin/customer-stats' >  
          <li className="me-2" onClick={() => {
            setActiveItem('Customer Stats')
             if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          }  }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Customer Stats' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>Customer Stats</p>
                    < FcBullish className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>
) : null}






{user === 'super_administrator'  || 
    canReadServiceProviderStats ? (
<Link to='admin/service-provider-stats' >  
          <li className="me-2" onClick={() =>  {
            setActiveItem('Provider Stats')
             if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Provider Stats' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>Provider Stats</p>
                    < FcComboChart className='w-5 h-5'/>
                    </div>
              </a>
          </li>
</Link>

    ): null}





{user === 'super_administrator' || user === 'administrator' || 
    canManageServiceProviders || canReadServiceProviders ? (
<Link to='admin/service-provider' >  
          <li className="me-2" onClick={() =>  {
            setActiveItem('Service Provider')
            if (window.innerWidth < 1150) {
               
                setSeeSideBar('hidden');
                setIsSidebarVisible('hidden'); // Hide the sidebar
              }
          } }>
              <a href='' className={`inline-flex items-center justify-center p-4 hover:border-b-2
               rounded-t-lg 
                
                ${activeItem === 'Service Provider' && 'dark:text-green-500  border-b-2 text-green-500' }
                `}>


                    <div className='flex items-center gap-2 '>
                    <p className='text-lg'>Service Provider </p>
                    < FaPerson className='w-5 h-5 text-yellow-500'/>
                    </div>
              </a>
          </li>
</Link>

    ) : null}




{/* 
          <li>
              <a className="inline-block p-4 text-gray-400 rounded-t-lg  dark:text-gray-500">Disabled</a>
          </li> */}
      </ul>
  </div>
  
      </div>
) : ''}

    </>
): null}


  


    </>
  )
}

export default BottomNavigation
