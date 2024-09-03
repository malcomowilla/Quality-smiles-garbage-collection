

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 function CalendarEventUpdate ({openUpdateAlert, handleCloseUpdateAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateAlert}    anchorOrigin={{ vertical, horizontal }}  autoHideDuration={6000} 
      onClose={handleCloseUpdateAlert}>
        <Alert
          onClose={handleCloseUpdateAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
          Event  Updated Succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CalendarEventUpdate




















































