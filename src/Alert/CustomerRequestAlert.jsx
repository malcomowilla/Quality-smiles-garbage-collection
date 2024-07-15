







import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerRequestAlert ({openRequest ,handleCloseRequest}) {
 

  return (
    <div>
      <Snackbar open={openRequest} autoHideDuration={6000} onClose={handleCloseRequest}>
        <Alert
          onClose={handleCloseRequest}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Request sent, Please Wait For service Provider
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerRequestAlert












