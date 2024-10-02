
import { motion ,  useMotionValue, useTransform } from "framer-motion"
import {useState} from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FaHandPointLeft } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'



const CustomerPayment = () => {
  const [paybillOrTillInstr, setpaybillOrTillInstr] = useState(false)
  const [topImediately, setopImediately] = useState('TopUp Instantly')
  const navigate = useNavigate()

// const handlePaybillorTiillInstr = ()=> {
//   setpaybillOrTillInstr('TopUp Instantly')
//   setopImediately(false)
// }


const handleGoBack=(e)=>{
  e.preventDefault()
  navigate(-1)
}


  const handleClickTopUp = ()=> {
    setopImediately('TopUp Instantly')
    setpaybillOrTillInstr('')
  }
  return (
    <div className=' bg-white    h-screen flex justify-center gap-5 w-screen  items-center p-10 max-sm:flex-wrap'>
        
        <div className='border border-gray-500 h-[390px] w-[330px]  shadow-lg rounded-md  p-8 lg:block sm:hidden max-sm:hidden 
        md:hidden max-md:hidden'>
        <p className='playwrite-de-grund  font-extrabold text-black'>Add Credits</p>
        <p className='playwrite-de-grund text-black font-extralight'>Kindly Select Your Prefered Payment Method Below</p>

          
          
          <motion.div    whileHover={{
            background: 'gray',
            transition: {
              duration: 0.5,
              borderRadius: '200px'
            }
          }}    whileTap={{
            background: 'gray',
            transition: {
              duration: 0.5,
              borderRadius: '200px'
            }
          }} className='text-black  cursor-pointer  mt-2 flex items-center gap-9 '>
          <img src="/images/MicrosoftTeams-image.jpg" className='w-[130px] h-20' alt="mpesa" />
            <motion.p whileHover={{
              scale: 1.1,
              color: 'white'
            }} whileTap={{
              scale: 1.3
            }} className='playwrite-de-grund'>Safaricom Mpesa</motion.p></motion.div>


            <motion.div   whileHover={{
            background: 'gray',
            transition: {
              duration: 0.5,
              borderRadius: '200px',
            }
          }}   whileTap={{
            background: 'gray',
            transition: {
              duration: 0.5,
              borderRadius: '200px'
            }
          }} className='text-black  cursor-pointer mt-6 flex items-center  gap-9 playwrite-de-grund'>
          <img src="/images/Airtel.jpg" className='w-[130px] h-20' alt="mpesa" />
          
          <motion.p  whileTap={{
              scale: 1.3
            }}  whileHover={{
            scale: 1.1,
            color: 'white'
          }}>  Airtel Money</motion.p></motion.div>
        </div>

        
       
        <motion.div  className='border border-gray-500 shadow-lg
         h-[490px]   max-sm:h-[600px]   sm:w-[700px] rounded-md p-9 '>
          
        <p className='playwrite-de-grund text-black font-bold text-lg'>Mpesa Payment Services</p>
        <p className='playwrite-de-grund text-black'>Follow Instructions To Topup Your Account</p>

        <div className='mt-4  '>
<div className='text-sm  teal w-fit p-3 flex border border-gray-700 rounded-lg gap-3'>
  <motion.p whileTap={{
scale: 1.1
  }} onClick={handleClickTopUp} className={` p-3 rounded-md cursor-pointer text-black playwrite-de-grund
  
  ${topImediately ==='TopUp Instantly' && 'bg-green-600 text-white'}
  `}>TopUp Instantly</motion.p>


  <motion.p
  
  whileTap={{
    scale: 1.1
  }}
  onClick={()=>{
    setopImediately('')
    setpaybillOrTillInstr('tillno/paybill')
  } } className={`  rounded-md cursor-pointer p-3 text-black playwrite-de-grund
    ${paybillOrTillInstr === 'tillno/paybill' && 'bg-green-600 text-white'}
    `}>Paybill/Till No Instructions</motion.p>
  </div>
        </div>

        {topImediately ==='TopUp Instantly' ? (
          <>
<form className="flex max-w-md flex-col gap-4 mt-8 ">
      <div>
        <div className="mb-2 block playwrite-de-grund">
          <Label htmlFor="email1" value="Amount"  style={{color: 'black'}} />
        </div>
        <TextInput id="email1"   style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}}  required />
      </div>
      <div>
        <div className="mb-2 block playwrite-de-grund">
          <Label htmlFor="password1" value="Phone Number" style={{color: 'black'}} />
        </div>
        <TextInput id="password1"  style={{backgroundColor: 'white', width: '100%', paddingRight: '8px', color: 'black'}}  required />
      </div>
      
      <Button type="submit">Top Up</Button>
      
    </form>
          </>
        ): null}

        {paybillOrTillInstr === 'tillno/paybill' ? (  
          <>
          <div className='text-black mt-8 playwrite-de-grund'>
          <p> Go To  <span className='font-bold'>Mpesa Menu </span> </p>
  <p> Select <span className='font-bold'> Lipa na M-PESA</span> </p>
  <p> Select <span> </span>Paybill </p>
  <p> Enter <span className='font-bold'>384040 </span> As Business Number</p>
  <p> Enter <span className='font-bold'> Malcom Owilla</span> As Account Number <span> </span> </p>
  <p>  Enter Amount In Kenyan Shilling </p>
  <p> Enter Mpesa Pin  </p>
  <p>You will receive notification from M-PESA with a confirmation code</p>
          </div>
  

          </>
        ): null}

           
<div className='p-2 flex gap-6 cursor-pointer' onClick={handleGoBack}>
<FaHandPointLeft className='text-black w-10 h-10 ' />
<p className='text-black playwrite-de-grund'>Go Back</p>
</div>
        </motion.div>


        
        </div>
  )
}

export default CustomerPayment






















