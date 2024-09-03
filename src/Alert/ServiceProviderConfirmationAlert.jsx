import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function ServiceProviderConfirmationAlert ({openProviderDelivered , handleCloseopenProviderDelivered}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openProviderDelivered}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseopenProviderDelivered}>
        <Alert
          onClose={handleCloseopenProviderDelivered}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >

          confirmation sent
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ServiceProviderConfirmationAlert


