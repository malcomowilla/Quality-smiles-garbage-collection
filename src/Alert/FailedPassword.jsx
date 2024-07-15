




import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function FailedPassword ({openFailedPasswordAlert, handleCloseFailedPasswordAlert,passwordError,seepasswordError}) {
 

  return (
    <div>
      <Snackbar open={openFailedPasswordAlert} autoHideDuration={9600} onClose={handleCloseFailedPasswordAlert}>
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