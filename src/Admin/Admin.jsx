
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
import { useLayoutSettings } from '../settings/LayoutSettings';



const Admin = () => {
  const {setIsUserLoggedIn} = useAuth()
  const { seeSidebar, setSeeSideBar, setSmsBalance, openLoginSuccess,
    handleCloseLoginSuccess, themeColors } = useApplicationSettings()
  
  const { settings } = useLayoutSettings();
  
  
  const variantDivSidebarRight = {
    hidden: {
      marginRight: '0px'
    },
    visible: {
      marginRight: '256px'
    }
  }
  
  const variantDivSidebarLeft = {
    hidden: {
      marginLeft: '0px'
    },
    visible: {
      marginLeft: '256px'
    }
  }
  
  return (
    <>
      <LoginSuccessAlert handleCloseLoginSuccess={handleCloseLoginSuccess}
        openLoginSuccess={openLoginSuccess}/>
      <div className='h-screen bg-black p-4 dark:bg-white overflow-x-hidden'>
        
        <motion.div 
          variants={settings.sidebarPosition === 'right' ? variantDivSidebarRight : variantDivSidebarLeft} 
          transition={{duration:0.3, ease: "easeInOut"}} 
          initial='hidden' 
          animate={seeSidebar ? "hidden" : "visible"}>
          <Header/>
        </motion.div>
  
        <motion.div 
                  variants={settings.sidebarPosition === 'right' ? variantDivSidebarRight : variantDivSidebarLeft} 
                  transition={{duration:0.3, ease: "easeInOut"}} 
                  initial='hidden' 
                  animate={seeSidebar ? "hidden" : "visible"}
        className='timer'>
          <CountDown/>
        </motion.div>   
  
        <motion.div  
          variants={settings.sidebarPosition === 'right' ? variantDivSidebarRight : variantDivSidebarLeft} 
          transition={{duration:0.3, ease: "easeInOut"}} 
          initial='hidden' 
          animate={seeSidebar ? "hidden" : "visible"}>
          <Outlet/>


          
        </motion.div>
  
        <motion.div 
          variants={settings.sidebarPosition === 'right' ? variantDivSidebarRight : variantDivSidebarLeft} 
          transition={{duration:0.4, ease: "easeInOut"}} 
          initial='hidden' 
          animate={seeSidebar ? "hidden" : "visible"} 
          className={`flex flex-col p-4 font-mono overflow-hidden ${
            settings.sidebarPosition === 'right' ? 'fixed top-0 right-0' : 'fixed top-0 left-0'
          }`}>
          <Sidebar/>
        </motion.div>
        
      </div>
    </>
  )
  }
  
  export default Admin