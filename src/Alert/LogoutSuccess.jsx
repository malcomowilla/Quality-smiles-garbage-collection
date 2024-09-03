
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 function LogoutSuccess ({openLogoutSuccess, handleCloseLogoutSuccess}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openLogoutSuccess}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000}
       onClose={handleCloseLogoutSuccess}>
        <Alert
          onClose={handleCloseLogoutSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    Logged Out Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LogoutSuccess


































































