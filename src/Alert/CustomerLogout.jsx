
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function CustomerLogout({openLogoutCustomerSucessfully ,handleCloseLogoutCustomerSuccessfully}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state



  return (
    <div>
      <Snackbar open={openLogoutCustomerSucessfully}     anchorOrigin={{ vertical, horizontal }}   
        autoHideDuration={6000} onClose={handleCloseLogoutCustomerSuccessfully}>
        <Alert
          onClose={handleCloseLogoutCustomerSuccessfully}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Logged Out Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerLogout
