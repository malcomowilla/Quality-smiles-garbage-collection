
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline,   Snackbar,
  Alert} from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AccessDenied from '../access_denied/AccessDenied'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import TicketForm from '../customer_tickets/TicketForm'
import {useState, useCallback, useEffect} from 'react'
import TicketSubmit from '../customer_tickets/TicketSubmit'
// import DeleteTicket from './DeleteTicket'
// import TicketCreatedAlert from '../Alert/TicketCreatedAlert'
import TicketUpdateAlert from '../Alert/TicketUpdateAlert'
// import TicketDeleteAlert from '../Alert/TicketDeleteAlert'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs';

import QuestionMarkAnimation from '../animation/question_mark.json'
import Lottie from 'react-lottie';
import TicketAnimation from '../animation/ticket.json'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { BsTicketDetailed } from "react-icons/bs";

import { FaHandPointLeft } from "react-icons/fa";



const ServiceProviderAssignedTicket = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTicket, setIsOpenTicket] = useState(false);
const [customers, setCustomers] = useState([])
const [agentRole, setAgentRole] = useState([])
const [ticket, setTicket] = useState([])
const [loading, setloading] = useState(false)
const [openLoad, setOpenLoad] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false)
const [openCreateTicketAlert, setopenCreateTicketAlert] = useState(false)
const [openUpdateTicketAlert, setopenUpdateTicketAlert] = useState(false)
const [openDeleteTicketAlert, setopenDeleteTicketAlert] = useState(false)
const [phone, setPhone] = useState('')
const [customer_name, setName] = useState('')
const [ticketNo, setTicketNo] = useState('') 
const [updatedDate, setUpdatedDate] = useState('')
const [ticketForm, setTicketForm] = useState({
      customer: '',
      ticket_category: '',
      priority: '',
      agent: '',
      name: '',
      email: '',
      phone_number: '',
      status: '',
      issue_description: '',
      agent_review: '',
      agent_response: ''

})


    const navigate = useNavigate()
 
const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)
// const [snackbar, setSnackbar] = useState({ open: false,
//    message: '', severity: 'success' });


console.log('customer phone number',agentRole)
const handleCloseDeleteTicketAlert = ()=> {
  setopenDeleteTicketAlert(false)
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Closes the update ticket alert by setting its open state to false.
 */

/******  2d3d8e2b-108d-40ba-ab58-f4401ced4352  *******/
const handleCloseUpdateTicketAlert = ()=> {
  setopenUpdateTicketAlert(false)
}

const handleCloseCreateTicketAlert = ()=> {
  setopenCreateTicketAlert(false)
}


const handleGoingBack = ()=> {
  navigate(-1)
}



const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: QuestionMarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};



const handleChange = (e)=> {
const {name,  value} = e.target
setTicketForm((prev)=> ({...prev, [name]: value}))
console.log('ticket form', ticketForm)
} 


const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
  },
}));




    const {
      
        materialuitheme, adminFormSettings,setSnackbar,snackbar  } = useApplicationSettings()



            const fetchCustomers = useCallback(
              async() => {
                try {
                  const response = await fetch('/api/customers')
                  const newData = await response.json()
                  if (response.ok) {
                    
                    setCustomers(newData)
                  } else {
                    console.log('error?')
                  }
                } catch (error) {
                  console.log('error=>', error)
                }
              },
              [],
            )



useEffect(() => {
  fetchCustomers()
  
}, [fetchCustomers]);



// /api/get_service_providers
// /api/get_admins

            const fetchAgents = useCallback(
              async() => {
                try {
                  const response = await fetch('/api/get_service_providers')
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
                    console.log('get admins', newData)
                    const getAgent = newData.map((theAgent)=> {
                      if( theAgent.role === 'agent') {
                        return theAgent
                      }
                    })

                    console.log('get admins agent', getAgent)
                    setAgentRole(newData)
                  } else {
                    console.log('error')
                  }
                } catch (error) {
                  console.log('error=>', error)
                }
              },
              [],
            )
            

         
            useEffect(() => {
              fetchAgents()
              
            }, [fetchAgents]);
            


            const handleAddTicket = async (e)=> {
              e.preventDefault()
              
              try {
              setloading(true)
              setOpenLoad(true)
                const url = ticketForm.id ? `/api/update_ticket/${ticketForm.id}` : '/api/create_ticket';
                    const method = ticketForm.id ? 'PATCH' : 'POST';
              
              
                    const response = await fetch(url, {
                      method: method,
                      headers: {
                'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(ticketForm),
                
                      })
                
                      const newData = await response.json()

                      if (response.status === 400) {
                        setSnackbar({ open: true, message: 'empty ticket submited', severity: 'error' });

                      }
                if (response.ok) {
                  
                  console.log('tickets created:', newData)
              setOpenLoad(false)
                  if (ticketForm.id) {
                    setloading(false)
  setSnackbar({ open: true, message: 'Ticket updated successfully!', severity: 'success' });

                    setIsOpen(false)
                    // setopenUpdateTicketAlert(true)
                    setTicket(ticket.map(item => (item.id === ticketForm.id ? newData : item)));
                    setIsOpen(false)
                    setIsOpenTicket(false)
                   
              
                  } else {
  setSnackbar({ open: true, message: 'Ticket added successfully!', severity: 'success' });

                    setIsOpen(false)
                    setIsOpenTicket(false)
                    // Add newly created package to tableData
                    setopenCreateTicketAlert(true)
                    setTicket((prevData)=> (
                    [...prevData, newData]
                    ));
              setloading(false)
                  }
                } else {
                  console.log('error')
                  setloading(false)
                  setIsOpen(false)
                  setOpenLoad(false)

                  setSnackbar({ open: true, message: 
                    newData.error, severity: 'error' ,
                    vertical: 'top',
  horizontal: 'center',
                  });
                  // setSnackbar({ open: true, message: 'sth went wrong!', severity: 'error' });
                  if (response.status === 400) {
        
                    setSnackbar({ open: true, message: 
                      'empty ticket submited', severity: 'error' ,
                    
                    });

                  }
                }
              } catch (error) {
                setSnackbar({ open: true, message: 
                  'something went wrong, please try again', severity: 'error' ,
                  vertical: 'top',
horizontal: 'center',
                });
                console.log(error)
                
                setOpenLoad(false)
                setloading(false)
                setIsOpen(false)
              }
              }



              const controller = new AbortController();
              const id = setTimeout(() => controller.abort(), 9000)
              
              
              const getTicket = 
              useCallback(
                async() => {
              
                  try {
                    const response = await fetch('/api/assign_service_provider', {
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

                    if (response.status === 403) {
                      // setopenopenAccessDenied3(true)
                      
                    }
                    if (response.ok) {
                        setTicket(newData)
                      // setTicket(newData)
                    //   setTicket(newData.filter((my_ticket)=> {
                    //     return search.toLowerCase() === '' ? my_ticket : my_ticket.ticket_number.toLowerCase().includes(search)
                    //   }))
                      console.log('ticket data', newData)
                    } else {
                      console.log('error')
              
                    }
                  } catch (error) {
                    console.log(error)
              
                  }
                },
                [searchInput],
              )
              
              
              
              useEffect(() => {
                getTicket()
              }, [getTicket]);



              const deleteTicket = async (id)=> {

                try {
                  setloading(true)
                  
              const response = await fetch(`/api/delete_ticket/${id}`, {
                method: 'DELETE'
                })
                
                
                if (response.ok) {
                  setTicket(ticket.filter((tik)=> tik.id !==  id))
                  setloading(false)
                  setisOpenDelete(false)
                  setopenDeleteTicketAlert(true)
                } else {
                  console.log('failed to delete')
                  setloading(false)
                  setisOpenDelete(false)
                }
                } catch (error) {
                  console.log(error)
                  setisOpenDelete(false)
                  setloading(false)
                  
                }
                
              }
              


              console.log('my customer', customers)

        const handleAddButton = ()=> {
          // setIsOpen(true)
          setIsOpenTicket(true)
          setTicketForm('')
        }


        const handleRowClick = (event, rowData)=> {
          const customerData = customers.find(my_customer => my_customer.name === rowData.customer);
          console.log(' row data', rowData) 
  setPhone(customerData.phone_number)
          setTicketForm(rowData)
          setName(customerData.name)
          setTicketNo(rowData.ticket_number)
          setUpdatedDate(rowData.formatted_date_closed)
        }

        const EditButton = ({rowData}) => (
          <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
          className='w-8 h-8 cursor-pointer '  alt="edit"  onClick={()=> setIsOpen(true)}/>
              )
        
        
        
              const DeleteButton = ({id}) => (
                <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png" 
                 className='w-8 h-8 cursor-pointer' alt="delete" onClick={() => setisOpenDelete(true)}/>
              )

  return (

    <>

<Snackbar
 anchorOrigin={{ 
  vertical: 'top', 
  horizontal: 'center' 
}}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

{/* <TicketDeleteAlert openDeleteTicketAlert={openDeleteTicketAlert} handleCloseDeleteTicketAlert={handleCloseDeleteTicketAlert} /> */}

    <TicketUpdateAlert openUpdateTicketAlert={openUpdateTicketAlert} handleCloseUpdateTicketAlert={handleCloseUpdateTicketAlert} />
{/* <TicketCreatedAlert  openCreateTicketAlert={openCreateTicketAlert} handleCloseCreateTicketAlert={handleCloseCreateTicketAlert} /> */}
    <TicketForm phone={phone} customer_name={customer_name}  ticketNo={ticketNo} loading={loading} openLoad={openLoad}
     handleAddTicket={handleAddTicket} isOpen={isOpen} setIsOpen={setIsOpen} agentRole={agentRole} ticketForm={ticketForm}
      setTicketForm={setTicketForm} handleChange={handleChange} updatedDate={updatedDate}/>


    <TicketSubmit  openLoad={openLoad}  isloading={loading}  handleAddTicket={handleAddTicket} handleChange={handleChange} 
     isOpenTicket={isOpenTicket} setIsOpenTicket={setIsOpenTicket}
     customers={customers} agentRole={agentRole} ticketForm={ticketForm} setTicketForm={setTicketForm}
      
    />

    {/* <DeleteTicket  deleteTicket={deleteTicket} id={ticketForm.id} isOpenDelete={isOpenDelete} 
    setisOpenDelete={setisOpenDelete} isloading={loading}/>  */}
    <ThemeProvider theme={materialuitheme}>



  




    <div style={{ maxWidth: "100%" }} className='bg-white h-screen'>

    <FaHandPointLeft className='w-8 h-8 cursor-pointer
     text-black' onClick={handleGoingBack}/>

    <MaterialTable
   
      columns={[
        { title: "Ticket Status", field: "status",  align: 'left',
          render: (rowData)=> 
            
            <>
              <CustomTooltip className='myTextField' sx={{
                background: 'white',
  "& .MuiTooltip-tooltip": {
    background: 'white',
    
  }
}} title=  {<div className='text-sm flex justify-center items-center p-3 flex-col '>

  <p className='font-extrabold text-lg'>Subject</p>
   <p> {rowData.issue_description}  </p> </div>}  >

<div className={`   ${rowData.status === 'In Progress' && 'bg-orange-600'}
    ${rowData.status === 'Open' && 'bg-red-600'}
    ${rowData.status === 'Resolved' && 'bg-green-600'}
    ${rowData.status === 'Pending' && 'bg-gray-600'}
    


rounded-md  playwrite-de-grund text-sm w-20 flex justify-center p-1 items-center
             h-[3rem]`}>
             <p style={{
              color: 'white',
              
              
            }}>{rowData.status}</p>



            
            </div>
</CustomTooltip>
            </>,


          


          
         },
        { title: "Customer", field: "customer" , render: (rowData)=> 

          <>
          <div className={`flex gap-3  `}>

          
         <div className={`${rowData.status === 'In Progress' && 'bg-orange-600 '}
          ${rowData.status === 'Open' && 'bg-red-600 '}
          ${rowData.status === 'Resolved' && 'bg-green-600 '}
          ${rowData.status === 'Pending' && 'bg-gray-600 '}
          
         p-3 rounded-full `    }>
          <p className={`  text-white text-2xl font-extralight`}>
            { rowData.customer   &&   rowData.customer.split(' ').map((my_name)=>{
            return my_name.charAt(0)
          }).join('')}</p></div>


          <p>{rowData.customer}</p>
          
          </div>
          </>
        },
        { title: "Category", field: "ticket_category", align: 'left' },
        

        {
          title: "Priority",


          field: "priority",
          render: (rowData)=> 
            <>
            <div className={`  h-10 w-20 text-sm flex justify-center items-center rounded-md playwrite-de-grund
               ${rowData.priority === 'Urgent' && 'bg-red-800 '}
               ${rowData.priority === 'Medium' && 'bg-yellow-500 '}
               ${rowData.priority === 'Low' && 'bg-green-800 '}
               `}>
            <p className='text-white'>{rowData.priority}</p>

            </div>

            </>
        },
        
        {
          title: 'Assigned To',
          field: 'agent',
          render: (rowData) => 
            <>
        {rowData.agent === '' || rowData.agent === null || rowData.agent === 'null' ?  (
          <Lottie options={defaultOptions} width={70} height={70}/>
        ): rowData.agent}
            </>
        },
        {
          title: 'Ticket Number',
          field: 'ticket_number'
        },


        {
          title: 'Date',
          field: 'formatted_date_of_creation',
          render: (rowData)=>
            <>
<p> Created: <span className='font-bold'>{rowData.
formatted_date_of_creation
} </span></p>

<p className=''>Resolved: <span className='font-bold'>{rowData.status === 'Resolved' && rowData.formatted_date_closed
} </span> </p>
            </>
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



      



      actions={[
        // {
        //   icon: () => <div onClick={handleAddButton}    className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
        //    style={{color: 'white'}}/></div>,
        //   isFreeAction: true, // This makes the action always visible
        //   tooltip: 'Add Ticket',
        // },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}
      title="Support Tickets"

data={ticket}


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

  )
}

export default ServiceProviderAssignedTicket

























