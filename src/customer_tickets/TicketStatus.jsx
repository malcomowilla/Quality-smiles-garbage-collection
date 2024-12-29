import Lottie from 'react-lottie';
import {useCallback,  useState, useEffect} from 'react'
import TicketAnimation from '../animation/ticket.json'
import { FaHandPointLeft } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white
    flex justify-center items-center">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600"
        >
          <FaHandPointLeft className=" max-sm:text-4xl sm:text-3xl 
           max-md:text-5xl" />
          <span className='text-2xl'>Back</span>
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 flex-1 text-center">
          Ticket Status
        </h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <div className="pt-16 px-4 pb-6 max-w-lg mx-auto">
        {/* Animation */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Lottie options={defaultOptions} width={200} height={200} />
          </motion.div>
        </div>

        {/* Ticket Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-2xl">Status</span>
              <span className={`px-3 py-1 rounded-full text-2xl font-medium
                ${ticketStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 text-2xl' :
                  ticketStatus === 'Resolved' ? 'bg-green-100 text-green-800 text-2xl' :
                  'bg-blue-100 text-blue-800 text-2xl'}`}>
                {ticketStatus}
              </span>
            </div>

            {/* Ticket Number */}
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-gray-600 text-2xl">Ticket Number</span>
              <span className="font-medium text-gray-900 text-2xl">{ticketNumber}</span>
            </div>

            {/* Creation Date */}
            <div className="flex items-center justify-between border-t pt-4 space-x-8">
              <span className="text-gray-600 text-2xl">Created</span>{' '} 
              <span className="font-medium text-gray-900 text-2xl">{dateOfCreation}</span>
            </div>

            {/* Priority Level */}
            <div className="flex items-center justify-between border-t pt-4 ">
              <span className="text-gray-600 text-2xl">Priority</span>
              <span className={`px-3 py-1 rounded-full text-2xl font-medium
                ${priorityLevel === 'High' ? 'bg-red-100 text-red-800' :
                  priorityLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}`}>
                {priorityLevel}
              </span>
            </div>

            {/* Issue Description */}
            <div className="border-t pt-4">
              <span className="text-gray-600 block mb-2
              font-bold text-2xl">Issue Description</span>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-2xl">
                {issueDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 text-center mt-6">
          We'll notify you when there are updates to your ticket
        </p>
      </div>
    </div>
  )
}

export default TicketStatus







































