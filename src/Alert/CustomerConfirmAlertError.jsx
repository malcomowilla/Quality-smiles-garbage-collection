import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerConfirmAlertError ({openConfirmAlertError, handleCloseConfirmAlertError}) {
 



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div className='playwrite-de-grund'>
      <Snackbar open={openConfirmAlertError}   anchorOrigin={{ vertical, horizontal }}     autoHideDuration={6000} onClose={handleCloseConfirmAlertError}>
        <Alert
          onClose={handleCloseConfirmAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
            Confirmation Not Sent Something Went Wrong
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerConfirmAlertError