
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function StoreManagerReceivedAlert({openStoreManagerReceived, handleCloseStoreManagerReceived}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openStoreManagerReceived}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseStoreManagerReceived}>
        <Alert
          onClose={handleCloseStoreManagerReceived}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Confirmation Received Successfuly
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerReceivedAlert











