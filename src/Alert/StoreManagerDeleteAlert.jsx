
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerDeleteAlert({openDeleteStore, handleCloseDeleteStore}) {
 

  return (
    <div>
      <Snackbar open={openDeleteStore} autoHideDuration={6000} onClose={handleCloseDeleteStore}>
        <Alert
          onClose={handleCloseDeleteStore}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Manager Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerDeleteAlert












































































