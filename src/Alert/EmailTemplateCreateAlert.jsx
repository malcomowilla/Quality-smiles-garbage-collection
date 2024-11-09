

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function  EmailTemplateCreateAlert ({openEmailTemplateCreateAlert, handleCloseEmailTemplateCreateAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailTemplateCreateAlert} anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={9000} onClose={handleCloseEmailTemplateCreateAlert}>
        <Alert
          onClose={handleCloseEmailTemplateCreateAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
            Successfully Created Email Template
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailTemplateCreateAlert
































