import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreDeleteAlert({openDeleteAlert, handleCloseDeleteAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state



  return (
    <div>
      <Snackbar open={openDeleteAlert}  anchorOrigin={{ vertical, horizontal }}   autoHideDuration={6000} onClose={handleCloseDeleteAlert}>
        <Alert
          onClose={handleCloseDeleteAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreDeleteAlert
