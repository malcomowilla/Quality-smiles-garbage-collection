import React, { useState } from 'react';
import { inviteClient } from './api';
import { motion } from 'framer-motion';
import { TextField, Button, Box, Slide, Backdrop } from '@mui/material';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const InviteClient = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [domainSubdomain, setDomainSubDomain] = useState('');
  const [openLoad, setOpenLoad] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOpenLoad(true);
    try {
      const response = await inviteClient({
        email,
        phone_number: phoneNumber,
        user_name: userName,
        company_domain_or_subdomain: domainSubdomain,
      });

      setEmail('');
      setPhoneNumber('');
      setUserName('');
      setDomainSubDomain('');

      if (response.ok) {
        toast.success('Client successfully created');
      } else {
        toast.error('Something went wrong, please try again');
        
      }
    } catch (error) {
      console.error('Error inviting client:', error);
      toast.error('Something went wrong, please try again');
    } finally {
      setLoading(false);
      setOpenLoad(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
 <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      {loading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}
      <form onSubmit={handleInvite}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='f'
          >
            <h2>Invite New Client</h2>
            <Box sx={{ display: 'flex', flexDirection: 
        'column', gap: 2,
        justifyContent: 'center',
        justifyItems: 'center',
        
        '& label.Mui-focused': { color: 'gray' },
        '& .MuiOutlinedInput-root': {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            borderWidth: '3px'
          }
        }}}  className='myTextField'>
              <TextField
                label="User Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ borderRadius: 2 }}
              />
              {/* <TextField
                label="Subdomain"
                variant="outlined"
                value={domainSubdomain}
                onChange={(e) => setDomainSubDomain(e.target.value)}
                sx={{ borderRadius: 2 }}
              /> */}
              <TextField
                label="Client Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ borderRadius: 2 }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ borderRadius: 2 }}
              />
              <Button
                type='submit'
                variant="contained"
                color="success"
                disabled={loading} // Disable button while loading
              >
                Send Invitation
              </Button>
            </Box>
          </motion.div>
        </Slide>
      </form>
    </>
  );
};

export default InviteClient;

