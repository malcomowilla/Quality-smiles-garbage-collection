



import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerAddAlert({openAddStore, handleCloseAddStore}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openAddStore}     anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseAddStore}>
        <Alert
          onClose={handleCloseAddStore}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Manager Added Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerAddAlert
























































