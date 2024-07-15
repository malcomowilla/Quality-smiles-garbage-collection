import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function ProviderAdditionAlert ({openAdditionProvider, handleCloseAdditionProvider}) {
 

  return (
    <div>
      <Snackbar open={openAdditionProvider} autoHideDuration={6000} onClose={handleCloseAdditionProvider}>
        <Alert
          onClose={handleCloseAdditionProvider}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Provider Saved Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProviderAdditionAlert