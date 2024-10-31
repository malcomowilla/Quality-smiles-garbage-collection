
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function SmsTemplateErrorAlert({openSmsTemplateError, handleCloseSmsTemplateError}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state



  return (
    <div>
      <Snackbar open={openSmsTemplateError}   anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} 
      onClose={handleCloseSmsTemplateError}>
        <Alert
          onClose={handleCloseSmsTemplateError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Something Went Wrong, Please Try Again
        </Alert>
      </Snackbar>
    </div>
  );
}


export default SmsTemplateErrorAlert





















