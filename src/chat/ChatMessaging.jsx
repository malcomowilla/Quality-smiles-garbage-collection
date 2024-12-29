import { CgProfile } from "react-icons/cg";

import {useEffect, useCallback, useState, useRef, useMemo} from 'react'
import { IoSendSharp } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { BiMessageDots } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import TextareaAutosize from 'react-textarea-autosize';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsChatRightText } from "react-icons/bs";
import { createConsumer } from '@rails/actioncable';
import { MdCancel } from "react-icons/md";
import { useDebounce } from 'use-debounce';
import './styles.css';
import useSound from 'use-sound';
import notificationSound from '/751326__robinhood76__13129-mystery-cash-bonus.wav'; // Add your sound file
import { useNotifications } from '../context/NotificationContext';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion"
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { TiArrowBackOutline } from "react-icons/ti";
import { FiUserX } from 'react-icons/fi';
import { AiOutlineDelete } from "react-icons/ai";

const ChatMessaging = () => {

    const {user_name, id, chat_user_name,
      messages, setMessages,isCurrentUser,notificationsEnabled,
       setNotificationsEnabled,isWindowFocused, setIsWindowFocused,
       conversationId

    } = useApplicationSettings()

const [admins, setAdmins] = useState([])
const [isSeenChat, setIsSeenChat] = useState(false)
const [showEmoji, setShowEmoji] = useState(false)
const [text, setText] = useState('')
const [selectedAdmin, setSelectedAdmin] = useState(null)
const messagesEndRef = useRef(null);
const [hasMoreAdmins, setHasMoreAdmins] = useState(true);
const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
const [admin_id, setAdminId] =useState('')
const [receiver_id, setReceiverId] = useState('')
const [sender_id] = useState(id)
const [messageYesterday, setMessageYesterday] = useState([])
const [isHovered, setIsHovered] = useState(false);
const [isHovered1, setIsHovered1] = useState(false);
const [isTyping, setIsTyping] = useState('');
const [userTyping, setUserTyping] = useState('')
const [typingTimeout, setTypingTimeout] = useState(null);
const [subscription, setSubscription] = useState(null);
const [openChat, setOpenChat] = useState(false)
const [conversationCustomers, setConversationCustomers] = useState([])
const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)
const [selectedCustomerName, setSelectedCustomerName] = useState('')
const [selectedCustomerId, setSelectedCustomerId] = useState(null);
const [convidFetch, setConvidFetch] = useState(null)
const handleCustomerSelection = (customerId) => {
  setSelectedCustomerId(customerId);
  fetchMessages(customerId)
  
  console.log('Selected customer ID:', customerId);
}



console.log('Conversation ID fetch:', convidFetch)
;
const [conversation, setConversation] = useState('')
const [openCustomerList, setOpenCustomerList] = useState(true)

const [playNotification] = useSound(notificationSound, { volume: 10.5 });
const { addNotification } = useNotifications();


function generateAvatar(name) {
  const avatar = createAvatar(lorelei, {
    seed: name, // Use the customer's name as the seed
    // Customize options for the lorelei style
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'], // Example: random background colors
    radius: 50, // Rounded corners
    size: 64, // Size of the avatar
  });

  // Generate the SVG as a data URL
  return `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`;
}







useEffect(() => {
  const getConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      if (response.ok) {
        console.log('conversations', data)
        setConversationCustomers(data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };
  getConversations()
}, []);









// Check notification permission on component mount
useEffect(() => {
  const checkNotificationPermission = async () => {
    if (Notification.permission === 'granted') {
      console.log('notifications enabled')
      setNotificationsEnabled(true);
    }
  };
  checkNotificationPermission();
}, []);

// Notification toggle button component
const NotificationButton = () => (
  <button
    onClick={requestNotificationPermission}
    className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
    title={notificationsEnabled ? "Notifications enabled" : "Enable notifications"}
  >
    {notificationsEnabled ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    )}
  </button>
);

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    setNotificationsEnabled(permission === 'granted');
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

console.log('messagess=>', messages.today)

useEffect(() => {
    scrollToBottom();
}, [messages]);


const fetchMessages = useCallback(
  async (customerId) => {

    try {
        const response = await fetch(`/api/chat_messages?customer_id=${customerId}`,);


      if (response.status === 403) {
        toast.error('You are not authorized to view chat messages', {
          duration: 5000, // Duration in milliseconds (3 seconds)
          position: "top-center",
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          },
        })
      }

        if (response.ok) {
            const data = await response.json();
            setConversation(data.conversation_id);
            setConvidFetch(data.conversation_id)
            // localStorage.setItem('conversation_id_admin', data.conversation_id.toString())
            localStorage.setItem('conversation_id_admin', data.conversation_id)
            setMessages(data.today || []);
            setMessageYesterday(data.yesterday || []);
            subscribeToConversation()
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
  },
  [search],
)


// useEffect(() => {
//     fetchMessages()
   
// }, [fetchMessages]);




const cable = createConsumer(`ws://localhost:4000/cable`);
//   useEffect(() => {
//    const subscription = cable.subscriptions.create("MessageChannel", {
//     connected() {
//         console.log("Connected to private admin chat  WebSocket!");
//       },
//       received(data) {
//         console.log("Message received:", data);
//         setMessages((prevMessages) => [...prevMessages, data]);
        
//         // Add notification
//         if (!isCurrentUser(data)) {
//           addNotification({
//             sender: data.sender_info?.name || 'Unknown',
//             message: data.content,
//             time: new Date().toLocaleTimeString(),
//           });
          
//           // Play sound if window not focused
//           if (!isWindowFocused && notificationsEnabled) {
//             playNotification();
//           }
//         }
//       },
//       disconnected() {
//         console.log("Disconnected from private admin chat  WebSocket!");
//       },
     
//    });

//    return () => {
//      subscription.unsubscribe();
//      // Reset title when component unmounts
//     //  document.title = "Chat";
//    };
//  }, [cable.subscriptions, isWindowFocused, notificationsEnabled,
//    playNotification, addNotification, isCurrentUser, setMessages]);






// const newSubscription = cableTypingChannel.subscriptions.create("TypingChannel", {
//   connected() {
//     console.log("Connected to the Typing Channel");
//   },
//   received(data) {
//     console.log("Message received typing channel:", data);
//     setIsTyping(data.action)
//     setUserTyping(data.user)
//     // Handle incoming message
//   },
//   disconnected() {
//     console.log("Disconnected from the Typing Channel");
//   },
//   sendTyping(user) {
//     newSubscription.perform("typing", { user: user });
//   },
//   stopTyping() {
//     newSubscription.perform("stop_typing");
//   },
// });






  
//   // Define handleTyping outside of useEffect so it's accessible
//   const handleTyping = (user) => {
//     if (newSubscription) {
//       newSubscription.sendTyping(user);

//       if (typingTimeout) clearTimeout(typingTimeout);

//       setTypingTimeout(
//         setTimeout(() => {
//           newSubscription.stopTyping();
//         }, 3000) // Stops typing after 3 seconds of inactivity
//       );
//     }
//   };

const conversationIdAdmin = parseInt(localStorage.getItem('conversation_id_admin'));
console.log('Subscribing to conversation ID admin:', conversationIdAdmin);
 
const subscribeToConversation = () => {
    const conversationIdAdmin = parseInt(localStorage.getItem('conversation_id_admin'));
  const conversation = cable.subscriptions.create(
    {
      channel: "MessageChannel",
      
      conversation_id:  conversationIdAdmin || conversationId
    },
    {
      connected() {
        console.log("Connected to conversation!");
      },
      received(data) {
        console.log("message admin is receiving1", data);
        setMessages(prev => [...prev, data]);
      },
      disconnected() {
        console.log("Disconnected from conversation!");
      },
    }
  );

  setSubscription(conversation);
}

useEffect(() => {
  return () => {
    if (subscription) {
      subscription.unsubscribe();
    }
  };
}, [subscription]);


const sendMessage = async () => {
  if (!text.trim()) return;
  
  if (text.trim()) {
    subscription.perform("receive", { content: text,
      customer_id: selectedCustomerId,
      conversation_id: conversationIdAdmin || conversationId
     });
    setText('');
  }
  try {
    const response = await fetch('/api/send_chat_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text,
        customer_id: selectedCustomerId
      }),
    });
if (response.status === 403) {
  toast.error('You are not authorized to send messages', {
    duration: 5000, // Duration in milliseconds (3 seconds)
    position: "top-center",
    style: {
      background: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      borderRadius: "5px",
      padding: "10px",
      fontSize: "16px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
  })
}

if (response.status === 503) {
  const data = await response.json();
  toast.error(
    <p>{data.error} <span>
      reason: {data.message}
      </span> </p>,
    {
      duration: 10000, // Duration in milliseconds (3 seconds)
      position: "top-center",
      style: {
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "16px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      },
    }

  )
}

    if (response.ok) {
      const data = await response.json();
      // Backend assigns the admin and returns conversation details
      if (!selectedAdmin) {
        setSelectedAdmin(data.admin);
        // setMessages((prevMessages) => [...prevMessages, data])
        // Subscribe to the conversation channel
        subscribeToConversation(data.conversation_id);
      }
      setText('');
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};



const handleSelectAdmin = (my_admin)=> {
setSelectedAdmin(my_admin)
setAdminId(my_admin)
setReceiverId(my_admin)

setIsSeenChat(true)
// fetchMessages(my_admin.id)
}


const handleEmojiSelect = ()=>{
    setShowEmoji(false)
}

const addEmoji = (e) => {
    const sym = e.unified.split("_")
    const codeArray = []
    sym.forEach((el)=>  codeArray.push("0x" + el))
    let emoji = String.fromCodePoint(...codeArray)
    setText(text + emoji)
}


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  

  function stringAvatar(name) {
  
    const nameParts = name?.split(' ').filter(Boolean)
  
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameParts?.length > 1  ? 
  `${nameParts[0][0]}${nameParts[1][0]}` 
       : nameParts?.length === 1
       ? `${nameParts[0][0]}` 
       : '?',  // Fallback
      
    //   `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }
  


const fetchAdmins = useCallback(

    
  async() => {

    if (isLoadingAdmins || !hasMoreAdmins) return; // Prevent multiple fetches

    setIsLoadingAdmins(true);
    try {
        const response = await fetch('/api/get_my_admins')
const newData = await response.json()
        if (response.ok) {
            console.log('adminss', newData)
            setAdmins(newData)
        } else {
            console.log('error fetching admins')
        }
    } catch (error) {
        console.log(error)
    }
  },
  [isLoadingAdmins, hasMoreAdmins],
)

useEffect(() => {
    
    fetchAdmins()
}, [fetchAdmins]);

    

// let customerSupport = admins.filter((admin)=> {
//     return admin.role === "customer_support"
// })


// bg-chat-image
  return (

    <>


{conversationCustomers.length === 0 && (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="flex flex-col items-center justify-center h-full text-center p-4"
  >
    <motion.div
      className="mb-4"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }}
    >
      <FiUserX className="w-24 h-24 text-black" />
    </motion.div>
    <p className="text-lg font-semibold text-black mb-2">No Customers Conversations</p>
    <p className="text-sm text-gray-600">
      It looks like there are no conversations in your list. 
      Please check back later or refresh the page.
    </p>
  </motion.div>
)}






{openCustomerList &&  (

<div className="space-y-4 p-4 cursor-pointer" onClick={() => {
setOpenChat(true)
setOpenCustomerList(false)
} }>
      {conversationCustomers.map((customer) => (
        <motion.ul
        onClick={() => handleCustomerSelection(customer.customer.id)}
          key={customer.id}
          className="bg-white shadow-md flex justify-between rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center p-4">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full"
                  src={generateAvatar(customer.customer.name)}
                  alt={`${customer.customer.name}'s avatar`}
                />
              </div>
              <div className="flex-1 min-w-0 ml-4">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {customer.customer.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {customer.customer.email}
                </p>
              </div>
            </div>
          </li>
          <AiOutlineDelete className='text-red-600 text-2xl ' onClick={() => handleCustomerSelection(customer.customer.id)}/>
        </motion.ul>
      ))}
    </div>
)}

     <Toaster />
    

     {openChat  &&  (
<>
          <div className="h-screen flex flex-col bg-black dark:bg-white">
          

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md
           px-4 py-3 w-full ">
            <div className="flex items-center py-1">
              <div className="relative">
                {/* <Avatar 
                  style={{
                    width: 45, 
                    height: 45, 
                    color: 'white',
                    transition: 'transform 0.2s'
                  }}    
                  {...stringAvatar(user_name)} 
                  className="hover:scale-105"
                /> */}

<img
                  className="w-12 h-12 rounded-full"
                  src={generateAvatar(user_name)}
                  alt={`${user_name}'s avatar`}
                />
                
              </div>
              <TiArrowBackOutline className='dark:text-white text-black w-12 h-12 cursor-pointer' onClick={() => {
                setOpenChat(false)
                setOpenCustomerList(true)

              }} />

              <div className="flex-grow pl-3 kalam-light ">
                <h2 className="text-lg font-semibold dark:text-white text-black">{user_name}</h2>
                {userTyping && (
                  <div className="text-sm text-green-600">
                    <em>{userTyping} {isTyping}</em>
                  </div>
                )}
              </div>
    
              <div className="flex space-x-2">
                <NotificationButton />
                <button className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-green-600 dark:text-green-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
               
              </div>
            </div>
          </div>
    
          <div className="flex-1 overflow-y-auto pt-20 pb-24 px-4 bg-chat-pattern" id="scrollableDiv">
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex justify-center my-4">
                <span className="bg-gray-200/80 dark:bg-gray-700/8 text-sm px-3 py-1
                 rounded-full backdrop-blur-sm ">
                  <p className="text-sm text-white dark:text-black">Yesterday</p>
                </span>
              </div>
    
              {/* {messageYesterday.map((my_m, index) => (


                
                <div key={index} 
                
                  className={`flex items-end space-x-2 ${
                    my_m.sender?.user_name === chat_user_name ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {my_m.sender?.user_name !== chat_user_name && (
                    // <Avatar 
                    //   style={{width: 32, height: 32}}    
                    //   {...stringAvatar(my_m.sender?.user_name)} 
                    //   className="mb-1"
                    // />
                    <img  
                    className="w-12 h-12 rounded-full"
                    src={generateAvatar(my_m.sender?.user_name )}
                    alt={`${my_m.sender?.user_name}'s av atar`}
                  />
                  )}  
                  <div className="max-w-[70%] group relative animate-fade-in">
                    <div className={`rounded-2xl px-4 py-2 shadow-sm ${
                      my_m.sender?.user_name === chat_user_name 
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-700 rounded-bl-none'
                    }`}>
                      <p className="text-sm leading-relaxed text-black dark:text-white">{my_m.content}</p>
                    </div>
                    <p className="text-xs text-white dark:text-black mt-1">
                      {my_m.formatted_time}
                    </p>
                  </div>
                </div>
              ))} */}


{messageYesterday.map((my_m) => {
  const isCurrentUser = my_m.sender?.user_name === chat_user_name;
  const senderName = my_m.sender_info?.type === "Customer" 
  ? my_m.sender_info?.name 
  : my_m.sender_info?.name// Use admin username for admin messages

  return (
    <div
      key={my_m.id} // Use a unique identifier like `id`
      className={`flex items-end space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isCurrentUser  && (
        <img
          className="w-12 h-12 rounded-full"
          src={generateAvatar(senderName)}
          alt={`${senderName || 'Unknown User'}'s avatar`}
        />
      )}
      <div className="max-w-[70%] group relative animate-fade-in">
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isCurrentUser
              ? 'bg-green-500 text-white rounded-br-none'
              : 'bg-white dark:bg-gray-700 rounded-bl-none'
          }`}
        >
          <p className="text-sm leading-relaxed text-black dark:text-white">
            {my_m.content || 'No content available'}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {my_m.formatted_time || 'Unknown time'}
        </p>
      </div>
    </div>
  );
})}

    
              <div className="flex justify-center my-4">
                <span className="bg-gray-200/80 dark:bg-gray-700/80 text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  
                  <p className="text-sm text-white dark:text-black">Today</p>
                </span>
              </div>
    
              {/* {messages.map((message, index) => (
                <div key={index} 
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                  className={`flex items-end space-x-2 ${
                    isCurrentUser(message) ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isCurrentUser(message) && (
                    // <Avatar 
                    //   style={{width: 32, height: 32}}    
                    //   {...stringAvatar(message.sender_info?.name)} 
                    //   className="mb-1"
                    // />


                    <img  
                    className="w-12 h-12 rounded-full"
                    src={generateAvatar(message.sender_info?.name )}
                    alt={`${message.sender_info?.name}'s av atar`}
                  />
                  )}  
                  <div className="max-w-[70%] group relative animate-fade-in">
                    <div className={`rounded-2xl px-4 py-2 shadow-sm ${
                      isCurrentUser(message)
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-700 rounded-bl-none'
                    }`}>
                      <p className="text-sm leading-relaxed text-black dark:text-white">{message.content}</p>
                    </div>
                    <p className="text-xs text-white dark:text-black mt-1">
                      {message.formatted_time}
                    </p>
                  </div>
                </div>
              ))} */}

{messages.map((message, index) => {
  const isCurrentUserMessage = isCurrentUser(message); // Function to check if the message is from the current user
  const senderName = message.sender_info?.type === "Customer" 
    ? message.sender_info?.name 
    : message.sender_info?.type === "Admin" ? message.sender_info?.name : message.sender_info?.name; // Use admin username for admin messages

  return (
    <div
      key={index}
      ref={index === messages.length - 1 ? messagesEndRef : null}
      className={`flex items-end space-x-2 ${
        isCurrentUserMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isCurrentUserMessage && (
        <img
          className="w-12 h-12 rounded-full"
          src={generateAvatar(senderName)}
          alt={`${senderName}'s avatar`}
        />
      )}
      <div className="max-w-[70%] group relative animate-fade-in">
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isCurrentUserMessage
              ? 'bg-green-500 text-white rounded-br-none'
              : 'bg-white dark:bg-gray-700 rounded-bl-none'
          }`}
        >
          <p className="text-sm leading-relaxed text-black dark:text-white">
            {message.content}
          </p>
        </div>
        <p className="text-xs text-white dark:text-black mt-1">
          {message.formatted_time}
        </p>
      </div>
    </div>
  );
})}




            </div>
          </div>
    
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t dark:border-gray-700 p-4 input-area-shadow">
            <div className="max-w-3xl mx-auto flex items-end space-x-2">
              <button 
                onClick={() => setShowEmoji(!showEmoji)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <BsEmojiSmile className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              
              <TextareaAutosize
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 dark:text-white text-black resize-none border-0 bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 
                  focus:ring-2 focus:ring-green-500 focus:outline-none min-h-[40px] max-h-32"
                placeholder="Type a message..."
                maxRows={4}
              />
              
              <button 
                onClick={sendMessage}
                disabled={text.trim() === ''}
                className={`p-3 rounded-full transition-all duration-200 ${
                  text.trim() === '' 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
                }`}
              >
                <IoSendSharp className="w-5 h-5" />
              </button>
            </div>
    
            {showEmoji && (
              <div className="absolute bottom-20 left-4 animate-slide-up">
                <div className="relative shadow-lg rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setShowEmoji(false)}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <MdCancel className="w-5 h-5 text-gray-500" />
                  </button>
                  <Picker 
                    data={data} 
                    emojiSize={20}
                    onEmojiSelect={addEmoji}
                    theme="light"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        </>
     )}



    </>
  )
}

export default ChatMessaging
