import {Link} from 'react-router-dom'







const ServiceProviderForm = () => {
    return (
     <>
     
  
  <section className="bg-white dark:bg-gray-900 h-screen">
  
  
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">

  <div className=' text-black mb-10 inconsolata sm:text-5xl max-sm:text-4xl   tracking-widest'>
                 Quality Smiles
        </div>
  <div className='flex justify-between'>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white "> Confirm Plastic Bag Given  </h2>
<div>
    
    <img src="/images/logo/logo-small.png" className='w-10 h-10 rounded-full' alt="quality-smiles" />
</div>
    </div>
      <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
             
              <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900
                   dark:text-white">Service Provider Code/Phone Number</label>
                  <input type="text" placeholder="Type here" className="input text-black input-bordered input-success w-full 
                  max-w-xs bg-transparent" />
  
              </div>


              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Location Code</label>
                  <input type="text" placeholder="Type here" className="input  text-black input-bordered input-success
                  bg-transparent w-full max-w-xs" />
  
              </div>
            
           
              <div className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Location  Description</label>
                      <textarea placeholder="Descr..."  rows={8} className="textarea textarea-success textarea-bordered textarea-lg w-full 
                      bg-transparent" ></textarea>
         
<div>
    <p className='text-black font-extrabold'>Collected Garbage? <span className='underline font-light'>
        <Link to='/provider-collecting'>confirm here</Link></span></p>
</div>


<div className='flex flex-row gap-4'>
   <Link to='/choose_role'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black'>Go Back</span>

</div>
              </div>
          </div>
          <button className="btn">
  <span className="loading loading-spinner"></span>
  Submit Cofirmation
</button>
      </form>
  </div>
  </section>
     </>
    )
  }
  
  export default ServiceProviderForm
  
  
  
  