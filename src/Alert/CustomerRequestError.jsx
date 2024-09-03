
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useState} from 'react'



 function CustomerRequestError ({openRequestError ,handleCloseRequestError}) {
 

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const {vertical, horizontal} = state

  return (
    <div>
      <Snackbar open={openRequestError}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleCloseRequestError}>
        <Alert
          onClose={handleCloseRequestError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          
        Request Not sent,Something Went Wrong!!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerRequestError












