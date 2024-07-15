import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerUpdateAlert({openUpdateStoreManager, handleCloseUpdateStoreManager}) {
 

  return (
    <div>
      <Snackbar open={openUpdateStoreManager} autoHideDuration={6000} onClose={handleCloseUpdateStoreManager}>
        <Alert
          onClose={handleCloseUpdateStoreManager}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Manager Updated Successfuly
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerUpdateAlert
