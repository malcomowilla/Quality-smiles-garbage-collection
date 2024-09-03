

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function UserUpdateAlert({openUserUpdatedAlert, handleCloseUpdatedAddAlert}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUserUpdatedAlert}  anchorOrigin={{ vertical, horizontal }} vertical= {vertical} horizontal = {horizontal} autoHideDuration={6000} onClose={handleCloseUpdatedAddAlert}>
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






















































































