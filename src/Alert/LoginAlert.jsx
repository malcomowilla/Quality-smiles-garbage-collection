import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LoginAlert ({openAdditionProvider, handleCloseAdditionProvider}) {
 

  return (
    <div>
      <Snackbar open={openAdditionProvider} autoHideDuration={6000} onClose={handleCloseAdditionProvider}>
        <Alert
          onClose={handleCloseAdditionProvider}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    Login Failed Please Try Again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginAlert