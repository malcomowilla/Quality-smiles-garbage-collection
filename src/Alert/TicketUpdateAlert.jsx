
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function TicketUpdateAlert({openUpdateTicketAlert, handleCloseUpdateTicketAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openUpdateTicketAlert} anchorOrigin={{ vertical, horizontal }}       autoHideDuration={6000} onClose={handleCloseUpdateTicketAlert}>
        <Alert
          onClose={handleCloseUpdateTicketAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Ticket Successfuly Updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TicketUpdateAlert












































































