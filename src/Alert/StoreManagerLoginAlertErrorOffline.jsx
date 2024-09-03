
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function  StoreManagerLoginAlertErrorOffline ({openProviderLoginAlert, handleCloseProviderLoginAlert}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openProviderLoginAlert}    anchorOrigin={{ vertical, horizontal }}   autoHideDuration={6000} onClose={handleCloseProviderLoginAlert}>
        <Alert
          onClose={handleCloseProviderLoginAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Something Went Wrong Please Try Again Later!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StoreManagerLoginAlertErrorOffline