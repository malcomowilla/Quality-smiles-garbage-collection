




import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function FailedPassword ({openFailedPasswordAlert, handleCloseFailedPasswordAlert,passwordError,seepasswordError}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openFailedPasswordAlert}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={9600} onClose={handleCloseFailedPasswordAlert}>
        <Alert
          onClose={handleCloseFailedPasswordAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
            {seepasswordError && passwordError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FailedPassword