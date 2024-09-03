import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SettingsAlert ({open, handleClose}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}   anchorOrigin={{ vertical, horizontal }}   onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Settings Applied Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SettingsAlert