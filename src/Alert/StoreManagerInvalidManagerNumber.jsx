
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function StoreManagerInvalidManagerNumber({openProviderInvalidCode,
    handleCloseProviderInvalidCode}) {
 


      const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openProviderInvalidCode} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseProviderInvalidCode}>
        <Alert
          onClose={handleCloseProviderInvalidCode}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Invalid Manager Number
        </Alert>
      </Snackbar>
    </div>
  );
}


export default StoreManagerInvalidManagerNumber












































































