
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import {  ThemeProvider } from '@mui/material';
import {useState, useEffect, useCallback} from 'react'
import toast, { Toaster } from 'react-hot-toast';




const PaymentSettings = () => {




  // shortcode, :consumer_key, :consumer_secret,
  //      :passkey, :iniator_password, :callback_url, :passkey
    const { materialuitheme, 
    } = useApplicationSettings();
   
    const settingsMpesaInitialValue = {

      initiator_password: '',
      consumer_key: '',
      consumer_secret: '',
      passkey: '',
      callback_url: '',
      shortcode: '',




    }
const [settingsMpesaForm, setSettingsMpesaForm] = useState(settingsMpesaInitialValue)
const   {shortcode, consumer_key, consumer_secret, passkey, initiator_password, callback_url} = settingsMpesaForm



const getMpesaSettings = useCallback(
  async() => {
    try {
      const response = await fetch('/api/get_mpesa_settings')
      const newData = await response.json()
      if (response.ok) {

        const {shortcode, consumer_key, consumer_secret, passkey, initiator_password, callback_url} = newData[0]
       setSettingsMpesaForm({...settingsMpesaForm, shortcode, consumer_key, consumer_secret, passkey, initiator_password, callback_url}) 
      }else{
        toast.error('Failed to get mpesa settings', {
          position: 'top-right',
          duration: 5000,
          icon: '❌'
        })
        console.log('failed to fetch')
      }
    } catch (error) {
      console.log(error) 
    }
  },
  [],
)


useEffect(() => {
  getMpesaSettings()
}, [getMpesaSettings]);


const handleCange = (e)=>{
  const {name, value} = e.target
setSettingsMpesaForm((prevData)=> ({...prevData, [name]: value}))
}


    const handleSaveMpesaSettings = async(e) => {
      e.preventDefault()

      try {
        const response = await fetch('/api/save_mpesa_settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(settingsMpesaForm)
        })

        if (response.ok) {
          const newData = await response.json()
          const {shortcode, consumer_key, consumer_secret, passkey, initiator_password} = newData
          setSettingsMpesaForm({...settingsMpesaForm, shortcode, consumer_key, 
             consumer_secret, passkey, initiator_password}) 
          toast.success('Mpesa Settings Saved Successfully', {
            duration: 5000,
            icon: '✅'
          })
          
        } else{
          toast.error('Failed to save Mpesa Settings', {
            duration: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        toast.error('Failed to save Mpesa Settings something went wrong', {
          duration: 5000,
          icon: '❌'
        })
        console.log(error)
      }
    }




  return (
    
    <ThemeProvider theme={materialuitheme}>
<Toaster />
    <div className='mt-10 h-screen'>
      <form onSubmit={handleSaveMpesaSettings}>
        <div>

       
        <FormControl variant='standard' sx={{ m: 1, width: '100%', marginTop: 4,

        '& .MuiOutlinedInput-notchedOutline': {
            px: 2.5,
            
        },

  '& label.Mui-focused': {
    color: 'black',
    fontSize: '16px',

    },
'& .MuiOutlinedInput-root': {
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px',
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', 
    
  }
},}}  >
        <InputLabel id="demo-simple-select-autowidth-label">Mpesa Account Type</InputLabel>
        
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="User Group"
        >
         
          <MenuItem value='Till' >Till</MenuItem>
          <MenuItem value='Paybill' >Paybill</MenuItem>
        </Select>
      </FormControl>






        <Box className='myTextField'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '52ch', marginTop: 5,  },
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
      }}
      noValidate
    >


        <TextField
          id="outlined-helperText"
          label="Short Code"
          name='shortcode'
          value={shortcode}
          onChange={handleCange}
        />


      </Box>



      <Box
      component="form"
      className='myTextField'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%', marginTop: 5,  },
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
      }}
      noValidate
    >


        <TextField
          id="outlined-helperText"
          label="Consumer Key"  
          name='consumer_key'

          value={consumer_key}
          onChange={handleCange}
        />
<TextField
          id="outlined-helperText"
          label="Consumer Secret"
          name='consumer_secret'
          
          value={consumer_secret}
          onChange={handleCange}
        />


<TextField
          id="outlined-helperText"
          label="Pass Key"
          value={passkey}
          onChange={handleCange}
          name='passkey'
        />
      </Box>





      <div className="flex gap-2 p-3">
<button type='submit'    className="px-6 py-2 font-medium bg-black text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
rounded-md">
        Save Settings
      </button>
       
        </div>



      <Box
      component="form"
      className='myTextField'

      sx={{
        '& .MuiTextField-root': { m: 1, width: '52ch', marginTop: 5,  },
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
      }}
      noValidate
    >

{/* <div className='flex  '>

   

<TextField
          id="outlined-helperText"
          label="Iniator Password"
        />
</div> */}

      </Box>




      <FormControl  sx={{ m: 1, width: '100%',  marginTop: 4,'& label.Mui-focused': {
          color: 'black',
          fontSize:'14px'
        
          },
        '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px'
          },
        '&.Mui-focused fieldset':  {
          borderColor: 'black', // Set border color to transparent when focused
        
        }
        }, }}>
       
      </FormControl>



        </div>


        <div className='mt-4'>


        <FormControl variant='standard' sx={{ m: 1, width: '100%',  marginTop: 4,'& label.Mui-focused': {
          color: 'black',
          fontSize:'14px'
        
          },
        '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px'
          },
        '&.Mui-focused fieldset':  {
          borderColor: 'black', // Set border color to transparent when focused
        
        }
        }, }}>
       
      </FormControl>




<Box       className='myTextField'
  component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '52ch', marginTop: 2,  },
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
      }}
      noValidate>

        <div className='flex'>

        <TextField
          id="outlined-helperText"
          label="Head Office Shortcode"
        />


<TextField
          id="outlined-helperText"
          label="Store Shortcode"
        />



<TextField
          id="outlined-helperText"
          label="Store Till Number"
        />
        </div>


</Box>



            <Box        className='myTextField'
 component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%', marginTop: 2,   '& label.Mui-focused': {
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
      }},
      }}
      noValidate>


<TextField
          id="outlined-helperText"
          label="Consumer Secret"
        />



<TextField
          id="outlined-helperText"
          label="Consumer Key "
        />




        <TextField
                id="outlined-helperText"
                label="Pass Key "
                />
            </Box>



        <Box       className='myTextField'
   component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '52ch', marginTop: 2, '& label.Mui-focused': {
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
      }  },
      }}
      noValidate>
            <div className='flex'>



            </div>

        </Box>



 <FormControl  sx={{ m: 1, width: '100%',  marginTop: 4,'& label.Mui-focused': {
          color: 'black',
          fontSize:'14px'
        
          },
        '& .MuiOutlinedInput-root': {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
          borderWidth: '3px'
          },
        '&.Mui-focused fieldset':  {
          borderColor: 'black', // Set border color to transparent when focused
        
        }
        }, }}>
       
      </FormControl>



        </div>
</form>
    </div>

    </ThemeProvider >
  )
}

export default PaymentSettings
