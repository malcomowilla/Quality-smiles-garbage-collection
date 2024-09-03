







import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerRequestAlert ({openRequest ,handleCloseRequest}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openRequest} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseRequest}>
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












