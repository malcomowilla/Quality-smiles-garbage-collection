import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";




const SubLocationForm = ({isOpen, setIsOpen, addSubLocation, handleCloseRegistrationForm, loading}) => {
     const {sublocationForm, setSubLocationForm, sublocations, setSubLocations} = useApplicationSettings()

const handleCloseSublocationForm = (e) => {
    e.preventDefault()
    setIsOpen(false)
}


  const {  name, code
  } = sublocationForm



  const capitalizePrefix = (prefix)=> {

    if (prefix.startsWith('')) {
      return prefix.toUpperCase()
  
    }
  
    return prefix
    }
  




const handleChange = (e) => {
  const {name, value} =  e.target
const capitalizeForm = capitalizePrefix(value)
setSubLocationForm((prevData) => (
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
          className="bg-white text-black p-6 rounded-lg w-full
           max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
           
            <h3 className="text-3xl font-bold  text-center   playwrite-de-grund mb-2">
              Add Sub Location
            </h3>
           

<form className="max-w-sm mx-auto" onSubmit={addSubLocation} >
<div className="mb-5">
  <label  className="block  mb-2 text-sm playwrite-de-grund text-black">Sub Location Name</label>
  <input     type="text" name="name" value={name}  className="input border-black focus:border-black
    focus:ring-black input-lg w-full 
   bg-transparent"   onChange={handleChange}  />

</div>
<div className="mb-5">
  <label className="block mb-2 text-sm playwrite-de-grund  text-black">Sub Location Code</label>
  <input  value={code}  onChange={handleChange} type="text" name="code"  className="input 
   border-black focus:border-black
  input-lg w-full  bg-transparent"   />
</div>






<div className="flex gap-8">
            {/* <button type="submit" disabled={loading} className="btn btn-active"> 

            {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
           

            Submit</button> */}



<button type='submit' className="px-6 py-2 font-medium bg-green-500 text-white w-fit transition-all shadow-[3px_3px_0px_black]
 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
   {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
      Submit
      </button>


      <button  onClick={handleCloseSublocationForm} className="px-6 py-2 font-medium bg-red-700 text-white w-fit transition-all shadow-[3px_3px_0px_black] 
      hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
        Cancel
      </button>




{/* 
              <button
              
                onClick={handleCloseSublocationForm}
                className="btn btn-outline btn-error"
              >
                  Cancel

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





export default SubLocationForm;