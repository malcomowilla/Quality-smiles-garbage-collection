import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { encode } from 'open-location-code';
import { CiLogout } from "react-icons/ci";
import CustomerDeleteLoginAlert from '../Alert/CustomerDeleteLoginAlert'
import { Button,  } from "flowbite-react";
import CustomerConfirmationAlert from '../Alert/CustomerConfirmationAlert'
import CustomerConfirmAlertError from '../Alert/CustomerConfirmAlertError'
import { BiLogOut } from "react-icons/bi";
import { SiMoneygram } from "react-icons/si";
import { motion } from "framer-motion"
import CustomerLogin from '../Alert/CustomerLogin'
import { BiMessageDots } from "react-icons/bi";


// openLoginCustomerSuccessfully,handleCloseLoginCustomerSuccessfully}

const CustomerForm = () => {
const navigate = useNavigate()
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude, openLogoutCustomerSucessfully,
        handleCloseLogoutCustomerSuccessfully,setopenLogoutCustomerSucessfully,openLoginCustomerSuccessfully,
        handleCloseLoginCustomerSuccessfully,handleCustomerLogout
      } = useApplicationSettings()
       
         
        const [open, setOpen] = useState(false);
        const [loading, setloading] = useState(false)
        const [openConfirmationAlert, setopenConfirmationAlert] = useState(false)
        const [openConfirmAlertError, setopenConfirmAlertError] = useState(false)

        const {companySettings,setcompanySettings} = useApplicationSettings()

        const {company_name, contact_info, email_info, logo_preview} = companySettings

        const handleCloseConfirmAlertError = (event, reason)=> {
          if (reason === 'clickaway') {
            return;
          }

          setopenConfirmAlertError(false)

        }








const handleCloseConfirmationAlert = (event, reason)=> {
  if (reason === 'clickaway') {
    return;
  }

  setopenConfirmationAlert(false)
}









        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
        
          setOpen(false);
        };




const confirmBag = async(e)=> {
  e.preventDefault()
  try {
    setloading(true)
    const response = await fetch('/api/confirm_bag',{
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json'
      },

    })
    if (response.ok) {
      setloading(false)
      setopenConfirmationAlert(true)
    } else {
      setloading(false)
      setopenConfirmAlertError(true)

    }
  } catch (error) {
    setloading(false)
    setopenConfirmAlertError(true)
  }
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








// useEffect(() => {
//   const savedCustomer = localStorage.getItem('customer');
//   console.log('saved customer', JSON.parse(savedCustomer))
//   if (savedCustomer) {
//     setCustomer(JSON.parse(savedCustomer));
//   }


// }, [customer,  setCustomer
  
// ]);
  return (


   <>




   <CustomerLogin  openLoginCustomerSuccessfully={openLoginCustomerSuccessfully} 
    handleCloseLoginCustomerSuccessfully={handleCloseLoginCustomerSuccessfully}/>
   <CustomerConfirmationAlert openConfirmationAlert={openConfirmationAlert}
     handleCloseConfirmationAlert={handleCloseConfirmationAlert}

/>
   <CustomerDeleteLoginAlert open={open}  handleClose={handleClose} />
   <CustomerConfirmAlertError openConfirmAlertError={openConfirmAlertError}
    handleCloseConfirmAlertError={handleCloseConfirmAlertError}
   />
  
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white
flex justify-center items-center">
  <div className="bg-white shadow-sm px-4 py-3 flex justify-between
   items-center fixed top-0 w-full z-10">
    <div className="flex items-center gap-3">
      <img src={logo_preview} className="w-10 h-10 rounded-full" alt={company_name} />
      <h1 className="text-2xl font-semibold text-gray-900 itim-regular
      ">{company_name}</h1>
    </div>
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCustomerLogout}
      className="text-gray-600 hover:text-gray-900"
    >
      <BiLogOut size={40} />
    </motion.button>
  </div>


  <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Link to='/customer-ticket-status'>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100
           flex flex-col items-center gap-2"
        >
          <div className="flex flex-col items-center">
            <img src="/images/logo/support_customer.png" className="w-12 h-12"
             alt="support-ticket" />
            <span className="text-lg font-medium text-gray-700
            itim-regular">Support Ticket</span>
            
            <Link 
              to="/customer-chat"
              className="mt-2 flex items-center gap-1 text-sm text-green-600 
              hover:text-green-700 bg-green-50 px-3 py-1 rounded-full"
            >
              <BiMessageDots className="w-4 h-4" />
              Chat Support
            </Link>
          </div>
        </motion.div>
      </Link>

      <Link to='/customer-payment'>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2"
        >
          <SiMoneygram className="text-green-600 w-12 h-12" />
          <span className="text-sm font-medium text-gray-700">Top Up</span>
        </motion.div>
      </Link>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 
      mb-6 itim-regular">Confirm Plastic Bag</h2>
      
      <form onSubmit={confirmBag}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Confirming...</span>
            </>
          ) : (
           <p className="itim-regular text-lg">Confirm Received</p>
          )}
        </motion.button>
      </form>
    </div>

    <Link to='/customer-request'>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center"
      >
        <div>
          <h3 className="text-2xl font-semibold text-gray-900
          itim-regular">Bag Full?</h3>
          <p className="text-lg text-gray-600">Request a new bag here</p>
        </div>
        <div className="text-green-600 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  </div>
</div>
   </>
  )
}

export default CustomerForm



