


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function StoreManagerOtp({openOtp, handleCloseOtp}) {
 

  return (
    <div>
      <Snackbar open={openOtp} autoHideDuration={6000} onClose={handleCloseOtp}>
        <Alert
          onClose={handleCloseOtp}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Password Sent Check Sms
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerOtp
