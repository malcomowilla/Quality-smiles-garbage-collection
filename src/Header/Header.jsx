import NightlightIcon from '@mui/icons-material/Nightlight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkLight from '../dark_light_button/DarkLight'
import Profile from '../profile/Profile'
import {useState} from 'react'
const Header = () => {
  const [open, setOpen] = useState(false);

  const { seeSidebar, setSeeSideBar, handleThemeSwitch, theme, icon, setIcon, smsBalance, setSmsBalance } = useApplicationSettings()






  
  return (
    <div className=' flex justify-between p-3 cursor-pointer'>

      <div className='group'>

        <img src="/images/logo/icons8-menu-100.png" onClick={()=> setSeeSideBar(!seeSidebar)} className='w-10 h-10' alt="menu" />
      <p className='font-extrabold   dark:text-black text-white   text-xl'><span>Welcome Malcom Owilla</span></p>
<p className=' dark:text-black text-white'>Here’s what’s happening with your store today.
</p>
      </div>
       <p className='text-white playwrite-de-grund font-bold dark:text-black '> {smsBalance} </p>
      <div className='flex  gap-x-8 '>
      <DarkLight/>
      {/* <div        onClick={()=>{
handleThemeSwitch()
setIcon(!icon)
      }} className='text-black   bg-gray-200 w-[50px] h-[50px] shadow-2xl p-4 rounded-full flex justify-center'>
    <p >{icon ? <WbSunnyIcon/> : <NightlightIcon/>}</p>
      </div> */}



      <div className='text-black bg-gray-200 w-[50px] max-md:h-[50px]
        sm:h-[50x] max-sm:h-[50px] lg:h-[50px]  md:h-[50px] shadow-2xl p-4 rounded-full flex justify-center'>
        
      <NotificationsNoneIcon/>
      </div>

      <Profile open={open} setOpen={setOpen}/>

     
      </div>
     
    </div>
  )
}

export default Header
