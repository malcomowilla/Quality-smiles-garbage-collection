
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function ServiceProviderLogout ({openServiceProviderLogoutSuccesful, handleCloseServiceProviderLogoutSuccesful}) {
 



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openServiceProviderLogoutSuccesful} anchorOrigin={{ vertical, horizontal }} 
      autoHideDuration={6000} onClose={handleCloseServiceProviderLogoutSuccesful}>
        <Alert
          onClose={handleCloseServiceProviderLogoutSuccesful}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >

          logged out successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ServiceProviderLogout











