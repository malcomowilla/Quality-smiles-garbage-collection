
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function EmailSentAlertError ({openEmailSentError, handleCloseEmailSentError,emailError,seeEmailError }) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailSentError}  anchorOrigin={{ vertical, horizontal }}  autoHideDuration={9000} onClose={handleCloseEmailSentError}>
        <Alert
          onClose={handleCloseEmailSentError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {seeEmailError && emailError}


        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailSentAlertError
















