
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



const ServiceProvider = () => {


  const navigate = useNavigate()
  const {providers, setGetProviders,  providerformData,  setproviderformData,
    setProviderCode,  updatedMessageProvider, setUpdatedMessageProvider, materialuitheme,settingsformDataForProvider
 } = useApplicationSettings()

const {send_sms_and_email_for_provider, send_email_for_provider, enable_2fa_for_service_provider} = settingsformDataForProvider


 const [isOpenProvider, setIsOpenProvider] = useState(false)
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







const handleOpenRowForm = ()=> {
  setSeeEmailError(false)
  setSeePhoneNumberError(false)
  setproviderformData((prevData) => (
    {...prevData , date_registered: dayjs(new Date())}
  ))

  setIsOpenProvider(true)
  setProviderCode(true)

}



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
        navigate('/signin')


      }
      const newData = await response.json()
      if (response.status === 403) {
        // setOpenAcessDenied(true)
      }
      if (response.ok) {
        setGetProviders(newData)
        console.log('customer data', newData)
      } else {
        console.log('error')
        setopenProviderOfflineAlert(false)
      }
    } catch (error) {
      setopenProviderOfflineAlert(true)
    }
  },
  [],
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
          setopenUpdatedProvider(true)
          // Update existing package in tableData
          setGetProviders(providers.map(item => (item.id === providerformData.id ? newData.service_provider : item)));
         
          setUpdatedMessageProvider(newData.message)
         

        } else {
          setopenAdditionProvider(true)
          setloading(false)

          // Add newly created package to tableData

          setGetProviders((prevData)=> (
          [...prevData, newData]
          ));


        }
      } else {
        setloading(false)
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
      setSeeEmailError(false)
      setSeePhoneNumberError(false)

    }
  }

  return (
<>

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




    <div style={{ maxWidth: "100%" }} className='cursor-pointer'>
    <MaterialTable
   

      onRowClick={handleRowClick }


      columns={[
        { title: "Name", field: "name" },
        { title: "Phone Number", field: "phone_number", align: 'left' },
        { title: "Date Collected", field: "formatted_collected_date", align: 'left' },
        { title: "Date Delivered", field: "formatted_delivered_date", align: 'left' },

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




