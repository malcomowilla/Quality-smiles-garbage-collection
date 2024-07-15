import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function ServiceProviderPickUpConfirmAlert ({openProviderConfirmationPickup, handleCloseProviderConfirmationPickup}) {
 

  return (
    <div>
      <Snackbar open={openProviderConfirmationPickup} autoHideDuration={6000} onClose={handleCloseProviderConfirmationPickup}>
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


