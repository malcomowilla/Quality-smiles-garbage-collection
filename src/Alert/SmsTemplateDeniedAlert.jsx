import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function SmsTemplateDeniedAlert({openTemplateError, handleCloseTemplateError}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state



  return (
    <div>
      <Snackbar open={openTemplateError}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseTemplateError}>
        <Alert
          onClose={handleCloseTemplateError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Read Only Your Not Allowed To Change This
        </Alert>
      </Snackbar>
    </div>
  );
}


export default SmsTemplateDeniedAlert
