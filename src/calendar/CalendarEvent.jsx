import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { DemoContainer  } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { useLayoutSettings } from '../settings/LayoutSettings';



const CalendarEvent = ({ isOpen, setIsOpen , calendarEventForm, handleChange, handleChangeDateTime1,
   handleChangeDateTime2, handleCreateEvent}) => {
  const {title, start, end} = calendarEventForm
  const { settings, borderRadiusClasses } = useLayoutSettings();


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0
           z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white text-black p-6 w-full
             max-w-lg shadow-xl cursor-default relative overflow-hidden
             ${borderRadiusClasses[settings.borderRadius]}
             `}
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Add Event
              </h3>

              <form onSubmit={handleCreateEvent}>
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
}}  label="Event Title"  name='title'  onChange={handleChange}/>





<div className='p-2'>
<DemoContainer  sx={{
'& label.Mui-focused': {
  color: 'black'
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
  }}   onChange={(date)=> handleChangeDateTime1(date)}  className='myTextField'
        label="Start"
     

      
      
      

      />
      <DateTimePicker viewRenderers={{
    hours: renderTimeViewClock,
    minutes: renderTimeViewClock,
    seconds: renderTimeViewClock,
  }}   onChange={(date)=> handleChangeDateTime2(date)} className='myTextField'
      
        label="End"
        // minDate={dayjs(new Date())}
        // maxDate={dayjs(new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)))} // 30 days from today
        // onChange={(newValue) => {
        //   setDateTimeValue(newValue)
        // }   }

      

       
      />
    </DemoContainer>
    </div>
              <div className="flex gap-4 p-3 mt-3">


              <button type='submit' className={`px-6 py-2 
${borderRadiusClasses[settings.borderRadius]} 
 flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-medium 
                        bg-secondary text-white rounded-2xl transition-all
                         hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed
  `}>
        Create
      </button>


      <button     onClick={(e) =>{
                    e.preventDefault()
                    setIsOpen(false)
                  } } 
                  className={`flex-1 px-6 py-3.5 font-medium 
                    ${borderRadiusClasses[settings.borderRadius]}   
                        text-gray-700  transition-all
                               hover:bg-red-500 bg-warn_primary`}>
        Cancel
      </button>
                {/* <button
                 type='submit'
                  className="btn"
                >
                  create
                </button>
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
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarEvent;