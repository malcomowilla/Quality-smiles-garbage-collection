import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function PasswordSuccesfulAlert ({openPasswordSuccess, handleClosePasswordSuccess, 
    seepasswordSuccesful, passwordSuccesful}) {
 

  return (
    <div>
      <Snackbar open={openPasswordSuccess} autoHideDuration={6000} onClose={handleClosePasswordSuccess}>
        <Alert
          onClose={handleClosePasswordSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          {seepasswordSuccesful &&  passwordSuccesful}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PasswordSuccesfulAlert






























