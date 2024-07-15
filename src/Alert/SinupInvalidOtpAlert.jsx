import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SinupInvalidOtpAlert({openOtpInvalid, handleCloseOtpInvalid}) {
  

  return (
    <div>
      <Snackbar  open={openOtpInvalid} autoHideDuration={6000} onClose={handleCloseOtpInvalid}>
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






