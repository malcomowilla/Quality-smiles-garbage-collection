
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerInvalidOtpAlert({openProviderInvalidOtp, handleCloseProviderInvalidOtp}) {
 

  return (
    <div>
      <Snackbar open={openProviderInvalidOtp} autoHideDuration={6000} onClose={handleCloseProviderInvalidOtp}>
        <Alert
          onClose={handleCloseProviderInvalidOtp}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Inalid password otp
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerInvalidOtpAlert












































































