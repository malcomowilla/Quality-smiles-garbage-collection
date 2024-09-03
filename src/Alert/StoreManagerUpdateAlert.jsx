import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerUpdateAlert({openUpdateStoreManager, handleCloseUpdateStoreManager}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateStoreManager}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseUpdateStoreManager}>
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
