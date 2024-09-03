
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function EmailSentForgotPasswordAlert ({openEmailSent, handleCloseEmailSent}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailSent} anchorOrigin={{ vertical, horizontal }}  autoHideDuration={9000} onClose={handleCloseEmailSent}>
        <Alert
          onClose={handleCloseEmailSent}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Password Reset Instructions Have Been Sent To Your Email
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailSentForgotPasswordAlert
















