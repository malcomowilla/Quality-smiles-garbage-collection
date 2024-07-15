import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerOfflineAlert ({openOfflineAlert ,handleCloseOfflineAlert}) {
 

  return (
    <div>
      <Snackbar open={openOfflineAlert} autoHideDuration={6000} onClose={handleCloseOfflineAlert}>
        <Alert
          onClose={handleCloseOfflineAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Something Went Wrong Please Try Again Later
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerOfflineAlert