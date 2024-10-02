

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





 function StoreManagerLogin({openStoreManagerLogin, handleCloseStoreManagerLogin}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openStoreManagerLogin} anchorOrigin={{ vertical, horizontal }}
       autoHideDuration={6000} onClose={handleCloseStoreManagerLogin}>
        <Alert
          onClose={handleCloseStoreManagerLogin}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          logged in successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerLogin





























































































