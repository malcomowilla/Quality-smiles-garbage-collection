import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreAlertError({openAlertError, handleCloseAlertError}) {
 

  return (
    <div>
      <Snackbar open={openAlertError} autoHideDuration={6000} onClose={handleCloseAlertError}>
        <Alert
          onClose={handleCloseAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Something Went Wrong Please Try Again
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreAlertError
