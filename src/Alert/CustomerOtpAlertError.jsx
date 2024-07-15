import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerOtpAlertError ({openOtpError ,handleCloseOtpError}) {
 

  return (
    <div>
      <Snackbar open={openOtpError} autoHideDuration={6000} onClose={handleCloseOtpError}>
        <Alert
          onClose={openOtpError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Invalid Otp
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerOtpAlertError