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






const ServiceProviderForm = () => {
const [loading, setloading] = useState()
const [openProviderDelivered, setopenProviderDelivered] = useState(false)
const [openProviderConfirmationError, setopenProviderConfirmationError] = useState(false)


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
          className="ml-3 text-xl font-semibold text-gray-800 playwrite-de-grund"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {company_name}
        </motion.h1>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 py-6 flex  flex-col justify-center items-center">
        <motion.div 
          className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6
          "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 playwrite-de-grund mb-6">
            Confirm Delivery
          </h2>

          <form onSubmit={confirmDelivery} className="space-y-6">
            {/* Status Card */}
            <motion.div 
              className="bg-green-50 rounded-xl p-4 border border-green-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-green-800 font-medium playwrite-de-grund">
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
                <span className="text-blue-800 font-medium playwrite-de-grund">
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
                Confirm Delivered
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
          <span className="playwrite-de-grund">Logout</span>
        </button>
      </motion.div>
    </motion.section>
  </motion.div>
     </>
    )
  }
  
  export default ServiceProviderForm
  
  
  
  