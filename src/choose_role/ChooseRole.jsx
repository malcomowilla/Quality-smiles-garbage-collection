import {Link} from 'react-router-dom'



const ChooseRole = () => {
  return (
    <>
    <div className='h-screen bg-white flex justify-center items-center sm:space-x-28
     sm:flex-wrap max-sm:flex-wrap max-sm:justify-center max-md:justify-center
     cursor-pointer  '>
   
  
  
  <div className="carousel-item text-black flex-col flex caveat sm:text-4xl max-sm:text-3xl">
    <img src="/images/logo/2754575_man_avatar_male_icon.png" className='w-[300px] h-[300px]' alt="customer" />
   <div className='flex justify-center'>
   <p className='hover:underline transition-all duration-500 ease-in-out'><Link to='/customer'>Customer</Link></p>
    </div>

  </div> 
  <div className="carousel-item text-black flex-col  caveat flex sm:text-4xl max-sm:text-3xl">

    <img src="/images/logo/trashcolector.jpg"  className='w-[300px] h-[300px]' alt="waste collector" />
    <div className='flex justify-center'>
    <p className='hover:underline transition-all duration-500 ease-in-out'><Link to='/service-provider'>Service Provider</Link></p>

    </div>

  </div> 


  <div className="carousel-item text-black flex-col    caveat  flex sm:text-4xl max-sm:text-3xl">

    <img src="/images/logo/store_recycle.jpg"  className='w-[300px] h-[300px]' alt="store" />

<div className='flex justify-center'>
<p className='hover:underline transition-all duration-500 ease-in-out'><Link>Store</Link></p>

</div>
  </div>
</div>
    
    
    </>
  )
}

export default ChooseRole