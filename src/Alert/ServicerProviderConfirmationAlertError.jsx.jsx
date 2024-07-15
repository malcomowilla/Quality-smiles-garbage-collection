import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




 function ServicerProviderConfirmationAlertError   ({openConfirmationAlertError, handleCloseConfirmationAlertError}) {
 

  return (
    <div>
      <Snackbar open={openConfirmationAlertError} autoHideDuration={6000} onClose={handleCloseConfirmationAlertError}>
        <Alert
          onClose={handleCloseConfirmationAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}

        >
pickup confirmation not sent, try again

        </Alert>
      </Snackbar>
    </div>
  );
}

export default ServicerProviderConfirmationAlertError 
