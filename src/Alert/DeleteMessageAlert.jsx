import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function DeleteMessageAlert ({openDeleteMessage, handleCloseDeleteMessage}) {
 
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openDeleteMessage}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseDeleteMessage}>
        <Alert
          onClose={handleCloseDeleteMessage}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Message Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DeleteMessageAlert
























