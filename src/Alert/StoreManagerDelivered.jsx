
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerDelivered({openStoreManagerSucess,
    handleCloseStoreManagerSucess}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openStoreManagerSucess}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseStoreManagerSucess}>
        <Alert
          onClose={handleCloseStoreManagerSucess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Bag delivery confirmed successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerDelivered








































































































