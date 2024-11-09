import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { encode } from 'open-location-code';
import { CiLogout } from "react-icons/ci";
import CustomerDeleteLoginAlert from '../Alert/CustomerDeleteLoginAlert'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import CustomerConfirmationAlert from '../Alert/CustomerConfirmationAlert'
import CustomerConfirmAlertError from '../Alert/CustomerConfirmAlertError'
import { FaHandPointLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOut } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa6";
import StoreManagerErrorLogin from '../Alert/StoreManagerErrorLogin'
import StoreManagerDelivered from '../Alert/StoreManagerDelivered'
import StoreManagerDeliveredError from '../Alert/StoreManagerDeliveredError'
import StoreManagerLogin from '../Alert/StoreManagerLogin'
import { MdDeliveryDining } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";





const StoreManagerForm = () => {
const navigate = useNavigate()
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude, storeManagerSet, setStoreManagerSet,
        handleChangeStoreSet,openStoreManagerLogin,
         handleCloseStoreManagerLogin,setopenStoreManagerLogout,
         companySettings
      } = useApplicationSettings()
       
      const {company_name, contact_info, email_info, logo_preview} = companySettings

        const [open, setOpen] = useState(false);
        const [loading, setloading] = useState(false)
        const [openConfirmationAlert, setopenConfirmationAlert] = useState(false)
        const [openConfirmAlertError, setopenConfirmAlertError] = useState(false)
const [openStoreManagerError, setopenStoreManagerError] = useState(false)
const [openStoreManagerSucess, setopenStoreManagerSucess] = useState(false)
const [openStoreManagerDeliverError, setopenStoreManagerDeliverError] = useState(false)




const handleCloseStoreManagerDeliverError = ()=>{
  setopenStoreManagerDeliverError(false)
}

const  handleCloseStoreManagerSucess = ()=>{
  setopenStoreManagerSucess(false)
}


        

       const handleCloseStoreManagerError = ()=>{
        setopenStoreManagerError(false)
       }


 

const confirmBag = async(e)=> {
  e.preventDefault()
  try {
    setloading(true)
    const response = await fetch('/api/confirm_deivered_bags_from_store',{
      method: 'POST',
      credentials: 'include',
    body: JSON.stringify(
      storeManagerSet
    ),

      headers: {
        'Content-Type': 'application/json'
      },

    })
    if (response.ok) {
      setloading(false)
      setopenStoreManagerSucess(true)
    } else {
      setloading(false)
      setopenStoreManagerDeliverError(true)

    }
  } catch (error) {
    setloading(false)
    setopenStoreManagerDeliverError(true)
  }
}






const handleLogout = async() => {

  try {
    const response = await fetch('/api/logout_store_manager', {
      method: 'DELETE',
      credentials: 'include'

    })

    if (response.status === 403) {
      setopenStoreManagerError(true)
    }
if (response.ok) {
  navigate('/store_manager_role')
  localStorage.removeItem('store manager');
  setopenStoreManagerLogout(true)
} else {
  console.log('failed')
}

  } catch (error) {
    console.log(error)
    setOpen(true)
  }
}



const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};


  return (

   <>




   
  
  

 {/* Alerts */}
 <AnimatePresence>
        
<StoreManagerLogin  openStoreManagerLogin={openStoreManagerLogin}
 handleCloseStoreManagerLogin={handleCloseStoreManagerLogin}/> 
        
   <StoreManagerErrorLogin openStoreManagerError={openStoreManagerError}
    handleCloseStoreManagerError={handleCloseStoreManagerError} />
        <StoreManagerDeliveredError  openStoreManagerDeliverError={openStoreManagerDeliverError}
     handleCloseStoreManagerDeliverError={handleCloseStoreManagerDeliverError}/>
        <StoreManagerDelivered openStoreManagerSucess={openStoreManagerSucess}
    handleCloseStoreManagerSucess={handleCloseStoreManagerSucess} />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white
        flex items-center justify-center"
      >
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center"
        >
          {/* Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
  <img 
                src={logo_preview} 
                className="w-24 h-24 rounded-full shadow-2xl mb-4" 
                alt={company_name} 
              />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl playwrite-de-grund tracking-wides
              t text-gray-900 font-serif font-light"
            >
              {company_name}
            </motion.h1>
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <MdDeliveryDining className="text-4xl text-green-600" />
              <h2 className="text-xl font-bold text-gray-900 playwrite-de-grund">
                Confirm Delivered Bags
              </h2>
            </div>

            <form onSubmit={confirmBag} className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <Label 
                  htmlFor="bags-count" 
                  className="text-gray-700 playwrite-de-grund mb-2 block"
                >
                  Number Of Bags Delivered
                  </Label>
                <div className="relative">
                  <FaBoxes className="absolute left-3 top-1/2 transform -translate-y-1/2
                   text-gray-400" />
                  <TextInput
                    id="bags-count"
                    type="number"
                    name="number_of_bags_delivered"
                    value={storeManagerSet.number_of_bags_delivered}
                    onChange={handleChangeStoreSet}
                    className="pl-10"
                    placeholder="Enter number of bags"
                    style={{
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Link to="/store_manager_receved">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 bg-gray-50 
                    rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700 playwrite-de-grund">Confirm Received?

                    </span>
                    <FaHandPointRight className="text-green-600 text-xl" />
                  </motion.div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl 
                    py-3 flex items-center justify-center gap-2 shadow-lg transform transition-all duration-200"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : null}
                  Confirm Delivery
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-3"
                >
                  <FaHandPointLeft />
                  <span className="playwrite-de-grund">Logout</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.section>
      </motion.div>
   </>
  )
}

export default StoreManagerForm



