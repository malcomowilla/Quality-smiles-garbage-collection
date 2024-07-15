
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function EmailSentForgotPasswordAlert ({openEmailSent, handleCloseEmailSent}) {
 

  return (
    <div>
      <Snackbar open={openEmailSent} autoHideDuration={9000} onClose={handleCloseEmailSent}>
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
















