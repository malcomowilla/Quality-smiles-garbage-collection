


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function  EmailTemplateErrorAlert ({openEmailTemplateErrorAlert, handleCloseEmailTemplateErrorAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailTemplateErrorAlert} anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={9000} onClose={handleCloseEmailTemplateErrorAlert}>
        <Alert
          onClose={handleCloseEmailTemplateErrorAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
            Something Went Wrong Please Try Again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailTemplateErrorAlert



































