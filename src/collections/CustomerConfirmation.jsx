






import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';

// styles.js




const  CustomerConfirmation = () => {
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Customer Code/Phone Number", 
        field: "Customer Code/Phone Number" ,

         },
        { title: "Role", field: "Role", align: 'left' },
        
        
        {
            title: "Status",
            field: "Status",
          },
        {
            title: "Date",
            field: "Date",
          },
      ]}
      data={[
        {
          name: "Mehmet",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63,
          
        },
      ]}
      title="Customer Confirmation"
      

    //   options={{
    //     rowStyle: {
    //         background: 'transparent',
            
    //     },
       

    //     headerStyle:{
    //         backgroundColor: 'black',
    //     },
    //     cellStyle: {
    //         backgroundColor: 'transparent',
    //         color: 'black'
    //     }
    //   }}
    />
  </div>
  </ThemeProvider >

  )
}

export default CustomerConfirmation










































