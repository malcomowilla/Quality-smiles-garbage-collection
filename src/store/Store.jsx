
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';

// styles.js









const Store = () => {
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme }>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "  Location", field: "Location" },
        { title: "Sublocation Code", field: "Sublocation Code", type: "numeric", align: 'left' },
        { title: "Created by", field: "Created by", type: "numeric", align: 'left' },

        {
          title: "Category",
          field: "Category",
        },
        {
            title: "Amount Of Bags",
            field: "Amount Of Bags",
          },

          {
            title: "Status(full/empty)",
            field: "Status",
          },
          {
            title: "From Store",
            field: "From Store",
          }
      ]}
      data={[
        {
          name: "Mehmet",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63,
          
        },
      ]}
      title="Store"
      

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

export default Store




