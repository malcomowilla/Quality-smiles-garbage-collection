

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function UserDeleteAlert({openUserDeleteAlert, handleCloseDeleteAddAlert}) {
 

  return (
    <div>
      <Snackbar open={openUserDeleteAlert} autoHideDuration={6000} onClose={handleCloseDeleteAddAlert}>
        <Alert
          onClose={handleCloseDeleteAddAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserDeleteAlert




















































































































