
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function  ProviderInvalidCodeAlert ({openProviderInvalidCode, handleCloseProviderInvalidCode}) {
 

  return (
    <div>
      <Snackbar open={openProviderInvalidCode} autoHideDuration={6000} onClose={handleCloseProviderInvalidCode}>
        <Alert
          onClose={handleCloseProviderInvalidCode}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Invalid Service Provider Code
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderInvalidCodeAlert