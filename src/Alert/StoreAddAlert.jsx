import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreAddAlert({openAddStore, handleCloseAddStore}) {
 

  return (
    <div>
      <Snackbar open={openAddStore} autoHideDuration={6000} onClose={handleCloseAddStore}>
        <Alert
          onClose={handleCloseAddStore}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Added Successfuly
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreAddAlert
