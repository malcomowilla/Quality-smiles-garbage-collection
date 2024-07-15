import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SubLocationDeleteAlert({openDeleteSubLocationAlert, handleCloseDeleteSubLocationAlert}) {
 

  return (
    <div>
      <Snackbar open={openDeleteSubLocationAlert} autoHideDuration={6000} onClose={handleCloseDeleteSubLocationAlert}>
        <Alert
          onClose={handleCloseDeleteSubLocationAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Sub location deleted succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubLocationDeleteAlert


































