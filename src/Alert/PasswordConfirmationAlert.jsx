import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function PasswordConfirmationAlert ({openConfirmationAlert, handleCloseConfirmationAlert,
    passwordConfirmationError,seepasswordConfirmationError,expiredPassword,seexpiredPassword,passwordError,seepasswordError
 }) {
 

  return (
    <div>
      <Snackbar open={openConfirmationAlert} autoHideDuration={6000} onClose={handleCloseConfirmationAlert}>
        <Alert
          onClose={handleCloseConfirmationAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    {seepasswordConfirmationError && passwordConfirmationError}
    

        </Alert>
      </Snackbar>
    </div>
  );
}

export default PasswordConfirmationAlert