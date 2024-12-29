
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
import { IoCheckmarkOutline } from "react-icons/io5";
import CloseIcon from '@mui/icons-material/Close';
import StoreManagerUpdate from '../Alert/StoreManagerUpdate'
import {useNavigate} from 'react-router-dom'
import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { createConsumer } from '@rails/actioncable';
import { useDebounce } from 'use-debounce';
import { GrUserManager } from "react-icons/gr";
import { useLayoutSettings } from '../settings/LayoutSettings';
import toaster, { Toaster } from 'react-hot-toast';



const StoreManager = () => {
    const {materialuitheme, storeManagerForm, setStoreManagerForm,
       storeManagerSettings, adminFormSettings} = useApplicationSettings()

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
const [openLoad, setopenLoad] = useState(false)
const [openStoreManagerUpdate, setopenStoreManagerUpdate] = useState()

const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)
const navigate = useNavigate()
const { settings, borderRadiusClasses } = useLayoutSettings();




const cable = createConsumer("ws://localhost:4000/cable");

  useEffect(() => {
   const subscription = cable.subscriptions.create("RequestsChannel", {

    connected() {
      console.log("Connected to private WebSocket!");
    },

    disconnected() {
      console.log("Disconnected from private WebSocket!");
    },

     received(data) {
      // setGetCustomers((prevData)=> (
      //   [...prevData, data.request]
      //   ));

      

      
        if (data.request && typeof data.request === 'object') {
          console.log("Appending new request:", data);



          setStoreManager(storeManager.map(item => (item.id === storeManagerForm.id ? data.request : item)))

        }
        // setGetCustomers(data.request)
      //  console.log("Customer Requests updated:", data);
       // Update your frontend state or UI based on received data
     }
   });

   return () => {
     subscription.unsubscribe();
   };
 }, [cable.subscriptions]);



console.log('border radius',borderRadiusClasses[settings.borderRadius])


const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};




const defaultOptions2 = {
  loop: true,
  autoplay: true, 
  animationData: QuestionMarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const handleCloseStoreManagerUpdate = ()=>{
  setopenStoreManagerUpdate(false)
}


const {send_manager_number_via_sms, enable_2fa_for_store_manager, send_manager_number_via_email} = storeManagerSettings



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


      if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys) {
         
          // toast.error(
          //   <div>
          //     <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
          //       <div> <span className='font-thin flex gap-3'>
             
          //         </span></div></p>
          //   </div>,
           
          // );


          toaster.error('Session expired please Login Again', {
            position: "top-center",
            duration: 7000,
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


          toaster.error('Session Expired please login again', {
            position: "top-center",
            duration: 7000,
            
          })
          //  navigate('/signin')
        // setlogoutmessage(true)
        // localStorage.setItem('logoutMessage', true)
        }
       
      }

      if (response.ok) {
        console.log('customer data', newData)
        // setStoreManager(newData)
        setStoreManager(newData.filter((manager)=> {
          return search.toLowerCase() === '' ? manager : manager.name.toLowerCase().includes(search)
        }))
      } else {
        console.log('error')
        setpenAlertErrorStoreManager(true)
  
      }
    } catch (error) {
      console.log(error)
      setpenAlertErrorStoreManager(true)
  

    }
  },
  [searchInput],
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





console.log("send_manager_number_via_email=>", send_manager_number_via_email)


const handleAddStoreManager = async (e)=> {
e.preventDefault()

try {
setloading(true)
setopenLoad(true)
  const url = storeManagerForm.id ? `/api/update_store_manager/${storeManagerForm.id}` : '/api/create_store_manager';
      const method = storeManagerForm.id ? 'PATCH' : 'POST';


      const response = await fetch(url, {
        method: method,
        headers: {
  'Content-Type': 'application/json'
        },
        body: JSON.stringify({...storeManagerForm, send_manager_number_via_email,
           enable_2fa_for_store_manager, send_manager_number_via_sms}),
  
        })
  
        const newData = await response.json()
  if (response.ok) {
    setOpen(false)
    setOpen2(false)
    if (storeManagerForm.id) {
      setloading(false)
      setopenLoad(false)
      setopenUpdateStore(true)
      setStoreManager(storeManager.map(item => (item.id === storeManagerForm.id ? newData : item)));
      setIsOpen(false)
      setopenStoreManagerUpdate(true)


    } else {
      setopenAddStore(true)
      setopenLoad(false)
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
    setopenLoad(false)

  

  }
} catch (error) {
  console.log(error)
  setloading(false)
  setpenAlertErrorStoreManager(true)
  setIsOpen(false)
  setopenLoad(false)
  


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
   


   {loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }



   {openAccessDenied ? (
    <AccessDenied />
   ) : 
   <>
   <StoreManagerUpdate openStoreManagerUpdate={openStoreManagerUpdate} handleCloseStoreManagerUpdate={handleCloseStoreManagerUpdate}/>
<StoreManagerForm loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} handleAddStoreManager={handleAddStoreManager}
open={open} setOpen={setOpen} setOpen2={setOpen2} open2={open2} openLoad={openLoad}
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
            <GrUserManager className='text-black'/>
            
        </div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
         className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search for store manager..."  />
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


   <ThemeProvider theme={materialuitheme }>


    <div style={{ maxWidth: "100%" }}>
     
    <MaterialTable
   
      columns={[
        { title: "Number Of Bags Received", field: "number_of_bags_received",
          render: (rowData) => 
            <>
{rowData.number_of_bags_received === 'null' ||rowData.number_of_bags_received === null 
|| rowData.number_of_bags_received === '' ? (
  <Lottie  options={defaultOptions2} height={70} width={70}/>


): 

rowData.number_of_bags_received}

            </>
         },


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
            field: "formatted_delivered_date",
        
          },

          {
title: "Date Received",
field: "formatted_received_date",
render: (rowData) => {
  return (
    <>
{rowData.formatted_received_date === null || rowData.formatted_received_date === 'null'

|| rowData.formatted_received_date === '' ? (
  <Lottie options={defaultOptions2} width={70} height={70}/>


): rowData.formatted_received_date}

    </>
  )
}
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
            field: "received_bags",
            lookup: {
              "true": <IoCheckmarkOutline className='w-8 h-8 text-green-700' />,
              "false": <CloseIcon style={{color: 'red'}}/>
            }
        
          },


          {
            title: "Delivered Bags",
            field: "delivered_bags",
            lookup: {
              "true": <IoCheckmarkOutline className='w-8 h-8 text-green-700' />,
              "false": <CloseIcon style={{color: 'red'}}/>
            }
        
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




