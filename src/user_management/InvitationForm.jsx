import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Accordion } from "flowbite-react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CiSettings } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { GrUserManager } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { TfiWallet } from "react-icons/tfi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { CiReceipt } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { MdOutlineTextsms } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { PiTicketLight } from "react-icons/pi";






const InvitationForm = ({ isOpen, setIsOpen,permissionAndRoles, setPermissionAndRoles, userDetails,
  setuserDetails,
  loading,openLoad,handleAddUser,userPermisions,setUserPermisions, emailError, seeEmailError,
  emailError2, seeEmailError2,seeUsernameError2,usernameError2,
  
  seeUsernameError,  usernameError, seeStrictEmailError,strictEmailError
 }) => {






const [seeItem, setSeeItem] = useState({
  generalSetting: false,
  location: false,
  store: false,
  sub_location: false,
  storeManager: false,
  customer: false,
  service_provider: false,
  finances_and_expenses: false,
  payments: false,
  invoice: false,
  calendar: false,
  sms: false,
  smsTemplates: false,
  tickets: false
  
})



const handleSeeItem = (key)=>{
  setSeeItem((prevData)=> ({...prevData, [key]: !prevData[key]}))
}



const convertToKenyanFormat = (number) => {
  if (number.startsWith('0')) {
    return '+254' + number.substring(1)
  }


 
  return number;
};







  const handleUserDetailsPhoneNumber = (e)=> {
    const {name, value} = e.target 
   const  kenyanNumber = convertToKenyanFormat(value) 
    setUserPermisions((prevData) => (
     {...prevData, [name]: kenyanNumber}
    ))
   }






const handleUserDetailsFormDataChange = (e)=> {
 const {name, value} = e.target  
 setUserPermisions((prevData) => (
  {...prevData, [name]: value}
 ))
}


const handleUserRoleFormDataChange = (role,  event)=> {
  const { name } = event.target;
  setPermissionAndRoles((prevData)=> {
    const newPermission = {...prevData}
    if (name === 'read') {
      newPermission[role].read = !newPermission[role].read;
      if (newPermission[role].read) {
        newPermission[role].readWrite = false
      }

      
    
    } else if (name === 'readWrite') {
      newPermission[role].readWrite = !newPermission[role].readWrite

      if (newPermission[role].readWrite ) {
        newPermission[role].read = false 
      }
      
    }
    return newPermission
  })


  setUserPermisions((prevData) => ({
    ...prevData,
    can_read_customers: permissionAndRoles.customer.read,
    can_manage_customers: permissionAndRoles.customer.readWrite,
    can_read_sub_location: permissionAndRoles.sub_location.read,
    can_manage_sub_location: permissionAndRoles.sub_location.readWrite,
    can_read_location: permissionAndRoles.location.read,
    can_manage_location: permissionAndRoles.location.readWrite,
    can_read_store_manager: permissionAndRoles.storeManager.read,
    can_manage_store_manager: permissionAndRoles.storeManager.readWrite,
    can_read_store: permissionAndRoles.store.read,
    can_manage_store: permissionAndRoles.store.readWrite,
    can_read_service_provider: permissionAndRoles.service_provider.read,
    can_manage_service_provider: permissionAndRoles.service_provider.readWrite,
    can_read_settings: permissionAndRoles.generalSetting.read,
    can_manage_settings: permissionAndRoles.generalSetting.readWrite,
    can_manage_payment: permissionAndRoles.payments.readWrite,
    can_read_payment: permissionAndRoles.payments.read,
    can_manage_finances_account: permissionAndRoles.finances_and_expenses.readWrite,
    can_read_finances_account: permissionAndRoles.finances_and_expenses.read,
    can_read_sms: permissionAndRoles.sms.read,
    can_manage_sms: permissionAndRoles.sms.readWrite,
    can_manage_sms_templates: permissionAndRoles.smsTemplates.readWrite,
    can_read_sms_templates: permissionAndRoles.smsTemplates.read,
    can_read_tickets: permissionAndRoles.tickets.read,
    can_manage_tickets: permissionAndRoles.tickets.readWrite,
    can_manage_calendar: permissionAndRoles.calendar.readWrite,
    can_read_calendar: permissionAndRoles.calendar.read

  }));
}


const variantDiv = {
    hidden: {
      opacity: 0,
      overflow: 'hidden',
      height: 0,
      padding: 1,
      
    },
  
    visible: {
      opacity: 1,
      overflow: 'hidden',
      height: 'auto',
      padding: 10
    }
  }

  const userRoles = [
    { label: 'customer',  },
    { label: 'customer_support',  },
    { label: 'administrator',},
    { label: 'super_administrator',},
    { label: "store_manager",  },
    { label: "agent",  },

    
    ]





  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <>
    
    {loading &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center  overflow-y-scroll
           cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            className="bg-white text-black    p-6 rounded-lg w-full max-w-[600px]
             shadow-xl cursor-default relative "
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              
              <h3 className="text-3xl font-bold text-center mb-2 ">
                Invite Users
              </h3>
<form onSubmit={handleAddUser}>
             
<div className=''>
<label htmlFor="">Your Name</label>
<input
required
onChange={(e) => handleUserDetailsFormDataChange(e)}
  type="text"
  name='user_name'
  value={userPermisions.user_name}
  className="input  border-black focus:border-black w-full  bg-transparent" />

  <p className='text-red-800 playwrite-de-grund'>{seeUsernameError && usernameError}</p>
  <p className='text-red-800 playwrite-de-grund'>{seeUsernameError2 && usernameError2}</p>
</div>





              <div className='flex justify-around p-2'>

<div className='flex flex-col gap-2'>
<label htmlFor="">Phone Number</label>
<input
name='phone_number'
onChange={(e) =>handleUserDetailsPhoneNumber(e)}
  type="text"
  value={userPermisions.phone_number}
  className="input  border-black focus:border-black w-full max-w-xs bg-transparent" />
</div>


<div className='flex flex-col gap-2'>
  
<label htmlFor="">Email</label>

<input
onChange={(e) =>handleUserDetailsFormDataChange(e)}
name='email'
value={userPermisions.email}
  type="text"
  className="input  border-black focus:border-black w-full max-w-xs bg-transparent" />
  <p className='text-red-800 playwrite-de-grund'>{seeEmailError && emailError} </p>
<p className='text-red-800 playwrite-de-grund'>{seeEmailError2 && emailError2}</p>

<p className='text-red-800 playwrite-de-grund'>{seeStrictEmailError && strictEmailError}</p>
</div>
              </div>



              <div className='p-4 '>
             
<Autocomplete

// value={userPermisions.user_role}

value={userRoles.find((permission) => {
  if (permission.label === userPermisions.role) {
   return permission.label
  } else {
    return null
  }
})}


getOptionLabel={(option) => option.label}
                      
                      sx={{
                        m: 1,width: {
                          xs: '40%',
                          sm: '80%',
                          md: '50%',
                          lg: '70%',
                          xl: '70%',

              
              
              
                      },
                        '& label.Mui-focused': {
                          color: 'black',
                          fontSize:'16px'
                          },
                        '& .MuiOutlinedInput-root': {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                          borderWidth: '3px'
                          },
                        '&.Mui-focused fieldset':  {
                          borderColor: 'black', // Set border color to transparent when focused
                        
                        }
                        },
                                 
                                }} 
                    
                                
                                      // getOptionLabel={'4MBPS'}
                    
                            options={userRoles}
                            
                                    renderInput={(params) => (
                                      <TextField
                                      id="user_group"
                    
                                      className='myTextField'
                                        {...params}
                                        label="Select User Roles"
                                      
                    
                                       
                                      />
                                    )}
                                  
                                
                                    
                                    onChange={(event, newValue) => {
                                      console.log('Before Update:', userPermisions.role);
                                      setUserPermisions((prevData) => {
                                        const updatedData = {
                                          ...prevData,
                                          role: newValue ? newValue.label : '', 
                                        };
                                        console.log('After Update:', updatedData.role);
                                        return updatedData;
                                      });
                                    }}
                                  />
              </div>
             
            

 <div className='p-8'>


            <div className='flex justify-around font-bold text-lg p-2'>
            <p >Item</p>
            <p>Permisions</p>
            </div>
   
   

{Object.keys(seeItem).map((role, index)=> (
  <>
<div key={index}>



<h2  id={`accordion-open-heading-${index}`} onClick={()=> handleSeeItem(role)}>


<button type="button"    className="flex items-center justify-between 
w-full p-5 font-medium rtl:text-right
  border border-b-0 border-gray-200 rounded-t-xl  text-white  focus:ring-4 focus:ring-gray-200
  dark:focus:ring-gray-800
  dark:border-gray-700 dark:text-gray-900 hover:dark:text-white hover:text-black hover:bg-gray-100
   dark:hover:bg-gray-800 gap-3"
   data-accordion-target={`#accordion-open-body-${index}`}
   aria-expanded="true"
   aria-controls={`accordion-open-body-${index}`}
   >
  <span className="flex items-center gap-3">    {role === 'location' && <IoLocationOutline className='w-5 h-5' />}
  {role === 'store' && <IoStorefrontOutline className='w-5 h-5' />}
                          {role === 'sub_location' && <LiaSearchLocationSolid className='w-5 h-5' />}
                          {role === 'storeManager' && <GrUserManager className='w-5 h-5' />}
                          {role === 'customer' && <GoPeople className='w-5 h-5' />}
                          {role === 'service_provider' && <CiUser className='w-5 h-5' />}
                          {role === 'finances_and_expenses' && <TfiWallet className='w-5 h-5' />}
                          {role === 'payments' && <LiaMoneyBillWaveSolid className='w-5 h-5' />}
                          {role === 'invoice' && <CiReceipt className='w-5 h-5' />}
                          {role === 'calendar' && <BsCalendar2Date className='w-5 h-5' />}
                          {role === 'generalSetting' && <CiSettings  className='w-5 h-5'/>}
                          {role === 'sms' && <MdOutlineTextsms className='w-5 h-5'/>}
                          {role === 'smsTemplates' && < CgTemplate className='w-5 h-5'/>}
                          {role === 'tickets' && <PiTicketLight className='w-5 h-5' />}

  
  
  
   {role}
  </span>
  {seeItem[role] ?   <IoIosArrowUp /> : <IoIosArrowDown />}
  
  
</button>
</h2>


<motion.div variants={variantDiv} transition={{duration:0.1, ease: "easeInOut",
  }} initial='hidden' animate={seeItem[role] ? "visible" : "hidden"} className='flex justify-between'>
<p>Item</p>
<p>Read</p>
<p>Read/Write</p>
            </motion.div> 


<motion.div variants={variantDiv} transition={{duration:0.1, ease: "easeInOut",
  }} initial='hidden' animate={seeItem[role] ? "visible" : "hidden"} className='flex justify-between'>
            <p className="dark:text-white text-black ">
            {role}
          </p>

      <FormControlLabel control={<Checkbox checked={permissionAndRoles[role].read} color='success' 
       onChange={(event)=>handleUserRoleFormDataChange(role, event)} />}   name='read'  />


      <FormControlLabel control={<Checkbox color='success' checked={permissionAndRoles[role].readWrite}
       onChange={(event)=>handleUserRoleFormDataChange(role, event)} />}   name='readWrite'  />
            </motion.div>

            </div>

  </>
))}

    </div>
    <div className="flex gap-2 p-3">

<div className='flex justify-center gap-7'>
<button  type='submit' className="px-6 py-2 font-medium bg-green-600 text-white w-fit transition-all shadow-[3px_3px_0px_black]
 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
        Invite
      </button>

      <button   onClick={(e) =>{
            e.preventDefault()
            setIsOpen(false)

          } } className="px-6 py-2 font-medium bg-red-600 text-white w-fit transition-all shadow-[3px_3px_0px_black]
       hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
        Cancel
      </button>


{/*   
<button type='submit' className="btn ">invite</button>


        <button
          onClick={(e) =>{
            e.preventDefault()
            setIsOpen(false)

          } }
          className="btn btn-error"
        >
          cancel
        </button> */}
</div>
     
    
      </div>
</form>

    
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default InvitationForm;