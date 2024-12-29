import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Box, Button, Container, Typography, Paper } from '@mui/material';

const ToastExample = () => {
  // Success notification
  const showSuccess = () => {
    toast.success('Successfully completed!', {
      duration: 3000,
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Error notification
  const showError = () => {
    toast.error('An error occurred!', {
      duration: 3000,
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Loading notification
  const showLoading = () => {
    toast.loading('Loading...', {
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Custom notification
  const showCustom = () => {
    toast.custom((t) => (
      <Paper
        elevation={2}
        sx={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="body1">🎉 Custom Notification</Typography>
        <Button 
          size="small" 
          variant="text" 
          sx={{ color: '#fff' }}
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </Button>
      </Paper>
    ), {
      position: 'bottom-center',
      duration: 4000,
    });
  };

  // Promise notification
  const showPromise = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Success!'), 2000);
    });

    toast.promise(
      promise,
      {
        loading: 'Loading...',
        success: 'Successfully completed!',
        error: 'Error occurred',
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        position: 'bottom-center',
      }
    );
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Native-like Notifications
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={showSuccess}
          sx={{ borderRadius: 28 }}
        >
          Show Success Toast
        </Button>
        
        <Button 
          variant="contained" 
          onClick={showError}
          color="error"
          sx={{ borderRadius: 28 }}
        >
          Show Error Toast
        </Button>
        
        <Button 
          variant="contained" 
          onClick={showLoading}
          color="secondary"
          sx={{ borderRadius: 28 }}
        >
          Show Loading Toast
        </Button>
        
        <Button 
          variant="contained" 
          onClick={showCustom}
          color="info"
          sx={{ borderRadius: 28 }}
        >
          Show Custom Toast
        </Button>
        
        <Button 
          variant="contained" 
          onClick={showPromise}
          color="success"
          sx={{ borderRadius: 28 }}
        >
          Show Promise Toast
        </Button>
      </Box>

      {/* Toast Container */}
      <Toaster 
        containerStyle={{
          bottom: 40,
        }}
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
    </Container>
  );
};

export default ToastExample;
