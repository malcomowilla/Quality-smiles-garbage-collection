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

import { BiLogOut } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa6";
import StoreManagerErrorLogin from '../Alert/StoreManagerErrorLogin'
import StoreManagerDelivered from '../Alert/StoreManagerDelivered'
import StoreManagerDeliveredError from '../Alert/StoreManagerDeliveredError'



const StoreManagerForm = () => {
const navigate = useNavigate()
    const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
        customerLatitude, customer, setCustomer, setCustomerLatitude, storeManagerSet, setStoreManagerSet,
        handleChangeStoreSet} = useApplicationSettings()
       
         
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

} else {
  console.log('failed')
}

  } catch (error) {
    console.log(error)
    setOpen(true)
  }
}
  return (

   <>
   <StoreManagerErrorLogin openStoreManagerError={openStoreManagerError}
    handleCloseStoreManagerError={handleCloseStoreManagerError} />

    <StoreManagerDeliveredError  openStoreManagerDeliverError={openStoreManagerDeliverError}
     handleCloseStoreManagerDeliverError={handleCloseStoreManagerDeliverError}/>
  
  <StoreManagerDelivered openStoreManagerSucess={openStoreManagerSucess}
    handleCloseStoreManagerSucess={handleCloseStoreManagerSucess} />
<section className="bg-white  dark:bg-gray-900 h-screen flex items-center">

<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">

  
<div className='flex justify-center'>
        
        <div className=''>
            <img src="/images/logo/logo-small.png" className='w-20 h-20 rounded-full' alt="quality-smiles" />
        </div>
            </div>
<div className=' text-black mb-10  sm:text-5xl max-sm:text-4xl playwrite-de-grund   tracking-widest'>

                 Quality Smiles
                  
        </div>
      
     <div className='flex justify-center'> <p className='playwrite-de-grund text-black font-bold'>Confirm Delivered Bag</p> </div>
    <form onSubmit={confirmBag} className='' >
       

{/* 
<div className='flex flex-row gap-4'>
   <Link to='/customer_role'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black'>Go Back</span>

</div> */}

<div className='p-7'>

      
      <div>
        <div className=" block playwrite-de-grund">
          <Label htmlFor="repeat-password" value="Number Of Bags Delivered" />
        </div>
        <TextInput id="repeat-password"  className='py-3' type="text" name='number_of_bags_delivered'
         value={storeManagerSet.number_of_bags_delivered} onChange={handleChangeStoreSet} shadow />
      </div>
      </div>

      
        <div className='mt-9 '>
<Link to='/store_manager_receved'>
        <div className='relative  cursor-pointer '>
          <div className='absolute right-0'>
          <FaHandPointRight className='text-black w-10 h-10 ' />
          <p className='playwrite-de-grund text-black '>Confirm Received?</p>
          </div>
        
       </div>
       </Link>

<div className='text-black text-xl cursor-pointer playwrite-de-grund p-3'  onClick={handleLogout}>
            <FaHandPointLeft className='w-10 h-10' />
            <p>Logout</p>
            </div>
       

      
       
      <Button className='playwrite-de-grund flex '  disabled={loading} type="submit">
        <div role="status">
          { loading &&
        <svg aria-hidden="true" className={`inline w-4 h-4 text-gray-200  ${loading && 'animate-spin'} 
         dark:text-gray-600 fill-red-700`}
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
          
          Confirm </Button>
        </div>
       

    </form>
</div>
</section>
   </>
  )
}

export default StoreManagerForm



