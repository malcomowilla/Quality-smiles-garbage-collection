
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
import SmsTemplateErrorAlert from '../Alert/SmsTemplateError'
import { IoKeyOutline, IoLockClosedOutline } from "react-icons/io5";
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
// openSmsTemplateError, handleCloseSmsTemplateError 

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
const [openSmsTemplateError, setopenSmsTemplateError] = useState(false)
const [success, setSuccess] = useState(false);
const [isLoading, setLoading] = useState(false);


const [formData, setFormData] = useState({
  api_key: '',
  api_secret: ''
});



const handleCloseSmsTemplateError  = () => {
  setopenSmsTemplateError(false)
}


const handleCloseTemplateError = ()=> {
  setopenTemplateError(false)
}





const { materialuitheme, 
 } = useApplicationSettings();





const handleCloseTemplateAlert = ()=> {
  setopenTemplateAlert(false)
}



const handleChangeSmsSettings = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({...prev, [name]: value}));
};



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await fetch('/api/create_sms_setting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sms_setting: formData })
    });

    if (response.ok) {
      toast.success('SMS Settings Saved Successfully');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }else{
      toast.error('Error Saving SMS Settings')
    }
  } catch (error) {
    console.error('Error saving SMS settings:', error);
    toast.error('Error Saving SMS Settings')
  } finally {
    setLoading(false);
  }
};

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
        setopenSmsTemplateError(true)
      }
    } catch (error) {
      console.log(error)
      setopenSmsTemplateError(true)

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
        toast.success('SMS Templates Saved Successfully');
        setopenTemplateAlert(true)
        const admin_otp_confirmation_template = newData.admin_otp_confirmation_template
         const payment_reminder_template = newData.payment_reminder_template   
const service_provider_otp_confirmation_template = newData.service_provider_otp_confirmation_template
   const customer_otp_confirmation_template = newData.customer_otp_confirmation_template
    const user_invitation_template = newData.user_invitation_template
  const service_provider_confirmation_code_template = newData.service_provider_confirmation_code_template
  const customer_confirmation_code_template = newData.customer_confirmation_code_template
  const store_manager_otp_confirmation_template =  newData.store_manager_otp_confirmation_template
  const store_manager_manager_number_confirmation_template = newData.store_manager_manager_number_confirmation_template


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
        toast.error('Error Saving SMS Templates')
        setOpenLoad(false)
        setopenSmsTemplateError(true)
        console.log('error', newData.error)
      }
    } catch (error) {
      setopenSmsTemplateError(true)
      setloading(false)
      toast.error('Error Saving SMS Templates')
      setOpenLoad(false)
      console.log(error)
    }
  }
  return (

    <>
<ToastContainer position='top-center' transition={Slide}  autoClose={10000}/>

<SmsTemplateErrorAlert openSmsTemplateError={openSmsTemplateError}  handleCloseSmsTemplateError={handleCloseSmsTemplateError}/>

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





<div className=" p-4">
      <div className="max-w-md mx-auto">
        <div className="dark:bg-gray-800 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            SMS Configuration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* API Key Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 
                dark:text-gray-200 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoKeyOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="api_key"
                    value={formData.api_key}
                    onChange={handleChangeSmsSettings}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl 
                      focus:ring-2 focus:ring-green-500 focus:border-green-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      transition duration-150 ease-in-out"
                    placeholder="Enter API Key"
                    required
                  />
                </div>
              </div>
  
  
     {/* API Secret Input */}
     <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  API Secret
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="api_secret"
                    value={formData.api_secret}
                    onChange={handleChangeSmsSettings}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                      focus:ring-2 focus:ring-green-500 focus:border-green-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      transition duration-150 ease-in-out"
                    placeholder="Enter API Secret"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl
                text-sm font-medium text-white bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                transition duration-150 ease-in-out
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                ${success ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                   strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 
                  0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 
                  7.938l3-2.647z"></path>
                </svg>
              ) : success ? (
                'Settings Saved!'
              ) : (
                'Save Settings'
              )}
            </button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Enter your SMS provider API credentials. These will be used to send SMS 
            notifications to your users.
          </p>
        </div>
      </div>
    </div>





    </div>

    </>
  )
}

export default SmsSettings




























































