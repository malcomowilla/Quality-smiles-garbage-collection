import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import InvitationForm from './InvitationForm'
import {useState, useEffect, useCallback} from 'react'
import UserAddAlert from '../Alert/UserAddAlert'
import UserUpdateAlert from '../Alert/UserUpdateAlert'
import DeleteUser from './DeleteUser'
import UserDeleteAlert from '../Alert/UserDeleteAlert'
import { CgTemplate } from "react-icons/cg";
import { PiTicket } from "react-icons/pi";
import {useNavigate} from 'react-router-dom'
import Lottie from 'react-lottie';
import EmptyBox from '../animation/empty_box.json'
import QuestionMarkAnimation from '../animation/question_mark.json'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import { HiOutlineUsers } from "react-icons/hi2";
import { useDebounce } from 'use-debounce';
import toaster, { Toaster } from 'react-hot-toast';





const ManageUsers = () => {

const navigate = useNavigate()
 


  const [isOpen, setIsOpen] = useState(false)
const [loading, setloading] = useState(false)
const [users, setUsers] = useState([])
const [openUserAddAlert, setopenUserAddAlert] = useState(false)
const [openUserUpdatedAlert, setopenUserUpdatedAlert] = useState(false)
const [isOpenDelete, setisOpenDelete] = useState(false)
const [openUserDeleteAlert, setopenUserDeleteAlert] = useState(false)

const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)

const handleCloseDeleteAddAlert = ()=> {
  setopenUserDeleteAlert(false)
}


const  handleCloseUpdatedAddAlert = ()=> {
  setopenUserUpdatedAlert(false)
}




const {
      
  materialuitheme, adminFormSettings , setSnackbar,setBottomNavigation, } = useApplicationSettings()


  const [permissionAndRoles, setPermissionAndRoles] = useState({
    generalSetting: { read: false, readWrite: false },
    location: { read: false, readWrite: false },
    store: { read: false, readWrite: false },
    sub_location: { read: false, readWrite: false },
    storeManager: { read: false, readWrite: false },
    customer: { read: false, readWrite: false },
    service_provider: { read: false, readWrite: false },
    finances_and_expenses: { read: false, readWrite: false },
    payments: { read: false, readWrite: false },
    invoice: { read: false, readWrite: false },
    calendar: { read: false, readWrite: false },
    sms: {read: false, readWrite: false},
    smsTemplates: {read: false, readWrite: false},
    tickets: {read: false, readWrite: false},
    individualEmail: {readWrite: false},
    customerStats: {read: false},
    serviceProviderStats: {read: false},
    chat: {read: false, readWrite: false},
    user: {read: false, readWrite: false},
  });

  // :can_manage_user,
  // :can_read_user

  const [userDetails, setuserDetails] = useState({
    
  })


const [userPermisions, setUserPermisions] = useState({
 user_name: '',
    email: '',
    phone_number: '',
    user_role: '',
   
    
});

console.log('permissionsss:', userPermisions)

const [emailError, setEmailError] = useState('')
const [seeEmailError, setSeeEmailError] = useState(false)

const [emailError2, setEmailError2] = useState('')
const [seeEmailError2, setSeeEmailError2] = useState(false)
const [usernameError, setUsernameError] = useState('')
const [usernameError2, setUsernameError2] = useState('')

const [seeUsernameError, setSeeUsernameError] = useState(false)
const [seeUsernameError2, setSeeUsernameError2] = useState(false)
const [strictEmailError, setStrictEmailError] = useState('')
const [seeStrictEmailError, setSeeStrictEmailError] = useState(false)

const [openLoad, setOpenLoad] = useState(false);
const [roleError, setRoleError] = useState('')
const [seeRoleError, setSeeRoleError] = useState(false)




const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: QuestionMarkAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};



const handleCloseUserAddAlert = ()=> {
  setopenUserAddAlert(false)
}
 


const handleRowAdd = (event, rowData)=> {
  

  setUserPermisions((prevData) => {
    
    const updatedData = {
      ...prevData,
      user_role: rowData.role 
      
    };
    return updatedData;
  });

  


  

  setUserPermisions(rowData)
  setPermissionAndRoles({

    generalSetting: {
      read: rowData.can_read_settings,
      readWrite: rowData.can_manage_settings,
    },
    location: {
      read: rowData.can_read_location,
      readWrite: rowData.can_manage_location,
    },
    store: {
      read: rowData.can_read_store,
      readWrite: rowData.can_manage_store,
    },
    sub_location: {
      read: rowData.can_read_sub_location,
      readWrite: rowData.can_manage_sub_location,
    },
    storeManager: {
      read: rowData.can_read_store_manager,
      readWrite: rowData.can_manage_store_manager,
    },
    customer: {
      read: rowData.can_read_customers,
      readWrite: rowData.can_manage_customers,
    },
    service_provider: {
      read: rowData.can_read_service_provider,
      readWrite: rowData.can_manage_service_provider,
    },
    finances_and_expenses: {
      read: rowData.can_read_finances_account,
      readWrite: rowData.can_manage_finances_account,
    },
    payments: {
      read: rowData.can_read_payment,
      readWrite: rowData.can_manage_payment,
    },
    invoice: {
      read: rowData.can_read_invoice,
      readWrite: rowData.can_manage_invoice,
    },
    calendar: {
      read: rowData.can_read_calendar,
      readWrite: rowData.can_manage_calendar,
    },

    sms: {
      
      read: rowData.can_read_sms,
      readWrite: rowData.can_manage_sms
     },
    smsTemplates: {
      
      read: rowData.can_read_sms_templates,
      readWrite: rowData.can_manage_sms_templates
    },

    tickets: {
      read: rowData.can_read_tickets,
      readWrite: rowData.can_manage_tickets
    },
    individualEmail: {
      readWrite: rowData.can_manage_individual_email
    },
    customerStats:{
      read: rowData.can_read_customer_stats,
    },
    serviceProviderStats:{
      read: rowData.can_read_service_provider_stats,
    },
    chat: {
      read: rowData.can_read_chats,
      readWrite: rowData.can_manage_chats
    },
    user: {
      read: rowData.can_read_user,
      readWrite: rowData.can_manage_user
    },
  });
}








const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000)


const getUsers = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/get_admins', {
        signal: controller.signal,  

      })
      clearTimeout(id);

      const newData = await response.json()
      // if (response.status === 403) {
      //   setopenopenAccessDenied3(true)
        
      // }
if (response.status === 403) {
  toaster.error('permision denied to view user management', {
    duration: 6000, 
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
        // setUsers(newData)
        setUsers(newData.filter((user)=> {
          return search.toLowerCase() === '' ? user : user.user_name.toLowerCase().includes(search)
        }))
        
        
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
  getUsers()
}, [getUsers]);


// user_roles
// update_user_roles
// https://700f-102-68-79-197.ngrok-free.app/
const handleAddUser = async (e) => {
  e.preventDefault();
  try {
    setOpenLoad(true);
    setloading(true);

    const url = userPermisions.id
      ? `/api/update_user_roles/${userPermisions.id}`
      : '/api/user_roles';
    const method = userPermisions.id ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userPermisions,
        user_role: userPermisions.user_role,
        login_with_web_auth: adminFormSettings.login_with_web_auth,
        send_password_via_email: adminFormSettings.send_password_via_email,
        send_password_via_sms: adminFormSettings.send_password_via_sms
      }),
    });

    const newData = await response.json();

    if (response.ok) {
      setIsOpen(false);

if (response.status === 403) {
  toaster.error('permision denied to create or update user', {
    duration: 6000, 
  })
}

      if (userPermisions.id) {
        setloading(false);
        setSeeUsernameError(false);
        setSeeUsernameError2(false);
        setSeeStrictEmailError(false);
        toaster.success('User Updated Successfully', {
          duration: 5000, // Duration in milliseconds (3 seconds)
        })
        setIsOpen(false);
        setSeeEmailError(false);
        setUsers(users.map((item) =>
          item.id === userPermisions.id ? newData : item
        ));
        // setopenUserUpdatedAlert(true);
        setSeeEmailError(false);
        setSeeEmailError2(false);
      } else {
        setSeeEmailError(false);
        setSeeEmailError2(false);
        setSeeStrictEmailError(false);
        setSeeUsernameError(false);
        setSeeUsernameError2(false);
        setopenUserAddAlert(true);
        toaster.error('User Update Failed', {
          duration: 5000, // Duration in milliseconds (3 seconds)
        })
        setIsOpen(false);
        setUsers([...users, newData]); // Add newly created user to table
        setloading(false);
      }
    } else {
      toaster.error('User Addition Failed', {
        duration: 5000, // Duration in milliseconds (3 seconds)
      })
      setloading(false);
      // Handle server-side validation errors
      if (newData.errors) {
        // Example: Handling email and username errors
        setEmailError(newData.errors.email?.[0] || '');
        setUsernameError(newData.errors.user_name?.[0] || '');
        setSeeEmailError(true);
        setSeeUsernameError(true);
      } else {
        // Handle other types of errors (network, unexpected responses)
        setStrictEmailError(newData.error)
        setRoleError()
        console.log(newData.role_error)
        setSeeStrictEmailError(true)
        console.error('Unexpected error:', newData.error || 'Unknown error');
        // Display a generic error message to the user
      }
      setIsOpen(true); // Ensure the form remains open to show errors
    }
  } catch (error) {
    console.error('Network error:', error);
    setloading(false);
    
    setStrictEmailError(false)
    setSeeEmailError(false);
        setSeeUsernameError(false);
    setIsOpen(false);
    // Handle network errors, such as timeout or connection issues
  }
};






  const deleteUser = async (id)=> {

    try {
      setloading(true)
      
  const response = await fetch(`/api/delete_user_roles/${id}`, {
    method: 'DELETE'
    })
    

if (response.status === 403) {
  toaster.error('permision denied to delete user', {
    duration: 6000, 
  })
}
    
    if (response.ok) {
      setUsers(users.filter((place)=> place.id !==  id))
      setloading(false)
      // setopenUserDeleteAlert(true)
      toaster.success('User Deleted Successfully', {
        duration: 5000, 
      })
      setisOpenDelete(false)
    } else {
      console.log('failed to delete')
      setloading(false)
      toaster.error('Failed To Delete User', {
        duration: 5000, // Duration in milliseconds (3 seconds)
      })
    }
    } catch (error) {
      console.log(error)
      toaster.error('Failed To Delete User Something Went Wrong', {
        duration: 5000, // Duration in milliseconds (3 seconds)
      })
      
      setloading(false)
      
    }
    
  }
  
  










        const handleAddButton = ()=> {
          setBottomNavigation(false)
          setIsOpen(true)
          setUserPermisions('')
          setPermissionAndRoles({
            generalSetting: { read: false, readWrite: false },
    location: { read: false, readWrite: false },
    store: { read: false, readWrite: false },
    sub_location: { read: false, readWrite: false },
    storeManager: { read: false, readWrite: false },
    customer: { read: false, readWrite: false },
    service_provider: { read: false, readWrite: false },
    finances_and_expenses: { read: false, readWrite: false },
    payments: { read: false, readWrite: false },
    invoice: { read: false, readWrite: false },
    calendar: { read: false, readWrite: false },
    sms: {read: false, readWrite: false},
    smsTemplates: {read: false, readWrite: false},

    tickets: {read: false, readWrite: false},
    individualEmail: {readWrite: false},
    customerStats: {read: false},
    serviceProviderStats: {read: false},
    chat: {read: false, readWrite: false},
    user: {read: false, readWrite: false},

        })
        }




  const EditButton = ({rowData}) => (
    <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
    className='w-8 h-8 cursor-pointer '  alt="edit"  onClick={()=> setIsOpen(true)}/>
        )
  
  
  
        const DeleteButton = ({id}) => (
          <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"   
           className='w-8 h-8 cursor-pointer' alt="delete" onClick={()=> setisOpenDelete(true)}/>
        )


  return (

    <>
 <Toaster position="top-center" />
    <UserDeleteAlert  openUserDeleteAlert={openUserDeleteAlert} handleCloseDeleteAddAlert={handleCloseDeleteAddAlert}
    />
    <UserAddAlert openUserAddAlert={openUserAddAlert} handleCloseUserAddAlert={handleCloseUserAddAlert}
    />

    <DeleteUser isOpenDelete={isOpenDelete} setisOpenDelete={setisOpenDelete} id={userPermisions.id} 
    deleteUser={deleteUser} loading={loading}/>

    <UserUpdateAlert handleCloseUpdatedAddAlert={handleCloseUpdatedAddAlert} openUserUpdatedAlert={openUserUpdatedAlert}
 />
    <InvitationForm isOpen={isOpen} setIsOpen={setIsOpen} permissionAndRoles={permissionAndRoles} openLoad={openLoad}
     setPermissionAndRoles={setPermissionAndRoles} userPermisions={userPermisions}  loading={loading} 
     setUserPermisions={setUserPermisions} handleAddUser ={handleAddUser} userDetails={userDetails}
      setuserDetails={setuserDetails}  emailError={emailError}
       seeEmailError={seeEmailError}
      strictEmailError={strictEmailError} 
      seeStrictEmailError={seeStrictEmailError}
      emailError2={emailError2} seeEmailError2={seeEmailError2}   usernameError={usernameError}  
      
      usernameError2={usernameError2}  seeUsernameError={seeUsernameError} seeUsernameError2={seeUsernameError2}/>

    <ThemeProvider theme={materialuitheme}>
      <div className="flex items-center max-w-sm mx-auto p-3">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiOutlineUsers className='text-black font-extrabold'/>
          </div>
          <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}
           className="bg-gray-50 border border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-black
            dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="search for users..."  />
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
          { title: "Name", field: "user_name" },
          { title: "Phone Number", field: "phone_number", align: 'left',

            render: (rowData)=> 
              <>
                 {rowData.phone_number === 'null' || rowData.phone_number === ''
                 || rowData.phone_number === null
                 ?  <Lottie className='relative z-50' options={defaultOptions}
                 height={70} width={70} /> : rowData.phone_number
                
      }
              </>
          },
          

          {
            title: "Role",
            field: "role",
          },
         
            {
              title: "Date Registered",
              field: "formatted_registered_date",
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

                <DeleteButton   id={rowData.id} />
                </Box>
              

                
                </>
              
              
            }
        


        ]}


       data={users}


        title="User Management"
        onRowClick={handleRowAdd}


        actions={[
          {
            icon: () => <div    className='bg-teal-700 p-2 w-14 rounded-lg' onClick={handleAddButton}><AddIcon
             style={{color: 'white'}}/></div>,
            isFreeAction: true, // This makes the action always visible
            tooltip: 'Invite User',
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
    </>

  )
}

export default ManageUsers
