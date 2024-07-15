import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerUpdatedAlert ({openUpdated, handleCloseUpdated, updatedMessage}) {
 

  return (
    <div>
      <Snackbar open={openUpdated} autoHideDuration={6000} onClose={handleCloseUpdated}>
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