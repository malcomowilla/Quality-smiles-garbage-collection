
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";
import { LuCalendarDays } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { FaRegHandPointLeft } from "react-icons/fa6";
import { useLayoutSettings } from '../settings/LayoutSettings';

import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';



const DeleteCalendarEvent = ({ isOpenDelete,handleChange, calendarEventForm, setisOpenDelete, loading, start, end, 
  title, eventId, handleUpdateEvent, handleChangeDateTime1, handleDeleteEvent, handleChangeDateTime2}) => {



const {user_name, calendarSettings} = useApplicationSettings()
const [editEvent, setEditEvent] = useState(false)
const [showEvent, setShowEvent] = useState(true)
const { settings, borderRadiusClasses } = useLayoutSettings();









const {

  start_in_minutes,
        start_in_hours} = calendarSettings
  
  return (
    <AnimatePresence>
    {isOpenDelete && (
     <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll 
     cursor-pointer"
   >
     <motion.div
       initial={{ scale: 0, rotate: "12.5deg" }}
       animate={{ scale: 1, rotate: "0deg" }}
       exit={{ scale: 0, rotate: "0deg" }}
       className={`bg-gradient-to-br from-white to-blue-100 text-white
        p-6  w-full
        max-w-lg shadow-xl cursor-default relative
         overflow-hidden ${borderRadiusClasses[settings.borderRadius]}`}
     >

                  {showEvent ? <>
                    <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

       <div className="relative z-10">
       <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-rose-600 grid place-items-center mx-auto">
             <FiAlertCircle />
           </div>
         <h3 className="text-3xl font-bold  text-center text-black   playwrite-de-grund mb-2">
           {title}
         </h3>
        


<div className="mb-5 font-thin playwrite-de-grund text-black">
{end.format('YYYY-MM-DD HH:mm A')} {'<=>'} {start.format('YYYY-MM-DD HH:mm A')}

</div>

<div className='text-black flex gap-4 font-extralight'>
  <LuCalendarDays className='w-5 h-5'/>
  {user_name}
</div>

<div className='text-black flex gap-4  mt-5'>
  <CiBellOn className='font-bold text-xl' />
  {start_in_hours ? <p className='font-thin'>   {start_in_hours} Hours Before</p> : '' }

{start_in_minutes ? <p className='font-thin'>   {start_in_minutes } Minutes Before</p> : ''}

  
</div>

<div className='text-black flex gap-4  mt-5 cursor-pointer hover:bg-green-400 w-fit p-1 rounded-md hover:bg-opacity-25' onClick={()=> {
setEditEvent(true)
setShowEvent(false)
} }>
  <MdOutlineEdit className='w-5 h-5'/>
  <p className='font-thin'>Edit Event</p>
</div>

<div className="flex gap-8 mt-3">

           <button
           onClick={handleDeleteEvent}
           disabled={loading}
             className={`btn btn-error  ${borderRadiusClasses[settings.borderRadius]}`}
           >
                             {loading && <ImSpinner9 className={`${loading && 'animate-spin'}`}/> }

               Delete
           </button>


           <button
             onClick={()=> setisOpenDelete(false)}
             className={`btn btn-active  ${borderRadiusClasses[settings.borderRadius]}`}
           >
               Cancel
           </button>
         </div>

     
       </div>
                  
                  
                  
                    </> : null}
                   

       {editEvent  ? <>
        <form onSubmit={handleUpdateEvent}>
              <TextField sx={{
  '& label.Mui-focused':{
    color: 'black'
  },
width: '100%',

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px'
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
},
}}  label="Event Title"  onChange={handleChange} name='title' value={calendarEventForm.title} />





<div className='p-2'>
<DemoContainer  sx={{
'& label.Mui-focused': {
  color: 'white'
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
    }}  components={['TimePicker', 'TimePicker']}>



<DateTimePicker  viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}   value={calendarEventForm.start} onChange={(date)=> handleChangeDateTime1(date)} className='myTextField'
        label="Start"
     

      
      
      

      />
      <DateTimePicker viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}   value={calendarEventForm.end} onChange={(date)=> handleChangeDateTime2(date)} className='myTextField'
      
        label="End"
        // minDate={dayjs(new Date())}
        // maxDate={dayjs(new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)))} // 30 days from today
        // onChange={(newValue) => {
        //   setDateTimeValue(newValue)
        // }   }

      

       
      />



    </DemoContainer>
    </div>
              <div className="flex gap-2 p-3 mt-3">
                <button

                 type='submit'
                  className={`btn ${borderRadiusClasses[settings.borderRadius]}`}
                >
                  update
                </button>
                <button
                  onClick={(e) =>{
                    e.preventDefault()
                    setisOpenDelete(false)
                  } }
                  className={`btn btn-error ${borderRadiusClasses[settings.borderRadius]}`}
                >
                  cancel
                </button>
              </div>
                    <div className='cursor-pointer' onClick={()=> {
                        setEditEvent(false)
                        setShowEvent(true)
                    } }>
                    <FaRegHandPointLeft className='text-black ' />
                    <p className='playwrite-de-grund text-black font-light'>Back</p>
                    </div>
              
              </form>
       </>: ''}
      
       
     </motion.div>
   </motion.div>
    )}
  </AnimatePresence>
   
  );
};

// const SpringModal = ({ isOpen, setIsOpen, addCustomer, handleCloseRegistrationForm }) => {
//   const { customerformData,  setcustomerformData} = useApplicationSettings()
//   const {name, email, phone_number, customer_code, location, amount_paid} = customerformData

// const handleChange = (e) => {
//   const {name, value} =  e.target
//   setcustomerformData((prevData) => (
//     {...prevData, [name]: value}
//   ))
// }




export default DeleteCalendarEvent;










































