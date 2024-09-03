import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SubLocationAlertError({openAlertError, handleCloseAlertError}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });



  const {vertical, horizontal} = state
  return (
    <div>
      <Snackbar open={openAlertError}   anchorOrigin={{ vertical, horizontal }}     autoHideDuration={6000} onClose={handleCloseAlertError}>
        <Alert
          onClose={handleCloseAlertError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Something went wrong please try again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubLocationAlertError


































