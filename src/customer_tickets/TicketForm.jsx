import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { MdSupportAgent } from "react-icons/md";
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { FaPhoneAlt } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { FaHandPointRight } from "react-icons/fa";




const TicketForm = ({isOpen, setIsOpen, agentRole, ticketForm, setTicketForm, handleAddTicket, openLoad,
   phone, customer_name,ticketNo, loading, handleChange, updatedDate}) => {



   const {  name, email, phone_number, priority, category, issue_description, agent,
     ticket_category, agent_review} = ticketForm






  const ticketCategory = [
   
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



 let splitName =  customer_name.split(' ')
 let abreviation = splitName.map((my_name)=> {
     return my_name.charAt(0)
 }).join('') 



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

  return (

    <>

{loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-green-500 to-green-500 text-white p-6 rounded-lg w-full
              shadow-xl cursor-default relative overflow-hidden h-screen"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 playwrite-de-grund">
                {ticketNo}
              </h3>
  


<div className="p-4 ">
  
   <div className="p-4   
         shadow-lg ">
      <div className="flex gap-4 mb-4  max-sm:flex-col max-md:flex-col">
        
        <div className="flex items-center p-3  text-black rounded shadow-lg h-full w-full ">

           <div className='flex flex-col'>
            
          <div className='bg-white rounded-full w-10 p-8 h-10 flex justify-center items-center'><p className='font-bold text-4xl'>
            {abreviation}</p></div>
           <p className='font-extrabold playwrite-de-grund'>{customer_name}</p>
           <p className='font-light playwrite-de-grund text-sm flex'>
            <FaPhoneAlt />
            {phone}</p>
           </div>
         
        </div>
       
        <div className="flex items-center p-3  text-black rounded shadow-lg h-28 w-full ">
<p>{ticketForm.issue_description}</p>
        </div>

        <div className="flex items-center p-3 flex-col text-black  shadow-lg w-full
        border-gray-700 border-2  
         rounded-md h-full ">
<p className='font-bold'>Updated By {'=>'}  <span className='font-light'>{agent}</span></p>
<p>{updatedDate}</p>
<p>{agent_review}</p>
        </div>

        
         <form onSubmit={handleAddTicket} className="flex items-center flex-col gap-10 justify-center
          h-full w-full max-w-sm  border-gray-700 border-2  
         shadow-lg p-3 rounded-md relative right-0">

            <Stack  spacing={3} sx={{
               width: '100%',
               
               
      '& .MuiTextField-root': {  width: '100%',  },
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
    }} className='myTextField'>

         <Autocomplete

value={ticketCategory.find((myCategory) => {
  if (myCategory.title === ticket_category) {
   return myCategory.title
  } else {
    return null
  }
})}
      id="combo-box-demo"
      options={ticketCategory}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Category" />}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}

      onChange={(event, newValue) => {
         setTicketForm((prevData) => {
           const updatedData = {
             ...prevData,
             ticket_category: newValue ? newValue.title : '', 
           };
           return updatedData;
         });
       }}
    />


<Autocomplete


value={status.find((myStatus) => {
  if (myStatus.ticketStatus === ticketForm.status) {
   return myStatus.ticketStatus
  } else {
    return null
  }
})}
      id="combo-box-demo"
      options={status}
      getOptionLabel={(option) => option.ticketStatus}
      isOptionEqualToValue={(option, value) => option.ticketStatus === value.ticketStatus}

      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Status" />}
      onChange={(event, newValue) => {
        console.log('before update:')
        setTicketForm((prevData) => {
          const updatedData = {
            ...prevData,
            status: newValue ? newValue.ticketStatus : '', 
          };
          return updatedData;
        });
      }}
    />


<Autocomplete

value={ticketPriority.find((myPriority) => {
  if (myPriority.ticket === priority) {
   return myPriority.ticket
  } else {
    return null
  }
})}
      id="combo-box-demo"
      sx={{ width: '100%' }}
      isOptionEqualToValue={(option, value) => option.ticket === value.ticket}
      getOptionLabel={(option) => option.ticket}
      options={ticketPriority}
      renderInput={(params) => <TextField {...params} label="Priority" />}

      onChange={(event, newValue) => {
         setTicketForm((prevData) => {
           const updatedData = {
             ...prevData,
             priority: newValue ? newValue.ticket : '', 
           };
           return updatedData;
         });
       }}
    />


<Autocomplete

value={agentRole.filter(Boolean).find(agen => agen.user_name === agent) || null}

      id="combo-box-demo"
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Agent" />}
      getOptionLabel={(option) => option.user_name}
                isOptionEqualToValue={(option, value) => option.user_name === value.user_name}
                options={agentRole.filter(Boolean)} 


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
 
 
         setTicketForm((ticketForm) => ({...ticketForm, agent: newValue ? newValue.user_name : ''}))
       }}
    />

<TextField  value={agent_review} name='agent_review' onChange={handleChange} label='Agent Note'/>

    </Stack>
    <div className="flex gap-2 justify-center">
                <button
                type='submit'
                disabled={loading}
                  className="btn playwrite-de-grund"
                >
                  Update
                </button>
                <button
                  onClick={(e) => {
                      e.preventDefault()
                    setIsOpen(false)}
                  }
                  className="btn-error btn playwrite-de-grund"
                >
                  Cancel
                </button>
      </div>
         </form>

         
      </div>
      
      
     <div className='flex gap-6 p-5'>

      <div className='flex border-2 border-gray-700 rounded-md w-[120px] text-black p-1 gap-2 cursor-pointer'>
        <FaFileLines />
        ADD NOTE
        </div>


        <div className='flex border-2 border-gray-700 rounded-md w-[135px]
         text-black p-1 gap-2 flex-row cursor-pointer'>
        <FaHandPointRight/>
        FEED BACK
        </div>
     </div>
         
      
<div className='flex gap-4'>

<TextField multiline rows={4} label='note'  sx={{
               width: '70%',
               
               
      '& .MuiTextField-root': {  width: '100%',  },
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
    }} className='myTextField'/>
<button
                type='submit'
                  className="btn playwrite-de-grund"
                >
                  Send
                </button>
                </div>

   </div>
</div>





              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </>
  );
};

export default TicketForm;