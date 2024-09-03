

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function UpdateAdminAlertError({openUpdateAdminAlertError, handleCloseUpdateAdminAlertError}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateAdminAlertError} anchorOrigin={{ vertical, horizontal }}     
        autoHideDuration={6000} onClose={handleCloseUpdateAdminAlertError}>
        <Alert
          onClose={handleCloseUpdateAdminAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Something Went Wrong Please Try Again!

        </Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateAdminAlertError











































