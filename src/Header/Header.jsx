import NightlightIcon from '@mui/icons-material/Nightlight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkLight from '../dark_light_button/DarkLight'
import Profile from '../profile/Profile'
import {useState} from 'react'
import { Badge, Menu, MenuItem } from '@mui/material';
import { useNotifications } from '../context/NotificationContext';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, unreadCount, clearNotifications } = useNotifications();

  const { seeSidebar, setSeeSideBar, handleThemeSwitch, theme, icon, setIcon, smsBalance, setSmsBalance,
    user_name
   }
   = useApplicationSettings()

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearNotifications();
  };

  return (
    <div className=' flex justify-between p-3 cursor-pointer'>

      <div className='group'>

        <img src="/images/logo/icons8-menu-100.png" onClick={()=> setSeeSideBar(!seeSidebar)}
         className='w-10 h-10' alt="menu" />
      <p className='font-extrabold   dark:text-black text-white   text-xl'><span>Welcome {user_name}</span></p>
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
        sm:h-[50x] max-sm:h-[50px] lg:h-[50px]  md:h-[50px] shadow-2xl p-4 rounded-full flex justify-center relative'
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneIcon onClick={handleNotificationClick} />
        </Badge>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: '300px',
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem key={index} className="whitespace-normal">
              <div className="flex flex-col">
                <span className="font-semibold">{notification.sender}</span>
                <span className="text-sm text-gray-600">{notification.message}</span>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
            </MenuItem>
          ))
        )}
      </Menu>

      <Profile open={open} setOpen={setOpen}/>

     
      </div>
     
    </div>
  )
}

export default Header
