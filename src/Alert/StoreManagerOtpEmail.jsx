



import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function StoreManagerOtpEmail({openOtpEmailSent, handleCloseOtpEmailSent}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOtpEmailSent}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} 
      onClose={handleCloseOtpEmailSent}>
        <Alert
          onClose={handleCloseOtpEmailSent}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Otp Sent Check Your Email
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerOtpEmail






