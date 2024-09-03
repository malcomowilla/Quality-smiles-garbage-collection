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

//   import { IconType } from "react-icons";
// onClick={() => setOpen((pv) => !pv)}

  const Profile = ({open, setOpen}) => {
const navigate = useNavigate()
const [isOpenEditProfile, setisOpenEditProfile] = useState(false)

const {id, imagePreview, setUpdateFormData, updateFormData, setImagePreview, user_name, user,
setopenLogoutSuccess
} = useApplicationSettings()


    const logout = async ()=> {
      try {
        const response = await fetch('/api/logout-admin', {
          method: 'DELETE'
        })
    if (response.ok) {
      // navigate('/signin')
      navigate('/signin')
      localStorage.removeItem('acha umbwakni');
      setopenLogoutSuccess(true)
    
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
  
  
    



console.log('user role', user)
    return (

    <>

    <EditProfile isOpenEditProfile={isOpenEditProfile} setisOpenEditProfile={setisOpenEditProfile} />
      <div className="p-8 pb-56 flex items-center justify-center ">
        <motion.div animate={open ? "open" : "closed"} className="relative">
        
        <div className='flex gap-x-2   max-sm:fixed max-sm:top-[169px] max-sm:right-[60px]' 
         onClick={() => setOpen((pv) => !pv)}>
        <img src={imagePreview}  className='w-[55px] h-[55px] rounded-full shadow-xl' alt="profile-picture" />
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