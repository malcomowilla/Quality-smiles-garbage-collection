
import { GiCheckMark } from "react-icons/gi";


const ContactYou = () => {
  return (
    <div className='bg-white h-screen flex justify-center items-center px-4 py-12 text-center'>


        <div className='flex flex-col justify-center items-center'>
        <GiCheckMark className='text-green-500 w-36 h-36 font-bold mb-8' />
        
         
      <p className='text-black font-extrabold text-5xl text-wrap'>Thank you for contacting us. We will get back to you as soon as possible.</p>
      </div>
    </div>
  )
}

export default ContactYou
