import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationUpdateAlert ({openUpdateLocationAlert, handleCloseUpdateLocationAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openUpdateLocationAlert}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseUpdateLocationAlert}>
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