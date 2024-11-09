
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import dayjs from 'dayjs';
import {useCallback, useEffect, useState} from 'react'
import ProviderRegistrationForm from '../registration/ProviderRegistrationForm'
import ProviderAdditionAlert from '../Alert/ProviderAdditionAlert'
import ProviderOfflineError from '../Alert/ProviderOfflineError'
import ProviderUpdatedAlert from '../Alert/ProviderUpdatedAlert'
import DeleteProviderConfirmation from '../registration/DeleteProviderConfirmation'
import  ProviderDeleteAlert from '../Alert/ProviderDeleteAlert'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AccessDenied from '../access_denied/AccessDenied'
import {useNavigate} from 'react-router-dom'
import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { createConsumer } from '@rails/actioncable';
import { useDebounce } from 'use-debounce';
import { BsPersonGear } from "react-icons/bs";




const ServiceProvider = () => {


  const navigate = useNavigate()
  const {providers, setGetProviders,  providerformData,  setproviderformData,
    setProviderCode,  updatedMessageProvider, setUpdatedMessageProvider, materialuitheme,settingsformDataForProvider,
    adminFormSettings,isOpenProvider, setIsOpenProvider
 } = useApplicationSettings()

const {send_sms_and_email_for_provider, send_email_for_provider, enable_2fa_for_service_provider} = settingsformDataForProvider


 const [ openAdditionProvider, setopenAdditionProvider] = useState(false)
const [openProviderOfflineAlert, setopenProviderOfflineAlert] = useState(false)
const [openUpdatedProvider, setopenUpdatedProvider] = useState(false)
const [isOpenDeleteProvider, setIsOpenDeleteProvider] = useState(false)
const [openDeleteProviderAlert, setopenDeleteProviderAlert] = useState(false)
const [loading, setloading] = useState(false)
const [emailError, setEmailError] = useState('')
const [seeEmailError, setSeeEmailError] = useState(false)
const [phoneNumberError, setPhoneNumberError] = useState('')
const [seePhoneNumberError, setSeePhoneNumberError] = useState(false)
const [openAcessDenied, setOpenAcessDenied] = useState(false)
const [openLoad, setopenLoad] = useState(false)

const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)


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



          setGetProviders(providers.map(item => (item.id === providerformData.id ? data.request : item)))


        }
        // setGetCustomers(data.request)
       console.log("Customer Requests updated:", data);
       // Update your frontend state or UI based on received data
     }


     
   });

   return () => {
     subscription.unsubscribe();
   };
 }, [cable.subscriptions]);





const handleOpenRowForm = ()=> {
  setSeeEmailError(false)
  setSeePhoneNumberError(false)
  setproviderformData((prevData) => (
    {...prevData , date_registered: dayjs(new Date())}
  ))

  setIsOpenProvider(true)
  setProviderCode(true)

}



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


const handleCloseDeleteProviderAlert = ()=> {
  setopenDeleteProviderAlert(false)
}




const  handleCloseroviderOfflineAlert = ()=> {
  setopenProviderOfflineAlert(false)
}


const  handleCloseProviderUpdated = ()=> {
  setopenUpdatedProvider(false)
}





const handleCloseAdditionProvider = ()=> {
  setopenAdditionProvider(false)
}




  const EditButton = ({rowData}) => (
    <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
    className='w-8 h-8  ' alt="edit"  onClick={handleOpenRowForm}/>
        );
  
  
  
        const DeleteButton = ({id}) => (
          <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png" onClick={()=> setIsOpenDeleteProvider(true)}  className='w-8 h-8 ' alt="delete" />
        )


        const handleRowClick = (event, rowData) => {
          setproviderformData(rowData);
          setProviderCode(true)
          setSeeEmailError(false)
          setSeePhoneNumberError(false)
        
          setproviderformData({
            ...rowData,
            date_registered: dayjs(rowData.date_registered
            ),
       
          
          });
        
        };
        
        



const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);


const getServiceProviders = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_service_providers', {
        signal: controller.signal,  

      })
     

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



      const newData = await response.json()
      if (response.status === 403) {
        // setOpenAcessDenied(true)
      }
      if (response.ok) {
        // setGetProviders(newData)
        setGetProviders(newData.filter((service_provider)=> {
          return search.toLowerCase() === '' ? service_provider : service_provider.name.toLowerCase().includes(search)
        }))

        console.log('customer data', newData)
      } else {
        console.log('error')
        setopenProviderOfflineAlert(false)
      }
    } catch (error) {
      setopenProviderOfflineAlert(true)
    }
  },
  [searchInput],
)



useEffect(() => {
  getServiceProviders()
}, [getServiceProviders,]);



const handleOpenProvider = ()=> {
  setIsOpenProvider(true)
  setProviderCode(false)
  setproviderformData('')
  setSeeEmailError(false)
  setSeePhoneNumberError(false)

  setproviderformData((prevData) => (
    {...prevData , date_registered: dayjs(new Date())}
  ))
  
}



const deleteProvider = async (id)=> {

  try {
    setloading(true)
    
const response = await fetch(`/api/delete_service_providers/${id}`, {
  method: 'DELETE'
  })
  
  if (response.ok) {
    setGetProviders(providers.filter((provider)=> provider.id !==  id))
    setIsOpenDeleteProvider(false)
    setopenDeleteProviderAlert(true)
    setloading(false)
  } else {
    console.log('failed to delete')
    setopenDeleteProviderAlert(false)
    setloading(false)
    
  }
  } catch (error) {
    console.log(error)
    setloading(false)
  }
  
}




  const addServiceProvider = async (e) => {
    e.preventDefault()

    try {
      setloading(true)
      setopenLoad(true)
      const url = providerformData.id ? `/api/update_service_provider/${providerformData.id}` : '/api/create_service_provider';
      const method = providerformData.id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
      method: method,
      headers: {
'Content-Type': 'application/json'

      },
      body: JSON.stringify({...providerformData, send_sms_and_email_for_provider, send_email_for_provider,
        enable_2fa_for_service_provider
      }),

      })

      const newData = await response.json()

      if (response.ok) {
        setIsOpenProvider(false)
        setProviderCode(true)
        setloading(false)
        setSeeEmailError(false)
        setSeePhoneNumberError(false)
        if (providerformData.id) {
          setloading(false)
          setopenLoad(false)
          setopenLoad(false)
          setopenUpdatedProvider(true)
          // Update existing package in tableData
          setGetProviders(providers.map(item => (item.id === providerformData.id ? newData.service_provider : item)));
         
          setUpdatedMessageProvider(newData.message)
         

        } else {
          setopenAdditionProvider(true)
          setloading(false)
          setopenLoad(false)
          // Add newly created package to tableData

          setGetProviders((prevData)=> (
          [...prevData, newData]
          ));


        }
      } else {
        setloading(false)
        setopenLoad(false)
        setEmailError(newData.errors.email)
        setPhoneNumberError(newData.errors.phone_number)
        console.log('failed')
        setProviderCode(false)
        setSeeEmailError(true)
        setSeePhoneNumberError(true)

      }
    } catch (error) {
      console.log(error)
      setProviderCode(false)
      setloading(false)
      setopenLoad(false)
      setSeeEmailError(false)
      setSeePhoneNumberError(false)

    }
  }

  return (
<>




{loading &&    <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
<Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
  
   </Backdrop>
}

{openAcessDenied ? (
  <AccessDenied />
) : 
<>
<ProviderRegistrationForm   emailError={emailError} seeEmailError={seeEmailError}  phoneNumberError={phoneNumberError}
      seePhoneNumberError={seePhoneNumberError} 
   loading={loading}  addServiceProvider={addServiceProvider} isOpenProvider={isOpenProvider} 
    setIsOpenProvider={setIsOpenProvider}/>

    <ProviderAdditionAlert   handleCloseAdditionProvider={handleCloseAdditionProvider} 
     openAdditionProvider={openAdditionProvider}/>

     <ProviderOfflineError  openProviderOfflineAlert={openProviderOfflineAlert}   
     handleCloseroviderOfflineAlert={handleCloseroviderOfflineAlert} />
<ProviderUpdatedAlert  updatedMessageProvider={updatedMessageProvider} 
 handleCloseProviderUpdated={handleCloseProviderUpdated} openUpdatedProvider={openUpdatedProvider} />
<DeleteProviderConfirmation loading={loading}   id={providerformData.id}  deleteProvider={deleteProvider} isOpenDeleteProvider={isOpenDeleteProvider}
 setIsOpenDeleteProvider={setIsOpenDeleteProvider} />
 <ProviderDeleteAlert  handleCloseDeleteProviderAlert={handleCloseDeleteProviderAlert} 
 openDeleteProviderAlert={openDeleteProviderAlert}
/>

    <ThemeProvider theme={materialuitheme}>


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

            <BsPersonGear className='text-black'/>
            
        </div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
         className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="search for service providers..."  />
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


    <div style={{ maxWidth: "100%" }} className='cursor-pointer'>
    <MaterialTable
   

      onRowClick={handleRowClick }


      columns={[
        { title: "Name", field: "name" },
        { title: "Phone Number", field: "phone_number", align: 'left' },
        { title: "Date Collected", field: "formatted_collected_date", align: 'left',

          render: (rowData) => 
            <>

    {rowData.formatted_collected_date === null ||  rowData.formatted_collected_date === '' ||
    rowData.formatted_collected_date === 'null' ? (
      <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} />
    ): rowData.formatted_collected_date}
            </>
         },
        { title: "Date Delivered", field: "formatted_delivered_date", align: 'left' ,
          render: (rowData) => 
            <>
{rowData.formatted_delivered_date === null || rowData.formatted_delivered_date === ''  ||  
rowData.formatted_delivered_date === 'null' ? (
  <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} />

  
) :rowData.formatted_delivered_date}

            </>
        },

        {
          title: "Ref No",
          field: "provider_code",
        },
        

        {
          title: "Date Registered",
          field: "date_registered",
        },



        {
          title: "Bag Collected",
          field: "collected",
          lookup: {true:  <CheckIcon style={{ color: 'green' }} />, false: < CloseIcon style={{ color: 'red' }} />
        },
        },



        {
          title: "Bag Delivered",
          field: "delivered",
          lookup: {true:  <CheckIcon style={{ color: 'green' }} />, false: < CloseIcon style={{ color: 'red' }} />
        },
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
        },
       

       

      ]}




      actions={[
        {
          icon: () => <div  onClick={handleOpenProvider}   className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Add Service Providers',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}

     data={providers}
      
      title="Service Providers"
      

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
  </ThemeProvider >
</>}
    
</>
  )
}

export default ServiceProvider




