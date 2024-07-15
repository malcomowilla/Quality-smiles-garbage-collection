
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function AppOfflineAlert ({showOnlineMessage, handleCloseOfflineMessage}) {
 
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });

      const {vertical, horizontal} = state
  return (
    <div>
      <Snackbar     anchorOrigin={{ vertical, horizontal }} open={showOnlineMessage}
       autoHideDuration={9000} onClose={handleCloseOfflineMessage}>
        
        <Alert
          onClose={handleCloseOfflineMessage}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          were back like we never left!!!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AppOfflineAlert





































