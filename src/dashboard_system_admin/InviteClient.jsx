import React, { useState, useEffect } from 'react';
import { inviteClient } from './api';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Box, 
  Slide, 
  Backdrop,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MaterialTable from "material-table";
import { IoPeople } from "react-icons/io5";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';



const InviteClient = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    userName: '',
    domainSubdomain: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    userName: ''
  });

  const [loading, setLoading] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [clients, setClients] = useState([]);
  const [fetchingClients, setFetchingClients] = useState(false);

  const fetchClients = async () => {
    setFetchingClients(true);
    try {
      const response = await fetch('/api/get_all_clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        toast.error('Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error loading clients');
    } finally {
      setFetchingClients(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      phoneNumber: '',
      userName: ''
    };

    // Username validation
    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setLoading(true);
    setOpenLoad(true);

    try {
      const response = await inviteClient({
        email: formData.email,
        phone_number: formData.phoneNumber,
        user_name: formData.userName,
        company_domain_or_subdomain: formData.domainSubdomain,
      });

      if (response.ok) {
        toast.success('Client successfully created');
        setFormData({
          email: '',
          phoneNumber: '',
          userName: '',
          domainSubdomain: ''
        });
        // Refresh client list after successful invitation
        fetchClients();
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

  const flattenedData = clients.flatMap(client =>
    client.admins.map(admin => ({
      ...admin,
      subdomain: client.subdomain, // Include subdomain in each admin record
    }))
  );
  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      {loading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <form onSubmit={handleInvite}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='f'
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <h2>Invite New Client</h2>
                <Tooltip title="Refresh client list">
                  <IconButton 
                    onClick={fetchClients}
                    disabled={fetchingClients}
                    sx={{ color: 'green' }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                justifyItems: 'center',
                '& label.Mui-focused': { color: 'gray' },
                '& .MuiOutlinedInput-root': {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    borderWidth: '3px'
                  }
                }
              }} className='myTextField'>
                <TextField
                  label="User Name"
                  variant="outlined"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  error={!!errors.userName}
                  helperText={errors.userName}
                  required
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  label="Client Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  required
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  type='submit'
                  variant="contained"
                  color="success"
                  disabled={loading}
                >
                  Send Invitation
                </Button>
              </Box>
            </motion.div>
          </Slide>
        </form>

        <MaterialTable
        columns={[
          { title: "SubDomain", field: "subdomain" },
          { title: "User Name", field: "user_name" },
          { title: "Email", field: "email" },
          { title: "Role", field: "role" },
          { title: "Phone Number", field: "phone_number" },
          { title: "Locked Account", field: "locked_account" },
         
          {
            title: "Action",
            field: "Action",
            render: rowData => (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" color="success">Edit</Button>
                <Button variant="outlined" color="error">Delete</Button>
              </Box>
            )
          }
        ]}
        data={flattenedData}
        title="Clients"
        options={{
          paging: true,
          pageSizeOptions: [5, 10, 20, 25, 50, 100],
          pageSize: 10,
          search: false,
          exportButton: true,
          headerStyle: {
            fontFamily: 'bold',
            textTransform: 'uppercase'
          },
        }}
      />
      </Box>
    </>
  );
};

export default InviteClient;
