



import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerErrorLogin({openStoreManagerError,
    handleCloseStoreManagerError}) {
 
      const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openStoreManagerError}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseStoreManagerError}>
        <Alert
          onClose={handleCloseStoreManagerError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You Are Forbidden To Perfom This Action  Please Login First
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerErrorLogin












































































