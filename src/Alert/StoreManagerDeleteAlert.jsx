
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerDeleteAlert({openDeleteStore, handleCloseDeleteStore}) {
 



  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openDeleteStore}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseDeleteStore}>
        <Alert
          onClose={handleCloseDeleteStore}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Store Manager Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerDeleteAlert












































































