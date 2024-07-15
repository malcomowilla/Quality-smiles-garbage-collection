import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";




const LocationForm = ({isOpen, setIsOpen, addLocation, handleCloseRegistrationForm, loading}) => {
     const { locationForm, setLocationForm} = useApplicationSettings()

  const {  location_name,sub_location, location_code
  } = locationForm

  const handleCloseSubLocationForm = (e) =>{
    e.preventDefault()
    setIsOpen(false)
  }


  const capitalizePrefix = (prefix)=> {

    if (prefix.startsWith('')) {
      return prefix.toUpperCase()
  
    }
  
    return prefix
    }
  




const handleChange = (e) => {
  const {name, value} =  e.target
const capitalizeForm = capitalizePrefix(value)
  setLocationForm((prevData) => (
      {...prevData, [name]: capitalizeForm}
    ))   
  
  


}








  
  return (
    <AnimatePresence>
    {isOpen && (
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
          className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-6 rounded-lg w-full
           max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
           
            <h3 className="text-3xl font-bold  text-center   playwrite-de-grund mb-2">
              Add Location
            </h3>
           

<form className="max-w-sm mx-auto" onSubmit={addLocation} >
<div className="mb-5">
  <label  className="block  mb-2 text-sm playwrite-de-grund  dark:text-white">Location Name</label>
  <input     type="text" name="location_name" value={location_name}  className="input border-black focus:border-black
    focus:ring-black input-lg w-full 
   bg-transparent"   onChange={handleChange}  />

</div>
<div className="mb-5">
  <label className="block mb-2 text-sm playwrite-de-grund  dark:text-white">Location Code</label>
  <input  value={location_code}  onChange={handleChange} type="text" name="location_code"  className="input 
   border-black focus:border-black
  input-lg w-full  bg-transparent"   />
</div>





<div className="mb-5">
  <label  className="block mb-2 text-sm playwrite-de-grund dark:text-white">Sub Location</label>
  <input type="text" name="sub_location"  value={sub_location}     onChange={handleChange}  className="input  
  focus:border-black input-lg w-full border-black
    bg-transparent" />
</div>


<div className="mb-5">




</div>






<div className="flex gap-8">
            <button type="submit" disabled={loading} className="btn btn-active"> 

            {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
           

            Submit</button>

              <button
              
                onClick={handleCloseSubLocationForm}
                className="btn btn-outline btn-error"
              >
                  Cancel

              </button>
            </div>
</form>

        
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
   
  );
};





export default  LocationForm;