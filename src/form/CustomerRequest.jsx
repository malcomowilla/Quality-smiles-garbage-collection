import {Link} from 'react-router-dom'
import {useState, useEffect} from'react'
import { Button, } from "flowbite-react";
import  CustomerRequestAlert from '../Alert/CustomerRequestAlert'
import CustomerRequestError from '../Alert/CustomerRequestError'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { SiMoneygram } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion"
import CustomerProfile from '../components/CustomerProfile';
import { FaUserCircle } from 'react-icons/fa';





const CustomerRequest = () => {
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude,
        customerId,setCustomerId, companySettings,setcompanySettings} = useApplicationSettings()
const [loading, setloading]  = useState(false)
const [openRequest, setopenRequest] = useState(false)
const [openRequestError, setopenRequestError] = useState(false)

const [showProfile, setShowProfile] = useState(false);


const {company_name, contact_info, email_info, logo_preview} = companySettings

const  handleCloseRequestError = (event, reason) => {
    if (reason === 'clickaway') {
        return;
      }
    setopenRequestError(false)
}
 




const handleCloseRequest = (event, reason)=> {
    if (reason === 'clickaway') {
        return;
      }

    setopenRequest(false)
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
  






const confirmRequest = async(e)=> {
    e.preventDefault()
    try {
      setloading(true)
      const response = await fetch('/api/confirm_request',{
        method: 'POST',
        credentials: 'include',
  
        headers: {
          'Content-Type': 'application/json'
        },
  
      })
      if (response.ok) {
        console.log('data received')
        setloading(false)
        setopenRequest(true)

      } else {
        console.log('err')
        setloading(false)
        setopenRequestError(true)

      }
    } catch (error) {
     console.log(error)
     setloading(false)
     setopenRequestError(true)
    }
  }
  
  

  return (
   <>
   <CustomerRequestAlert  openRequest={openRequest} handleCloseRequest={handleCloseRequest} />
   <CustomerRequestError  handleCloseRequestError={handleCloseRequestError} 
   openRequestError={openRequestError} />




<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white
flex justify-center items-center">
  {/* Top Navigation Bar */}
  <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center
   fixed top-0 w-full z-10">
    <Link to='/customer' className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
       viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
         d="M15 19l-7-7 7-7" />
      </svg>
      <span className='max-sm:text-xl sm: text-2xl font-semibold'>Back</span>
    </Link>
    <AnimatePresence mode="wait">
        {showProfile && (
          <CustomerProfile 
            key="customer-profile"
            onClose={() => setShowProfile(false)} 
          />
        )}
      </AnimatePresence>

      {/* Add profile button to your header */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowProfile(true)}
          className="text-gray-600 hover:text-gray-900 p-2"
        >
          <FaUserCircle className="max-sm:text-5xl sm:text-5xl 
           max-md:text-5xl " />
        </motion.button>
        {/* ... other header content ... */}
      </div>
    <div className="w-6"></div> {/* Spacer for alignment */}
  </div>

  {/* Main Content */}
  <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
    {/* Logo and Title */}
    <div className="flex flex-col items-center mb-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={logo_preview} 
          className="w-32 h-32 rounded-full shadow-lg mb-4" 
          alt={company_name} 
        />
      </motion.div>
      <h2 className="text-4xl font-bold text-gray-900 text-center">
        {company_name}
      </h2>
    </div>


    <div className="p-6 bg-white shadow-md rounded-lg mb-7">
  <h2 className="text-xl font-bold text-black">Wallet Balance</h2>
  <p className="text-2xl text-gray-500">00.00 ksh</p>
  {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Top Up</button> */}
</div>
    {/* Quick Actions */}
    <div className="mb-8">
      <Link to='/customer-payment'>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3"
        >
          <div className="bg-green-50 p-2 rounded-full">
            <SiMoneygram className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-3xl">Top Up Balance</h3>
            <p className="text-xl text-gray-600 ">Add funds to your account</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </Link>
    </div>

    {/* Request Form */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Confirm Your Request
      </h3>
      
      <form onSubmit={confirmRequest}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className='text-2xl'>Confirm Request</span>
            </>
          )}
        </motion.button>
      </form>

      <p className="text-xl text-gray-600 text-center
       mt-4">
        Your request will be processed shortly
      </p>
    </div>
  </div>
</div>
   </>
  )
}

export default  CustomerRequest



