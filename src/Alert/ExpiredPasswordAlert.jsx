
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function ExpiredPasswordAlert ({openexpiredAlert, handleCloseexpiredAlertAlert, expiredPassword ,seexpiredPassword}) {
   

  return (
    <div>
      <Snackbar    open={openexpiredAlert}
       autoHideDuration={6000} onClose={handleCloseexpiredAlertAlert}>
        <Alert
        
          onClose={handleCloseexpiredAlertAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
            {seexpiredPassword &&  expiredPassword}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ExpiredPasswordAlert