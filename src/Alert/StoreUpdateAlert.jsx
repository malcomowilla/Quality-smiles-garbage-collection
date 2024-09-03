import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreUpdateAlert({openUpdateStore, handleCloseUpdateStore}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });



  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateStore}    anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseUpdateStore}>
        <Alert
          onClose={handleCloseUpdateStore}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Updated Successfuly
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreUpdateAlert
