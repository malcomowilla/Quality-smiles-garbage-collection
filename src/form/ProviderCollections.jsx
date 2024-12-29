import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Button, } from "flowbite-react";
import  ServiceProviderPickUpConfirmAlert from '../Alert/ServiceProviderPickUpConfirmAlert'
import ServicerProviderConfirmationAlertError from '../Alert/ServiceProviderConfirmationAlertError'
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRecycle } from "react-icons/fa";
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { FaUserCircle } from 'react-icons/fa';
import ServiceProviderProfile from '../components/ServiceProviderProfile';




const ProviderCollections = () => {
const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [openRequest, setopenRequest] = useState(false)
    const [openRequestError, setopenRequestError] = useState(false)
    const [openProviderConfirmationPickup, setopenProviderConfirmationPickup] = useState(false)
    const [openConfirmationAlertError, setopenConfirmationAlertError] = useState(false)
    const [showProfile, setShowProfile] = useState(false);


    const {companySettings,setcompanySettings} = useApplicationSettings()

    const {company_name, contact_info, email_info, logo_preview} = companySettings
    const handleCloseConfirmationAlertError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setopenConfirmationAlertError(true)
    }



     const handleCloseProviderConfirmationPickup = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }

        setopenProviderConfirmationPickup(false)
     }





    const confirmPickup = async(e)=> {
        e.preventDefault()
        try {
          setloading(true)
          const response = await fetch('/api/confirm_collection',{
            method: 'POST',
            credentials: 'include',
      
            headers: {
              'Content-Type': 'application/json'
            },
      
          })
          if (response.ok) {
            console.log('data received')
            setloading(false)
            setopenProviderConfirmationPickup(true)    
          } else {
            console.log('err')
            setloading(false)
            setopenConfirmationAlertError(true)    
          }
        } catch (error) {
         console.log(error)
         setloading(false)
         setopenConfirmationAlertError(true)
        }
      }






    const handleGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
      }

    const handleProfileClick = () => {
        console.log('Profile button clicked');
        setShowProfile(true);
    };

  return (
   <>

   
   {/* <ServiceProviderPickUpConfirmAlert handleCloseProviderConfirmationPickup={handleCloseProviderConfirmationPickup}
     openProviderConfirmationPickup={openProviderConfirmationPickup} /> */}

{/* 
<ServicerProviderConfirmationAlertError openConfirmationAlertError={openConfirmationAlertError}  
handleCloseConfirmationAlertError={handleCloseConfirmationAlertError}

/> */}

<AnimatePresence mode="wait" initial={false}>
<ServiceProviderPickUpConfirmAlert 
  key="pickup-alert"
  handleCloseProviderConfirmationPickup={handleCloseProviderConfirmationPickup}
  openProviderConfirmationPickup={openProviderConfirmationPickup} 
/>
        
<ServicerProviderConfirmationAlertError 
  key="error-alert"
  openConfirmationAlertError={openConfirmationAlertError}  
  handleCloseConfirmationAlertError={handleCloseConfirmationAlertError}
/>

      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {showProfile && (
          <ServiceProviderProfile 
            key="profile"
            onClose={() => setShowProfile(false)} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        key="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white
        flex  flex-col justify-center items-center"
      >
        {/* Header */}
        <motion.header 
          key="header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-10
           border-b border-gray-100"
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <IoMdArrowRoundBack className="text-2xl" />
              <span className="playwrite-de-grund text-2xl">Back</span>
            </motion.button>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleProfileClick}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <FaUserCircle className="w-14 h-14" />
              </motion.button>

              <motion.img 
                src={logo_preview}
                alt={company_name}
                className="w-14 h-14 rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.header>

        <motion.main 
          key="main"
          className="pt-24 px-4 pb-8 max-w-2xl mx-auto"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {/* Title Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 playwrite-de-grund mb-2">
              {company_name}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          {/* Collection Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                  <FaRecycle className="text-5xl text-green-600" />
              </motion.div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 playwrite-de-grund text-center mb-4">
              Confirm Plastic Bag Collection
            </h2>

            <p className="text-gray-600 text-center mb-6">
              Ready to confirm the collection of plastic bags?
            </p>

            <form onSubmit={confirmPickup}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 
                    hover:to-green-800 text-white rounded-xl py-3 flex items-center justify-center gap-2
                    shadow-lg transform transition-all duration-200 playwrite-de-grund"
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
                  {loading ? 'Confirming...' : 'Confirm Pickup'}
                </Button>
              </motion.div>
            </form>
            </motion.div>

{/* Status Indicator */}
<motion.div 
  className="text-center text-gray-500 playwrite-de-grund"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  <p>Tap to confirm collection</p>
</motion.div>
</motion.main>
</motion.div>
   </>
  )
}

export default  ProviderCollections 



