


import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import {useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import CustomerRegistrationForm from '../customer_registration/CustomerRegitrationForm'
import GetAppIcon from '@mui/icons-material/GetApp';
// styles.js






const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);


  const EditButton = ({rowData}) => (
  <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  className='w-8 h-8  ' alt="edit" />
      );



      const DeleteButton = ({id}) => (
        <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"    className='w-8 h-8 ' alt="delete" />
      )
    const {
      
        materialuitheme  } = useApplicationSettings()
  return (
    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }} className='cursor-pointer'>
    <CustomerRegistrationForm isOpen={isOpen} setIsOpen={setIsOpen}/>
    <MaterialTable
   
      columns={[
        { title: "Location", field: "Location" },
        { title: "Customer Name", field: "Customer Name" },
     
        {
            title: "Phone Number",
            field: "Phone Number",
          },
          {
            title: "Amount Paid",
            field: "Amount Paid",
          },
          
          {
            title: "Total",
            field: "Total",
          },

          {
            title: "Remaining Amount",
            field: "Remaining Amount",
          },
      
        {
            title: "Date",
            field: "Date",
          },

        {
          title: "Customer Code",
          field: "Customer Code",
        },

          {
        
            title: "Action",
            field: "Action",
            render: (rowData) => 

              <>
              <Box sx={{
                display: 'flex',
                gap: 2
              }}>
                              <EditButton />

              <DeleteButton   id={rowData.id}/>
              </Box>
            

              
              </>
            
            
          }
      ]}



      actions={[
        {
          icon: () => <div  onClick={()=>setIsOpen(true)}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Customer',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}

      data={[
        {
          Location: "Mehmet",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63,
          
        },
      ]}
      title="Customers"
      

      options={{
        paging: true,
       pageSizeOptions:[5, 10, 20, 25, 50, 100],
       pageSize: 10,
       search: false,
  

showSelectAllCheckbox: false,
showTextRowsSelected: false,
hover: true, 
selection: true,
paginationType: 'stepped',


paginationPosition: 'bottom',
exportButton: true,
exportAllData: true,
exportFileName: 'PPPOE packages',

headerStyle:{
fontFamily: 'bold',
textTransform: 'uppercase'
} ,


fontFamily: 'mono'

}}     
    />
  </div>
  </ThemeProvider >

  )
}

export default Customers




