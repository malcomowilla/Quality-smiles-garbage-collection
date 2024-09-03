import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerOtpSentEmailAlert ({openOtpEmail ,handleCloseOtpEmail}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOtpEmail}   anchorOrigin={{ vertical, horizontal }}  autoHideDuration={6000} 
      onClose={handleCloseOtpEmail}>
        <Alert
          onClose={handleCloseOtpEmail}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        OTP sent to your email
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerOtpSentEmailAlert