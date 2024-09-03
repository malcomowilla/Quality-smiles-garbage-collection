
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function UpdateAdminAlert({openUpdateAdminAlert, handleCloseUpdateAdminAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateAdminAlert} anchorOrigin={{ vertical, horizontal }}   
          autoHideDuration={6000} onClose={handleCloseUpdateAdminAlert}>
        <Alert
          onClose={handleCloseUpdateAdminAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Profile Successfuly Updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateAdminAlert






