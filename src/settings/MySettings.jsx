
import {  ThemeProvider } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { motion } from "framer-motion"
import { useApplicationSettings } from '../settings/ApplicationSettings';
import SettingsAlert from '../Alert/SettingsAlert'
import SettingsAlertError from '../Alert/SettingsAlert'

import {useEffect, useCallback, useState} from 'react'

const MySettings = () => {
    const { materialuitheme, seeSettings1, setSeeSettings1, seeSettings2, setSeeSettings2, 
      seeSettings3, setSeeSettings3, settingsformData, setsettingsformData,  handleCustomerFormDataChange,
      settingsformDataForProvider, setsettingsforProvider, handleCustomerFormDataChangeForProvider,
     } = useApplicationSettings();

     const [open, setOpen] = useState(false);
     const [openError, setOpenError] = useState(false);

     const handleClose = (event, reason) => {
       if (reason === 'clickaway') {
         return;
       }
   
       setOpen(false);
     };



     const handleCloseError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };







     const handleUpdateCustomer = async(e)=> {
      e.preventDefault()
      try {
        const response = await fetch('/api/update_customer_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsformData)
        })
        const newData = await response.json()
        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          const use_auto_generated_number = newData.use_auto_generated_number
          setOpen(true)
          
          setsettingsformData((prevData)=>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number
             }))

             localStorage.setItem('customer settings', JSON.stringify({ use_auto_generated_number}))
          console.log('customer_data:',newData)
        } else {
          console.log('failed')
          setOpen(false)
          setOpenError(true)
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
      }
     }






     const handleUpdateProvider = async(e)=> {
      e.preventDefault()
      try {
        const response = await fetch('/api/update_provider_settings',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(settingsformDataForProvider)
        })
        const newData = await response.json()
        if (response.ok) {
          const prefix = newData.prefix
          const minimum_digits = newData.minimum_digits
          const use_auto_generated_number_for_service_provider = newData.use_auto_generated_number_for_service_provider
          setOpen(true)
          setsettingsforProvider((prevData)=>  ({...prevData, prefix, minimum_digits, 
            use_auto_generated_number_for_service_provider
             }))

             localStorage.setItem('provider settings', JSON.stringify({ use_auto_generated_number_for_service_provider}))
          console.log('customer_data:',newData)

        } else {
          console.log('failed')
          setOpen(false)
          setOpenError(true)
        }
      } catch (error) {
        console.log(error)
        setOpen(false)
      }
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




  return (



<div id="accordion-open" data-accordion="open" className='mt-9'>
  <SettingsAlert open={open} handleClose={handleClose}/>
  <SettingsAlertError openError={openError} handleCloseError={handleCloseError}/>

  <h2 id="accordion-open-heading-1">


    <button type="button" onClick={()=> setSeeSettings1(!seeSettings1)}   className="flex items-center justify-between 
    w-full p-5 font-medium rtl:text-right
      border border-b-0 border-gray-200 rounded-t-xl  text-white  focus:ring-4 focus:ring-gray-200
      dark:focus:ring-gray-800
      dark:border-gray-700 dark:text-gray-900 hover:dark:text-white hover:text-black hover:bg-gray-100
       dark:hover:bg-gray-800 gap-3"
       data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 hover:text-white  " fill="currentColor"
       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8
        0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 
        0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg> Admin Registration</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>




<form >
  <motion.div   variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings1 ? "visible" : "hidden"} id="" 
  className={`
   `}
   >
    <div className="p-5 border border-b-0 border-gray-200 ">
   

    <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />} label="Require Email At Signup" />
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default"/>} label="Allow Login With Email " />
      <FormControlLabel  className='dark:text-black text-white'  control={<Checkbox  color="default" />} label="Logout User on exit or after a period of inactivity" />
      <Box
       className='dark:text-black myTextField'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '120ch' },
      }}
      noValidate
    >
<ThemeProvider theme={materialuitheme}>

<TextField sx={{
  '& label.Mui-focused':{
    color: 'gray'
  },
width: {
xs: '30%'
},

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px'
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
},
}}
          id="outlined-multiline-flexible"
          label="Logout User after a period of inactivity(hrs)"

type='number'
        />
</ThemeProvider >

        </Box>
        <FormControlLabel  className='dark:text-black'  control={<Checkbox color="default"/>} l
        abel="Send Welcome Message After Registration(SMS)" />
        <FormControlLabel    className='dark:text-black' control={<Checkbox color="default"  
        />}   name='welcome_back_message' label="Show Welcome Back Message After First Time Login" />

<div className='p-5'>
        <button className="btn dark:btn  btn-outline hover:dark:text-white">UPDATE SETTINGS</button>

        </div>
    </div>
  </motion.div>
  </form>







  <h2 id="accordion-open-heading-2">
    <button type="button"   onClick={()=> setSeeSettings2(!seeSettings2)} className="flex items-center justify-between w-full p-5 
    
    font-medium rtl:text-right text-white  border border-b-0 border-gray-200 focus:ring-4
    hover:dark:text-white hover:text-black
    focus:ring-gray-200 dark:focus:ring-gray-800  dark:border-gray-700 dark:text-gray-900 
     hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0 dark:text-black " fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 
       1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"></path></svg>Customer Account</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>

<form onSubmit={handleUpdateCustomer}>

  <motion.div  variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings2 ? "visible" : "hidden"} id="accordion-open-body-2"   className={''} 
  aria-labelledby="accordion-open-heading-2">
   

  <FormGroup>
          
 


    <FormControlLabel   className=' dark:text-black' sx={{
       width:{
        xs: '25%',
        sm: '30%',
        marginTop: 20
        
      }
    }}  control={<Checkbox color="default" />} label="Automatically Send Reminder SMS for Expiring Payments"  />



<FormControlLabel  className=' dark:text-black' control={<Checkbox color="default" onChange={handleCustomerFormDataChange}

checked={settingsformData.use_auto_generated_number}
/>}   label="Use Auto GeneratedNumber 
 As Customer Code"  name='use_auto_generated_number'/>

<FormControlLabel  className=' dark:text-black' control={<Checkbox  color="default"/>} label="Send Customer Code Once Account 
Is Created Is Created(SMS/Email)"  />


</FormGroup>

<ThemeProvider theme={materialuitheme}>

        <Stack direction='row'  className='myTextField'  sx={{
           
        '& .MuiTextField-root': { m: 1, width: '90ch',    '& label.Mui-focused': {
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

          <TextField  name='prefix' 
          
          label='Customer Code  Prefix' onChange={handleCustomerFormDataChange} value={settingsformData.prefix}   ></TextField>

          <TextField name='minimum_digits' onChange={handleCustomerFormDataChange} value={settingsformData.minimum_digits}  className='myTextField'   
             type='number'  label='Customer Code Minimum Digits(Zeros will be added to the front, eg SUB001 for
              three digits)'></TextField>

        </Stack>
        <div className='p-5'>
        <button  type='submit' className="btn dark:btn  btn-outline hover:dark:text-white">UPDATE SETTINGS</button>

        </div>

        </ThemeProvider>

  </motion.div>
</form>


  <h2 id="accordion-open-heading-3">
    <button type="button"  onClick={()=> setSeeSettings3(!seeSettings3)} className="flex items-center justify-between w-full p-5 font-medium 
    rtl:text-right text-white border dark:text-black border-gray-200 focus:ring-4 hover:text-black focus:ring-gray-200
     dark:focus:ring-gray-800 dark:border-gray-700 dark:hover:text-white hover:bg-gray-100 
     dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-3" aria-expanded="false" 
     aria-controls="accordion-open-body-3">
      <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0
        00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 
        0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Service Provider Account?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>

  
  <motion.div className='p-3' variants={variantDiv} transition={{duration:0.5, ease: "easeInOut",
  }} initial='hidden' animate={seeSettings3 ? "visible" : "hidden"} id="accordion-open-body-3"
   aria-labelledby="accordion-open-heading-3">

<ThemeProvider theme={materialuitheme}>










<form onSubmit={handleUpdateProvider}>
  <FormGroup>
          

      <FormControlLabel  name='use_auto_generated_number_for_service_provider' className=' dark:text-black' 
      control={<Checkbox color="default"  onChange={handleCustomerFormDataChangeForProvider}
      checked={settingsformDataForProvider.use_auto_generated_number_for_service_provider}/>
    
    
    } label="Use Auto GeneratedNumber As Service Provider Code"  />
      
      <FormControlLabel  className=' dark:text-black' control={<Checkbox  color="default"/>} label="Send Service Provider
      Code Once Account Is Created Is Created(SMS/Email)"  />
   
      
      </FormGroup>
  <Stack direction='row'  className='myTextField'  sx={{
           
           '& .MuiTextField-root': { m: 1, width: '90ch',    '& label.Mui-focused': {
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
   
            
   <TextField  name='prefix' value={settingsformDataForProvider.prefix}  onChange={handleCustomerFormDataChangeForProvider}  className='myTextField'
             label='Service Provider Code No Prefix' ></TextField>
           
   
   <TextField name='minimum_digits'  value={settingsformDataForProvider.minimum_digits} onChange={handleCustomerFormDataChangeForProvider} className='myTextField '   
                type='number'  label='Service Provider Code Minimum Digits(Zeros will be added to the front, eg SUB001 for
                 three digits)'></TextField>
   
           </Stack>
           <div className='p-5'>
        <button   type='submit' className="btn dark:btn  btn-outline hover:dark:text-white">UPDATE SETTINGS</button>

        </div>
        </form>
           </ThemeProvider>

  </motion.div>
</div>

  )
}

export default MySettings

