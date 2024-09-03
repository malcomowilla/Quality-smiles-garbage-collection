
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function TicketDeleteAlert({openDeleteTicketAlert, handleCloseDeleteTicketAlert}) {
 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openDeleteTicketAlert}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseDeleteTicketAlert}>
        <Alert
          onClose={handleCloseDeleteTicketAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Ticket Successfully Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TicketDeleteAlert













































































