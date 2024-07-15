

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function TemplateAlert({openTemplateAlert, handleCloseTemplateAlert}) {
 

  return (
    <div>
      <Snackbar open={openTemplateAlert} autoHideDuration={6000} onClose={handleCloseTemplateAlert}>
        <Alert
          onClose={handleCloseTemplateAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Template Updated Sucessfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TemplateAlert




























































