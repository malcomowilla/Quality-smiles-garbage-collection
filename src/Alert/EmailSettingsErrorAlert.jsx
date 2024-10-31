import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function EmailSettingsErrorAlert ({openEmailSettingsErrorAlert, handleCloseEmailErrorAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailSettingsErrorAlert} anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={9000} onClose={handleCloseEmailErrorAlert}>
        <Alert
          onClose={handleCloseEmailErrorAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Email Settings Update Failed, Please try again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailSettingsErrorAlert




























