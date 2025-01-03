
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import {  ThemeProvider } from '@mui/material';



const PaymentSettings = () => {


    const { materialuitheme, 
    } = useApplicationSettings();
   


  return (
    
    <ThemeProvider theme={materialuitheme}>

    <div className='mt-10 h-screen'>
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
        />
<TextField
          id="outlined-helperText"
          label="Consumer Secret"
        />


<TextField
          id="outlined-helperText"
          label="Pass Key"
        />
      </Box>


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

<div className='flex  '>

        <TextField
          id="outlined-helperText"
          label="Initiator Username"
        />

<TextField
          id="outlined-helperText"
          label="Iniator Password"
        />
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
        <InputLabel id="demo-simple-select-autowidth-label">API VERSION</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="User Group"
        >
        
          <MenuItem >V1</MenuItem>
          <MenuItem >V2</MenuItem>
        </Select>
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
        <InputLabel id="demo-simple-select-autowidth-label">Fixed Mesa Account Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="User Group"
        >
        
          <MenuItem value='Paybill'>Paybill</MenuItem>
          <MenuItem value='Till Number'>Till Number</MenuItem>
        </Select>
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


            <TextField
                id="outlined-helperText"
                label="Initiator Username "
                />


<TextField
                id="outlined-helperText"
                label="Initiator Password "
                />

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
        <InputLabel id="demo-simple-select-autowidth-label">API VERSION</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="User Group"
        >
        
          <MenuItem >V1</MenuItem>
          <MenuItem >V2</MenuItem>
        </Select>
      </FormControl>


      <div className="flex gap-2 p-3">
<button onClick     className="px-6 py-2 font-medium bg-black text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
rounded-md">
        Save Settings
      </button>
       
        </div>

        </div>

    </div>

    </ThemeProvider >
  )
}

export default PaymentSettings
