import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SubLocationAddAlert({openAddSubLocationAlert, handleCloseAddSubLocationAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openAddSubLocationAlert}    anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseAddSubLocationAlert}>
        <Alert
          onClose={handleCloseAddSubLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Sub location added succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubLocationAddAlert


































