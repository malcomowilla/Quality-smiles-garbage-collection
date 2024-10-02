import {Link, useNavigate} from 'react-router-dom'
import { Button, } from "flowbite-react";
import {useState, useEffect} from 'react'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { BiLogOut } from "react-icons/bi";
import ServiceProviderConfirmationAlert from '../Alert/ServiceProviderConfirmationAlert'
import  ServiceProviderConfirmationAlertError  from '../Alert/ServiceProviderConfirmationAlertError'
import ServiceProviderLogin from '../Alert/ServiceProviderLogin'






const ServiceProviderForm = () => {
const [loading, setloading] = useState()
const [openProviderDelivered, setopenProviderDelivered] = useState(false)
const [openProviderConfirmationError, setopenProviderConfirmationError] = useState(false)


const navigate = useNavigate()

const {customerLongitude, setCustomerLongitude,plusCode, setPlusCode,
  customerLatitude,  setCustomerLatitude,setopenServiceProviderLogoutSuccesful,
  openServiceProviderLoginSuccesful, handleCloseServiceProviderLoginSuccesful} = useApplicationSettings()
 
   



  


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
 












  const handleLogout = async(e) => {
e.preventDefault()
    try {
      const response = await fetch('/api/logout_service_provider', {
        method: 'DELETE',
        credentials: 'include'
  
      })



      
  if (response.ok) {
    navigate('/service_provider_role')
    localStorage.removeItem('service provider');
    setopenServiceProviderLogoutSuccesful(true)
  
  } else {
    console.log('failed')
  }
  
    } catch (error) {
      console.log(error)
    }
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


  <section className="bg-white  h-screen flex justify-center items-center">
  
  
  
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <div className='flex justify-center'> <img src="/images/logo/logo-small.png"
     className='w-20 h-20 rounded-full shadow-2xl' alt="quality-smiles" /> </div>
  <div className=' text-black mb-10 playwrite-de-grund sm:text-5xl max-sm:text-4xl playwrite-de-grund   tracking-widest'>
                 Quality Smiles
        </div>
  <div className='flex justify-between'>
    <h2 className="mb-4 text-xl font-bold text-gray-900  playwrite-de-grund"> Confirm Plastic Bag Given  </h2>
<div>
    
    {/* <img src="/images/logo/logo-small.png" className='w-10 h-10 rounded-full' alt="quality-smiles" /> */}
</div>
    </div>
      <form  onSubmit={confirmDelivery}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
             
         


          
            
           
              <div className="sm:col-span-2">
                 
         
<div>
    <p className='text-black font-extrabold playwrite-de-grund'>Collect Garbage? <span className='underline font-light playwrite-de-grund'>
        <Link to='/provider-collecting'>confirm here</Link></span></p>
</div>

{/* 
<div className='flex flex-row gap-4' onClick={handleGoBack}>
   <img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" />

</div> */}
              </div>
          </div>


          <div className='p-4 cursor-pointer' onClick={handleLogout }>
          <BiLogOut className='text-black  text-2xl'/>
          <p className='text-black'>logout</p>
          </div>

          <Button className='playwrite-de-grund flex'  disabled={loading} type="submit">

        
      
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
          
          Confirm Delivered</Button>

      </form>
  </div>
  </section>
     </>
    )
  }
  
  export default ServiceProviderForm
  
  
  
  