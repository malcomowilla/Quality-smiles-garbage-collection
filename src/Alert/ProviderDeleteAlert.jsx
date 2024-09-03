import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function ProviderDeleteAlert ({openDeleteProviderAlert, handleCloseDeleteProviderAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openDeleteProviderAlert}    anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseDeleteProviderAlert}>
        <Alert
          onClose={handleCloseDeleteProviderAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Service Provider Deleted Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderDeleteAlert