import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function ProviderOtpSentAlert ({openOtp ,handleCloseOtp}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openOtp}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseOtp}>
        <Alert
          onClose={handleCloseOtp}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
                  An OTP was just sent to your phone number please check your phone

        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderOtpSentAlert