import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerConfirmationAlert ({openConfirmationAlert, handleCloseConfirmationAlert}) {
 

  return (
    <div>
      <Snackbar open={openConfirmationAlert} autoHideDuration={6000} onClose={handleCloseConfirmationAlert}>
        <Alert
          onClose={handleCloseConfirmationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Confirmed Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerConfirmationAlert