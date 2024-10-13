
import {useEffect, useCallback, lazy} from 'react'

// import Sidebar from '../sidebar/Sidebar'
const Sidebar = lazy(()=> import('../sidebar/Sidebar'))
import Header from '../Header/Header'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {Outlet} from 'react-router-dom'
import CountDown from '../count_down/CountDown'
import { motion } from "framer-motion"
import openAccessDenied from '../access_denied/AccessDenied'
import { useAuth } from '../settings/AuthSettings'; // Adjust path as needed
import LoginSuccessAlert from '../Alert/LoginSuccessAlert'



const Admin = () => {
const {setIsUserLoggedIn} = useAuth()
const { seeSidebar, setSeeSideBar, setSmsBalance,openLoginSuccess,
  handleCloseLoginSuccess } = useApplicationSettings()




const getSmsBalance  = useCallback(
  async () => {
     try {
         const response = await fetch('/api/your_sms_balance')
         const newData = await response.json()
         if (response.ok) {
             console.log(newData.message)
             setSmsBalance(newData.message)
         } else {
             console.log('error')
         }
     } catch (error) {
         console.log(error)
     }
  },
   [],
 )
 


 useEffect(() => {
  getSmsBalance() 
    
 }, [getSmsBalance]);










  const variantDiv = {
    hidden: {
     marginLeft: '0px'
       
     },
   
     visible: {
      marginLeft: '256px'

     }
  }
  return (

    <>

    <LoginSuccessAlert  handleCloseLoginSuccess={handleCloseLoginSuccess}  openLoginSuccess={openLoginSuccess}/>
    <div  className='h-screen bg-black p-4 dark:bg-white   overflow-x-hidden'>
      
      <motion.div variants={variantDiv} transition={{duration:0.3, ease: "easeInOut",
  }} initial='hidden' animate={seeSidebar  ? "hidden" : "visible"} >
      <Header/>

      </motion.div>

      
<CountDown/>


<motion.div  variants={variantDiv} transition={{duration:0.3, ease: "easeInOut",
  }} initial='hidden' animate={seeSidebar  ? "hidden" : "visible"} >
  
           <Outlet/>
 
</motion.div>




      <motion.div variants={variantDiv} transition={{duration:0.4, ease: "easeInOut",
  }} initial='hidden' animate={seeSidebar  ? "hidden" : "visible"} className='flex flex-col p-4 font-mono  overflow-hidden '>
<Sidebar/>

</motion.div>
      
      </div>

      </>
  )
}

export default Admin