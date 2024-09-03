import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';


const SmsForm = ({ isOpen, setIsOpen, message, setMessage }) => {

  
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  




const handleChange = (e) =>{

const {name,id, value} = e.target
setMessage((prev)=>({
  ...prev,
  [name]: value
}))
}



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











  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
   
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
   
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white text-black p-6 rounded-lg w-full max-w-[900px] shadow-xl
             cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-teal-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Send Sms
              </h3>
            
              


  <form action=""
  
  className=''
  
  >


<div className='p-5'>
<div className='p-4'>

  
<Autocomplete
className='myTextField'
      id="asynchronous-demo"

      sx={{
        m: 1,width: {
          xs: '40%',
          sm: '80%',
          md: '50%',
          lg: '70%',
          xl: '70%',




      },
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
          label="Choose User"
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
    />

</div>
<textarea
rows={7}
  placeholder="Message..."
  className="border-black focus:border-black textarea-lg textarea w-full bg-transparent
   max-w-screen myTextField" name='message' value={message.message} onChange={handleChange}></textarea>
</div>
<div className="flex gap-4 p-3">

<button type='submit' className="px-6 py-2 font-medium bg-green-600 text-white w-fit transition-all 
shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
        Send Sms
      </button>

      <button  onClick={(e) =>{
            e.preventDefault()
            setIsOpen(false)

          } } className="px-6 py-2 font-medium bg-red-600 text-white w-fit transition-all
       shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
       rounded-md">
        Cancel
      </button>


{/*   
<button type='submit' className="btn ">send sms</button>

        <button
          onClick={(e) =>{
            e.preventDefault()
            setIsOpen(false)

          } }
          className="btn btn-error"
        >
          cancel
        </button> */}
        </div>
  </form>

</div>
     
    
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmsForm;