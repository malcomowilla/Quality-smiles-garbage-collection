

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 function LogoutSession ({openLogoutSession, handleCloseLogoutSession}) {


    
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openLogoutSession}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={8000}
       onClose={handleCloseLogoutSession}>
        <Alert
          onClose={handleCloseLogoutSession}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
    Session Expired Please Login Again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LogoutSession






































































