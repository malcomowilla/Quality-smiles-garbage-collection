

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function UserUpdateAlert({openUserUpdatedAlert, handleCloseUpdatedAddAlert}) {
 

  return (
    <div>
      <Snackbar open={openUserUpdatedAlert} autoHideDuration={6000} onClose={handleCloseUpdatedAddAlert}>
        <Alert
          onClose={handleCloseUpdatedAddAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserUpdateAlert






















































































