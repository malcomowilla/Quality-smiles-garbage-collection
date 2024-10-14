import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import {useState, useCallback, useEffect,} from 'react'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import CustomerRegistrationForm from '../registration/CustomerRegitrationForm'
import dayjs from 'dayjs';
import  CustomerAdditionAlert from '../Alert/CustomerAdditionAlert'
import CustomerUpdatedAlert from '../Alert/CustomerUpdatedAlert'
import  DeleteCustomerConfirmation from '../registration/DeleteCustomerConfirmation'
import CustomerDeleteAlert from '../Alert/CustomerDeleteAlert'
import CustomerOfflineAlert from '../Alert/CustomerOfflineAlert'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ImSpinner9 } from "react-icons/im";
import AccessDenied from '../access_denied/AccessDenied'
import { requestPermission } from '../firebase/firebasePermission';
import {useNavigate} from 'react-router-dom'
import OneSignal from 'react-onesignal';

import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';

import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import { createConsumer } from '@rails/actioncable';
import { useDebounce } from 'use-debounce';
import { IoPeople } from "react-icons/io5";


const Customers = () => {
const navigate = useNavigate()
 
  const {customers, setGetCustomers, customerformData, setcustomerformData,
     setSeeCustomerCode, updatedMessage, setUpdatedMessage,  settingsformData,
     materialuitheme,adminFormSettings,setopenLogoutSession,
  } = useApplicationSettings()

  const {send_sms_and_email, send_email} = settingsformData
console.log('sms and email:',send_sms_and_email )
  const [isOpen, setIsOpen] = useState(false);
const [openAddition, setopenAddition] = useState(false)
const [ openUpdated, setIsOpenUpdated] = useState(false)
const [isOpenDelete, setIsOpenDelete] = useState(false)
const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
const [openOfflineAlert, setOpenOfflineAlert] = useState(false)
const [loading, setloading] = useState(false)
const [emailError, setEmailError] = useState('')
const [seeEmailError, setSeeEmailError] = useState(false)
const [phoneNumberError, setPhoneNumberError] = useState('')
const [seePhoneNumberError, setSeePhoneNumberError] = useState(false)
const [nameError, setNameError] = useState('')
const [seeNameError, setSeeNameError] = useState(false)
const [openAccessDenied, setopenopenAccessDenied] = useState(false)
const [openLoad, setopenLoad] = useState(false)

const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)
// console.log('adminset',adminFormSettings)


const cable = createConsumer("ws://localhost:4000/cable");

  useEffect(() => {
   const subscription = cable.subscriptions.create("RequestsChannel", {
     received(data) {
      // setGetCustomers((prevData)=> (
      //   [...prevData, data.request]
      //   ));

      

      
        if (data.request && typeof data.request === 'object') {
          console.log("Appending new request:", data);

         

          setGetCustomers(customers.map(item => (item.id === customerformData.id ? data.request : item)))


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





// useEffect(() => {
//   requestPermission();
// }, []);


// const runOneSignal = useCallback(
//   async () => {
//     await OneSignal.init({ appId: "9491f0f0-0f1b-4ab6-b339-6289d264eeb5", allowLocalhostAsSecureOrigin: true, 
//       path: '/OneSignalSDKWorker.js'
//     });
//     OneSignal.Slidedown.promptPush();
//   },
//   [],
// )



// useEffect(() => {
//   if (window.OneSignal) {
//     runOneSignal();
//   } else {
//     console.error("OneSignal SDK not loaded");
//   }
// }, [runOneSignal]);



const handleCloseOfflineAlert = ()=> {
  setOpenOfflineAlert(false)
}





const handleCloseUpdated = ()=> {
  setIsOpenUpdated(false)
}






const handleCloseDeleteAlert = ()=> {
  setOpenDeleteAlert(false)
}




const handleCloseRegistrationForm = (e)=> {
  setIsOpen(false)
  e.preventDefault()
}

const handleClickOpen = () => {
  setcustomerformData('');
  setIsOpen(true)
  setSeeCustomerCode(false)
  setSeeNameError(false)
  setSeeEmailError(false)
  setSeePhoneNumberError(false)
  setcustomerformData((prevData) => (
    {...prevData , date_registered: dayjs(new Date())}
  ))

}






  const handleCloseAddition = () => {
    setopenAddition(false)
  }

  
const handleRowClick = (event, rowData) => {
  setcustomerformData(rowData);
  console.log('rowData=>', rowData)
  setSeeCustomerCode(true)
  setSeeEmailError(false)
  setSeeNameError(false)
  setSeePhoneNumberError(false)
  setcustomerformData({
    ...rowData,
    date_registered
: dayjs(rowData.date_registered
), 
  
  });

};





const deleteCustomer = async (id)=> {

  try {
    setloading(true)

const response = await fetch(`/api/delete_customer/${id}`, {
  method: 'DELETE'
  })
  
  if (response.ok) {
    setGetCustomers(customers.filter((customer)=> customer.id !==  id))
    setIsOpenDelete(false)
    setOpenDeleteAlert(true)
    setloading(false)

  
  } else {
    console.log('failed to delete')
    setOpenDeleteAlert(false)
    setloading(false)


    
  }
  } catch (error) {
    console.log(error)
    setloading(false)

  }
  
}














const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000);




const getCustomers = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/customers', {
        signal: controller.signal,  

      })
      clearTimeout(id);
     
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
          setopenLogoutSession(true)
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
        setopenLogoutSession(true)
        }
       
      }
      const newData = await response.json()
      if (response.status === 403) {
        // setopenopenAccessDenied(true)
      }
      if (response.ok) {
        // setGetCustomers(newData)
        setGetCustomers(newData.filter((customer)=> {
          return search.toLowerCase() === '' ? customer : customer.name.toLowerCase().includes(search)
        }))
        console.log('customer data', newData)
      } else {
        console.log('error')
        setOpenOfflineAlert(false)
      }
    } catch (error) {
      setOpenOfflineAlert(true)
    }
  },
  [searchInput],
)



useEffect(() => {
  getCustomers()
}, [getCustomers,]);



  const addCustomer = async (e) => {
    e.preventDefault()

    try {
      setloading(true)
      setopenLoad(true)

      const url = customerformData.id ? `/api/update_customer/${customerformData.id}` : '/api/customer';
      const method = customerformData.id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
      method: method,
      headers: {
'Content-Type': 'application/json'
      },
      body: JSON.stringify({...customerformData, send_sms_and_email, send_email}),

      })

      const newData = await response.json()

      if (response.ok) {
        setIsOpen(false)
        setSeeCustomerCode(true)
        setloading(false)
        setSeeEmailError(false)
        setSeePhoneNumberError(false)
        setSeeNameError(false)
        setopenLoad(false)
        if (customerformData.id) {
          setloading(false)
          setopenLoad(false)
          setIsOpenUpdated(true)
          // Update existing package in tableData
          setGetCustomers(customers.map(item => (item.id === customerformData.id ? newData.customer : item)))
         
          setUpdatedMessage(newData.message)
         

        } else {
          setopenAddition(true)
          setloading(false)
          setopenLoad(false)
          // Add newly created package to tableData

          setGetCustomers((prevData)=> (
          [...prevData, newData]
          ));


        }
      } else {
        console.log('failed')
        setSeeCustomerCode(false)
        setloading(false)
        setOpenOfflineAlert(true)
        setEmailError(newData.errors.email)
        setSeePhoneNumberError(true)
        setSeeEmailError(true)
        setPhoneNumberError(newData.errors.phone_number)
        setNameError(newData.errors.name)
        setSeeNameError(true)
        setopenLoad(false)
      }
    } catch (error) {
      console.log(error)
      setSeeCustomerCode(false)
      setloading(false)
      setSeeEmailError(false)
      setOpenOfflineAlert(true)
      setSeeNameError(false)
      setSeePhoneNumberError(false)
      setopenLoad(false)

    }
  }




  const EditButton = ({rowData}) => (
  <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
  className='w-8 h-8  ' alt="edit" onClick={()=>setIsOpen(true)}/>
      );



      const DeleteButton = ({id}) => (
        <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"  onClick={()=> setIsOpenDelete(true)}  className='w-8 h-8 ' alt="delete" />
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
<ThemeProvider theme={materialuitheme}>


    <div style={{ maxWidth: "100%" }} className='cursor-pointer'>
    <CustomerRegistrationForm loading={loading}   seeEmailError={seeEmailError}  
 phoneNumberError={phoneNumberError}  seePhoneNumberError={seePhoneNumberError}    
 nameError={nameError} seeNameError={seeNameError}
      emailError={emailError} isOpen={isOpen} setIsOpen={setIsOpen} addCustomer={addCustomer}  handleCloseRegistrationForm={handleCloseRegistrationForm}/>
    <CustomerAdditionAlert  handleCloseAddition={handleCloseAddition} openAddition={openAddition}/>
    <CustomerUpdatedAlert updatedMessage={updatedMessage}
handleCloseUpdated={handleCloseUpdated} 
openUpdated={openUpdated}/>
<DeleteCustomerConfirmation    id={customerformData.id}   loading={loading}  deleteCustomer={deleteCustomer}   isOpenDelete={isOpenDelete} 
setIsOpenDelete={setIsOpenDelete} />
<CustomerDeleteAlert  openDeleteAlert={openDeleteAlert} handleCloseDeleteAlert={handleCloseDeleteAlert} />
<CustomerOfflineAlert openOfflineAlert={openOfflineAlert} handleCloseOfflineAlert={handleCloseOfflineAlert}/>



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
            <IoPeople className='text-black'/>
            
        </div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
         className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search for customers..."  />
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



    <MaterialTable
   
      columns={[


        { title: "Location", field: "location",
          render: (rowData) => 
            
            <>
{rowData.location === null ||  rowData.location === 'null' || rowData.location === '' 
? <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} /> : rowData.location }

            </>
        
         },
        { title: "Customer Name", field: "name" ,
          
        },
     
        {
            title: "Phone Number",
            field: "phone_number",
          },
          // {
          //   title: "Amount Paid",
          //   field: "amount_paid",
          // },
          
          // {
          //   title: "Total",
          //   field: "amount_paid",
          // },

          // {
          //   title: "Remaining Amount",
          //   field: "Remaining Amount",
          // },
      
        {
            title: "Date Registered",
            field: "date_registered",
          },

        {
          title: "Customer Code",
          field: "customer_code",
        },



        {
          title: "Collection Request Date",
          field: "formatted_request_date",
          render: (rowData) => 
            
            <>
{rowData.formatted_request_date === null ||  rowData.formatted_request_date === 'null' || rowData.formatted_request_date === '' 
? <Lottie className='relative z-50' options={defaultOptions2} height={70} width={70} /> : rowData.formatted_request_date }

            </>
        },


        {
          title: "Collection Request",
          field: "confirm_request",
          lookup: {true:  <CheckCircleIcon style={{ color: 'green' }} />, false: <CancelIcon style={{ color: 'red' }} />
},
        },

        {
          title: "Received Date",
          field: "formatted_confirmation_date",
        },



        {
title: 'Bag  Received',
field: 'bag_confirmed',
lookup: {true:  <CheckCircleIcon style={{ color: 'green' }} />, false: <CancelIcon style={{ color: 'red' }} />
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
            
            
          }
      ]}

      onRowClick={handleRowClick} 


      actions={[
        {
          icon: () => <div  onClick={handleClickOpen}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
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

   data={customers}


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
exportFileName: 'Customers',

headerStyle:{
fontFamily: 'bold',
textTransform: 'uppercase'
} ,


fontFamily: 'customers'

}}     
    />
  </div>
  </ThemeProvider >
</>}
    
</>
  )
}

export default Customers




