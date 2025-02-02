
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CalendarErrorAlert ({openErrorAlert, handleCloseErrorAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openErrorAlert}    anchorOrigin={{ vertical, horizontal }}  autoHideDuration={6000}
       onClose={openErrorAlert}>
        <Alert
          onClose={handleCloseErrorAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
Something Went Wrong Please Try Again   </Alert>
      </Snackbar>
    </div>
  );
}

export default CalendarErrorAlert











