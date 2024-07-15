import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationAlertError ({openLocationAlertError, handleCloseLocationAlertError}) {
 

  return (
    <div>
      <Snackbar open={openLocationAlertError} autoHideDuration={6000} onClose={handleCloseLocationAlertError}>
        <Alert
          onClose={handleCloseLocationAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
            something went wrong please try again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LocationAlertError