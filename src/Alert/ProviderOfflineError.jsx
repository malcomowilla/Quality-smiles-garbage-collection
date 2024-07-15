
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function ProviderOfflineError ({openProviderOfflineAlert, handleCloseroviderOfflineAlert}) {
 

  return (
    <div>
      <Snackbar open={openProviderOfflineAlert} autoHideDuration={6000} onClose={handleCloseroviderOfflineAlert}>
        <Alert
          onClose={handleCloseroviderOfflineAlert}
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

export default ProviderOfflineError