import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";
import { Label, Select } from "flowbite-react";
import { useDebounce } from 'use-debounce';




const StoreForm = ({isOpen, setIsOpen, handleAddStore, handleCloseRegistrationForm, seeStoreNumber,loading, storeManagerForm, setStoreManagerForm,}) => {
     const { storeForm, setStoreForm} = useApplicationSettings()

  const { store_number, amount_of_bags, location, sub_location
  } = storeForm

  const [searchInput] = useDebounce(sub_location, 1000)
  const [searchInput2] = useDebounce(location, 1000)


  const [selectedOption, setSelectedOption] = useState('Pick Location?');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [sublocations, setSubLocation] = useState([]);
  const [locations, setLocation] = useState([]);



  const handleOptionClick = (option) => {
    setStoreForm((prev)=> ({...prev, sub_location: option}))
    setOpen(false);
    console.log('sublocation chooosed', option)
    

  };


  
  const handleOptionClick2 = (option) => {
    setStoreForm((prev)=> ({...prev, location: option}))
    setOpen2(false);
    console.log('sublocation chooosed', option)
    

  };



  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   setOpen(true);
  // };


  const getSubLocation = useCallback(
    async() => {
      
        try {
          const response = await fetch('/api/get_sub_locations')
          const newData = await response.json()
          if (response.ok) {

            setSubLocation(newData.filter((place)=> {

              return sub_location.toUpperCase() === '' ? place : place.name.toUpperCase().includes(sub_location);

            }))
           
          } else {
            console.log('error')
          }
        } catch (error) {
          console.log(error)
        }


    },
    [ sub_location],
  )
  

    
  



  useEffect(() => {
    getSubLocation()
  }, [getSubLocation, searchInput]);









  const getLocation = useCallback(
    async() => {
      
        try {
          const response = await fetch('/api/get_locations')
          const newData = await response.json()
          if (response.ok) {

            setLocation(newData.filter((place)=> {

              return location.toUpperCase() === '' ? place : place.location_name.toUpperCase().includes(location);

            }))
           
          } else {
            console.log('error')
          }
        } catch (error) {
          console.log(error)
        }


    },
    [location],
  )
  

    
  



  useEffect(() => {
    getLocation() 
  }, [getLocation , searchInput2]);











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
  setOpen(true);

  const {name, value} =  e.target
const capitalizeForm = capitalizePrefix(value)
setStoreForm((prevData) => (
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
        className="bg-slate-900/20 backdrop-blur p-12 fixed inset-0 z-50 grid place-items-center overflow-y-scroll 
        cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          className="bg-white text-black p-6 rounded-lg w-full
           max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
                      <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

          <div className="relative z-10">
           
            <h3 className="text-3xl font-bold  text-center   playwrite-de-grund mb-2">
              Add Store
            </h3>
           

<form className="max-w-sm mx-auto" onSubmit={handleAddStore} >
<div className="mb-5">
  <label  className="block  mb-2 text-sm playwrite-de-grund  text-black">Total Amount Of bags</label>
  <input     type="number" name="amount_of_bags" value={amount_of_bags}  className="input border-black focus:border-black
    focus:ring-black input-lg w-full 
   bg-transparent"   onChange={handleChange}  />
</div>



{seeStoreNumber && (
  <>
  
  <div className="mb-5">
  <label className="block mb-2 text-sm playwrite-de-grund  text-black">Store Number</label>
  <input  value={store_number}  onChange={handleChange} type="text" name="store_number"  className="input 
   border-black focus:border-black 
  input-lg w-full  bg-transparent"   />
</div>
  
  
  </>
)}


{/* 
<div className="mb-5">
  <label  className="block mb-2 text-sm playwrite-de-grund dark:text-white">Sub Location</label>
  <input type="text" name="sub_location"  value={sub_location}     onChange={handleChange}  className="input  
  focus:border-black input-lg w-full border-black
    bg-transparent" />
</div> */}





<div className="relative w-full mb-5">
<label  className="block  mb-2 text-sm playwrite-de-grund  text-black">Pick Sub Location</label>

      <input
        type="text"
        name='sub_location'
        value={sub_location}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        className="select w-full bg-transparent border-black focus:border-black select-lg text-black p-2 cursor-text"
      />
      {open && sublocations.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-black border border-black mt-1 z-10 max-h-40 overflow-y-auto">
          {sublocations.map((sublocation, index) => (
            <div
              key={index}
              className="hover:bg-gray-300 p-2 cursor-pointer hover:text-black"
              onClick={() => handleOptionClick(sublocation.name)}
            >
             {sublocation.name}
            </div>
          ))}
        </div>
      )}
    </div>




    <div className="relative w-full mb-5">
<label  className="block  mb-2 text-sm playwrite-de-grund  text-black">Pick Location</label>

      <input
        type="text"
        name='location'
        value={location}
        onChange={handleChange}
        onFocus={() => setOpen2(true)}
        className="select w-full bg-transparent border-black focus:border-black select-lg text-black p-2 cursor-text"
      />
      {open2 && locations.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-black mt-1 z-10 max-h-40 overflow-y-auto">
          {locations.map((place, index) => (
            <div
              key={index}
              className="hover:bg-gray-300 p-2 cursor-pointer hover:text-black"
              onClick={() => handleOptionClick2(place.location_name)}
            >
             {place.location_name}
            </div>
          ))}
        </div>
      )}
    </div>








<div className="flex gap-8 p-4 py-8">




<button   type='submit'  disabled={loading} className="px-6 py-2 font-medium bg-green-500 rounded-md
 text-white w-fit transition-all shadow-[3px_3px_0px_black] 
hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
   {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
        Submit
      </button>


      <button   onClick={handleCloseSubLocationForm} className="px-6 py-2 font-medium bg-red-600 text-white w-fit transition-all 
      shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] rounded-md hover:translate-y-[3px]">
        Cancel
      </button>



{/* 

            <button type="submit" disabled={loading} className="btn btn-active"> 

            {loading &&  <ImSpinner9 className={` ${loading && 'animate-spin'  }   `} /> } 
           

            Submit</button>

              <button
              
                onClick={handleCloseSubLocationForm}
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





export default  StoreForm;