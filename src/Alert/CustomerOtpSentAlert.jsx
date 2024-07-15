import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerOtpSentAlert ({openOtp ,handleCloseOtp}) {
 

  return (
    <div>
      <Snackbar open={openOtp} autoHideDuration={6000} onClose={handleCloseOtp}>
        <Alert
          onClose={handleCloseOtp}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        OTP sent to your sms
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerOtpSentAlert