import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerOtpSentAlert ({openOtp ,handleCloseOtp}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOtp}   anchorOrigin={{ vertical, horizontal }}  autoHideDuration={6000} onClose={handleCloseOtp}>
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