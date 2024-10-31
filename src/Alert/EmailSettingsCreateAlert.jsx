

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


 function EmailSettingsCreateAlert ({openEmailSettingsCreate, handleCloseEmailSettingsCreate}) {
 


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openEmailSettingsCreate} anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={9000} onClose={handleCloseEmailSettingsCreate}>
        <Alert
          onClose={handleCloseEmailSettingsCreate}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Email Settings Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailSettingsCreateAlert




























