


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function PasskeyError ({openPasskeyError, handleClosePasskeyError, passkeyError}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openPasskeyError}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000}
       onClose={handleClosePasskeyError}>
        <Alert
          onClose={handleClosePasskeyError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    {passkeyError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PasskeyError






















































































