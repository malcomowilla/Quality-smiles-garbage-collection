
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



 function EmailSettingsFetchErrorAlert ({openEmailSettingsFetchErrorAlert, handleCloseEmailFetchErrorAlert}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailSettingsFetchErrorAlert} anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={9000} onClose={handleCloseEmailFetchErrorAlert}>
        <Alert
          onClose={handleCloseEmailFetchErrorAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
            Something Went Wrong, Please try again
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailSettingsFetchErrorAlert





























