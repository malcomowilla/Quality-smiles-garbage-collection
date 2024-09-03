
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import {useEffect, useState, useCallback} from 'react'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import LocationForm from './LocationForm'
import  LocationAddedAlert from '../Alert/LocationAddedAlert'
import LocationUpdateAlert from '../Alert/LocationUpdateAlert'
import  LocationDeleteAlert from '../Alert/LocationDeleteAlert'
import LocationAlertError from '../Alert/LocationAlertError'
import DeleteLocation  from './DeleteLocation'
import AccessDenied from '../access_denied/AccessDenied'
import {useNavigate} from 'react-router-dom'
import { requestPermission } from '../firebase/firebasePermission';



const Location = () => {
const [isOpen, setIsOpen] = useState(false)

const [loading, setloading] = useState(false)
const [openAddLocationAlert, setopenAddLocationAlert] = useState(false)
const [openUpdateLocationAlert, setopenUpdateLocationAlert] = useState(false)
const [openDeleteLocationAlert, setopenDeleteLocationAlert] = useState(false)
const [openLocationAlertError, setopenLocationAlertError] = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)

const navigate = useNavigate()

 const handleCloseLocationAlertError = () => {
  setopenLocationAlertError(false)
 }


//  useEffect(() => {
//   requestPermission();
// }, []);


const handleCloseDeleteLocationAlert = () => {
  setopenDeleteLocationAlert(false)

}

const handleCloseUpdateLocationAlert = () => {

  setopenUpdateLocationAlert(false)
}




const  handleCloseLocationAlert = () => {
  setopenAddLocationAlert(false)
}









const EditButton = ({rowData}) => (
  <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
  className='w-8 h-8  ' alt="edit" onClick={()=>setIsOpen(true)}/>
      );



      const DeleteButton = ({id}) => (
        <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"  onClick={()=> setisOpenDelete(true)} 
         className='w-8 h-8 ' alt="delete" />
      )




    const {
        materialuitheme,setMaterialuiTheme ,locationForm, setLocationForm, locations, setlocations,
        openAccessDenied, setopenopenAccessDenied,  setseelocation} = useApplicationSettings()


        const handleCloseRegistrationForm = (e) => {
          e.preventDefault()

          setIsOpen(false)
        }

        




  useEffect(() => {
   
  }, [materialuitheme]);



  const handleAddButton = () => {
    setIsOpen(true)
setLocationForm('')

  }



const handleRowClick = (event, rowData) => {
  setLocationForm(rowData);



};




const deleteLocation = async (id)=> {

  try {
    setloading(true)
    
const response = await fetch(`/api/delete_location/${id}`, {
  method: 'DELETE'
  })
  
  if (response.ok) {
    setlocations(locations.filter((place)=> place.id !==  id))
    setopenDeleteLocationAlert(true)
    setisOpenDelete(false)
    setloading(false)
  } else {
    console.log('failed to delete')
    setopenLocationAlertError(true)
    setisOpenDelete(false)
    setloading(false)

    
  }
  } catch (error) {
    console.log(error)
    setopenLocationAlertError(true)
    setisOpenDelete(false)
    setloading(false)

  }
  
}





const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);




const getLocation = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_locations', {
        signal: controller.signal,  

      })
      clearTimeout(id);

      const newData = await response.json()

      if (response.status === 401) {
        navigate('/signin')


      }

      if (response.status === 403) {
        setopenLocationAlertError(true)
        // setopenopenAccessDenied(true)
        setseelocation(false)


      }
      if (response.ok) {
        setlocations(newData)
        console.log('customer data', newData)
        setseelocation(true)
      } else {
        console.log('error')
        setseelocation(true)
        
      }
    } catch (error) {
      console.log(error)
      setopenLocationAlertError(true)
      setseelocation(true)

    }
  },
  [],
)



useEffect(() => {
  getLocation()
}, [getLocation]);




  const addLocation = async (e) => {



  addNotification({
    title: 'Warning',
    subtitle: 'This is a subtitle',
    message: 'This is a very long message',
    theme: 'darkblue',
    native: true // when using native, your OS will handle theming.
});
    e.preventDefault()

    try {
      setloading(true)
      const url = locationForm.id ? `/api/update_location/${locationForm.id}` : '/api/create_location';
      const method = locationForm.id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
      method: method,
      headers: {
'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationForm),

      })

      const newData = await response.json()

      if (response.ok) {
        setIsOpen(false)
        setloading(false)
        if (locationForm.id) {
          // Update existing package in tableData
          setlocations(locations.map(item => (item.id === locationForm.id ? newData : item)));

          setopenUpdateLocationAlert(true)
         

        } else {

          // Add newly created package to tableData

          setlocations((prevData)=> (
          [...prevData, newData]
          ));
          setopenAddLocationAlert(true)


        }
      } else {
        console.log('failed')
        setloading(false)
        setopenLocationAlertError(true)
        setIsOpen(false)

      }
    } catch (error) {
      console.log(error)
      setloading(false)
      setopenLocationAlertError(true)
      setIsOpen(false)

    }
  }

  return (

    <>
    {/* {openAccessDenied && <AccessDenied />} */}

{openAccessDenied ? (
  <AccessDenied />
) : <>

<LocationForm handleCloseRegistrationForm={handleCloseRegistrationForm} isOpen={isOpen} addLocation={addLocation} 
    loading={loading} setIsOpen={setIsOpen}/>

    <LocationAddedAlert openAddLocationAlert={openAddLocationAlert}  handleCloseLocationAlert={handleCloseLocationAlert}
 />

 <LocationUpdateAlert openUpdateLocationAlert={openUpdateLocationAlert}  handleCloseUpdateLocationAlert={handleCloseUpdateLocationAlert}
 />

 <LocationDeleteAlert  openDeleteLocationAlert={openDeleteLocationAlert} 
   handleCloseDeleteLocationAlert={handleCloseDeleteLocationAlert}
/>

<LocationAlertError openLocationAlertError={openLocationAlertError}  handleCloseLocationAlertError={handleCloseLocationAlertError}
  />

<DeleteLocation id={locationForm.id}  isOpenDelete={isOpenDelete} deleteLocation={deleteLocation} loading={loading}
 setisOpenDelete={setisOpenDelete}/>

    <ThemeProvider theme={materialuitheme}>

    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Location", field: "location_name" , },
        { title: "Sublocation", field: "Sublocation" },
        { title: "Location Code", field: "location_code",  align: 'left' },
       
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

      
      data={locations}


      title="Location"
      


      actions={[
        {
          icon: () => <div  onClick={handleAddButton}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Location',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}
onRowClick={handleRowClick}

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

</>
}
   
</>
  )
}

export default Location




