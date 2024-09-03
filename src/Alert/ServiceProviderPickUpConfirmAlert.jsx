import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function ServiceProviderPickUpConfirmAlert ({openProviderConfirmationPickup, handleCloseProviderConfirmationPickup}) {
 



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openProviderConfirmationPickup} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseProviderConfirmationPickup}>
        <Alert
          onClose={handleCloseProviderConfirmationPickup}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >

          pickup confirmed
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ServiceProviderPickUpConfirmAlert


