








import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';

// styles.js


const ProviderConfirmation = () => {
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Service Provider Code/Phone Number", field: "Service Provider Code/Phone Number" 
          
        },
        { title: "Location Code", field: "Location Code" },
      


        {
          title: "Role",
          field: "Role",
        },

        {
            title: "Customer Received",
            field: "Customer Received",
          },



        {
            title: "Amount Of Bags",
            field: "Amount Of Bags",
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
      title="Provider Confirmation"
      

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

export default ProviderConfirmation











