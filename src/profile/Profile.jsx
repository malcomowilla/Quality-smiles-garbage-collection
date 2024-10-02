import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
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

//   import { IconType } from "react-icons";
// onClick={() => setOpen((pv) => !pv)}

  const Profile = ({open, setOpen}) => {
const navigate = useNavigate()
const [isOpenEditProfile, setisOpenEditProfile] = useState(false)

const {id, imagePreview, setUpdateFormData, updateFormData, setImagePreview, user_name, user,
setopenLogoutSuccess,
handleChangePhoneNumberSignin,signedUpPassKey, setSignedUpPassKey,
    setopenLoginSuccess,
    materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, openOfflineError,  setOpenOfflineError,
       handleCustomerFormDataChangeForProvider,settingsForStore, setsettingsForStore,handleStoreFormDataChange,
       seeSettings4, setSeeSettings4,seeSettings5, setSeeSettings5,handleFormDataChangeForStoreManager,storeManagerSettings, 
       setstoreManagerSettings, setAdminFormSettings, handleFormDataChangeForAdmin,
       settingsTicket,  setsettingsTicket,handleFormDataChangeForTickets,adminFormSettings,setopenLogoutSession
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






    return (

    <>

    <EditProfile isOpenEditProfile={isOpenEditProfile} setisOpenEditProfile={setisOpenEditProfile} />
      <div className="p-8 pb-56 flex items-center justify-center ">
        <motion.div animate={open ? "open" : "closed"} className="relative">
        
        <div className='flex gap-x-2   max-sm:fixed max-sm:top-[169px] max-sm:right-[60px]' 
         onClick={() => setOpen((pv) => !pv)}>

<Avatar style={{width: 60, height: 60}}    {...stringAvatar(user_name)} />


{/* 
<div className="avatar placeholder online">
  <div className="bg-teal-600 text-white w-16 rounded-full">
    <span className="text-3xl">D</span>
  </div>
</div> */}
        {/* <img src={imagePreview}  className='w-[55px] h-[55px] rounded-full shadow-xl' alt="profile-picture" /> */}

        
        <div className='text-wrap xl:block max-sm:block md:max-sm:hidden max-md:block max-sm:text-sm '>
        <p className='dark:text-black text-white font-extrabold '>{user_name}</p>
    <p className='dark:text-black text-white'>{user === 'super_administrator' ? 'SuperAdmin' : null}</p>
    <p className='dark:text-black text-white'>{user === 'administrator' ? 'Admin' : null}</p>
    <p className='dark:text-black text-white'>{user === 'store_manager' ? 'StoreManager' : null}</p>
    <p className='dark:text-black text-white'>{user === 'customer' ? 'Customer' : null}</p>
    <p className='dark:text-black text-white'>{user === 'agent' ? 'Agent' : null}</p>
    <p className='dark:text-black text-white'>{user === 'customer_support' ? 'Customer Support' : null}</p>

    


        

        </div>

      </div>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-6 rounded-lg bg-white shadow-xl absolute 
            top-[120%] left-[50%] w-48
             overflow-hidden"
          >
           <div className='p-5'>
           <RiDeleteBack2Line  onClick={() => setOpen(false)}  className='text-black text-xl w-8 h-8'/>
            </div> 
            <div className='flex gap-3 hover:bg-green-200 p-2 hover:rounded-md' onClick={()=> setisOpenEditProfile(true)}>
            <LiaEdit className='text-black text-lg w-5 h-5' />
            <p className='text-black playwrite-de-grund '>Edit Profile</p>
              </div>
          


             <div className='flex gap-3  hover:bg-green-200 p-2 hover:rounded-md' onClick={logout}>
             <CiLogout className='text-black text-lg w-5 h-5'/>
             <p className='text-black playwrite-de-grund'>Logout</p>
             </div>
             
          </motion.ul>
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