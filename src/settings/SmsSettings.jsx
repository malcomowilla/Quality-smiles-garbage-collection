
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState, useCallback, useEffect,useMemo} from 'react'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import TemplateAlert from '../Alert/TemplateAlert'
import {  ThemeProvider } from '@mui/material';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import SmsTemplateDeniedAlert from '../Alert/SmsTemplateDeniedAlert'

  

const templateData = {
  admin_otp_confirmation_template: '' ,
  payment_reminder_template: '',
  service_provider_otp_confirmation_template: '',
  customer_otp_confirmation_template: '',
  user_invitation_template: '',
  service_provider_confirmation_code_template: '',
  customer_confirmation_code_template: '',
  store_manager_otp_confirmation_template: '',
  store_manager_manager_number_confirmation_template: ''
}







const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const SmsSettings = () => {
const [templateForm, setTemplateForm] = useState(templateData)
const [loading, setloading] = useState(false)
const [openLoad, setOpenLoad] = useState(false);
const [openTemplateAlert, setopenTemplateAlert] = useState(false)
const [openTemplateError, setopenTemplateError]= useState(false)






const handleCloseTemplateError = ()=> {
  setopenTemplateError(false)
}





const { materialuitheme, 
 } = useApplicationSettings();





const handleCloseTemplateAlert = ()=> {
  setopenTemplateAlert(false)
}





const { admin_otp_confirmation_template,  payment_reminder_template,  
  service_provider_otp_confirmation_template, customer_otp_confirmation_template, user_invitation_template,
  service_provider_confirmation_code_template, customer_confirmation_code_template,
  store_manager_otp_confirmation_template, store_manager_manager_number_confirmation_template} =  templateForm


  const handleChange = (e)=> {
const {name, value} = e.target
setTemplateForm((prevData) => ({...prevData, [name]: value}))
  }

  const controller = useMemo(() => new AbortController(), [])

  const id = setTimeout(() => controller.abort(), 9000)

const getSmsTemplates= 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_sms_templates', {
        signal: controller.signal,  

      })
      // clearTimeout(id);

      const newData = await response.json()
      // if (response.status === 403) {
      //   setopenopenAccessDenied3(true)
        
      // }
      if (response.ok) {
        const admin_otp_confirmation_template = newData[0].admin_otp_confirmation_template
         const payment_reminder_template = newData[0].payment_reminder_template   
const service_provider_otp_confirmation_template = newData[0].service_provider_otp_confirmation_template
   const customer_otp_confirmation_template = newData[0].customer_otp_confirmation_template
    const user_invitation_template = newData[0].user_invitation_template
  const service_provider_confirmation_code_template = newData[0].service_provider_confirmation_code_template
  const customer_confirmation_code_template = newData[0].customer_confirmation_code_template
  const store_manager_otp_confirmation_template = newData[0].store_manager_otp_confirmation_template
  const store_manager_manager_number_confirmation_template = newData[0].store_manager_manager_number_confirmation_template
        console.log('customer data', newData)


        setTemplateForm((prevData)=>  ({...prevData, admin_otp_confirmation_template,
          payment_reminder_template,service_provider_otp_confirmation_template,customer_otp_confirmation_template,
          user_invitation_template,service_provider_confirmation_code_template,customer_confirmation_code_template,
          store_manager_otp_confirmation_template,store_manager_manager_number_confirmation_template
        }))
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
  getSmsTemplates()

  return () => {
    controller?.abort()
  };
}, [getSmsTemplates, controller]);


  const saveSmsTemplate = async(e)=> {
    e.preventDefault()
    try {
      setloading(true)
      setOpenLoad(true)
      const response = await fetch('/api/save_sms_template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateForm)
      })
      const newData = await response.json()

      if (response.status === 403) {
        setopenTemplateError(true)
      }
      if (response.ok) {
        setopenTemplateAlert(true)
        const admin_otp_confirmation_template = newData.admin_otp_confirmation_template
         const payment_reminder_template = newData.payment_reminder_template   
const service_provider_otp_confirmation_template = newData.service_provider_otp_confirmation_template
   const customer_otp_confirmation_template = newData.customer_otp_confirmation_template
    const user_invitation_template = newData.user_invitation_template
  const service_provider_confirmation_code_template = newData.service_provider_confirmation_code_template
  const customer_confirmation_code_template = newData.customer_confirmation_code_template
  const store_manager_otp_confirmation_template =  newData[0].store_manager_otp_confirmation_template
  const store_manager_manager_number_confirmation_template = newData[0].store_manager_manager_number_confirmation_template


  setTemplateForm((prevData)=>  ({...prevData, admin_otp_confirmation_template,
    payment_reminder_template,service_provider_otp_confirmation_template,customer_otp_confirmation_template,
    user_invitation_template,service_provider_confirmation_code_template,customer_confirmation_code_template,
    store_manager_otp_confirmation_template,store_manager_manager_number_confirmation_template
  }))
        setloading(false)
        setOpenLoad(false)
        console.log('sms template', newData)
      } else {
        setloading(false)
        setOpenLoad(false)
        console.log('error', newData.error)
      }
    } catch (error) {
      setloading(false)
      setOpenLoad(false)
      console.log(error)
    }
  }
  return (

    <>
<SmsTemplateDeniedAlert openTemplateError={openTemplateError}  handleCloseTemplateError={handleCloseTemplateError}/>
<TemplateAlert  openTemplateAlert={openTemplateAlert} handleCloseTemplateAlert={handleCloseTemplateAlert}/>

{loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
    <div className='p-7'>

    <div>
      
    <p className='text-black playwrite-de-grund  text-lg font-bold'>
        Customize messages sent to customers using sms.Make sure to include the keywords to correctly include content

        </p>
    </div>
        

        <div className='p-7'>
            <p className='text-black playwrite-de-grund  text-2xl font-extrabold'>SMS Templates</p>
        </div>

<form onSubmit={saveSmsTemplate}>
<ThemeProvider theme={materialuitheme}>

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
      <TextField onChange={handleChange} fullWidth label="Customer Confirmation Code" name='customer_confirmation_code_template' 
       id="fullWidth" multiline 
       rows={4}
        helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>     place  {"{{customer_code}}"}

                    where the customer code should appear in the text and either  {"{{name}}"}, 
        to include the users name,   <span className='font-extrabold'>Message Sent To Customer To Confirm Customer Code
          </span></p>} value={customer_confirmation_code_template}/>


      <TextField   onChange={handleChange}         fullWidth label="Service Provider Confirmation Code" value={service_provider_confirmation_code_template} id="fullWidth" multiline  rows={4} 
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>  
         place  {"{{provider_code}}"}

      where the provider code should appear in the text and either  {"{{name}}"}, 
to include the service provider name,   
<span className='font-extrabold'>Message Sent To Service Provider To Confirm Provider Code</span></p>} 
name='service_provider_confirmation_code_template'/>


      <TextField fullWidth label="User Invitation" id="fullWidth" multiline  rows={4} value={user_invitation_template} 
      name='user_invitation_template' onChange={handleChange}
       helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>
        place {"{{user_name}}"}  for user's name,
        <span className='font-extrabold'>   Message Sent To User To Invite Them After They Have Been Assigned A 
           Role In The System</span>
      </p>}/>



      <TextField   onChange={handleChange} fullWidth label="Customer OTP confirmation" id="fullWidth" multiline  rows={4}
      
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Customer To Confirm OTP</span>
      </p>}  name='customer_otp_confirmation_template' value={customer_otp_confirmation_template}/>



      <TextField value={service_provider_otp_confirmation_template} onChange={handleChange}   fullWidth label="Service Provider OTP confirmation" id="fullWidth" multiline  rows={4} 
      name='service_provider_otp_confirmation_template'
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"} where otp should appear, 
      <span className='font-extrabold'>Message Sent To Service Provider To Confirm OTP</span>
      </p>}
      />


      <TextField fullWidth label="Admin OTP confirmation" id="fullWidth" multiline  rows={4}  
      onChange={handleChange}  
      value={admin_otp_confirmation_template} name='admin_otp_confirmation_template'
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"}
       where otp should appear, 
      <span className='font-extrabold'>Message Sent To User  To Confirm OTP For Invitation</span>
      </p>}
      />


<TextField fullWidth label="Store Manager OTP confirmation" id="fullWidth" multiline  rows={4}  
      onChange={handleChange}  
      value={store_manager_otp_confirmation_template} name='store_manager_otp_confirmation_template'
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>place {"{{otp}}"}
       where otp should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm OTP (one time password) sent
         to his phone through sms</span>
      </p>}
      />




<TextField fullWidth label="Store Manager Manager Number" id="fullWidth" multiline  rows={4}  
      onChange={handleChange}  
      value={store_manager_manager_number_confirmation_template} name='store_manager_manager_number_confirmation_template'
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>place {"{{manager_number}}"}
       where manager number should appear, 
      <span className='font-extrabold'>Message Sent To Store Manager  To Confirm Manager Number  sent
         to his phone through sms</span>
      </p>}
      />


<TextField    onChange={handleChange}     fullWidth label="Payment Reminder" name='payment_reminder_template'
 value={payment_reminder_template}  id="fullWidth" multiline  rows={4}  
      
      helperText={<p className='text-black text-sm tracking-wider playwrite-de-grund'>Message Sent To Customers To Remind 
      About Their Payment</p>}
      
      />


    </Box>
    </ThemeProvider>


    <div className="flex gap-2 p-3">
<button   type='submit'  disabled={loading} className="px-6 py-2 font-medium bg-black text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
rounded-md">
        Save Settings
      </button>
       
        </div>
</form>


  
    </div>

    </>
  )
}

export default SmsSettings




























































