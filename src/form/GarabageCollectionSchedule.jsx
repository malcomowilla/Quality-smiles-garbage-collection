
import { Scheduler } from "@aldabil/react-scheduler";

import '.././custom-scheduler.css/';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import  { useEffect, useState, useCallback, } from 'react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import CalendarEvent from '../calendar/CalendarEvent'
import FullCalendar from '@fullcalendar/react'
import ViewEvent from './ViewEvent'
import CalendarEventAddAlert from '../Alert/CalendarEventAddAlert'
import CalendarErrorAlert from '../Alert/CalendarErrorAlert'
import dayjs from 'dayjs';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import CalendarEventUpdate from '../Alert/CalendarEventUpdate'
import CalendarEventDeleteAlert from '../Alert/CalendarEventDeleteAlert'
import { requestPermission } from '../firebase/firebasePermission';
import addNotification from 'react-push-notification';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast,Bounce, Slide, Zoom, } from 'react-toastify';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const GarabageCollectionSchedule = () => {

const navigate = useNavigate()



const eventForm = {
title: '',
start: dayjs(new Date()),
end: dayjs(new Date()),
}
  const [isOpen, setIsOpen] = useState(false);
const [isOpenDelete, setisOpenDelete] = useState(false)
const [calendarEventForm, setCalendarEventForm] = useState(eventForm)
const [calendarEvents, setCalendarEvent]= useState([])
const [openAddition, setopenAddition] = useState(false)
const [openErrorAlert, setopenErrorAlert] = useState(false)
const [loading, setloading] = useState(false)
const [openLoad, setopenLoad] = useState(false)
const [start, setStart] = useState({})
const [end, setEnd] = useState(dayjs(new Date()))
const [title, setTitle] = useState('')
const [eventId, setEventId] = useState('')
const [openUpdateAlert, setopenUpdateAlert] = useState(false)
const [openDeleteAlert, setopenDeleteAlert] = useState(false)

const {adminFormSettings,  setCalendarSettings, setOpenOfflineError} = useApplicationSettings()






  
const handleGetCalendarSettings = useCallback(
  async() => {
    try {
      const response = await fetch('/api/get_calendar_settings')
      const newData = await response.json()



     




      if (response.ok) {
        console.log('data',newData)
        // const start_in_minutes = newData.start_in_minutes
        //   const start_in_hours = newData.start_in_hours

          const {start_in_hours,  start_in_minutes} = newData[0]
          setCalendarSettings((prevData)=>  ({...prevData, start_in_minutes,
            start_in_hours
             }))
      } else {
        console.log('error fetching calendar settings')
        setOpenOfflineError(true)
      }
    } catch (error) {
      console.log('error fetching calendar settings', error)
      setOpenOfflineError(true)
    }
  },
  [],
)



useEffect(() => {
  handleGetCalendarSettings()
}, [handleGetCalendarSettings]);










const handleCloseDeleteAlert = ()=>{
  setopenDeleteAlert(false)
}




useEffect(() => {
  requestPermission();
}, []);




const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const handleCloseUpdateAlert =()=>{
  setopenUpdateAlert(false)
}


const handleCloseErrorAlert = ()=>{
  setopenErrorAlert(false)
}

const handleCloseAddition = ()=> {
  setopenAddition(false)
}



const handleChangeDateTime1 = (dateTime1)=>{

  // setCalendarEventForm({...calendarEventForm,})
  setCalendarEventForm((prevData) => ({
    ...prevData,
    start: dateTime1
  }))
}



const handleChangeDateTime2 = (dateTime2)=>{

  setCalendarEventForm((prevData) => ({
    ...prevData,
    end: dateTime2
  }))
}



const handleChange = (e)=>{
const {name, value} = e.target
setCalendarEventForm((prevData) => ({
  ...prevData,
  [name]: value
}))
}

const handleDateClick = ()=>{
  setIsOpen(true)
}


const handleGetCalendarEvents = useCallback(
  async() => {
    try {
      const response = await fetch('/api/get_calendar_events_for_customer')
      const newData = await response.json()

      if (response.status === 401) {
        if (adminFormSettings.enable_2fa_for_admin_passkeys === true || 
          adminFormSettings.enable_2fa_for_admin_passkeys === 'true' ) {
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
          navigate('/signup2fa_passkey')
       
        }else{
          toast.error(
            <div>
              <p className='playwrite-de-grund font-extrabold text-xl'>Session expired please Login Again
                <div> <span className='font-thin flex gap-3'>
             
                  </span></div></p>
            </div>,
           
          );
           navigate('/signin')
           
       
        }
      }


      if (response.json) {
        setCalendarEvent(newData)
        
      } else {
        console.log('error')
        setopenErrorAlert(true)
      }
    } catch (error) {
      console.log('error geting')
    }
  },
  [],
)


useEffect(() => {
  handleGetCalendarEvents()
}, [handleGetCalendarEvents]);





// const acha_umbwakni = localStorage.getItem("acha umbwakni");
// const storedDataacha_umbwakni = acha_umbwakni ? JSON.parse(acha_umbwakni) : {}; 

//  console.log('acha umbwakni:',storedDataacha_umbwakni)







const handleCreateEvent = async(e)=>{

  e.preventDefault()
  setloading(true)
  setopenLoad(true)
const response = await fetch('/api/create_calendar_event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(calendarEventForm)
})

const newData = await response.json()

try {
  if (response.ok) {
    setopenLoad(false)
    setIsOpen(false)
   
    setloading(false)
    setCalendarEvent((prev)=> ([
      ...prev, newData
    ]))
    setopenAddition(true)
  } else {
    console.log('err')
    setopenErrorAlert(true)
    setopenLoad(false)
    setloading(false)
    setIsOpen(false)


  }
} catch (error) {
  console.log('err')
  setopenLoad(false)
  setloading(false)
    setloading(false)
}
}







const handleUpdateEvent = async(e)=>{
  e.preventDefault()
  setloading(true)
  setopenLoad(true)
const response = await fetch(`/api/update_calendar_event/${eventId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(calendarEventForm)
})

const newData = await response.json()

try {
  if (response.ok) {
    setopenLoad(false)
    setisOpenDelete(false)
    setopenUpdateAlert(true)
    setloading(false)
    setCalendarEvent(calendarEvents.map(item => (item.id === eventId ? newData : item)));
    // setCalendarEvent((prev)=> ([
    //   ...prev, newData
    // ]))
  } else {
    console.log('err')
    setopenErrorAlert(true)
    setopenLoad(false)
    setloading(false)
    setisOpenDelete(false)


  }
} catch (error) {
  console.log('err')
  setopenLoad(false)
  setloading(false)
  setopenErrorAlert(true)
    setloading(false)
    setisOpenDelete(false)

}
}





const handleDeleteEvent = async()=>{
  setloading(true)
  setopenLoad(true)
const response = await fetch(`/api/delete_calendar_event/${eventId}`, {
  method: 'DELETE',

})


try {
  if (response.ok) {
    setopenLoad(false)
    setisOpenDelete(false)
    setloading(false)
    setopenDeleteAlert(true)
    setCalendarEvent(calendarEvents.filter((calendarEvent)=> calendarEvent.id !==  eventId))
    // setCalendarEvent((prev)=> ([
    //   ...prev, newData
    // ]))
  } else {
    console.log('err')
    setopenErrorAlert(true)
    setopenLoad(false)
    setloading(false)
    setisOpenDelete(false)


  }
} catch (error) {
  console.log('err')
  setopenLoad(false)
  setloading(false)
  setopenErrorAlert(true)
    setloading(false)
    setisOpenDelete(false)

}
}







const handleEventClick = (clickInfo)=> {
  setisOpenDelete(true)
  const eventData = clickInfo.event.extendedProps;
console.log('clcik',clickInfo)

  // Log the event data to inspect what's available
  console.log("Event Data:", {
    id: clickInfo.event.id,
    title: clickInfo.event.title,
    start: clickInfo.event.start,
    end: clickInfo.event.end,
    description: eventData.description,
    location: eventData.location,
  });
  setEventId(parseInt(clickInfo.event.id))
  setTitle(clickInfo.event.title)
  setEnd(dayjs(clickInfo.event.start))
  setStart(dayjs(clickInfo.event.end))

  setCalendarEventForm({
    title: clickInfo.event.title || '',
    start: dayjs(clickInfo.event.start),
    end: dayjs(clickInfo.event.end),
  
  });



}


  const events=[
    
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2021/5/2 09:30"),
      end: new Date("2021/5/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2021/8/11 10:00"),
      end: new Date("2024/8/11 15:58"),
    },
  ]



useEffect(() => {
  let DraggableEelement = document.getElementById('draggable-el')


  
 if (DraggableEelement) {
  new Draggable(DraggableEelement ,{
    eventData: function (eventEl) {
      let title = eventEl.getAttribute("title")
      let id = eventEl.getAttribute("data")
      let start = eventEl.getAttribute("start")
      return { title, id, start }
    }
  })
 }
}, []);


// const handleEventClick = () => {
//   // Prevent any default modal behavior
//   return false;
// };
  return (
    <>

 
{loading &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }


     <div className='bg-white h-screen'>
      <div className='col-span-8'>
        <CalendarEventDeleteAlert    handleCloseDeleteAlert={handleCloseDeleteAlert} openDeleteAlert={openDeleteAlert}/>
        <CalendarEventUpdate openUpdateAlert={openUpdateAlert} handleCloseUpdateAlert={handleCloseUpdateAlert} />
        <CalendarEvent  handleChangeDateTime1={handleChangeDateTime1}   handleChangeDateTime2={handleChangeDateTime2} 
        isOpen={isOpen} handleChange={handleChange} 
         calendarEventForm={calendarEventForm} setIsOpen={setIsOpen} handleCreateEvent={handleCreateEvent} />

<CalendarEventAddAlert openAddition={openAddition} handleCloseAddition={handleCloseAddition}/>

<CalendarErrorAlert  openErrorAlert={openErrorAlert} handleCloseErrorAlert={handleCloseErrorAlert}/>
        <ViewEvent   calendarEventForm={calendarEventForm} handleChange={handleChange} 
         eventId={eventId} handleDeleteEvent={handleDeleteEvent}
          start={start} end={end} title={title}  isOpenDelete={isOpenDelete} handleChangeDateTime1={handleChangeDateTime1} 
            handleChangeDateTime2={handleChangeDateTime2}  
        setisOpenDelete={setisOpenDelete} 
        handleUpdateEvent={handleUpdateEvent}/>

<IconButton onClick={() => navigate(-1)} style={{ marginBottom: '10px' }}>
        <ArrowBackIcon  className='text-black'/>
      </IconButton>

      <FullCalendar
       nowIndicator={true}
editable={true}

dateClick={handleDateClick}
droppable={true}
selectable={true}
selectMirror={true}
eventClick={handleEventClick}
headerToolbar={{
  left: 'prev,next today',
  center: 'title',
  right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
}}


height="100%" // Set the calendar height to 100% of the container
width="50%"
windowResize={true}
aspectRatio={1.5} // Controls the width/height ratio for larger screens
contentHeight="auto" // Makes the height dynamic based on the container
        plugins={[  dayGridPlugin,
          interactionPlugin,
          timeGridPlugin ]}
  view="week"

events={calendarEvents}


  // events={[
  //   {
  //     event_id: 1,
  //     title: "Event 1",
  //     start: new Date("2024/8/11 09:30"),
  //     end: new Date("2024/8/11 4:30"),
  //   },
  //   {
  //     event_id: 2,
  //     title: "Event 2",
  //     start: new Date("2021/5/4 10:00"),
  //     end: new Date("2024/8/10 11:00"),
  //   },
  // ]}
/>
</div>
   
          </div>

    </>
  )
}

export default GarabageCollectionSchedule







