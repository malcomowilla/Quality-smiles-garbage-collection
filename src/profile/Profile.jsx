import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";

  import { motion, AnimatePresence } from "framer-motion";
  import { Dispatch, SetStateAction, useState, useEffect, useCallback } from "react";
  import { IoIosLogOut } from "react-icons/io";
  import {useApplicationSettings} from '../settings/ApplicationSettings'
  import {useNavigate, redirect} from 'react-router-dom'
  import { RiDeleteBack2Line } from "react-icons/ri";
  import EditProfile from './EditProfile'
  import { LiaEdit } from "react-icons/lia";
  import { CiLogout } from "react-icons/ci";

  import Avatar from '@mui/material/Avatar';
  import Stack from '@mui/material/Stack';
  import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
  import { createConsumer } from '@rails/actioncable';

//   import { IconType } from "react-icons";
// onClick={() => setOpen((pv) => !pv)}

  const Profile = ({open, setOpen}) => {
const navigate = useNavigate()
const [isOpenEditProfile, setisOpenEditProfile] = useState(false)
const [onlineStatus, setOnlineStatus] = useState({});
const [connectionStatus, setConnectionStatus] = useState('connected');

const {id, imagePreview, setUpdateFormData, updateFormData, setImagePreview, user_name, user,
setopenLogoutSuccess,
handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
    setopenLoginSuccess,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData, 
       handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  
      setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,
       handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,
       handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,adminFormSettings,
       setopenLogoutSession
} = useApplicationSettings()


const {enable_2fa_for_admin_passkeys} = adminFormSettings




// const storedDataJson = localStorage.getItem("admin settings");
// const storedDa = storedDataJson ? JSON.parse(storedDataJson) : {};         
  
// const enable_2fa_for_admin_passkeys = storedDa.enable_2fa_for_admin_passkeys


console.log('enable_2fa_for_admin_passkeys profile=>', enable_2fa_for_admin_passkeys)






const handlegetAdminSettings = useCallback(
  async()=> {
     
       

     try {
       const response = await fetch(`/api/allow_get_admin_settings`, {
       method: 'GET',

       
       headers: {
         "Content-Type"  : 'application/json'
       },
       })



       const newData = await response.json()
       if (response.ok) {
       // const use_auto_generated_number = newData.use_auto_generated_number
       // const prefix = newData.prefix
       const login_with_otp = newData[0].login_with_otp 
       const login_with_web_auth = newData[0].login_with_web_auth
       const login_with_otp_email = newData[0].login_with_otp_email
       const send_password_via_email = newData[0].send_password_via_email
       const send_password_via_sms = newData[0].send_password_via_sms
       const check_is_inactive = newData[0].check_is_inactive
       const check_inactive_hrs = newData[0].check_inactive_hrs
       const check_inactive_minutes = newData[0].check_inactive_minutes
       const enable_2fa_for_admin = newData[0].enable_2fa_for_admin
       const enable_2fa_for_admin_passkeys = newData[0].enable_2fa_for_admin_passkeys
       const check_inactive_days = newData[0].check_inactive_days
     
      //  const {login_with_otp} = newData[0]
      console.log('enable_2fa_for_admin_passkeys2', enable_2fa_for_admin_passkeys)
       setAdminFormSettings((prevData)=> ({...prevData, login_with_otp,login_with_web_auth,
        login_with_otp_email,send_password_via_email, send_password_via_sms, check_is_inactive,
        check_inactive_hrs,enable_2fa_for_admin,check_inactive_minutes,enable_2fa_for_admin_passkeys,
        check_inactive_days
       }))
     
       
       } else {
       console.log('failed to fetch')
       setOpenOfflineError(true)
       }
       } catch (error) {
       console.log(error)
       setOpenOfflineError(true)
       
       }
     },
 
[]
)


  

useEffect(() => {
  handlegetAdminSettings()
}, [handlegetAdminSettings]);












    const logout = async ()=> {
      try {
        const response = await fetch('/api/logout-admin', {
          method: 'DELETE'
        })
    if (response.ok) {
      // navigate('/signin')
      if (enable_2fa_for_admin_passkeys === 'true' || enable_2fa_for_admin_passkeys === true) {
        navigate('/signup2fa_passkey')
        
      }else(
        navigate('/signin')
      )
      // toast.error(
      //   <div>
      //     <p className='playwrite-de-grund font-extrabold text-xl'>Upcoming Event
      //       <div> <span className='font-thin flex gap-3'>
         
      //         </span></div></p>
      //   </div>,
       
      // );
      localStorage.removeItem('acha umbwakni');
      setopenLogoutSuccess(true)
      setopenLogoutSession(true)
     
      
    
    } else {
      console.log('failed to logout')
    }
      } catch (error) {
        console.log('no internet conection', error)
      }
    } 







    const storedData = JSON.parse(localStorage.getItem("ojijo"));
    
    const fetchUpdatedProfile = useCallback(
      
       
      async() => {
        const requestParams = {
                id:storedData.id,
              
              }
        

        const url = "/api/updated_admin?" + new URLSearchParams(requestParams)
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


useEffect(() => {
  let heartbeatInterval;
  let subscription;

  const setupPresenceChannel = () => {
    const cable = createConsumer("ws://localhost:4000/cable");
    
    subscription = cable.subscriptions.create("PresenceChannel", {
      connected() {
        console.log("Connected to presence channel!");
        setConnectionStatus('connected');
        
        // Start sending heartbeats
        heartbeatInterval = setInterval(() => {
          if (this.connected) {
            this.perform('heartbeat');
          }
        }, 25000); // Send heartbeat every 25 seconds
      },
      
      received(data) {
        console.log('last seen', data.last_seen)
        setOnlineStatus(prev => ({
          ...prev,
          [data.user_id]: {
            online: data.online,
            lastSeen: data.last_seen
          }
        }));
      },
      
      disconnected() {
        console.log("Disconnected from presence channel!");
        setConnectionStatus('disconnected');
        clearInterval(heartbeatInterval);
        
        // Update local status to offline
        setOnlineStatus(prev => ({
          ...prev,
          [id]: {
            online: false,
            lastSeen: new Date()
          }
        }));
      }
    });
  };

  // Setup connection status monitoring
  const handleOnline = () => {
    console.log('Browser online');
    setupPresenceChannel();
  };

  const handleOffline = () => {
    console.log('Browser offline');
    setConnectionStatus('disconnected');
    subscription?.unsubscribe();
    clearInterval(heartbeatInterval);
    
    // Update local status to offline
    setOnlineStatus(prev => ({
      ...prev,
      [id]: {
        online: false,
        lastSeen: new Date()
      }
    }));
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Initial setup
  if (navigator.onLine) {
    setupPresenceChannel();
  } else {
    setConnectionStatus('disconnected');
  }

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    subscription?.unsubscribe();
    clearInterval(heartbeatInterval);
  };
}, [id]);




const MenuItem = ({ icon, text, onClick }) => {
  return (
    <motion.div
      variants={{
        open: { y: 0, opacity: 1 },
        closed: { y: 20, opacity: 0 }
      }}
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className='flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 
        transition-colors cursor-pointer'
    >
      <span className='text-gray-400'>{icon}</span>
      <span className='text-gray-600 font-medium'>{text}</span>
    </motion.div>
  );
};



  // Add this to your render method where you want the status indicator
  const OnlineIndicator = ({ userId }) => {
    const status = onlineStatus[userId];
    const isOffline = connectionStatus === 'disconnected' || !status?.online;
    
    return (
      <div className="relative">
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2
         border-white rounded-full ${
          isOffline ? 'bg-gray-400' : 'bg-green-500'
        }`} />

        
        {isOffline && (
          <div className="absolute bottom-5 right-0 text-xs text-black">
            {connectionStatus === 'disconnected' 
              ? 'Offline (No connection)' 
              : `Last seen: ${formatLastSeen(status?.lastSeen)}`
            }
          </div>
        )}
      </div>
    );
  };



    return (

    <>

<EditProfile 
        isOpenEditProfile={isOpenEditProfile} 
        setisOpenEditProfile={setisOpenEditProfile} 
      />
      
      <div className="fixed top-0 right-[100px] max-md:right-[150px] p-4 sm:relative sm:p-8 sm:pb-56 
        flex items-center justify-center z-50">
       <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={open ? {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 }
  } : {
    opacity: 0.95,
    scale: 0.95,
    transition: { duration: 0.2 }
  }}
  className="relative"
>
          {/* Profile Trigger Button */}
          <motion.div 
            className='flex items-center gap-x-2 bg-white/10 backdrop-blur-lg 
              rounded-full p-2 cursor-pointer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((pv) => !pv)}
          >
            <div className="relative">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >

<Avatar 
                  style={{
                    width: 65,
                    height: 65,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}    
                  {...stringAvatar(user_name)} 
                />
              </motion.div>
              <OnlineIndicator userId={id} />
            </div>

            <motion.div 
              className='text-wrap hidden sm:block'
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className='dark:text-black text-white font-semibold text-sm'>
                {user_name}
              </p>
              <p className='dark:text-black text-white text-xs opacity-75'>
                {user === 'super_administrator' && 'SuperAdmin'}
                {user === 'administrator' && 'Admin'}
                {user === 'store_manager' && 'StoreManager'}
                {user === 'customer' && 'Customer'}
                {user === 'agent' && 'Agent'}
                {user === 'customer_support' && 'Customer Support'}
              </p>
            </motion.div>
          </motion.div>
           {/* Dropdown Menu */}
           <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1 p-4 rounded-2xl bg-white shadow-xl 
                  absolute top-[120%] right-0 w-64 sm:w-48 overflow-hidden
                  border border-gray-100"
              >
                {/* Close Button */}
                <motion.div 
                  className='flex justify-end mb-2'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RiDeleteBack2Line  
                    onClick={() => setOpen(false)}  
                    className='text-black hover:text-gray-600 text-xl'
                  />
                </motion.div>

                {/* Menu Items */}
                <motion.div 
                  className='flex flex-col gap-2'
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                    <MenuItem
                    icon={<LiaEdit className='text-black' />}
                    text="Edit Profile"
                    onClick={() => setisOpenEditProfile(true)}
                  />
                  <MenuItem
                    icon={<CiLogout  className='text-black'/>}
                    text="Logout"
                    onClick={logout}
                  />
                </motion.div>
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      </>
    );
  };
  
  const Option = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md
         hover:bg-green-100 
         text-slate-700 hover:text-black transition-colors cursor-pointer"
      >

        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default Profile;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 1 },
    closed: { scale: 0, y: -7 },
  };

 
  // Helper function to format last seen time
  const formatLastSeen = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = (now - date) / 1000; // difference in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };