

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function UserAddAlert({openUserAddAlert, handleCloseUserAddAlert}) {
 

  return (
    <div>
      <Snackbar open={openUserAddAlert} autoHideDuration={6000} onClose={handleCloseUserAddAlert}>
        <Alert
          onClose={handleCloseUserAddAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User Added SucessFully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserAddAlert






















































































