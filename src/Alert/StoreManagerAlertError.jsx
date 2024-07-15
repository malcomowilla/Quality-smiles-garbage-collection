
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerAlertError({openAlertErrorStoreManager, handleCloseErrorStoreManager}) {
 

  return (
    <div>
      <Snackbar open={openAlertErrorStoreManager} autoHideDuration={6000} onClose={handleCloseErrorStoreManager}>
        <Alert
          onClose={handleCloseErrorStoreManager}
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


export default StoreManagerAlertError
























































