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
import AccessDenied from '../access_denied/AccessDenied'
import {useNavigate} from 'react-router-dom'
import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { MdOutlineLocationSearching } from "react-icons/md";
import { HiBuildingStorefront } from "react-icons/hi2";
import toaster, { Toaster } from 'react-hot-toast';



const Store = () => {
    const {materialuitheme, storeForm, setStoreForm,openAccessDenied3, 
      setopenopenAccessDenied3, adminFormSettings, setSnackbar} = useApplicationSettings()
const [isOpen, setIsOpen] = useState(false)
const [seeStoreNumber, setSeeStoreNumber] = useState(false)
const [loading, setloading] = useState(false)
const [store, setStore] = useState([])
const [openAddStore, setopenAddStore] = useState(false)
const [openUpdateStore, setopenUpdateStore] = useState(false)
const [openAlertError, setopenAlertError]  = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)
const [openDeleteAlert, setopenDeleteAlert] = useState(false)

const [search, setSearch] = useState('')
const [searchchInput] = useDebounce(search, 1000)

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: QuestionMarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const navigate = useNavigate()

const handleCloseDeleteAlert = ()=> {
  setopenDeleteAlert(false)
}


const handleCloseAlertError = ()=> {
  setopenAlertError(false)
}

const handleCloseUpdateStore = () => {
  setopenUpdateStore(false)
}




const  handleCloseAddStore =()=> {

  setopenAddStore(false)
}






const handleRowAdd = (event, rowData)=> {
  setStoreForm(rowData)
}




const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000)


const getStore = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/stores', {
        signal: controller.signal,  

      })

      const newData = await response.json()


if(response.status === 403){
  toaster.error('you are not authorized to view stores', {

  })
}

      if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys) {
         
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );
          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
       
          navigate('/signup2fa_passkey')
          // setlogoutmessage(true)
          // localStorage.setItem('logoutMessage', true)
        }else{
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );


          setSnackbar({
            open: true,
            message: <p className='text-lg'>Session expired please Login Again</p>,
            severity: 'error'
          })
           navigate('/signin')
        // setlogoutmessage(true)
        // localStorage.setItem('logoutMessage', true)
        }
       
      }
     


     
      if (response.ok) {
        // setStore(newData)
             
        setStore(newData.filter((store)=> {
  return search.toLowerCase() === '' ? store : store.location.toLowerCase().includes(search)
}))
        console.log('store data', newData)
      } else {
        console.log('error')
        setopenAlertError(true)

      }
    } catch (error) {
      console.log(error)
      setopenAlertError(true)

    }
  },
  [searchchInput],
)



useEffect(() => {
  getStore()
}, [getStore]);






const deleteStore = async (id)=> {

  try {
    setloading(true)
    
const response = await fetch(`/api/delete_store/${id}`, {
  method: 'DELETE'
  })
  


if(response.status === 403){
  toaster.error('you are not authorized to delete a store', {

  })
}


  if (response.ok) {
    setStore(store.filter((place)=> place.id !==  id))
    setopenDeleteAlert(false)
    setloading(false)
    setisOpenDelete(false)
  } else {
    console.log('failed to delete')
    setopenAlertError(true)
    setloading(false)
    setisOpenDelete(false)
  }
  } catch (error) {
    console.log(error)
    setisOpenDelete(false)
    setloading(false)
    setopenAlertError(true)
    setisOpenDelete(false)
  }
  
}








const handleAddStore = async (e)=> {
e.preventDefault()

try {
setloading(true)
  const url = storeForm.id ? `/api/update_store/${storeForm.id}` : '/api/create_store';
      const method = storeForm.id ? 'PATCH' : 'POST';


      const response = await fetch(url, {
        method: method,
        headers: {
  'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeForm),
  
        })
  
        const newData = await response.json()
  if (response.ok) {
    setSeeStoreNumber(true)
    setIsOpen(false)

    if (storeForm.id) {
      setloading(false)


if(response.status === 403){
  toaster.error('you are not authorized to update a store', {
duration: 6000,
position: "top-center",

  })
}
      setIsOpen(false)
      setStore(store.map(item => (item.id === storeForm.id ? newData : item)));

      setopenUpdateStore(true)
      setSeeStoreNumber(true)

    } else {
      setIsOpen(false)

if(response.status === 403){
  toaster.error('you are not authorized to add a store', {
duration: 6000,
position: "top-center",

  })
}
      // Add newly created package to tableData

      setStore((prevData)=> (
      [...prevData, newData]
      ));
setloading(false)
      setopenAddStore(true)
    }
  } else {
    console.log('error')
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




const handleAddButton = ()=> {
  setIsOpen(true)
  setStoreForm('')
  setSeeStoreNumber(false)

}

  const EditButton = ({rowData}) => (
    <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
    className='w-8 h-8 cursor-pointer '  alt="edit"  onClick={()=> setIsOpen(true)}/>
        )
  
  
  
        const DeleteButton = ({id}) => (
          <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png" onClick={()=> setisOpenDelete(true)}  
           className='w-8 h-8 cursor-pointer' alt="delete" />
        )



  return (

    <>
    {/* {openAccessDenied3 && <AccessDenied/>} */}
    {openAccessDenied3 ? (
      <AccessDenied />
    ) : <>
    
    <>
      
      <StoreAddAlert openAddStore={openAddStore} handleCloseAddStore={handleCloseAddStore}
 />

 <StoreUpdateAlert openUpdateStore={openUpdateStore}  handleCloseUpdateStore={handleCloseUpdateStore}
 />

 <StoreAlertError openAlertError={openAlertError} handleCloseAlertError={handleCloseAlertError}
 />


 <DeleteStore  deleteStore={deleteStore} id={storeForm.id} isOpenDelete={isOpenDelete} setisOpenDelete={setisOpenDelete}/>
    <ThemeProvider theme={materialuitheme }>

    <StoreForm  loading={loading}  isOpen={isOpen} setIsOpen={setIsOpen} handleAddStore={handleAddStore} 
    seeStoreNumber={seeStoreNumber}
       />

<StoreDeleteAlert  openDeleteAlert={openDeleteAlert} handleCloseDeleteAlert={handleCloseDeleteAlert}
/>


<div className="flex items-center max-w-sm mx-auto p-3">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg> */}
            <HiBuildingStorefront className='text-black'/>
            
        </div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
         className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search store..."  />
    </div>
    <button type="" className="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 
    rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
     focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
    </button>
</div>

    <div style={{ maxWidth: "100%" }}>
     
    <MaterialTable
   
      columns={[
        { title: "Location", field: "location" },
        { title: "Management Number", field: "manager_number",

          render: (rowData)=> 
            <>
{rowData.managger_number === 'null' || rowData.managger_number === null ||
 rowData.managger_number === ''  ? (
  <Lottie  options={defaultOptions} width={70} height={70}/>
 ): <Lottie  options={defaultOptions} width={70} height={70}/> }

            </>
         },

        { title: "Sub Location", field: "sub_location", 
          render: (rowData)=> 
            <>
{rowData.sub_location === 'null' || rowData.sub_location === null 
|| rowData.sub_location === ''  ?  (
  <Lottie options={defaultOptions}  width={70} height={70}/>
): ''}






            </>
         },

        {
            title: "Amount Of Bags",
            field: "amount_of_bags",
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

      data={store}


      title="Store"
      
onRowClick={handleRowAdd}
      actions={[
        {
          icon: () => <div  onClick={handleAddButton}   className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Store',
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
      
      
      </>
    
    </>}
     
   
</>









  )
}

export default Store
