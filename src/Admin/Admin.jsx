import Sidebar from '../sidebar/Sidebar'
import Header from '../Header/Header'
import {useApplicationSettings} from '../settings/ApplicationSettings'
import {Outlet} from 'react-router-dom'
import CountDown from '../count_down/CountDown'
import { motion } from "framer-motion"


const Admin = () => {
  const { seeSidebar, setSeeSideBar } = useApplicationSettings()
  const variantDiv = {
    hidden: {
     marginLeft: '0px'
       
     },
   
     visible: {
      marginLeft: '256px'

     }
  }
  return (
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
  )
}

export default Admin