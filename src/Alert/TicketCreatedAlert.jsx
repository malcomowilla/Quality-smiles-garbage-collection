
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function TicketCreatedAlert({openCreateTicketAlert, handleCloseCreateTicketAlert}) {
 

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const {vertical, horizontal} = state
  return (
    <div>
      <Snackbar open={openCreateTicketAlert} anchorOrigin={{ vertical, horizontal }}           autoHideDuration={6000} onClose={handleCloseCreateTicketAlert}>
        <Alert
          onClose={handleCloseCreateTicketAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Ticket Successfully Created
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TicketCreatedAlert












































































