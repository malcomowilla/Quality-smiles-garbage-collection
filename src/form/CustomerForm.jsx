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


// openLoginCustomerSuccessfully,handleCloseLoginCustomerSuccessfully}

const CustomerForm = () => {
const navigate = useNavigate()
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude, openLogoutCustomerSucessfully,
        handleCloseLogoutCustomerSuccessfully,setopenLogoutCustomerSucessfully,openLoginCustomerSuccessfully,
        handleCloseLoginCustomerSuccessfully
      } = useApplicationSettings()
       
         
        const [open, setOpen] = useState(false);
        const [loading, setloading] = useState(false)
        const [openConfirmationAlert, setopenConfirmationAlert] = useState(false)
        const [openConfirmAlertError, setopenConfirmAlertError] = useState(false)

        

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



const handleLogout = async() => {

  try {
    const response = await fetch('/api/logout_customer', {
      method: 'DELETE',
      credentials: 'include'

    })
if (response.ok) {
  navigate('/customer_role')
  setopenLogoutCustomerSucessfully(true)
  localStorage.removeItem('customer');

} else {
  console.log('failed')
}

  } catch (error) {
    console.log(error)
    setOpen(true)
  }
}






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
  
<section className="bg-white  h-screen grid grid-auto-fit items-center">
<div className='p-9'>
  <Link to='/customer-ticket-status'>
<motion.button whileHover={{
    scale: 1.2,
    transition: { duration: 0.5 },

    
  }} className='bg-yellow-600 rounded-md text-sm  p-1'>
  <p className='text-white'>
    <img src="/images/logo/support_customer.png" className='w-8 h-8' alt="support-ticket" />
    Support Ticket</p>
</motion.button>
</Link>



  <Link to='/customer-payment'>
<motion.div whileHover={{
    scale: 1.2,
    transition: { duration: 0.5 },

    
  }}   whileTap={{ scale: 0.9 }}  className='flex p-3 border-2 mt-4 border-green-800
    ml-4  text-black cursor-pointer   w-[120px] gap-x-4  playwrite-de-grund rounded-md'>
      <SiMoneygram className='text-green-700'/>
      To Up   </motion.div> </Link>

</div>

<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    
<div className='flex justify-center'>
    <img src="/images/logo/logo-small.png" className='w-20 h-20 rounded-full shadow-lg' alt="quality-smiles" />
</div>
<div className=' text-black mb-10  sm:text-5xl max-sm:text-4xl playwrite-de-grund   tracking-widest'>
                 Quality Smiles
        </div>
        
    <div className='flex justify-between'>
        
    <h2 className="mb-4   playwrite-de-grund  text-xl font-bold text-gray-900 dark:text-white ">
       Confirm Plastic Bag Received  </h2>

   


    </div>
    <form onSubmit={confirmBag} >
       

<div>
    <p className='text-black font-extrabold playwrite-de-grund'>Your Bag Is Full? <span className='underline font-light'>
      <Link to='/customer-request'>
    request here</Link></span></p>
</div>
{/* 
<div className='flex flex-row gap-4'>
   <Link to='/customer_role'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black'>Go Back</span>

</div> */}
        <div className='mt-9 flex gap-x-[50px]'>

<div className='text-black text-xl cursor-pointer playwrite-de-grund p-3' onClick={handleLogout}>
            <BiLogOut />
            <p>Logout</p>
            </div>
       
            <button type="submit"    disabled={loading} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium
             text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200
               hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100
                  dark:border-gray-600 playwrite-de-grund
                dark:hover:text-white hover:bg-teal-700">
                  
                  { loading &&
        <svg aria-hidden="true" className={`inline w-10 h-10 text-gray-200  ${loading && 'animate-spin'} 
         dark:text-gray-600 fill-red-800`}
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
         0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 
         91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 
         9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167
         
         20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
          46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
           10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 
           79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 
           39.0409Z" fill="currentFill"/>
        </svg>
          }
                  
                  confirm received
                
                
                </button>

    
        </div>
       

    </form>
</div>
</section>
   </>
  )
}

export default CustomerForm



