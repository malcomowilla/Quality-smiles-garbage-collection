
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import {useEffect} from 'react'

// styles.js






const Location = () => {

    const {
      
        materialuitheme,setMaterialuiTheme } = useApplicationSettings()


        
  useEffect(() => {
   
  }, [materialuitheme]);
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Location", field: "Location" , color: 'whit'},
        { title: "Sublocation", field: "Sublocation" },
        { title: "Location Code", field: "Location Code", type: "numeric", align: 'left' },
        {
          title: "Category",
          field: "Category",
        },
        {
            title: "Amount Paid",
            field: "Amount Paid",
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
      title="Location"
      

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

export default Location




