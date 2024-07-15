import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerDeleteAlert ({openDeleteAlert, handleCloseDeleteAlert}) {
 

  return (
    <div>
      <Snackbar open={openDeleteAlert} autoHideDuration={6000} onClose={handleCloseDeleteAlert}>
        <Alert
          onClose={handleCloseDeleteAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Customer Deleted Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerDeleteAlert