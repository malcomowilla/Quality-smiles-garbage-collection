import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function ProviderOtpSentEmailAlert ({openProviderOtpSentEmailAlert,handleCloseProviderOtpSentEmailAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openProviderOtpSentEmailAlert}  anchorOrigin={{ vertical, horizontal }}
       autoHideDuration={6000} onClose={handleCloseProviderOtpSentEmailAlert}>
        <Alert
          onClose={handleCloseProviderOtpSentEmailAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        An OTP was just sent please check your email
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderOtpSentEmailAlert

















