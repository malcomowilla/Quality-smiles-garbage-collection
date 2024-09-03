import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SinupInvalidOtpAlert({openOtpInvalid, handleCloseOtpInvalid}) {
  

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state
  return (
    <div>
      <Snackbar  open={openOtpInvalid}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseOtpInvalid}>
        <Alert
          onClose={handleCloseOtpInvalid}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Invalid One Time Password Please Try Again
        </Alert>
      </Snackbar>
    </div>
  );
}






