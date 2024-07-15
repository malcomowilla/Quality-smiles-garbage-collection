import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SettingsOffLineAlert ({openOfflineError, handleCloseOfflineError}) {
 

  return (
    <div>
      <Snackbar open={openOfflineError} autoHideDuration={6000} onClose={handleCloseOfflineError}>
        <Alert
          onClose={handleCloseOfflineError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Something went wrong please try again later
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SettingsOffLineAlert