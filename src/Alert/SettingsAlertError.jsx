import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SettingsAlertError ({openError, handleCloseError}) {
 

  return (
    <div>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert
          onClose={handleCloseError}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your Not Allowed To Change This Settings Please Login 
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SettingsAlertError