import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";




const CustomerRegistrationForm = ({isOpen, setIsOpen, addCustomer, handleCloseRegistrationForm, loading, setloading, emailError, 
  seeEmailError, phoneNumberError, seePhoneNumberError, nameError,seeNameError}) => {
     const { customerformData, seeCustomerCode, setcustomerformData,} = useApplicationSettings()

  const {name, email, phone_number, customer_code, location, amount_paid, date_registered
  } = customerformData




     const convertToKenyanFormat = (number) => {
      if (number.startsWith('0')) {
        return '+254' + number.substring(1)
      }
  
  
     
      return number;
    };





    


    const capitalizePrefix = (prefix)=> {

      if (prefix.startsWith('')) {
        return prefix.toUpperCase()
    
      }
    
      return prefix
      }
    




const handleChange = (e) => {
  const {name, value} =  e.target
const capitalizeWord = capitalizePrefix(value)
    setcustomerformData((prevData) => (
      {...prevData, [name]: capitalizeWord}
    ))   
  
  


}









const handleChangeName = (e) => {
  const {name, value} =  e.target

    setcustomerformData((prevData) => (
      {...prevData, [name]: value}
    ))   
  
  


}





const handleChangePhoneNumber = (e)=> {
  const value = e.target.value;

  if (value.length <= 13) {

    const formattedValue = convertToKenyanFormat(value);
    setcustomerformData((prevData) => (
      {...prevData, phone_number: formattedValue}
    ))   
  }
}



  useEffect(() => {
    setcustomerformData((prevData) => (
      {...prevData , date_registered: dayjs(new Date())}
    ))

  }, [setcustomerformData ]


  );

  
const handleChangeDate = (date)=> {
  setcustomerformData({...customerformData, date_registered
    : date})
  console.log('my date',date_registered
)
}
  return (


    <>




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
                      <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

          <div className="relative z-10">
           
            <h3 className="text-3xl font-bold  text-center   playwrite-de-grund mb-2">
              Customer Registration
            </h3>
           

<form className="max-w-sm mx-auto" onSubmit={addCustomer} >
<div className="mb-5">
  <label htmlFor="email" className="block  mb-2 text-sm playwrite-de-grund  text-black">Your email</label>
  <p className='text-rose-800'>{seeEmailError && emailError}</p>
  <input   value={email}  type="text" name="email"  className="input border-black focus:border-black
    focus:ring-black input-lg w-full 
   bg-transparent"   onChange={handleChangeName}  />

</div>
<div className="mb-5">
  <label className="block mb-2 text-sm playwrite-de-grund  text-black">Your PhoneNumber</label>
            <p className='text-rose-800'>{seePhoneNumberError && phoneNumberError}</p> 
  <input  value={phone_number}  onChange={handleChangePhoneNumber} type="text" name="phone_number"  className="input 
   border-black focus:border-black
  input-lg w-full  bg-transparent"   />
</div>

<div className="mb-5">
  <label className="block mb-2 text-sm playwrite-de-grund  text-black">Your Name</label>
  <p className='text-rose-900'>{seeNameError && nameError}</p>
  <input  onChange={handleChange} value={name}    type="text" name="name"  className="input 
    focus:border-black input-lg w-full border-black bg-transparent" />
</div>



<div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm playwrite-de-grund text-black">Amount paid</label>
  <input type="number"   onChange={handleChange}  name='amount_paid'   value={amount_paid}  className="input  
    border-black focus:border-black input-lg w-full  bg-transparent" />
</div>




<div className="mb-5">
  <label htmlFor="password" className="block mb-2 text-sm playwrite-de-grund text-black">Location</label>
  <input type="text" name="location"  value={location}     onChange={handleChange}  className="input  
  focus:border-black input-lg w-full border-black
    bg-transparent" />
</div>


<div className="mb-5">


<DemoContainer   minDate={dayjs(new Date())}
           maxDate={dayjs(new Date())}   sx={{ m: 1,  '& label.Mui-focused': {
          color: 'black',
          fontSize:'16px'
        
          },
        '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px',

          },
        '&.Mui-focused fieldset':  {
          borderColor: 'black', // Set border color to transparent when focused
        
        }
        },  }} components={['DatePicker']}>
        <DatePicker  className='myTextField' disabled  onChange={(date)=> handleChangeDate(date)} 
         value={date_registered
         }  label="Date Registered" />
      </DemoContainer>


</div>


 <div className="mb-5">
  {seeCustomerCode && (<>  <label htmlFor="password" className="block mb-2 text-sm playwrite-de-grund text-black">Customer Code</label>
  <input type="text" name="customer_code"  value={customer_code} onChange={handleChange}  className="input  
  
    focus:border-black border-black
  input-lg w-full  bg-transparent"    /> </>)}

</div>




<div className="flex gap-8">


<button type='submit' className="px-6 py-2 font-medium bg-green-600 text-white w-fit transition-all shadow-[3px_3px_0px_black] 
hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
  {loading && <ImSpinner9 className={`${loading && 'animate-spin block'} hidden`}/>}
        Submit
      </button>


      <button  onClick={handleCloseRegistrationForm} className="px-6 py-2 font-medium bg-red-600 text-white w-fit transition-all shadow-[3px_3px_0px_black]
       hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
        Cancel
      </button>
            {/* <button type="submit"  disabled={loading}   className="btn btn-active">
              
            {loading && <ImSpinner9 className={`${loading && 'animate-spin block'} hidden`}/>}

              Submit</button>

              <button
                onClick={handleCloseRegistrationForm}
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
   
   </>
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




export default  CustomerRegistrationForm;