
import Lottie from 'react-lottie';


import {useCallback,  useState, useEffect} from 'react'
import TicketAnimation from '../animation/ticket.json'
import { FaHandPointLeft } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'

import dayjs from 'dayjs';

const TicketStatus = () => {
const navigate = useNavigate()
const [ticketStatus, setTicketStatus] = useState(null)
const [ticketNumber, setTicketNumber] = useState(null)
const [issueDescription, setIssueDescription] = useState(null)
const [priorityLevel, setPriorityLevel] = useState(null)
const [dateOfCreation, setDateOfCreation] = useState(null)



const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: TicketAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


const getCurrentCustomer = useCallback(


  async() => {

    try {
      const response = await fetch('/api/my_current_customer')
      const newData = await response.json()
      // const {status} = newData[0]
      // const customer_status

       const status = newData[0].customer.status
       const ticket_number = newData[0].customer.ticket_number
       const issue_description = newData[0].customer.issue_description
       const priority_level = newData[0].customer.priority
       const date_of_creation = newData[0].customer.date_of_creation


       setDateOfCreation(dayjs(date_of_creation).format('YYYY-MM-DD HH:mm:ss A'))
      setTicketStatus(status)
       setTicketNumber(ticket_number)
       setIssueDescription(issue_description)
       setPriorityLevel(priority_level)
      console.log('customer data',status)
    } catch (error) {
      console.log(error)
    }
  },
  [],
)




useEffect(() => {
  getCurrentCustomer()
  return () => {
    
  };
}, [getCurrentCustomer]);

  return (
    <div className='w-full h-screen grid grid-auto-fit  items-center bg-white'>
      
      <Lottie options={defaultOptions} width={300} height={300}/>


      <div onClick={()=> navigate(-1)} className='cursor-pointer'>
      <FaHandPointLeft className='w-8 h-8 text-black'/>
      <p className='font-light text-black'>Go Back</p>
      </div>
      

      <div className='flex justify-center'>
        
        <ul className='max-sm:text-sm'>
        <li className='font-light text-black'>Ticket Status: <span className='font-extrabold'>{ticketStatus}</span></li>

<li className='font-light text-black'>Ticket Number: <span className='font-extrabold'>{ticketNumber}</span></li>
<li className='font-light text-black '> Date Created: <span className='font-extrabold'> {dateOfCreation}  </span></li>
<li className='font-light text-black'> Issue Summary: <span className='font-extrabold'>{issueDescription} </span></li>
<li className='font-light text-black'> Priority Level: <span className='font-extrabold'>{priorityLevel} </span> </li>
        </ul>
        
      </div>
    </div>
  )
}

export default TicketStatus







































