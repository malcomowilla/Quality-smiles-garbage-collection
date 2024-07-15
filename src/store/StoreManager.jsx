
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import StoreForm from './StoreForm'
import {useState, useEffect, useCallback} from 'react'
import StoreAddAlert from '../Alert/StoreAddAlert'
import StoreUpdateAlert from '../Alert/StoreUpdateAlert'
import StoreAlertError from '../Alert/StoreAlertError'
import DeleteStore  from './DeleteStore'
import StoreDeleteAlert from '../Alert/StoreDeleteAlert'
import StoreManagerForm from './StoreManagerForm'
import StoreManagerAddAlert from '../Alert/StoreManagerAddAlert'
import StoreManagerDeleteAlert from '../Alert/StoreManagerDeleteAlert'
 import StoreManagerUpdateAlert from '../Alert/StoreManagerUpdateAlert'
import  StoreManagerAlertError from '../Alert/StoreManagerAlertError'
import  DeleteStoreManager from './DeleteStoreManager'
import AccessDenied from '../access_denied/AccessDenied'




const StoreManager = () => {
    const {materialuitheme, storeManagerForm, setStoreManagerForm} = useApplicationSettings()

    const [loading, setloading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
const [storeManager, setStoreManager] = useState([])
const [openAddStore, setopenAddStore] = useState(false)
const [openDeleteStore, setopenDeleteStore] = useState(false)
const [openUpdateStore, setopenUpdateStore] = useState(false)
const [openAlertErrorStoreManager, setpenAlertErrorStoreManager] = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)
const [openAccessDenied, setopenopenAccessDenied] = useState(false)
const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);

const handleCloseErrorStoreManager = ()=> {

  setpenAlertErrorStoreManager(false)
  

}


const handleClickEditButton = ()=> {
  setIsOpen(true)
}


const handleCloseUpdateStore = ()=> {

  setopenUpdateStore(false)
}

const  handleCloseDeleteStore = ()=> {
  setopenDeleteStore(false)
}



const handleCloseAddStore = ()=> {
  setopenAddStore(false)
}



const handleRowAdd = (event, rowData)=> {
  setStoreManagerForm(rowData)
}




const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000)


const getStoreManager = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_store_managers', {
        signal: controller.signal,  

      })
      clearTimeout(id);

      const newData = await response.json()
      if (response.status === 403) {
        // setopenopenAccessDenied(true)
      }
      if (response.ok) {
        console.log('customer data', newData)
        setStoreManager(newData)
      } else {
        console.log('error')
        setpenAlertErrorStoreManager(true)
  
      }
    } catch (error) {
      console.log(error)
      setpenAlertErrorStoreManager(true)
  

    }
  },
  [],
)



useEffect(() => {
  getStoreManager()
}, [getStoreManager]);






const deleteStoreManager = async (id)=> {

  try {
    setloading(true)
    
const response = await fetch(`/api/delete_store_manager/${id}`, {
  method: 'DELETE'
  })
  
  if (response.ok) {
    setStoreManager(storeManager.filter((place)=> place.id !==  id))

    setloading(false)
    setopenDeleteStore(true)
    setisOpenDelete(false)
  } else {
    console.log('failed to delete')
    setisOpenDelete(false)
    setloading(false)
    setpenAlertErrorStoreManager(true)
  
  }
  } catch (error) {
    console.log(error)
    setisOpenDelete(false)
    setloading(false)
    setpenAlertErrorStoreManager(true)
  
   
  }
  
}








const handleAddStoreManager = async (e)=> {
e.preventDefault()

try {
setloading(true)
  const url = storeManagerForm.id ? `/api/update_store_manager/${storeManagerForm.id}` : '/api/create_store_manager';
      const method = storeManagerForm.id ? 'PATCH' : 'POST';


      const response = await fetch(url, {
        method: method,
        headers: {
  'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeManagerForm),
  
        })
  
        const newData = await response.json()
  if (response.ok) {
    setOpen(false)
    setOpen2(false)
    if (storeManagerForm.id) {
      setloading(false)
      setopenUpdateStore(true)
      setStoreManager(storeManager.map(item => (item.id === storeManagerForm.id ? newData : item)));
      setIsOpen(false)


    } else {
      setopenAddStore(true)
      setStoreManager((prevData)=> (
      [...prevData, newData]
      ));
setloading(false)
setIsOpen(false)

    }
  } else {
    console.log('error')
    setloading(false)
    setpenAlertErrorStoreManager(true)
    setIsOpen(false)

  

  }
} catch (error) {
  console.log(error)
  setloading(false)
  setpenAlertErrorStoreManager(true)
  setIsOpen(false)

  


}


}




const handleAddButton = ()=> {
  setStoreManagerForm('')
  setIsOpen(true)
}

  const EditButton = ({rowData}) => (
    <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
    className='w-8 h-8 cursor-pointer'   alt="edit" onClick={handleClickEditButton} />
        )
  
  
  
        const DeleteButton = ({id}) => (
          <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"   
           className='w-8 h-8 cursor-pointer' alt="delete"  onClick={()=> setisOpenDelete(true)}/>
        )



  return (

    <>
   
   {openAccessDenied ? (
    <AccessDenied />
   ) : 
   <>
   
<StoreManagerForm loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} handleAddStoreManager={handleAddStoreManager}
open={open} setOpen={setOpen} setOpen2={setOpen2} open2={open2}
/>
<StoreManagerAddAlert handleCloseAddStore={handleCloseAddStore} openAddStore={openAddStore} openDeleteStore={openDeleteStore}

handleCloseDeleteStore={handleCloseDeleteStore}/>
<StoreManagerDeleteAlert />

<StoreManagerUpdateAlert  openUpdateStore={openUpdateStore} handleCloseUpdateStore={handleCloseUpdateStore}
/>


<StoreManagerAlertError handleCloseErrorStoreManager={handleCloseErrorStoreManager}
 openAlertErrorStoreManager={openAlertErrorStoreManager}
/>

<DeleteStoreManager  id={storeManagerForm.id} deleteStoreManager={deleteStoreManager}  isOpenDelete={isOpenDelete} 

setisOpenDelete={setisOpenDelete}/>

   <ThemeProvider theme={materialuitheme }>

    <div style={{ maxWidth: "100%" }}>
     
    <MaterialTable
   
      columns={[
        { title: "Number Of Bags Received", field: "number_of_bags_received" },

        { title: "Date Received", field: "date_received" },

        {
            title: "Number Of Bags Delivered",
            field: "number_of_bags_delivered",
          },

          // {
          //   title: "Status(full/empty)",
          //   field: "status",
          // },
          {
            title: "Date Delivered",
            field: "date_delivered",
        
          },

          {
            title: "Name",
            field: "name",
        
          },


          {
            title: "Phone Number",
            field: "phone_number",
        
          },


          {
            title: "Manager Number",
            field: "manager_number",
        
          },


          {
            title: "Received Bags",
            field: "Received Bags",
        
          },


          {
            title: "Delivered Bags",
            field: "Delivered Bags",
        
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
                              <EditButton   />

              <DeleteButton   id={rowData.id}/>
              </Box>
            

              
              </>
            
            
          }
      ]}

      data={storeManager}


      title="Store Manager"
      
onRowClick={handleRowAdd}
      actions={[
        {
          icon: () => <div  onClick={handleAddButton}   className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Store Manager',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}


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
exportFileName: 'Customers',

headerStyle:{
fontFamily: 'bold',
textTransform: 'uppercase'
} ,


fontFamily: 'mono'

}}     
    />
  </div>
  </ThemeProvider>
   </>}

   
</>
  )
}

export default StoreManager




