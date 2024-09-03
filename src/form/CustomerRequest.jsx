import {Link} from 'react-router-dom'
import {useState, useEffect} from'react'
import { Button, } from "flowbite-react";
import  CustomerRequestAlert from '../Alert/CustomerRequestAlert'
import CustomerRequestError from '../Alert/CustomerRequestError'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { SiMoneygram } from "react-icons/si";
import { motion } from "framer-motion"






const CustomerRequest = () => {
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude} = useApplicationSettings()
const [loading, setloading]  = useState(false)
const [openRequest, setopenRequest] = useState(false)
const [openRequestError, setopenRequestError] = useState(false)




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
   <CustomerRequestError  handleCloseRequestError={handleCloseRequestError} openRequestError={openRequestError} />


<section className="bg-white  dark:bg-gray-900 h-screen flex items-center">
<Link to='/customer-payment'>
<motion.div whileHover={{
    scale: 1.2,
    transition: { duration: 0.5 },

    
  }}   whileTap={{ scale: 0.9 }}  className='flex p-3 border-2 border-green-800
    ml-4  text-black cursor-pointer   w-[120px] gap-x-4  playwrite-de-grund rounded-md'>
      <SiMoneygram className='text-green-700'/>
      To Up   </motion.div> </Link>

<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">

<div className=' text-black mb-10  sm:text-5xl max-sm:text-4xl playwrite-de-grund  tracking-widest'>
                 Quality Smiles
        </div>
    <div className='flex justify-evenly'>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white playwrite-de-grund "> Confirm Your Request </h2>
<div>
    <img src="/images/logo/logo-small.png" className='w-10 h-10 rounded-full' alt="quality-smiles" />
</div>
    </div>


    <form onSubmit={confirmRequest}>
        
<div className='flex flex-row gap-4'>
   <Link to='/customer'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black playwrite-de-grund'>Go Back</span>

</div>


        <div className='mt-2'>
        <Button className='playwrite-de-grund flex '  disabled={loading} type="submit">
        
        
      
        <div role="status">
          { loading &&
        <svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'}  dark:text-gray-600 fill-red-700`}
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
        
        </div>
          
          Confirm Request</Button>
        </div>
       

    </form>
</div>
</section>
   </>
  )
}

export default  CustomerRequest



