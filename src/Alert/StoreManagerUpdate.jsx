



import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function StoreManagerUpdate({openStoreManagerUpdate, handleCloseStoreManagerUpdate}) {
 

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });


      const {vertical, horizontal} = state


  return (
    <div>
      <Snackbar open={openStoreManagerUpdate}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseStoreManagerUpdate}>
        <Alert
          onClose={handleCloseStoreManagerUpdate}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Store Manager Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerUpdate




