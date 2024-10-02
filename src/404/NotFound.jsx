

import {Link} from 'react-router-dom'
import {Button} from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import NotFoundAnimation from '../animation/not_found.json'







const NotFound = () => {
    const navigate = useNavigate();


    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: NotFoundAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };




  const handleClick = (e) => {
    e.preventDefault()
    navigate(-1);
  };




  return (
    <>
    <div className='bg-white h-screen flex justify-center items-center flex-col'>


    <div className='flex justify-center items-center w-full '>
    <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />

</div>
    <div className='text-center 
    text-red text-6xl 
    font-light text-green-700 tracking-wider mt-[100px] playwrite-de-grund'>
      Page Not Found <p className='text-red-700'>(404) </p>
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









