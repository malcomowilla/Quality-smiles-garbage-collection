
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
import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import { useDebounce } from 'use-debounce';
import { SlLocationPin } from "react-icons/sl";




const Location = () => {
  const {
    materialuitheme,setMaterialuiTheme ,locationForm, setLocationForm, locations, setlocations,
    openAccessDenied, setopenopenAccessDenied,  setseelocation,openLocationAlertError, setopenLocationAlertError} = useApplicationSettings()

const [isOpen, setIsOpen] = useState(false)

const [loading, setloading] = useState(false)
const [openAddLocationAlert, setopenAddLocationAlert] = useState(false)
const [openUpdateLocationAlert, setopenUpdateLocationAlert] = useState(false)
const [openDeleteLocationAlert, setopenDeleteLocationAlert] = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)

const [search, setSearch] = useState('')
const [searchchInput] = useDebounce(search, 1000)
const navigate = useNavigate()

 const handleCloseLocationAlertError = () => {
  setopenLocationAlertError(false)
 }


//  useEffect(() => {
//   requestPermission();
// }, []);




const defaultOptions2 = {
  loop: true,
  autoplay: true, 
  animationData: QuestionMarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};



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








  const addLocation = async (e) => {


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



<form className="flex items-center max-w-sm mx-auto p-3">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search location..." required />
    </div>
    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-greenn-700 
    rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
     focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
    </button>
</form>


    <ThemeProvider theme={materialuitheme}>

    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Location", field: "location_name" , },
        { title: "Sublocation", field: "sublocation_name", 
          render: (rowData) => 
            <>
          {rowData.sublocation_name === 'null' || rowData.sublocation_name === null 
          || rowData.sublocation_name === '' ? (
            <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} />






          ): <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} />}
            </>
         },
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




