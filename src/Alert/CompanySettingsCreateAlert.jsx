
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function CompanySettingsCreateAlert ({openCreateAlert, handleCloseCreateAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openCreateAlert}    anchorOrigin={{ vertical, horizontal }}  autoHideDuration={6000} 
      onClose={handleCloseCreateAlert}>
        <Alert
          onClose={handleCloseCreateAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Company Settings Updated Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CompanySettingsCreateAlert























































