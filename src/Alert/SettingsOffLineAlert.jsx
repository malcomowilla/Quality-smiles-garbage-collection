import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SettingsOffLineAlert ({openOfflineError, handleCloseOfflineError}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOfflineError}   anchorOrigin={{ vertical, horizontal }}   autoHideDuration={6000} onClose={handleCloseOfflineError}>
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