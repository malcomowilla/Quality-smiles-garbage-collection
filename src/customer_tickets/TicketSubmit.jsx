


import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { GoPerson } from "react-icons/go";
import { MdSupportAgent } from "react-icons/md";

import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';




const TicketSubmit = ({ isOpenTicket, isloading, setIsOpenTicket, customers, agentRole, handleChange,
  ticketForm ,setTicketForm, handleAddTicket,openLoad
}) => {

  const [my_customer, setCustomer] = useState('existing')

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = useState(false)
  const [options, setOptions] = React.useState([]);
  const [options2, setOptions2] = useState([])
  const [options3, setOptions3] = useState([])
  const [options4, setOptions4] = useState([])



const {  name, email, phone_number, priority, category, issue_description, agent, ticket_category} = ticketForm





  const loading = open && options.length === 0;
  const loading2 = open2 && options2.length === 0
  const loading3 = open && options.length === 0;



  const topFilms = [
   
    { title: 'Billing',  },
    { title: "Garbage Collection",  },
   
    {
      title: 'Service Issue',
      
    },
    { title: 'General Enquiry', },
    {
      title: 'Other',
      
    },
   

   
  ];






  const ticketPriority = [
   
   
   
    { ticket: "Low"},
    { ticket: 'Medium'},
    { ticket: 'Urgent' },
    

   
  ];



  const status = [
   
   
   
    { ticketStatus: "Open"},
    { ticketStatus: 'Resolved'},
    { ticketStatus: 'In Progress' },
    { ticketStatus: 'Pending' },
    

   
  ];



  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };




const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.customer_code,
});










  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }



  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);







  useEffect(() => {
    let active = true;

    if (!loading2) {
      return undefined;
    }

   

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions2([...ticketPriority]);
      }

      
    })();

    return () => {
      active = false;
    };


   
  }, [loading2]);

  useEffect(() => {
    if (!open2 ) {
      setOptions2([]);
    }
  }, [open2]);

  



  useEffect(() => {
    let active = true;

    if (!loading3) {
      return undefined;
    }

   

    (async () => {
      await sleep(1e3); 

      if (active) {
        setOptions3([...status]);
      }

      
    })();

    return () => {
      active = false;
    };


   
  }, [loading3]);

  useEffect(() => {
    if (!open3 ) {
      setOptions3([]);
    }
  }, [open3]);

  

  return (

    <>
    {isloading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
    <AnimatePresence>
      {isOpenTicket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-teal-600 to-teal-600 text-white p-6 rounded-lg w-full max-w-[800px]
            shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-yellow-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>

              <div className='flex justify-center p-2 gap-3 bg-white  mx-auto text-black w-40 rounded-md playwrite-de-grund'>
              <p className="text-sm font-bold text-center mb-2 bg-yellow-600 p-2 rounded-md ">
                New  
              </p>

            <p className='text-sm font-bold text-center mb-2 '>Ticket</p>
              </div>
              

            <div className='p-4'>
              <form onSubmit={handleAddTicket}
>
              <FormControl>
                <label className='playwrite-de-grund'>Is This A New Or Existing Customer?</label>
      <RadioGroup
      onChange={(e)=> setCustomer(e.target.value)}
      value={my_customer}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="new" control={<Radio color='success'/>} label="New" />
        <FormControlLabel value="existing" control={<Radio  color='success'/>} label="Existing" />
        
      </RadioGroup>
    </FormControl>



    <Box
    className='myTextField'
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%', marginTop: 2,  },
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
    >



{my_customer === 'new' ? (
  <>

<TextField fullWidth label="Name" id="fullWidth" onChange={handleChange}  name='name' value={name}/>
      <TextField fullWidth label="Email" id="fullWidth"  onChange={handleChange} name='email' value={email}/>
      <TextField fullWidth label="Phone Number" id="fullWidth" onChange={handleChange} name='phone_number' value={phone_number}/>
  </>
): null}
     

    </Box>


<Autocomplete
className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1, width: '100%',
        '& label.Mui-focused': {
          color: 'white',
          fontSize:'16px'
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
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ticket Category"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}

      onChange={(event, newValue) => {
        console.log('Before Update:', ticket_category);
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            ticket_category: newValue ? newValue.title : '', 
          };
          console.log('After Update:', updatedData);
          return updatedData;
        });
      }}
    />








<Autocomplete
className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1, width: '100%',
        '& label.Mui-focused': {
          color: 'white',
          fontSize:'16px'
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
      open={open2}
      onOpen={() => {
        setOpen2(true);
      }}
      onClose={() => {
        setOpen2(false);
      }}
      isOptionEqualToValue={(option, value) => option.ticket === value.ticket}
      getOptionLabel={(option) => option.ticket}
      options={options2}
      loading={loading2}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Priority"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading2 ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}


      onChange={(event, newValue) => {
        console.log('Before Update:', priority);
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            priority: newValue ? newValue.ticket : '', 
          };
          console.log('After Update:', updatedData);
          return updatedData;
        });
      }}
    />





<div className='p-1'>


<Autocomplete

className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1, width: '100%',
        '& label.Mui-focused': {
          color: 'white',
          fontSize:'16px'
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
                
                
        getOptionLabel={(option) => option.ticketStatus}
      isOptionEqualToValue={(option, value) => option.ticketStatus === value.ticketStatus}

      options={status}
      renderInput={(params) => <TextField {...params} label="Status" />}

      onChange={(event, newValue) => {
        console.log('Before Update:', ticketForm.status);
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            status: newValue ? newValue.ticketStatus : '', 
          };
          console.log('After Update:', updatedData.status);
          return updatedData;
        });
      }}
    />



    
</div>


{my_customer === 'existing' ? (
  <>


<div className='p-1'>

<Autocomplete
// value={customers.find(cust => cust.name === ticketForm.customer) || null}
filterOptions={filterOptions}
className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1, width: '100%',
        '& label.Mui-focused': {
          color: 'white',
          fontSize:'16px'
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
                 
                }}       getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}

      options={customers}
      renderInput={(params) => <TextField {...params} label="Customer" />}



      renderOption={(props, customers) => (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            width: '100%',
            padding: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'start'
            }
          }}
          {...props}
        >
        <GoPerson />
        
          <Stack direction='column'>
          <span>{customers.customer_code}</span>
          <span>{customers.name}</span>
          </Stack>
        
        </Stack>
        
      )}



      onChange={(event, newValue) => {
        console.log('Before Update customer:', ticketForm);
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            customer: newValue ? newValue.name : '', 
          };
          console.log('After Update customer:', updatedData);
          return updatedData;
        });
      }}
    />



</div>

  </>
): null}








<div className='p-1'>

<Autocomplete
// value={agentRole.filter(Boolean).find(agen => agen.user_name === agent) || null}
className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1, width: '100%',
        '& label.Mui-focused': {
          color: 'white',
          fontSize:'16px'
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
                
                
                getOptionLabel={(option) => option.user_name}
                isOptionEqualToValue={(option, value) => option.user_name === value.user_name}
                options={agentRole.filter(Boolean)} 
      renderInput={(params) => <TextField {...params} label="Agent" />}


      renderOption={(props, agentRole) => (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            width: '100%',
            padding: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'start'
            }
          }}
          {...props}
        >
        <MdSupportAgent />
        
          <Stack direction='column'>
          <span>{agentRole.user_name}</span>
          </Stack>
        
        </Stack>
        
      )}
      

      onChange={(event, newValue) => {
        console.log('Before Update agent:', ticketForm);
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            agent: newValue ? newValue.user_name : '', 
          };
          console.log('After Update agent:', updatedData);
          return updatedData;
        });
      }}

    
    />
</div>


<Box
    className='myTextField'
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%', marginTop: 2,  },
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
    >
<TextField fullWidth label="Note Your Issue" id="fullWidth" multiline rows={8} 
 onChange={handleChange} value={issue_description} name='issue_description'/>

</Box>



<div className="flex gap-2 playwrite-de-grund">
                <button
                disabled={isloading}
                type='submit'
                  className="btn"
                >
                  Submit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpenTicket(false)} 
                  }  
                  className="btn btn-error playwrite-de-grund"
                >
                  Cancel
                </button>
              </div>
              </form>
    </div>

              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default TicketSubmit

















