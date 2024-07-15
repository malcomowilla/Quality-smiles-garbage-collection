import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationDeleteAlert ({openDeleteLocationAlert, handleCloseDeleteLocationAlert}) {
 

  return (
    <div>
      <Snackbar open={openDeleteLocationAlert} autoHideDuration={6000} onClose={handleCloseDeleteLocationAlert}>
        <Alert
          onClose={handleCloseDeleteLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
            location succesfully deleted
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LocationDeleteAlert