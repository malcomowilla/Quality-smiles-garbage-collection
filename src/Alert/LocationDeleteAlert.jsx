import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationDeleteAlert ({openDeleteLocationAlert, handleCloseDeleteLocationAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openDeleteLocationAlert}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseDeleteLocationAlert}>
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