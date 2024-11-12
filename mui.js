import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
      },

      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              backgroundColor: 'black',  // Background color for the entire DataGrid
              color: 'white',  // Text color for the entire DataGrid
            },
            columnHeaders: {
              backgroundColor: '#444',  // Background color for the header
              color: 'white',  // Text color for the header
            },
            cell: {
              backgroundColor: 'black',  // Background color for the cells
              color: 'white',  // Text color for the cells
            },
            footerContainer: {
              backgroundColor: '#333',  // Background color for the footer
              color: 'white',  // Text color for the footer
            },
          },
        },
      },
   
  });




  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiDataGrid: {
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
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
   
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

 function Location() {
  return (
    <ThemeProvider theme={darkTheme}>

    <div style={{ height: 700, width: '100%' }}>

      <DataGrid
     
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20,]}
        checkboxSelection
      />
    </div>
    </ThemeProvider>

  );
}

export default Location