







import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 function CustomerRequestError ({openRequestError ,handleCloseRequestError}) {
 

  return (
    <div>
      <Snackbar open={openRequestError} autoHideDuration={6000} onClose={handleCloseRequestError}>
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












