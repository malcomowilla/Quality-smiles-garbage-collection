import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerLoginOfflineAlert({openOfflineAlert, handleCloseOfflineAlert
 }) {



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openOfflineAlert}     anchorOrigin={{ vertical, horizontal }}      autoHideDuration={6000} onClose={handleCloseOfflineAlert}>
        <Alert
          onClose={handleCloseOfflineAlert}
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




export default CustomerLoginOfflineAlert
