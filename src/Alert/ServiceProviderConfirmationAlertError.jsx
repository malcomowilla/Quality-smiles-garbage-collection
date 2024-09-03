import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function ServiceProviderConfirmationAlertError ({openProviderConfirmationError , handleCloseProviderConfirmationError}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openProviderConfirmationError}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseProviderConfirmationError}>
        <Alert
          onClose={handleCloseProviderConfirmationError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >

          confirmation not sent, please try again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ServiceProviderConfirmationAlertError


