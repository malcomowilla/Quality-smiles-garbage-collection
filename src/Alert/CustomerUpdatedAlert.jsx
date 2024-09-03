import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerUpdatedAlert ({openUpdated, handleCloseUpdated, updatedMessage}) {
 
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdated}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseUpdated}>
        <Alert
          onClose={handleCloseUpdated}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {updatedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerUpdatedAlert