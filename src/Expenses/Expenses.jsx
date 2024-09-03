import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AccessDenied from '../access_denied/AccessDenied'




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







const Collections = () => {
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Category", field: "Category" , color: 'whit'},
        { title: "Reference", field: "Reference" },
        { title: "Date", field: "Date",  align: 'left' },
        {
          title: "Amount",
          field: "Amount",
        },


     
        {
            title: "Description",
            field: "Description",
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
      title="Expenses"
      

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

export default Collections




