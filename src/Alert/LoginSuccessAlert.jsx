
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LoginSuccessAlert ({openLoginSuccess, handleCloseLoginSuccess}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openLoginSuccess}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000}
       onClose={handleCloseLoginSuccess}>
        <Alert
          onClose={handleCloseLoginSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    Login Succesfull
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginSuccessAlert









































