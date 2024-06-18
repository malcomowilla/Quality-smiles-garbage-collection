
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';

// styles.js



const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',  // Background color for the entire DataGrid
            color: 'black',  // Text color for the entire DataGrid
          },
          columnHeaders: {
            backgroundColor: 'lightgray',  // Background color for the header
            color: 'black',  // Text color for the header
          },
          cell: {
            backgroundColor: 'white',  // Background color for the cells
            color: 'black',  // Text color for the cells
          },
          footerContainer: {
            backgroundColor: 'white',  // Background color for the footer
            color: 'black',  // Text color for the footer
          },
        },
      },
    },
  });




const darkTheme = createTheme({
    palette: {
        mode: 'dark',
      },
      components: {
        MuiTable: {
          styleOverrides: {
            root: {
              backgroundColor:'black',  // Background color for the entire DataGrid
              color: 'white',  // Text color for the entire DataGrid
            },
            columnHeaders: {
              backgroundColor: 'black',  // Background color for the header
              color: 'white',  // Text color for the header
            },
            cell: {
              backgroundColor: 'black',  // Background color for the cells
              color: 'white',  // Text color for the cells
            },
            footerContainer: {
              backgroundColor: 'white',  // Background color for the footer
              color: 'white',  // Text color for the footer
            },
          },
        },
      },
   
  });







const Payment = () => {
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Sublocation", field: "Sublocation" },
        { title: "Payment Code", field: "Payment Code", type: "numeric", align: 'left' },
        { title: "Status", field: "Status", type: "numeric", align: 'left' },

        {
          title: "Payment",
          field: "Payment",
        },
        {
            title: "Paid",
            field: "Paid",
          },
          {
            title: "Total",
            field: "Total",
          },

          {
            title: "Remaining Amount",
            field: "Remaining Amount",
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
      title="Payments"
      

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

export default Payment




