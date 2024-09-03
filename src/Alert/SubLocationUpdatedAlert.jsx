
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SubLocationUpdatedAlert({openUpdatedSubLocationAlert, handleCloseUpdatedSubLocationAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state
  return (
    <div>
      <Snackbar open={openUpdatedSubLocationAlert}    anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseUpdatedSubLocationAlert}>
        <Alert
          onClose={handleCloseUpdatedSubLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Sub location updated succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubLocationUpdatedAlert




















































