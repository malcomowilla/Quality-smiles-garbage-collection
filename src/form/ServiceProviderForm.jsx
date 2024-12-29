import {Link, useNavigate} from 'react-router-dom'
import { Button, } from "flowbite-react";
import {useState, useEffect} from 'react'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { BiLogOut } from "react-icons/bi";
import ServiceProviderConfirmationAlert from '../Alert/ServiceProviderConfirmationAlert'
import  ServiceProviderConfirmationAlertError  from '../Alert/ServiceProviderConfirmationAlertError'
import ServiceProviderLogin from '../Alert/ServiceProviderLogin'
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineCancel } from "react-icons/md";
import { FaTicketSimple } from "react-icons/fa6";
import { AiOutlineFileText } from "react-icons/ai";






const ServiceProviderForm = () => {
const [loading, setloading] = useState()
const [openProviderDelivered, setopenProviderDelivered] = useState(false)
const [openProviderConfirmationError, setopenProviderConfirmationError] = useState(false)
const [isAvailable, setIsAvailable] = useState(false);
const [showAvailabilityPrompt, setShowAvailabilityPrompt] = useState(false);
const [Loading, setLoading] = useState(false);

const handleToggleAvailability = () => {
  setShowAvailabilityPrompt(true);
};


console.log('isAvailable', isAvailable)
// get_current_status
useEffect(() => {
  const getCurrentStatus = async () => {
    try {
      const response = await fetch('/api/get_current_status', {
        method: 'GET',
        credentials: 'include',
      });
      const newData = await response.json();
      if (response.ok) {
        // setIsAvailable(newData.status);
        setIsAvailable(newData.status === 'available');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getCurrentStatus()
  // return () => {
  //   getCurrentStatus();
  // };
}, []);




const confirmAvailabilityChange = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const availabilityStatus = isAvailable ? 'available' : 'not_available';
    const response = await fetch('/api/update_availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: availabilityStatus }) // Send the new status
    });

    const newData = await response.json();
    if (response.ok) {
      setIsAvailable(newData.message); // Update local state only if API call is successful
      toast.success('Availability updated successfully!', {
        duration: 5000,
        icon: '✅',
        position: 'top-center',
      });
    } else {
      toast.error('Availability updated failed!', {
        duration: 5000,
        position: 'top-center',
      });
      console.error('Failed to update availability');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
    setShowAvailabilityPrompt(false);
  }
};
const navigate = useNavigate()

const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
  customerLatitude,  setCustomerLatitude,setopenServiceProviderLogoutSuccesful,
  openServiceProviderLoginSuccesful, handleCloseServiceProviderLoginSuccesful,
  companySettings, handleLogout} = useApplicationSettings()
 
   
  const {company_name, contact_info, email_info, logo_preview} = companySettings



  


  const handleCloseProviderConfirmationError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setopenProviderConfirmationError(false)
  }
 


  const handleCloseopenProviderDelivered = (event, reason)=> {
    if (reason === 'clickaway') {
      return;
    }
    setopenProviderDelivered(false)
  }
 


  
  

const confirmDelivery = async (e)=> {
  e.preventDefault()
  try {
    setloading(true)
    const response = await fetch('/api/confirm_delivery',{
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json'
      },

    })
    if (response.ok) {
      setloading(false)
      setopenProviderDelivered(true)

    } else {
      setloading(false)
      setopenProviderConfirmationError(true)

    }
  } catch (error) {
    setloading(false)
    setopenProviderConfirmationError(true)

  }
}









    const handleGoBack = () => {
      navigate(-1)
    }





useEffect(() => {
  const  watchId = navigator.geolocation.watchPosition((position)=> {
    const {latitude, longitude} = position.coords
    setCustomerLatitude(latitude)
    setCustomerLongitude(longitude)
  })

  return () => {
    navigator.geolocation.clearWatch(watchId);

  };
}, [ setCustomerLatitude,  setCustomerLongitude]);



    return (
     <>
     <Toaster />
     <ServiceProviderLogin openServiceProviderLoginSuccesful={openServiceProviderLoginSuccesful} 
   
   handleCloseServiceProviderLoginSuccesful={handleCloseServiceProviderLoginSuccesful}
   />
  <ServiceProviderConfirmationAlert  handleCloseopenProviderDelivered={handleCloseopenProviderDelivered}  
  openProviderDelivered={openProviderDelivered}/>
  <ServiceProviderConfirmationAlertError openProviderConfirmationError={openProviderConfirmationError}  
  handleCloseProviderConfirmationError={handleCloseProviderConfirmationError} />
 

  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gradient-to-b from-blue-50 to-white
    "
  >
    <motion.section 
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="h-screen flex flex-col "
    >
      {/* Header */}
      <motion.div 
        className="relative py-6 px-4 flex justify-center items-center border-b
         border-gray-100"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <motion.img 
          src={logo_preview}
          className="w-14 h-1 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.h1 
          className="ml-3 text-3xl font-semibold text-gray-800 playwrite-de-grund"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {company_name}
        </motion.h1>
      </motion.div>


      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={handleToggleAvailability}
          className={`w-full ${isAvailable ? 'bg-green-600' : 'bg-red-600'} hover:bg-opacity-80 text-white rounded-xl py-3 flex items-center justify-center gap-2`}
        >
          <p className='text-2xl'>{isAvailable ? 'available' : 'not_available'} </p>
        </Button>
      </motion.div>

      {/* Availability Confirmation Prompt */}
      <AnimatePresence>
        {showAvailabilityPrompt && (
          <form onSubmit={confirmAvailabilityChange}>
          <motion.div
            className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-xl font-bold mb-4 text-black">Change Availability</h2>

              <p className="mb-6 text-black font-thin">Would you like to change yur availability to serve customers</p>
              <label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"  checked={isAvailable} 
  
  onChange={() => setIsAvailable(!isAvailable)}/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
   peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
     peer-checked:after:border-white after:content-[''] 
     after:absolute after:top-[2px] after:start-[2px] after:bg-white
      after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
       dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">


    <p className='text-black'>{isAvailable ? 'available' : 'not_available'}</p>
  </span>
</label>

              <div className="flex items-center justify-around mt-2">
                <button
                 type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-md  p-2"
                  disabled={Loading} // Disable button while loading
                >
                  Submit
                </button>
               
              </div>

              <div onClick={() => setShowAvailabilityPrompt(false)} className='p-4 bg-red-300 rounded-xl
               hover:bg-red-600 
              
              transition-colors mt-3'>
              <MdOutlineCancel  className='text-black' />
              </div>
             
            </motion.div>
          </motion.div>
          
          </form>
        )}
      </AnimatePresence>


      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 py-6 flex  flex-row justify-center items-center">





      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-lg  ">

        <div className='flex justify-center items-center text-black p-2 text-2xl'>
        <p>Assigned Ticket</p>
        </div>
    <AiOutlineFileText className='w-8 h-8 text-black mb-2' />
    <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
    </a>
    <p className="mb-3 font-normal text-black">You will see the ticket if you have been assigned one :</p>
    <Link to='/assigned_ticket' className="inline-flex font-medium items-center text-blue-600 hover:underline">
        Your Assigned Customer Ticket
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
             d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166
              1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </Link>
</div>



        <motion.div 
          className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6
          "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 playwrite-de-grund 
          mb-6">
            Confirm Delivery
          </h2>

          <form onSubmit={confirmDelivery} className="space-y-6">
            {/* Status Card */}
            <motion.div 
              className="bg-green-50 rounded-xl p-4 border border-green-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-green-800 font-medium playwrite-de-grund
              text-2xl">
                Ready to confirm plastic bag delivery?
              </p>
            </motion.div>

            {/* Action Links */}
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/provider-collecting"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-800 font-medium playwrite-de-grund
                text-2xl">
                  Collect Garbage
                </span>
                <motion.svg 
                  whileHover={{ x: 5 }}
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 flex items-center justify-center gap-2"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : null}
                <p className='text-2xl'>Confirm Delivered</p>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Footer/Logout */}
      <motion.div 
        className="border-t border-gray-100 p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <BiLogOut className="text-xl" />
          <span className="playwrite-de-grund text-2xl">Logout</span>
        </button>
      </motion.div>
    </motion.section>
  </motion.div>
     </>
    )
  }
  
  export default ServiceProviderForm
  
  
  
  