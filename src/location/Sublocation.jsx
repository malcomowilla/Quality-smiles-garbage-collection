
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import  SubLocationForm from './SubLocationForm'
import {useState, useEffect, useCallback} from 'react'
import DeleteSubLocation from '../location/DeleteSubLocation'
import SubLocationDeleteAlert from '../Alert/SubLocationDeleteAlert'
import SubLocationUpdatedAlert from '../Alert/SubLocationUpdatedAlert'
import SubLocationAddAlert from '../Alert/SubLocationAddAlert'
import SubLocationAlertError from '../Alert/SubLocationAlertError'
import AccessDenied from '../access_denied/AccessDenied'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';


 
const Sublocation = () => {
  const navigate = useNavigate()
    const {
      
        materialuitheme , sublocationForm, setSubLocationForm,sublocations, setSubLocations,openAccessDenied2,
         setopenopenAccessDenied2, adminFormSettings } = useApplicationSettings()

const [isOpen, setIsOpen] = useState(false)
const [loading, setloading] = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)
const [openDeleteSubLocationAlert, setopenDeleteSubLocationAlert] = useState(false)
const [openUpdatedSubLocationAlert, setopenUpdatedSubLocationAlert] = useState(false)
const [openAlertError, setopenAlertError] = useState(false)
const [openAddSubLocationAlert, setopenAddSubLocationAlert] = useState(false)




const  handleCloseAddSubLocationAlert = () =>{
  setopenAddSubLocationAlert(false)
}

const  handleCloseAlertError = () => {
  setopenAlertError(false)
}


const handleCloseUpdatedSubLocationAlert = () => {
  setopenUpdatedSubLocationAlert(false)
}
 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          






const handleCloseDeleteSubLocationAlert = () => {
  setopenDeleteSubLocationAlert(false)
}



const handleAddButton = ()=> {
  setIsOpen(true)
  setSubLocationForm('')
}






const handleRowClick = (event, rowData) => {
  setSubLocationForm(rowData);

  
};




const deleteSubLocation = async (id)=> {

  try {
    setloading(true)
    
const response = await fetch(`/api/delete_sub_location/${id}`, {
  method: 'DELETE'
  })
  
  if (response.ok) {
    setSubLocations(sublocations.filter((place)=> place.id !==  id))
    setloading(false)
    setisOpenDelete(false)
    setopenDeleteSubLocationAlert(true)
  } else {
    console.log('failed to delete')
    setloading(false)
    setisOpenDelete(false)
    setopenAlertError(true)
    
  }
  } catch (error) {
    console.log(error)
    setloading(false)
    setisOpenDelete(false)
    setopenAlertError(true)
  }
  
}





const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);




const getSubLocation = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_sub_locations', {
        signal: controller.signal,  

      })
      clearTimeout(id);

      const newData = await response.json()


      if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys) {
         
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
       
          navigate('/signup2fa_passkey')
          // setlogoutmessage(true)
          // localStorage.setItem('logoutMessage', true)
        }else{
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
           navigate('/signin')
        // setlogoutmessage(true)
        // localStorage.setItem('logoutMessage', true)
        }
       
      }

   

      if (response.status === 403) {
        // setopenopenAccessDenied2(true)
      }
      if (response.ok) {
        setSubLocations(newData)
        console.log('customer data', newData)
      } else {
        console.log('error')
        setopenAlertError(true)

      }
    } catch (error) {
      console.log(error)
      setopenAlertError(true)

    }
  },
  [],
)



useEffect(() => {
  getSubLocation()
}, [getSubLocation,]);



  const addSubLocation = async (e) => {
    e.preventDefault()

    try {
      setloading(true)
      const url = sublocationForm.id ? `/api/update_sub_location/${sublocationForm.id}` : '/api/create_sub_location';
      const method = sublocationForm.id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
      method: method,
      headers: {
'Content-Type': 'application/json'
      },
      body: JSON.stringify(sublocationForm),

      })

      const newData = await response.json()

      if (response.ok) {
        setIsOpen(false)
        setloading(false)
        if (sublocationForm.id) {
          // Update existing package in tableData
          setSubLocations(sublocations.map(item => (item.id === sublocationForm.id ? newData : item)));

          setopenUpdatedSubLocationAlert(true)

        } else {

          // Add newly created package to tableData

          setSubLocations((prevData)=> (
          [...prevData, newData]
          ));
          setopenAddSubLocationAlert(true)

        }
      } else {
        console.log('failed')
        setloading(false)
        setIsOpen(false)
        setopenAlertError(true)
      }
    } catch (error) {
      console.log(error)
      setloading(false)
      setIsOpen(false)
      setopenAlertError(true)

    }
  }











const EditButton = ({rowData}) => (
  <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
  className='w-8 h-8  ' alt="edit" onClick={()=> setIsOpen(true)
  } />
      );



      const DeleteButton = ({id}) => (
        <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"   onClick={() => setisOpenDelete(true)} className='w-8 h-8 ' alt="delete" />
      )

  return (

    <>
{/* {openAccessDenied2 && <AccessDenied />} */}

{openAccessDenied2 ? (
  <AccessDenied />
) :  <>
<SubLocationForm  isOpen={isOpen} setIsOpen={setIsOpen} loading={loading} addSubLocation={addSubLocation}/>
  <DeleteSubLocation deleteSubLocation={deleteSubLocation} id={sublocationForm.id} loading={loading} 
  isOpenDelete={isOpenDelete} setisOpenDelete={setisOpenDelete} />

  <SubLocationDeleteAlert  openDeleteSubLocationAlert={openDeleteSubLocationAlert}   
   handleCloseDeleteSubLocationAlert={handleCloseDeleteSubLocationAlert}/>
   <SubLocationUpdatedAlert openUpdatedSubLocationAlert={openUpdatedSubLocationAlert}
    handleCloseUpdatedSubLocationAlert={handleCloseUpdatedSubLocationAlert}/>

    <SubLocationAddAlert  openAddSubLocationAlert={openAddSubLocationAlert} 
    handleCloseAddSubLocationAlert={handleCloseAddSubLocationAlert}/>
    <SubLocationAlertError openAlertError={openAlertError} handleCloseAlertError={handleCloseAlertError} /> 
  <ThemeProvider theme={materialuitheme}>

  <div style={{ maxWidth: "100%" }}>
  <MaterialTable
 
    columns={[
      { title: "Sublocation", field: "name" },
      { title: "sublocation Code", field: "code", align: 'left' },
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

          <DeleteButton   id={rowData.id} />
          </Box>
        

          
          </>
        
        
      }
    
     
    ]}
    

data={sublocations}


    title="Sub Location"
    



onRowClick={handleRowClick}

    actions={[
      {
        icon: () => <div  onClick={handleAddButton}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
         style={{color: 'white'}}/></div>,
        isFreeAction: true, // This makes the action always visible
        tooltip: 'Add Sub Location',
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
exportFileName: 'Location',

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

export default Sublocation




