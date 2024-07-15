import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { Dispatch, SetStateAction, useState } from "react";
  import { IoIosLogOut } from "react-icons/io";
  import {useApplicationSettings} from '../settings/ApplicationSettings'
  import {useNavigate, redirect} from 'react-router-dom'

//   import { IconType } from "react-icons";
// onClick={() => setOpen((pv) => !pv)}

  const Profile = ({open, setOpen}) => {
const navigate = useNavigate()

    const logout = async ()=> {
      try {
        const response = await fetch('/api/logout-admin', {
          method: 'DELETE'
        })
    if (response.ok) {
      // navigate('/signin')
      navigate('/signin')
      localStorage.removeItem('acha umbwakni');
    
    } else {
      console.log('failed to logout')
    }
      } catch (error) {
        console.log('no internet conection', error)
      }
    } 

    return (
      <div className="p-8 pb-56 flex items-center justify-center ">
        <motion.div animate={open ? "open" : "closed"} className="relative">
      
        <div className='flex gap-x-2  max-sm:fixed max-sm:top-[169px] max-sm:right-[60px]'  onClick={() => setOpen((pv) => !pv)}>
        <img src="/images/logo/logo-small.png"  className='w-[50px] h-[50px] rounded-full' alt="profile-picture" />

        <div className='text-wrap xl:block max-sm:block md:max-sm:hidden max-md:block max-sm:text-sm '>
        <p className='dark:text-black text-white font-extrabold '>Malcom Owilla</p>
    <p className='dark:text-black text-white'>Admin</p>
        </div>

      </div>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute 
            top-[120%] left-[50%] w-48
             overflow-hidden"
          >
            <Option setOpen={setOpen} Icon={FiEdit} text="Edit" />
            <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
            <div  onClick={logout}><Option setOpen={setOpen} Icon={IoIosLogOut} text="Logout"  /></div>
            <Option setOpen={setOpen}  Icon={FiTrash} text="Remove"  />
          </motion.ul>
        </motion.div>
      </div>
    );
  };
  
  const Option = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full p-2 text-lg font-medium whitespace-nowrap rounded-md
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
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
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
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };