import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import AppsIcon from '@mui/icons-material/Apps';
import PlaceIcon from '@mui/icons-material/Place';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import {useState, useEffect, useCallback} from 'react'
import { FcSms } from "react-icons/fc";
import Lottie from 'react-lottie';
import ChatAnimation from '../animation/chats2.json'
import { BsChatSquareText } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';
import { FcManager } from "react-icons/fc";



const MenuItem = ({ icon, label, to, isActive }) => (
   <Link to={to}>
     <motion.div 
       whileHover={{ scale: 1.02 }}
       whileTap={{ scale: 0.98 }}
       className={`flex items-center gap-4 px-5 py-3 mx-3 rounded-xl
         transition-all duration-200
         ${isActive 
           ? 'bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg shadow-indigo-500/30' 
           : 'hover:bg-white/10'}`}
     >
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center
         backdrop-blur-xl
         ${isActive 
           ? 'bg-white/20' 
           : 'bg-white/5'}`}>
         {icon}
       </div>
       <span className="text-[15px] font-medium text-white/90">
         {label}
       </span>
     </motion.div>
   </Link>
 );
 const MenuSection = ({ title, children }) => (
   <div className="mb-6">
     {title && (
       <h3 className="px-6 mb-4 text-sm font-medium text-white/50 uppercase tracking-wider">
         {title}
       </h3>
     )}
     <div className="space-y-1">
       {children}
     </div>
   </div>
 );




const Sidebar = () => {

   const [activeItem, setActiveItem] = useState('dashboard');



 const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };



 const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    }


   const variantUl = {
      hidden: {
        opacity: 0,
        overflow: 'hidden',
        height: 0
        
      },
    

      

      visible: {
        opacity: 1,
        overflow: 'hidden',
        height: '150px'
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
      imagePreview, user_name, setIsOpenProvider

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
   <div  data-theme="forest" className="h-full px-3 py-4  scrollbar-thumb-green-900
    scrollbar-track-slate-500 overflow-x-hidden 
     dark:bg-teal-800 scrollbar-thin overflow-y-auto">


 <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-6 px-6 border-b border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar 
              {...stringAvatar(user_name.toString())}   
              style={{width: 50, height: 50}}
              className="ring-2 ring-white/20 shadow-xl"
            />
          </motion.div>
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-medium text-xl"
            >
              {user_name}
            </motion.div>
            <p className=' text-white text-lg'>{user === 'super_administrator' ? 'SuperAdmin' : null}</p>
    <p className='text-white'>{user === 'administrator' ? 'Admin' : null}</p>
    <p className='text-white'>{user === 'store_manager' ? 'StoreManager' : null}</p>
    <p className=' text-white'>{user === 'customer' ? 'Customer' : null}</p>
    <p className=' text-white'>{user === 'agent' ? 'Agent' : null}</p>
    <p className='text-white'>{user === 'customer_support' ? 'Customer Support' : null}</p>

            {/* <span className="text-sm text-white/50">Administrator</span> */}
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-auto"
          >
            <MenuOpenSharpIcon
              onClick={() => setSeeSideBar(!seeSidebar)}
              style={{ width: '24px', height: '24px' }}
              className="text-white/70 hover:text-white cursor-pointer"
            />
          </motion.div>
        </div>
      </motion.div>

  {/* Search Bar */}
  <div className="relative">
          <input 
            type="text"
            placeholder="Search..."
            className="w-full h-11 rounded-xl bg-white/5 border border-green/10
              px-5 text-white placeholder-white/30
              focus:outline-none focus:ring-2 focus:ring-green-500/40
              transition-all duration-200"
          />
        </div>

      
      <div className='mt-5 text-white '>Admin</div>
      <ul className="space-y-2 font-medium mt-2">
         <li>
         <Link to="/admin/dashboard">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveItem('dashboard')
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${activeItem === 'dashboard' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                  : 'hover:bg-white/10'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${activeItem === 'dashboard' ? 'bg-white/20' : 'bg-white/5'}`}>
                <img 
                  src="/images/logo/icons8-dashboard-64.png"
                  className="w-6 h-6"
                  alt="dashboard"
                />
              </div>
              <span className={`font-medium ${activeItem === 'dashboard' ? 'text-white' : 'text-white'}`}>
                 <p className=''>Dashboard</p>
              </span>
            </motion.div>
          </Link>
         </li>
         <li>
             <motion.div variants={menuItemVariants}>
            <motion.button
              onClick={() => setIsSeen(!isSeen)}
              className="w-full flex items-center justify-between px-4 py-3
                rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <img 
                    src="/images/logo/icons8-application-48.png"
                    className="w-6 h-6 opacity-80"
                  />
                </div>
                <span className="text-white/90 font-medium ">Application</span>
              </div>
              <motion.div
                animate={{ rotate: isSeen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </motion.div>
            </motion.button>
            </motion.div>



            <motion.ul    id="dropdown-example"   variants={variantUl}
             transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={isSeen ? "visible" : "hidden"} className={`py-2 space-y-2  
             `}>
                 
               

               
  {/* Calendar Item */}
  {(canManageCalendar || canReadCalendar || user === 'super_administrator') && (
    // images/logo/icons8-calendar-64.png
                    <motion.div
                      variants={menuItemVariants}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/admin/calendar">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveItem('calendar')
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${activeItem === 'calendar' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                  : 'hover:bg-white/10'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${activeItem === 'calendar' ? 'bg-white/20' : 'bg-white/5'}`}>
                <img 
                  src="/images/logo/icons8-calendar-64.png"
                  className="w-6 h-6"
                  alt="calendar"
                />
              </div>
              <span className={`font-medium ${activeItem === 'calendar' ? 'text-white' : 'text-white'}`}>
                 <p className=''>Calendar</p>
              </span>
            </motion.div>
          </Link>
                    </motion.div>
                  )}

                  
 {/* Chat Item */}
 {/* BsChatSquareText */}
<motion.div
                    variants={menuItemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                   <Link to="/admin/chat-messaging">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveItem('chats')
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${activeItem === 'chats' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                  : 'hover:bg-white/10'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${activeItem === 'chats' ? 'bg-white/20' : 'bg-white/5'}`}>
                <BsChatSquareText
                 
                  className="w-6 h-6"
                 
                />
              </div>
              <span className={`font-medium ${activeItem === 'chats' ? 'text-white' : 'text-white'}`}>
                 <p className=''>Chats</p>
              </span>
            </motion.div>
          </Link>
                  </motion.div>
                 
            </motion.ul>
         </li>



        {/* Driver Section */}
        <div className='mt-5 text-white'>Driver</div>
<MenuSection style={{color: 'white'}}    className=''>
  <Link to='/admin/view-driver'>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.preventDefault()
        setActiveItem('driver')
      }}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl
        transition-all duration-200 group
        ${activeItem === 'driver' 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-teal-500/30' 
          : 'hover:bg-white/10'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
        ${activeItem === 'driver' ? 'bg-white/20' : 'bg-white/5'}`}>
        <img 
          src="/images/logo/icons8-garbage-truck-64.png" 
          className="w-6 h-6"
          alt="driver" 
        />
      </div>
      <span className={`font-medium   ${activeItem === 'driver' ? 'text-white'
         : 'text-white'}`}>
        Driver
      </span>
    </motion.div>
  </Link>
</MenuSection>

  {/* Location Section */}

   <div className='mt-5 text-white '>Location   Management</div>
{(user === 'super_administrator' || canManageLocation || canReadLocation || user === 'administrator') && (
  <MenuSection>
    <Link to='/admin/location'>
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setActiveItem('location')
        }}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl
          transition-all duration-200 group
          ${activeItem === 'location' 
            ? 'bg-gradient-to-r from-green-500 to-cyan-500 shadow-lg shadow-blue-500/30' 
            : 'hover:bg-white/10'}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center
          ${activeItem === 'location' ? 'bg-white/20' : 'bg-white/5'}`}>
          <img 
            src="/images/logo/icons8-location-48.png" 
            className="w-6 h-6"
            alt="location" 
          />
        </div>
        <span className={`font-medium  ${activeItem === 'location' ? 'text-white' : 'text-white'}`}>
          Location
        </span>
      </motion.div>
    </Link>


  {/* Sub Location */}
  {(user === 'super_administrator' || user === 'administrator' || 
      canManageSubLocation || canReadSubLocation) && (
      <Link to='/admin/sublocation'>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveItem('sublocation')
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl
            transition-all duration-200 group mt-1
            ${activeItem === 'sublocation' 
              ? 'bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg shadow-blue-400/30' 
              : 'hover:bg-white/10'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
            ${activeItem === 'sublocation' ? 'bg-white/20' : 'bg-white/5'}`}>
            <AirlineStopsIcon  className={` w-6 h-6
              ${activeItem === 'sublocation' ? 'text-white' : 'text-white/70'}
            `}/>
          </div>
          <span className={`font-medium  ${activeItem === 'sublocation' ? 'text-white' : 'text-white'}`}>
            Sub Location
          </span>
        </motion.div>
      </Link>
    )}
  </MenuSection>
)}


        

{/* Store Section */}
<div className='mt-5 text-white '>Store Management</div>
<MenuSection >
  {(user === 'super_administrator' || user === 'administrator' || 
    canManageStore || canReadStore) && (
    <>
        <Link to='/admin/store'>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveItem('store')
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl
            transition-all duration-200 group mt-1
            ${activeItem === 'store' 
               ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                  : 'hover:bg-white/10'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
            ${activeItem === 'store' ? 'bg-white/20' : 'bg-white/5'}`}>
            <img  src="/images/logo/icons8-store-64.png"  className={` w-6 h-6
              ${activeItem === 'store' ? 'text-white' : 'text-white/70'}
            `}/>
          </div>
          <span className={`font-medium  ${activeItem === 'store' ? 'text-white' : 'text-white'}`}>
            Store
          </span>
        </motion.div>
      </Link>

      {/* Store Manager */}
      {(user === 'super_administrator' || user === 'administrator' || 
        canManageStoreManager || canReadStoreManager) && (
          <Link to='/admin/store-managers'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('store-manager')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'store-manager' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'store-manager' ? 'bg-white/20' : 'bg-white/5'}`}>
              <FcManager  className={` w-6 h-6
                ${activeItem === 'store-manager' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'store-manager' ? 'text-white' : 'text-white'}`}>
              Store Manager
            </span>
          </motion.div>
        </Link>
         
        
      )}
    </>
  )}
</MenuSection>
        

{/* Finance Section */}
<div className='mt-5 text-white '>Finance</div>
<MenuSection >
  


<Link to='/admin/payment'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('payments')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'payments' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'payments' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img  src="/images/logo/icons8-travel-portable-cash-storage-holder-purse-accessory-28.png"  className={` w-6 h-6
                ${activeItem === 'payments' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'payments' ? 'text-white' : 'text-white'}`}>
              Payments
            </span>
          </motion.div>
        </Link>

        <Link to='/admin/invoices'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('invoices')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'invoices' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'invoices' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img  src="/images/logo/icons8-invoice-64.png"  className={` w-6 h-6
                ${activeItem === 'invoices' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'invoices' ? 'text-white' : 'text-white'}`}>
                Invoices
            </span>
          </motion.div>
        </Link>

  <MenuItem
    to="/admin/payment-reports"
    icon={<img src="/images/logo/icons8-report-64.png" className="w-6 h-6" />}
    label="Payment Reports"
    isActive={activeItem === 'payment-reports'}
    onClick={(e) => {
      e.preventDefault()
      setActiveItem('payment-reports')
    }}
  />

<Link to='/admin/expenses'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('expenses')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'expenses' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'expenses' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img  src="/images/logo/icons8-taxes-64.png"  className={` w-6 h-6
                ${activeItem === 'expenses' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'expenses' ? 'text-white' : 'text-white'}`}>
              Expenses
            </span>
          </motion.div>
        </Link>
       </MenuSection>


       

       
        
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

        

            <>
   


{/* Customers Section */}
<div className='mt-5 text-white '>Customer Management</div>
{(user === 'super_administrator' || user === 'administrator' || 
  canManageCustomers || canReadCustomers) && (
  <MenuSection >
     <Link to='/admin/customers'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('customers')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'customers' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'customers' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img  src="/images/logo/icons8-customers-100.png"  className={` w-6 h-6
                ${activeItem === 'customers' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'customers' ? 'text-white' : 'text-white'}`}>
              Customers
            </span>
          </motion.div>
        </Link>
  </MenuSection>
)}


            </>

        

{/* Service Providers Section */}
<div className='mt-5 text-white '>Service Management</div>
<MenuSection >
  {(user === 'super_administrator' || user === 'administrator' || 
    canManageServiceProviders || canReadServiceProviders) && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Link to='/admin/service-provider'>
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveItem('service-provider')
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl
            transition-all duration-200 group
            ${activeItem === 'service-provider' 
              ? 'bg-gradient-to-r from-green-500 to-indigo-500 shadow-lg shadow-indigo-500/30' 
              : 'hover:bg-white/10'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
            backdrop-blur-xl
            ${activeItem === 'service-provider' ? 'bg-white/20' : 'bg-white/5'}`}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/images/logo/icons8-worker-50.png" 
                className="w-6 h-6 object-contain" 
                alt="Service Provider"
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col">
            <span className={`font-medium ${
              activeItem === 'service-provider' ? 'text-white' : 'text-white'
            }`}>
              Service Providers
            </span>
            <span className="text-xs text-white">
              Manage service provider accounts
            </span>
          </div>

          {/* Status Indicator */}
          {activeItem === 'service-provider' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-lg
               shadow-green-400/50"
            />
          )}
        </motion.div>
      </Link>

      {/* Quick Actions */}
      {activeItem === 'service-provider' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 ml-14 space-y-1"
        >
            <motion.div
            onClick={()=> setIsOpenProvider(true)}
              whileHover={{ x: 2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                text-white/60 hover:text-white/90 hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm">Add New Provider</span>
            </motion.div>

          <Link to="/admin/service-provider/reports">
            <motion.div
              whileHover={{ x: 2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                text-white/60 hover:text-white/90 hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span className="text-sm">View Reports</span>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Provider Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 mx-4 p-3 rounded-xl bg-white/5 backdrop-blur-lg"
      >
        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-white">24</span>
            <span>Active</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-white">8</span>
            <span>Pending</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-white">95%</span>
            <span>Rating</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</MenuSection>




{/* User Management Section */}
<div className='mt-5 text-white '>User Management</div>
<MenuSection >
<Link to='/admin/user-management'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('user-management')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'user-management' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'user-management' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img src="/images/logo/icons8-user-100.png"  className={` w-6 h-6
                ${activeItem === 'user-management' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'user-management' ? 'text-white' : 'text-white'}`}>
              Manage Users
            </span>
          </motion.div>
        </Link>
</MenuSection> 

      


{/* SMS Section */}
{/* FcSms */}
<div className='mt-5 text-white '>Communication</div>
{(user === 'super_administrator' || canReadSms || canManageSms) && (
  <MenuSection >
     <Link to='/admin/sms'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('sms')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'sms' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'sms' ? 'bg-white/20' : 'bg-white/5'}`}>
              <FcSms   className={` w-6 h-6
                ${activeItem === 'sms' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'sms' ? 'text-white' : 'text-white'}`}>
              Manage SMS
            </span>
          </motion.div>
        </Link>
  </MenuSection>
)}

{/* Support Tickets */}
<div className='mt-5 text-white '>Support Tickets</div>
{/* /images/logo/support.png */}
{(user === 'super_administrator' || user === 'administrator' || 
  canManageTickets || canReadTickets || user === 'agent') && (
  <MenuSection >
    <Link to='/admin/support-tickets'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('tickets')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'tickets' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'tickets' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img src="/images/logo/support.png" className={` w-6 h-6
                ${activeItem === 'tickets' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'tickets' ? 'text-white' : 'text-white'}`}>
              Support Tickets
            </span>
          </motion.div>
        </Link>
  </MenuSection>
)}

{/* Settings Section */}
<div className='mt-5 text-white '>Settings</div>
{/* /images/logo/icons8-settings-48.png */}
{(user === 'super_administrator' || canreadSetting || canManageSetting) && (
  <MenuSection >
     <Link to='/admin/general-settings'>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveItem('settings')
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-200 group mt-1
              ${activeItem === 'settings' 
                 ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${activeItem === 'settings' ? 'bg-white/20' : 'bg-white/5'}`}>
              <img src="/images/logo/icons8-settings-48.png" className={` w-6 h-6
                ${activeItem === 'settings' ? 'text-white' : 'text-white/70'}
              `}/>
            </div>
            <span className={`font-medium  ${activeItem === 'settings' ? 'text-white' : 'text-white'}`}>
              Settings
            </span>
          </motion.div>
        </Link>
  </MenuSection>
)}

      </ul>
   </div>
</motion.aside>

</>
  )
}


export default Sidebar