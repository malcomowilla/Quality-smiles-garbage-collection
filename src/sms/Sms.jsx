
import MaterialTable, {MTablePagination} from "material-table";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { Button, Box } from '@mui/material';
import AccessDenied from '../access_denied/AccessDenied'
import {useCallback, useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import SmsForm from '../sms/SmsForm'
import { MdOutlineSupportAgent } from "react-icons/md";
import  DeleteSms from './DeleteSms'
 import DeleteMessageAlert from '../Alert/DeleteMessageAlert'
 import {useNavigate} from 'react-router-dom'


const Sms = () => {

const navigate = useNavigate()


  const [sms, setSms] = useState([])
  const [isOpen, setIsOpen] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false)
const [message, setMessage] = useState({
  message: ''
})
const [openDeleteMessage, setopenDeleteMessage] = useState(false)

const handleCloseDeleteMessage = ()=>{
  setopenDeleteMessage(false)
}

const [openLoad, setopenLoad] = useState(false)
const [loading, setloading] = useState(false)
    const {
      
        materialuitheme, smsBalance, setSmsBalance  } = useApplicationSettings()


const handleAddButton = () => {
  setMessage('')
  setIsOpen(true)
}
const handleDeleteOpen= ()=>{
  setisOpenDelete(true)
}

const handleRowClick = (event, rowData)=> {
  setMessage(rowData)
}

const handleRowOpen = ()=> {
  setIsOpen(true)
}



const deleteMessage = async(id)=> {
  
  try {
    setopenLoad(true)
  setloading(true)
    const response = await fetch(`/api/delete_sms/${id}`,{
      method: "DELETE"
    })
    if(response.ok) {
      setSms(sms.filter((my_message)=> my_message.id !==  id))
      setopenDeleteMessage(true)
      setopenLoad(false)
      setloading(false)
      setisOpenDelete(false)
      
    } else {
      setopenLoad(false)
      setisOpenDelete(false)
      setloading(false)
    }
  } catch (error) {
    setopenLoad(false)
    setloading(false)
  }
}
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 9000)


const getSms = 
useCallback(
  async() => {

    try {
      const response = await fetch('/api/all_sms', {
        signal: controller.signal,  

      })
      clearTimeout(id);

      const newData = await response.json()
      // if (response.status === 403) {
      //   setopenopenAccessDenied3(true)
        
      // }

      if (response.status === 401) {
        navigate('/signin')
      }
      if (response.ok) {
        setSms(newData)
        console.log('customer data', newData)
      } else {
        console.log('error')
        

      }
    } catch (error) {
      console.log(error)

    }
  },
  [],
)



useEffect(() => {
  getSms()
}, [getSms]);




        

                const EditButton = ({rowData}) => (
                  <img src="/images/logo/1495216_article_circle_edit_paper_pencil_icon.png"  
                  className='w-8 h-8 cursor-pointer '  alt="edit" onClick={handleRowOpen} />
                      )
                
                
                
                      const DeleteButton = ({id}) => (
                        <img src="/images/logo/6217227_bin_fly_garbage_trash_icon.png"  
                         className='w-8 h-8 cursor-pointer' alt="delete" onClick={handleDeleteOpen}/>
                      )
  return (
    
<>
<DeleteMessageAlert openDeleteMessage={openDeleteMessage} handleCloseDeleteMessage={handleCloseDeleteMessage}/>
<DeleteSms   deleteMessage={deleteMessage}  openLoad={openLoad} loading={loading} isOpenDelete={isOpenDelete} setisOpenDelete={setisOpenDelete} id={message.id} />
<SmsForm  isOpen={isOpen} setIsOpen={setIsOpen} message={message} setMessage={setMessage}/>

    <ThemeProvider theme={materialuitheme}>




    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
   
      columns={[
        { title: "Message", field: "message" , cellStyle: {display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden'
           ,padding:'20px' }},
        { title: "Receipients", field: "user",  align: 'left' },
        { title: "Status", field: "status",  align: 'left' ,
          lookup: {
            queued: <p style={{
              color: 'green'
            }}>success</p>
          }
        },

        {
          title: "Date",
          field: "formatted_date",
        },

        {
          title: "Sent By",
          field: "Sent By",
          render: (rowData) => 

            <>
            <Box sx={{
              display: 'flex',
              gap: 2
            }}>
           <p>system</p>
           <MdOutlineSupportAgent/>

            </Box>
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


      


onRowClick={handleRowClick}
      actions={[
        {
          icon: () => <div   onClick={handleAddButton}  className='bg-teal-700 p-2 w-14 rounded-lg'><AddIcon
           style={{color: 'white'}}/></div>,
          isFreeAction: true, // This makes the action always visible
          tooltip: 'Send Sms',
        },
        {
          icon: () => <GetAppIcon />,
          isFreeAction: true, // This makes the action always visible
      
          tooltip: 'Import',
        },
      ]}

     data={sms}
      title="SMS"
      
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

  </>

  )
}

export default Sms




