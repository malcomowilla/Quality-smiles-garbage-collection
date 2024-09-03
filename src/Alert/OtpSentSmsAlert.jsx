
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 function OtpSentSmsAlert ({openOtpSentAlert, handleCloseOtpSentAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOtpSentAlert}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000}
       onClose={handleCloseOtpSentAlert}>
        <Alert
          onClose={handleCloseOtpSentAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    OTP sent,check sms
        </Alert>
      </Snackbar>
    </div>
  );
}

export default OtpSentSmsAlert



































































