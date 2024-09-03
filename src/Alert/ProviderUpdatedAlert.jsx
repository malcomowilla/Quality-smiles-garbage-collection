import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 function ProviderUpdatedAlert
 ({openUpdatedProvider, handleCloseProviderUpdated,  updatedMessageProvider}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdatedProvider} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseProviderUpdated}>
        <Alert
          onClose={handleCloseProviderUpdated}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {updatedMessageProvider}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderUpdatedAlert
