import {Link} from 'react-router-dom'




const ProviderCollections = () => {
  return (
   <>
   
<section className="bg-white  dark:bg-gray-900 h-screen flex items-center">

<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">

<div className=' text-black mb-10 inconsolata sm:text-5xl max-sm:text-4xl   tracking-widest'>
                 Quality Smiles
        </div>

    <div className='flex justify-between'>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white "> Confirm Plastic Bag Collection  </h2>
<div>
    
    <img src="/images/logo/logo-small.png" className='w-10 h-10 rounded-full' alt="quality-smiles" />
</div>
    </div>
    <form action="#">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          
            <div className="w-full">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Provider Code
                /Phone Number </label>
                <input type="text" placeholder="Type here" className="input input-bordered text-black input-success w-full 
                max-w-xs bg-transparent" />

            </div>

            <div>
                  <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                  <input type="number" placeholder="Type here" className="input input-bordered input-success 
                  w-full max-w-xs bg-transparent text-black" />
              </div> 


            {/* <div>
                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date</label>
                <input type="number" placeholder="Type here" className="input input-bordered input-success 
                w-full max-w-xs bg-transparent" />
            </div>  */}
           

            <div>
            <select className="select select-success text-black bg-transparent w-full max-w-xs">
  <option disabled selected> Confirm Bag Given?</option>
  <option>Yes</option>
  <option>No</option>
 
</select>
            </div> 
            <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Location Description</label>
                    <textarea placeholder="Descr..."  rows={8} className="textarea textarea-success
                     textarea-bordered textarea-lg w-full  text-black
                    bg-transparent" ></textarea>

            </div>
            
        </div>
      
<div className='flex flex-row gap-4'>
   <Link to='/service-provider'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black'>Go Back</span>

</div>
        <div className='mt-2'>
        <button className="btn">
  <span className="loading loading-spinner"></span>
  Submit Cofirmation
</button>
        </div>
       

    </form>
</div>
</section>
   </>
  )
}

export default  ProviderCollections 



