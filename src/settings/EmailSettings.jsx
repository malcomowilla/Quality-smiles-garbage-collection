import React from 'react'
import { useApplicationSettings } from '../settings/ApplicationSettings';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  ThemeProvider } from '@mui/material';
import {useState, useCallback, useEffect,useMemo} from 'react'
import { motion } from "framer-motion"
import Stack from '@mui/material/Stack';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import Lottie from 'react-lottie';
import EmailSettingsCreateAlert from '../Alert/EmailSettingsCreateAlert'
import EmailSettingsErrorAlert from '../Alert/EmailSettingsErrorAlert'
import EmailSettingsFetchErrorAlert  from '../Alert/EmailSettingsFetchErrorAlert'

  // openEmailSettingsFetchErrorAlert, handleCloseEmailFetchErrorAlert



const EmailSettings = () => {

  const [seeSettings, setSeeSettings] = useState(false)
const [loadEmailSettings, setloadEmailSettings] = useState(false)
const [openLoadEmailSettings, setOpenLoadEmailSettings] = useState(false)

  const { materialuitheme, 
  } = useApplicationSettings();



 
 const emailForm = {
  smtp_host: '',
  smtp_username: '',
  sender_email: '',
  smtp_password: '',
  api_key: '',
  domain: '',

 }

 
   
 const emailTemplateForm = {
  customer_confirmation_code_header: '',
  customer_confirmation_code_body:  '',
  customer_confirmation_code_footer: '',
  service_provider_confirmation_code_header: '',
  service_provider_confirmation_code_body: '',
  service_provider_confirmation_code_footer: '',
  user_invitation_header: '',
  user_invitation_body: '',
  user_invitation_footer: '',
  customer_otp_confirmation_header: '',
  customer_otp_confirmation_body: '',
  customer_otp_confirmation_footer: '',
  service_provider_otp_confirmation_header: '',
  service_provider_otp_confirmation_body: '',
  service_provider_otp_confirmation_footer: '',
  admin_otp_confirmation_header: '',
  admin_otp_confirmation_body: '',
  admin_otp_confirmation_footer: '',
  store_manager_otp_confirmation_header: '',
  store_manager_otp_confirmation_body: '',
  store_manager_otp_confirmation_footer: '',
  store_manager_number_header: '',
  store_manager_number_body: '',
  store_manager_number_footer: '',
  payment_reminder_header: '',
  payment_reminder_body: '',
  payment_reminder_footer: ''
  
 }

 const [emailSettings, setEmailSettings] = useState(emailForm)

const {smtp_host,smtp_username, sender_email,smtp_password, api_key,domain } = emailSettings
const [emailTemplates, setEmailTemplates] = useState(emailTemplateForm)
const [openEmailSettingsCreate, setopenEmailSettingsCreate] = useState(false)
const [openEmailSettingsErrorAlert, setopenEmailSettingsErrorAlert] = useState(false)
const [openEmailSettingsFetchErrorAlert, setopenEmailSettingsFetchErrorAlert] = useState(false)

const {customer_confirmation_code_header, customer_confirmation_code_body, 
  customer_confirmation_code_footer, service_provider_confirmation_code_header, service_provider_confirmation_code_body, 
  service_provider_confirmation_code_footer, user_invitation_header, user_invitation_body,
   user_invitation_footer, customer_otp_confirmation_header, customer_otp_confirmation_body,
   customer_otp_confirmation_footer, 
  service_provider_otp_confirmation_header, service_provider_otp_confirmation_body, 
  service_provider_otp_confirmation_footer, admin_otp_confirmation_header, admin_otp_confirmation_body,
   admin_otp_confirmation_footer, store_manager_otp_confirmation_header, store_manager_otp_confirmation_body, 
   store_manager_otp_confirmation_footer, store_manager_number_header, store_manager_number_body,
    store_manager_number_footer,
    payment_reminder_header,
   payment_reminder_body, payment_reminder_footer} = emailTemplates
      


const handleCloseEmailFetchErrorAlert = () => {
  setopenEmailSettingsFetchErrorAlert(false)
}


const handleCloseEmailErrorAlert = () => {
  setopenEmailSettingsErrorAlert(false)
}



const handleCloseEmailSettingsCreate =()=> {
  setopenEmailSettingsCreate(false)
}

   
const handleChangeEmailTemplates = (e)=>{
  const {name, value} = e.target
  
  
  setEmailTemplates((prevData) => {
  let updatedSettings = { ...prevData, [name]: value }
return updatedSettings

})
}



 const handleChangeEmailSettings = (e)=> {
  const {name, value} = e.target


setEmailSettings((prevData) => {
  let updatedSettings = { ...prevData, [name]: value };

if (name === 'smtp_host') {
updatedSettings.api_key = ''
}

if (name === 'smtp_username') {
updatedSettings.api_key = ''
}



if (name === 'smtp_password') {
  updatedSettings.api_key = ''
  }


if (name === 'domain') {
  updatedSettings.api_key = ''
  }



if (name === 'api_key') {
  updatedSettings.domain = ''
  updatedSettings.smtp_password = ''
  updatedSettings.smtp_username
  updatedSettings.smtp_host
  }

return updatedSettings

})
}



  const variantDiv = {
    hidden: {
      opacity: 0,
      overflow: 'hidden',
      height: 0
      
    },
    visible: {
      opacity: 1,
      overflow: 'hidden',
      height: 'auto'
    }
  }



const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};





const controller = useMemo(() => new AbortController(), [])
// const id = setTimeout(() => controller.abort(), 9000);

const getEmailSettings = useCallback(
  async() => {
  

    try {
      const response = await fetch('/api/get_email_settings', {
        signal: controller.signal
      })
      const newData = await response.json()

      if (response.ok) {
        console.log('fetched email settings',newData)

  const {smtp_host,smtp_username, sender_email,domain} = newData[0]
  setEmailSettings((prevData)=>  ({...prevData, smtp_host,smtp_username, sender_email,
    domain
     }))
      }else{
        console.log('not fetched')
        setopenEmailSettingsFetchErrorAlert(true)
      }
    } catch (error) {
      console.log('not fetched')
      setopenEmailSettingsFetchErrorAlert(true)
    }
  },
  [controller.signal],
)


useEffect(() => {
  getEmailSettings()
  return () => {
    controller?.abort()
  };
}, [controller, getEmailSettings]);   
  




const handleCreateEmailSettings = async(e)=> {


  e.preventDefault()

  setOpenLoadEmailSettings(true)
  setloadEmailSettings(true)
  try {
    const response = await fetch('/api/email_settings', {
method: 'POST',
headers: {
  "Content-Type": "application/json"
},
body: JSON.stringify(emailSettings)

    })

    const newData = await response.json()

    if (response.ok) {
      console.log('email settings =>', newData)
      setOpenLoadEmailSettings(false)
  setloadEmailSettings(false)
  setopenEmailSettingsCreate(true)
  const {smtp_host,smtp_username, sender_email,domain} = newData
  setEmailSettings((prevData)=>  ({...prevData, smtp_host,smtp_username, sender_email,smtp_password, 
    domain
     }))
    } else {
      console.log('email settings error')
      setOpenLoadEmailSettings(false)
  setloadEmailSettings(false)
  setopenEmailSettingsErrorAlert(true)
    }
  } catch (error) {
    console.log(error)
    setopenEmailSettingsErrorAlert(true)
    setOpenLoadEmailSettings(false)
  setloadEmailSettings(false)
  }

}


  return (

<>


<EmailSettingsFetchErrorAlert  openEmailSettingsFetchErrorAlert={openEmailSettingsFetchErrorAlert}
handleCloseEmailFetchErrorAlert={handleCloseEmailFetchErrorAlert}/>

<EmailSettingsCreateAlert  openEmailSettingsCreate={openEmailSettingsCreate}
handleCloseEmailSettingsCreate={handleCloseEmailSettingsCreate}
/>

<EmailSettingsErrorAlert openEmailSettingsErrorAlert={openEmailSettingsErrorAlert}
handleCloseEmailErrorAlert={handleCloseEmailErrorAlert}/>
{loadEmailSettings &&    <Backdrop open={openLoadEmailSettings} sx={{ color:'#fff', zIndex:
   (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



<ThemeProvider theme={materialuitheme}>

    <div>
      

  <div className='p-2'>
            <p className='dark:text-black playwrite-de-grund  text-xl 
            font-extrabold text-white'>SMTP Settings </p>
        </div> 


<form onSubmit={handleCreateEmailSettings}>

    <Stack direction='row'  className='myTextField' 
     sx={{
           
           '& .MuiTextField-root': { m: 1, width: '90ch',  marginTop: '30px',  '& label.Mui-focused': {
             color: 'black',
             fontSize: '16px'
             },
         '& .MuiOutlinedInput-root': {
           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
             borderColor: "black",
             borderWidth: '3px',
             },
          '&.Mui-focused fieldset':  {
             borderColor: 'black', 
             
           }
         } },
         }}   spacing={{
             xs: 1,
             sm: 2
           }}>

<TextField 
name='smtp_host'
value={smtp_host}
onChange={handleChangeEmailSettings}
          label='SMTP Host' 
           >

            
           </TextField>



<TextField 
onChange={handleChangeEmailSettings}
          name='smtp_username'
          label='SMTP Username' 
          value={smtp_username}

           >

            
           </TextField>
</Stack>



<Stack direction='row'  className='myTextField'  sx={{
           
           '& .MuiTextField-root': { m: 1, width: '90ch',  marginTop: '30px',  '& label.Mui-focused': {
             color: 'black',
             fontSize: '16px'
             },
         '& .MuiOutlinedInput-root': {
           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
             borderColor: "black",
             borderWidth: '3px',
             },
          '&.Mui-focused fieldset':  {
             borderColor: 'black', 
             
           }
         } },
         }}   spacing={{
             xs: 1,
             sm: 2
           }}>
          
<TextField 
          name='smtp_password'
          label='SMTP Password' 
          onChange={handleChangeEmailSettings}
          value={smtp_password}
           >

            
           </TextField>


           

<TextField 
onChange={handleChangeEmailSettings}
          name='sender_email'
          label='Sender Email' 
          value={sender_email}
           >

            
           </TextField>
</Stack>





<Stack direction='row'  className='myTextField'  sx={{
           
           '& .MuiTextField-root': { m: 1, width: '90ch',  marginTop: '30px',  '& label.Mui-focused': {
             color: 'black',
             fontSize: '16px'
             },
         '& .MuiOutlinedInput-root': {
           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
             borderColor: "black",
             borderWidth: '3px',
             },
          '&.Mui-focused fieldset':  {
             borderColor: 'black', 
             
           }
         } },
         }}   spacing={{
             xs: 1,
             sm: 2
           }}>



<TextField 
onChange={handleChangeEmailSettings}
          name='api_key'
          label='API key' 
          value={api_key}
           >

            
           </TextField>



<TextField 
onChange={handleChangeEmailSettings}
          name='domain'
          label='domain/subdomain' 
          value={domain}
           >

            
           </TextField>

</Stack>




<div className="flex gap-2 p-3">
<button type='submit'  className="px-6 py-2 font-medium bg-black text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
rounded-md">
        Save Settings
      </button>
       
        </div>
</form>







        <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings(!seeSettings)} className="flex items-center justify-between 
    w-full p-5 mt-4
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"> Email  Templates</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>




        <form >
          <motion.div 
          variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
          }} initial='hidden' animate={seeSettings ? "visible" : "hidden"}
          aria-labelledby="accordion-open-heading-2"
          id="accordion-open-body-2"
          >

     

<div className='p-7'>
      
      <p className='dark:text-black playwrite-de-grund 
       text-lg font-bold  text-white'>
          Customize messages sent to customers using email.Make sure to include the keywords to correctly include content
  
          </p>
      </div>

        <Box
        className='myTextField'
     sx={{'& .MuiTextField-root' : {
        width: '100%',
        padding: '8px',
        m: 1,
        '& label.Mui-focused': {
          color: 'black',
          fontSize: '16px'
          },
      '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px',
          },
       '&.Mui-focused fieldset':  {
          borderColor: 'black', 
          
        }
      }
    }}}
    >
      <TextField  fullWidth label="Customer Confirmation Code Header" name='customer_confirmation_code_header' 
       id="fullWidth" multiline 
       rows={4}
        helperText={<p className='dark:text-black text-sm tracking-wider
        text-white
        playwrite-de-grund'>   
          place  {"{{customer_code}}"}

                    where the customer code should appear in the text and either  {"{{name}}"}, 
        to include the users name,   <span className='font-extrabold'>Message Sent To Customer To Confirm Customer Code
          </span></p>}
          value={customer_confirmation_code_header}
          onChange={handleChangeEmailTemplates}
          >

</TextField>




      <TextField  fullWidth label="Customer Confirmation Code Body"  
       id="fullWidth" multiline 
       name='customer_confirmation_code_body'
       rows={4}
        helperText={<p className='dark:text-black text-sm tracking-wider
        text-white
        playwrite-de-grund'>   
          place  {"{{customer_code}}"}

                    where the customer code should appear in the text and either  {"{{name}}"}, 
        to include the users name,   <span className='font-extrabold'>Message Sent To Customer To Confirm Customer Code
          </span></p>} 
          onChange={handleChangeEmailTemplates}
          value={customer_confirmation_code_body}/>




      <TextField  fullWidth label="Customer Confirmation Code Footer" name='customer_confirmation_code_footer' 
      value={customer_confirmation_code_footer}
       id="fullWidth" multiline 
       rows={4}
        helperText={<p className='dark:text-black text-sm tracking-wider
        text-white
        playwrite-de-grund'>   
          place  {"{{customer_code}}"}

                    where the customer code should appear in the text and either  {"{{name}}"}, 
        to include the users name,   <span className='font-extrabold'>Message Sent To Customer To Confirm Customer Code
          </span></p>}  onChange={handleChangeEmailTemplates}/>


      <TextField   
      value={service_provider_confirmation_code_header}
      fullWidth label="Service Provider Confirmation Code Header"
        id="fullWidth" multiline  rows={4} 
      helperText={<p className='dark:text-black 
      text-white
      text-sm tracking-wider playwrite-de-grund'>  
         place  {"{{provider_code}}"}

      where the provider code should appear in the text and either  {"{{name}}"}, 
to include the service provider name,   
<span className='font-extrabold dark:text-black text-white'>Message Sent To Service Provider To Confirm Provider Code</span></p>} 
name='service_provider_confirmation_code_header' 

onChange={handleChangeEmailTemplates}
/>




<TextField  
value={service_provider_confirmation_code_body}
fullWidth label="Service Provider Confirmation Code Body"
        id="fullWidth" multiline  rows={4} 
      helperText={<p className='dark:text-black 
      text-white
      text-sm tracking-wider playwrite-de-grund'>  
         place  {"{{provider_code}}"}

      where the provider code should appear in the text and either  {"{{name}}"}, 
to include the service provider name,   
<span className='font-extrabold dark:text-black text-white'>Message Sent To Service Provider To Confirm Provider Code</span></p>} 
name='service_provider_confirmation_code_body'
onChange={handleChangeEmailTemplates}
/>





<TextField   
onChange={handleChangeEmailTemplates}
value={service_provider_confirmation_code_footer}

fullWidth label="Service Provider Confirmation Code Footer"
        id="fullWidth" multiline  rows={4} 
      helperText={<p className='dark:text-black 
      text-white
      text-sm tracking-wider playwrite-de-grund'>  
         place  {"{{provider_code}}"}

      where the provider code should appear in the text and either  {"{{name}}"}, 
to include the service provider name,   
<span className='font-extrabold dark:text-black text-white'>Message Sent To Service Provider To Confirm Provider Code</span></p>} 
name='service_provider_confirmation_code_footer'/>


      <TextField fullWidth label="User Invitation Header"
      onChange={handleChangeEmailTemplates}
      value={user_invitation_header}
      id="fullWidth" multiline  rows={4} 
      name='user_invitation_header' 
       helperText={<p className='dark:text-black text-sm tracking-wider
        playwrite-de-grund  text-white'>
        place {"{{user_name}}"}  for user's name,
        <span className='font-extrabold'>   Message Sent To User To Invite Them After They Have Been Assigned A 
           Role In The System</span>
      </p>}/>




      <TextField fullWidth label="User Invitation Body" 
      onChange={handleChangeEmailTemplates}
      value={user_invitation_body}
      id="fullWidth" multiline  rows={4} 
      name='user_invitation_body' 
       helperText={<p className='dark:text-black text-sm tracking-wider
        playwrite-de-grund  text-white'>
        place {"{{user_name}}"}  for user's name,
        <span className='font-extrabold'>   Message Sent To User To Invite Them After They Have Been Assigned A 
           Role In The System</span>
      </p>}/>



      <TextField fullWidth label="User Invitation Footer" id="fullWidth"
      onChange={handleChangeEmailTemplates}
      value={user_invitation_footer}
      multiline  rows={4} 
      name='user_invitation_footer' 
       helperText={<p className='dark:text-black text-sm tracking-wider
        playwrite-de-grund  text-white'>
        place {"{{user_name}}"}  for user's name,
        <span className='font-extrabold'>   Message Sent To User To Invite Them After They Have Been Assigned A 
           Role In The System</span>
      </p>}/>



      <TextField   fullWidth label="Customer OTP confirmation Header" 
      value={customer_otp_confirmation_header}
      onChange={handleChangeEmailTemplates}
      id="fullWidth" multiline  rows={4}
      
      helperText={<p className='dark:text-black  text-white
       text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Customer To Confirm OTP</span>
      </p>}  name='customer_otp_confirmation_header' />




      <TextField   fullWidth label="Customer OTP confirmation Body" id="fullWidth" multiline  rows={4}
      onChange={handleChangeEmailTemplates}
      value={customer_otp_confirmation_body}
      name={customer_otp_confirmation_body}
      helperText={<p className='dark:text-black  text-white
       text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Customer To Confirm OTP</span>
      </p>}   />




      <TextField   fullWidth label="Customer OTP confirmation Footer" id="fullWidth"
      value={customer_otp_confirmation_footer}
      onChange={handleChangeEmailTemplates}
      multiline  rows={4}
      
      helperText={<p className='dark:text-black  text-white
       text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Customer To Confirm OTP</span>
      </p>}  name='customer_otp_confirmation_footer' />


      <TextField    fullWidth label="Service Provider OTP confirmation Header"
      onChange={handleChangeEmailTemplates} 
      value={service_provider_otp_confirmation_header}
      id="fullWidth" multiline  rows={4} 
      name='service_provider_otp_confirmation_header'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Service Provider To Confirm OTP</span>
      </p>}
      />



<TextField  onChange={handleChangeEmailTemplates}  fullWidth label="Service Provider OTP confirmation Body"
 id="fullWidth" 
value={service_provider_otp_confirmation_body}
multiline  rows={4} 
      name='service_provider_otp_confirmation_body'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Service Provider To Confirm OTP</span>
      </p>}
      />




<TextField    fullWidth label="Service Provider OTP confirmation Footer"
onChange={handleChangeEmailTemplates}
value={service_provider_otp_confirmation_footer}

id="fullWidth" multiline  rows={4} 
      name='service_provider_otp_confirmation_footer'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Service Provider To Confirm OTP</span>
      </p>}
      />



      <TextField fullWidth label="Admin OTP confirmation Header" id="fullWidth" 
      onChange={handleChangeEmailTemplates}
      multiline  rows={4}  
      value={admin_otp_confirmation_header}
   name='admin_otp_confirmation_header'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"}
       where otp should appear, 
      <span className='font-extrabold'>Message Sent To User  To Confirm OTP For Invitation</span>
      </p>}
      />




<TextField fullWidth label="Admin OTP confirmation Body" id="fullWidth" multiline  rows={4}  
onChange={handleChangeEmailTemplates}
      value={admin_otp_confirmation_body}
      name='admin_otp_confirmation_body'
         helperText={<p className='dark:text-black text-sm tracking-wider
         text-white
         playwrite-de-grund'>place {"{{otp}}"}
          where otp should appear, 
         <span className='font-extrabold'>Message Sent To User  To Confirm OTP For Invitation</span>
         </p>}
         />
   



   <TextField fullWidth label="Admin OTP confirmation Footer" id="fullWidth" multiline  rows={4}  
   onChange={handleChangeEmailTemplates}
      value={admin_otp_confirmation_footer}
      name='admin_otp_confirmation_footer'
         helperText={<p className='dark:text-black text-sm tracking-wider
         text-white
         playwrite-de-grund'>place {"{{otp}}"}
          where otp should appear, 
         <span className='font-extrabold'>Message Sent To User  To Confirm OTP For Invitation</span>
         </p>}
         />
   




<TextField fullWidth label="Store Manager OTP confirmation Header" id="fullWidth" multiline  rows={4}  
   value={store_manager_otp_confirmation_header}
       name='store_manager_otp_confirmation_header'
       onChange={handleChangeEmailTemplates}
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"}
       where otp should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm OTP (one time password) sent
         to his phone through sms</span>
      </p>}
      />




<TextField fullWidth label="Store Manager OTP confirmation Body"
onChange={handleChangeEmailTemplates}
value={store_manager_otp_confirmation_body}
id="fullWidth" multiline  rows={4}  
   
   name='store_manager_otp_confirmation_body'
  helperText={<p className='dark:text-black text-sm tracking-wider
  text-white
  playwrite-de-grund'>place {"{{otp}}"}
   where otp should appear, 
  <span className='font-extrabold'>Message Sent To Store Manager  To Confirm OTP (one time password) sent
     to his phone through sms</span>
  </p>}
  />





<TextField fullWidth label="Store Manager OTP confirmation Footer" id="fullWidth" multiline  rows={4}
onChange={handleChangeEmailTemplates}  
   value={store_manager_otp_confirmation_footer}
       name='store_manager_otp_confirmation_footer'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{otp}}"}
       where otp should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm OTP (one time password) sent
         to his phone through sms</span>
      </p>}
      />



<TextField fullWidth label="Store Manager Manager Number Header" id="fullWidth" multiline  rows={4}  
onChange={handleChangeEmailTemplates}
    value={store_manager_number_header}
       name='store_manager_number_header'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{manager_number}}"}
       where manager number should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm Manager Number  sent
         to his phone through sms</span>
      </p>}
      />





<TextField fullWidth label="Store Manager Manager Number Body" id="fullWidth" multiline  rows={4}  
onChange={handleChangeEmailTemplates}
    value={store_manager_number_body}
    name='store_manager_number_body'
   helperText={<p className='dark:text-black text-sm tracking-wider
   text-white
   playwrite-de-grund'>place {"{{manager_number}}"}
    where manager number should appear, 
   <span className='font-extrabold'>Message Sent To Store Manager  To Confirm Manager Number  sent
      to his phone through sms</span>
   </p>}
   />





<TextField fullWidth label="Store Manager Manager Number Footer" id="fullWidth" multiline  rows={4}  
onChange={handleChangeEmailTemplates}
    value={store_manager_number_footer}
       name='store_manager_number_footer'
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>place {"{{manager_number}}"}
       where manager number should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm Manager Number  sent
         to his phone through sms</span>
      </p>}
      />


<TextField        fullWidth label="Payment Reminder Header" name='payment_reminder_header'
onChange={handleChangeEmailTemplates}
value={payment_reminder_header}
  id="fullWidth" multiline  rows={4}  
      
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>Message Sent To Customers To Remind 
      About Their Payment</p>}
      
      />



<TextField        fullWidth label="Payment Reminder Body" name='payment_reminder_body'
onChange={handleChangeEmailTemplates}
value={payment_reminder_body}
  id="fullWidth" multiline  rows={4}  
      
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>Message Sent To Customers To Remind 
      About Their Payment</p>}
      
      />



<TextField        fullWidth label="Payment Reminder Footer" name='payment_reminder_footer'  
onChange={handleChangeEmailTemplates}
value={payment_reminder_footer}
id="fullWidth" multiline  rows={4}  
      
      helperText={<p className='dark:text-black text-sm tracking-wider
      text-white
      playwrite-de-grund'>Message Sent To Customers To Remind 
      About Their Payment</p>}
      
      />

    </Box>


    <div className="flex gap-2 p-3">
<button onClick     className="px-6 py-2 font-medium bg-black text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
rounded-md">
        Save Settings
      </button>
       
        </div>

        </motion.div>
</form>

    </div>
    </ThemeProvider>

    </>
  )
}

export default EmailSettings




