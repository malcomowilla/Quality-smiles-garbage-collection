import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerAdditionAlert ({openAddition, handleCloseAddition}) {
 

  return (
    <div>
      <Snackbar open={openAddition} autoHideDuration={6000} onClose={handleCloseAddition}>
        <Alert
          onClose={handleCloseAddition}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Customer Saved Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerAdditionAlert