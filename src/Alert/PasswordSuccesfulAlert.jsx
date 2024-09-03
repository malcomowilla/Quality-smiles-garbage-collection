import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function PasswordSuccesfulAlert ({openPasswordSuccess, handleClosePasswordSuccess, 
    seepasswordSuccesful, passwordSuccesful}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openPasswordSuccess} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleClosePasswordSuccess}>
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






























