import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function LocationAddedAlert ({openAddLocationAlert, handleCloseLocationAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openAddLocationAlert}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={ handleCloseLocationAlert}>
        <Alert
          onClose={ handleCloseLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
            location succesfully added
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LocationAddedAlert