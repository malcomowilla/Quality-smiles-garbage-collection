
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';







 function CustomerLogin({openLoginCustomerSuccessfully ,handleCloseLoginCustomerSuccessfully}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state



  return (
    <div>
      <Snackbar open={openLoginCustomerSuccessfully}     anchorOrigin={{ vertical, horizontal }}   
        autoHideDuration={6000} onClose={handleCloseLoginCustomerSuccessfully}>
        <Alert
          onClose={handleCloseLoginCustomerSuccessfully}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Logged In Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerLogin
