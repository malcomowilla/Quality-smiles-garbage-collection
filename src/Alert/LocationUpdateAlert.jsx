import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationUpdateAlert ({openUpdateLocationAlert, handleCloseUpdateLocationAlert}) {
 

  return (
    <div>
      <Snackbar open={openUpdateLocationAlert} autoHideDuration={6000} onClose={handleCloseUpdateLocationAlert}>
        <Alert
          onClose={handleCloseUpdateLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
            location succesfully updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LocationUpdateAlert