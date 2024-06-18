import {Link} from 'react-router-dom'




const CustomerForm = () => {
  return (
   <>
   
<section className="bg-white  dark:bg-gray-900 h-screen flex items-center">

<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">

<div className=' text-black mb-10 inconsolata sm:text-5xl max-sm:text-4xl   tracking-widest'>
                 Quality Smiles
        </div>
    <div className='flex justify-between'>
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white "> Confirm Plastic Bag Received  </h2>
<div>
    <img src="/images/logo/logo-small.png" className='w-10 h-10 rounded-full' alt="quality-smiles" />
</div>
    </div>
    <form action="#">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
                <select className="select select-success w-full text-black bg-transparent">
  <option disabled selected>Your Role?</option>
  <option>Customer</option>
 
</select>

            </div>
           
           
            {/* <div>
                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date</label>
                <input type="number" placeholder="Type here" className="input input-bordered input-success 
                w-full max-w-xs bg-transparent" />
            </div>  */}
            <div>
                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Customer Code/Phone Number </label>
                <input type="number" placeholder="Type here" className="input input-bordered input-success 
                w-full max-w-xs bg-transparent text-black  dark:text-white" />
            </div> 

            <div>
            <select className="select select-success text-black bg-transparent w-full max-w-xs">
  <option disabled selected> Select Status</option>
  <option>Given</option>
  <option>Not Given</option>
  <option>Returned</option>
  <option>Not Returned</option>


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

<div>
    <p className='text-black font-extrabold'>Your Bag Is Full? <span className='underline font-light'><Link to='/customer-request'>
    request here</Link></span></p>
</div>

<div className='flex flex-row gap-4'>
   <Link to='/choose_role'><img src="/images/logo/icons8-arrow-64.png" className='w-8 h-8' alt="arrow" /></Link>
   <span  className='text-black'>Go Back</span>

</div>
        <div className='mt-2'>
        <button className="btn">
  <span className="loading loading-spinner"></span>
  Confirm Bag Received
</button>
        </div>
       

    </form>
</div>
</section>
   </>
  )
}

export default CustomerForm



