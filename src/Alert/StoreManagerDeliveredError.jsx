



import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function StoreManagerDeliveredError({openStoreManagerDeliverError, handleCloseStoreManagerDeliverError}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openStoreManagerDeliverError}    anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseStoreManagerDeliverError}>
        <Alert
          onClose={handleCloseStoreManagerDeliverError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Something Went Wrong Please Try Again 
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerDeliveredError






