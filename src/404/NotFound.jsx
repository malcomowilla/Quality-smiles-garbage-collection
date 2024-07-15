

import {Link} from 'react-router-dom'
import {Button} from "flowbite-react";
import { useNavigate } from 'react-router-dom';







const NotFound = () => {
    const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault()
    navigate(-1);
  };




  return (
    <>
    <div className='bg-white h-screen flex justify-center items-center flex-col'>


    <div className='flex justify-center items-center w-full '>
<img src="/images/logo/logo-small.png" alt="quality-smiles"  className='w-20 h-20'/>
</div>
    <div className='text-center 
    text-red text-6xl 
    font-light text-red-700 tracking-wider mt-[100px] playwrite-de-grund'>
      The page you were looking for doesn't exist (404)
        </div>
<div className='flex items-center justify-center mt-10  playwrite-de-grund'>



<Button   onClick={handleClick} className='bg-black hover:bg-green'>Go Back
</Button>

</div>



</div>

</>
  )
}

export default NotFound









