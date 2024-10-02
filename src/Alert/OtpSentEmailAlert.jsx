
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function OtpSentEmailAlert ({openOtpSentEmailAlert, handleCloseOtpSentEmailAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOtpSentEmailAlert}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000}
       onClose={openOtpSentEmailAlert}>
        <Alert
          onClose={handleCloseOtpSentEmailAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    OTP sent,check email
        </Alert>
      </Snackbar>
    </div>
  );
}

export default OtpSentEmailAlert



































































