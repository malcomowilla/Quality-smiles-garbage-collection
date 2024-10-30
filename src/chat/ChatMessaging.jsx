
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




const ChatMessaging = () => {

    const {user_name, id, chat_user_name} = useApplicationSettings()

const [admins, setAdmins] = useState([])
const [isSeenChat, setIsSeenChat] = useState(false)
const [showEmoji, setShowEmoji] = useState(false)
const [text, setText] = useState('')
const [selectedAdmin, setSelectedAdmin] = useState(null)
const messagesEndRef = useRef(null);
const [messages, setMessages] = useState([])
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

const [search, setSearch] = useState('')
const [searchInput] = useDebounce(search, 1000)


const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

console.log('messagess=>', messages.today)

useEffect(() => {
    scrollToBottom();
}, [messages]);


const fetchMessages = useCallback(
  async () => {

    try {
        const response = await fetch(`/api/chat_messages`);
        if (response.ok) {
            const fetchedMessages = await response.json();
            // setMessages(fetchedMessages.today);
            setMessageYesterday(fetchedMessages.yesterday);
            setMessages(fetchedMessages.today.filter((the_message)=> {
              return search.toLowerCase() === '' ? the_message : the_message.content.toLowerCase().includes(search)
            }))

            // const filteredMessages = fetchedMessages.today.filter((the_message)=> {
            //   return the_message.content
            // })

            // console.log("filtered messages=>",filteredMessages)
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
  },
  [search],
)


useEffect(() => {
    fetchMessages()
   
}, [fetchMessages]);



const cable = createConsumer("ws://localhost:4000/cable");
const cableTypingChannel = createConsumer("ws://localhost:4000/cable");
  useEffect(() => {
   const subscription = cable.subscriptions.create("MessageChannel", {
    connected() {
        console.log("Connected to private WebSocket!");
      },
      received(data) {
        console.log("Message received:", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        // Handle incoming message
      },
      disconnected() {
        console.log("Disconnected from private WebSocket!");
      },
     
   });

   return () => {
     subscription.unsubscribe();
   };
 }, [cable.subscriptions]);






const newSubscription = cableTypingChannel.subscriptions.create("TypingChannel", {
  connected() {
    console.log("Connected to the Typing Channel");
  },
  received(data) {
    console.log("Message received typing channel:", data);
    setIsTyping(data.action)
    setUserTyping(data.user)
    // Handle incoming message
  },
  disconnected() {
    console.log("Disconnected from the Typing Channel");
  },
  sendTyping(user) {
    newSubscription.perform("typing", { user: user });
  },
  stopTyping() {
    newSubscription.perform("stop_typing");
  },
});






  
  // Define handleTyping outside of useEffect so it's accessible
  const handleTyping = (user) => {
    if (newSubscription) {
      newSubscription.sendTyping(user);

      if (typingTimeout) clearTimeout(typingTimeout);

      setTypingTimeout(
        setTimeout(() => {
          newSubscription.stopTyping();
        }, 3000) // Stops typing after 3 seconds of inactivity
      );
    }
  };

 


const sendMessage = async () => {
    if (!text.trim()) return;
            try {
                const response = await fetch('/api/send_chat_message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        content: text,
                        // receiver_id: receiver_id.id,
                        receiver_id: selectedAdmin?.id,
                        sender_id: id,
                        // room: selectedAdmin?.id 
                      }),
                },
            
            
            )


                if (response.ok) {
                    setText('')
                } else{
                    setText('')
                }
            } catch (error) {
                console.log(error)
                setText('')
            }
}


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
    for (i = 0; i < string.length; i += 1) {
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
  
    const nameParts = name.split(' ').filter(Boolean)
  
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameParts.length > 1  ? 
  `${nameParts[0][0]}${nameParts[1][0]}` 
       : nameParts.length === 1
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
<main className="content  relative z-50  ">
    <div className="container mx-auto p-0">

        <h1 className="text-2xl font-semibold mb-3 dark:text-black text-white kalam-bold">Messages</h1>

        <div className="card  rounded-lg shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-5/12 lg:w-3/12">

                    <div className="px-4 hidden md:block">
                        <div className="flex items-center">
                            <input type="text" 
                            value={search} onChange={(e)=> setSearch(e.target.value)}
                            className="form-input my-3 text-black w-full rounded-lg
                             border-gray-300 focus:ring-green-700 focus:border-green-700" placeholder="Search..."/>
                        </div>
                    </div>

                    


                    <hr className="block md:hidden my-1 border-t border-black"/>
                </div>
               

<div className="w-full md:w-7/12 lg:w-9/12">

                
                                
                                
<div className={`py-2 px-4   `}>
    <div className="flex items-center py-1">
        
        <div className="relative">
                                           
        <Avatar style={{width: 60, height: 60, color: 'white',
                                    
                                }}    {...stringAvatar(user_name)} />

             
        </div>


        
        <div className="flex-grow pl-3 kalam-light text-black text-xl">
            {/* <strong>{selectedAdmin.user_name}</strong> */}
            <div className="text-lg text-black  "><em className='text-green-600'> {userTyping} {isTyping}</em></div>
        </div>
        <div className="flex space-x-2">
            <button className="btn btn-primary btn-lg mr-1 px-3 bg-green-500
             text-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="feather feather-phone feather-lg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 
                    19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2
                     0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 
                     16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 
                     0 0 1 22 16.92z"></path>
                </svg>
            </button>
            <button className="btn btn-info btn-lg mr-1 px-3 bg-green-400 text-white rounded-lg hidden md:inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video feather-lg">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
            </button>
          
        </div>
    </div>
</div>

{/* https://bootdey.com/img/Content/avatar/avatar1.png */}
{/* https://bootdey.com/img/Content/avatar/avatar2.png */}


<div className="relative">


    <div className="chat-messages p-4 space-y-4  h-96 cursor-pointer">
  

<div className='flex justify-end'>
            <p className='dark:text-black edu-au-vic-wa-nt-guides text-xl  text-white font-thin'>Yesterday</p>

            </div>

{messageYesterday.map((my_m, index) => (

        <div key={index} className={`flex ${my_m.sender.user_name === chat_user_name ?
         'justify-end' : 'justify-start'} kalam-light text-black`}>

           


            <div className="flex-shrink-0">
             <Avatar style={{width: 60, height: 60, color: 'white',
                                    
                                }}    {...stringAvatar(my_m.sender.user_name )} />

                <div className={`text-sm text-black ${my_m.sender.user_name === chat_user_name ? 
                    'text-right' : 'text-left'} mt-2 `}>
                       <p className='text-white dark:text-black'> {my_m.formatted_date_time_of_message} </p>
                        
                        </div>

            </div>
  <div className={`chat ${my_m.sender.user_name === chat_user_name ? 'chat-start' : 'chat-end'}`}
   onMouseEnter={() => setIsHovered1(true)}
   onMouseLeave={() => setIsHovered1(false)}
  >
{isHovered1 && <MdCancel className="text-red-600 text-xl" />}
                <div className={`chat-bubble ${my_m.sender.user_name === 
                    chat_user_name ? 'chat-bubble-accent' : 'chat-bubble-success'}`}>

                    <p className='font-bold text-black'>
                       {my_m.sender.user_name === chat_user_name 
                          ? <p className='text-xl'> You</p>
                          :<p className='text-xl'> {my_m.sender.user_name} </p>
                          }
                       </p>
                    <p className='text-lg'>{my_m.content} </p>
                </div>
                
            </div>
        </div>


))}






<div className='flex justify-end  '>
            <p className='dark:text-black edu-au-vic-wa-nt-guides text-xl
             font-thin text-white '>Today</p>

            </div>


  {messages.map((my_m, index) => (

        <div ref={messagesEndRef} key={index} className={`flex ${my_m.sender.user_name === chat_user_name ?
         'justify-end ' : 'justify-start'} kalam-light text-black `}>

           


            <div className="flex-shrink-0">
             <Avatar style={{width: 60, height: 60, color: 'white',
                                    
                                }}    {...stringAvatar(my_m.sender.user_name )} />

                <div className={`text-sm text-black ${my_m.sender.user_name === chat_user_name ? 
                    'text-right' : 'text-left'} mt-2`}>
                        
                        <p className='dark:text-black text-white'>{my_m.formatted_date_time_of_message } </p>
                        
                        </div>

            </div>
  <div className={`chat  ${my_m.sender.user_name === chat_user_name
   ? 'chat-start' : 'chat-end'} `}
   onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
   >
    {isHovered && <MdCancel className="text-red-600 text-xl" />}
  


                <div className={`chat-bubble ${my_m.sender.user_name === 
                    chat_user_name ? 'chat-bubble-accent' : 'chat-bubble-success'}`}>

                       

                    <p className='font-bold text-black'>
                       {my_m.sender.user_name === chat_user_name 
                          ? <p className='text-xl'> You</p>
                          :<p className='text-xl'> {my_m.sender.user_name} </p>
                          }
                       </p>
                    <p className='text-lg'>{my_m.content} </p>
                </div>
                
            </div>
        </div>


))}
    </div>


    
</div>
</div>


        
               
                
            </div>
        </div>
    </div>
    

    
<div  className='mt-20'>
   
    

    <div className="flex items-center max-w-sm mx-auto ">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">



    {showEmoji ? (
<div className='fixed lg:inset-y-[300px] sm:inset-y-[700px] '>
  <MdCancel  className='text-black text-2xl cursor-pointer' onClick={handleEmojiSelect}  
  
  
  
  />


         <Picker data={data} 
         
         emojiSize={20}

         onEmojiSelect= {(e) => {
            addEmoji(e)
            // handleEmojiSelect()
         }}
       
         />
    </div>
): null}



<div className='fixed bottom-0 right-0 z-50 p-4' onClick={sendMessage}>


<IoSendSharp    
    className={`text-green-800 text-5xl pl-3 cursor-pointer w-10 h-10  hover:scale-125
         transition duration-500 transform ${
        text.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    aria-label="Send message"
    role="button"
    disabled={text.trim() === ''}/>
</div>


<div className='fixed bottom-0 left-0 right-0 shadow-lg p-4 z-10'>
<div  onClick={()=> setShowEmoji(!showEmoji)} className="absolute inset-y-0 start-0 
        flex items-center ps-3 cursor-pointer ">
        <BsEmojiSmile 
        className='text-black bg-yellow-400 text-xl rounded-full ml-2' />
        </div>

        {/* onChange={(e)=> setText(e.target.value)} */}

<TextareaAutosize value={text}

// onKeyUp={() => handleTyping("Current User")}
onKeyPress={(e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
   }
}}

onChange={(e) =>   {
  handleTyping(user_name)
setText(e.target.value)
}}

 className="bg-gray-50 border
         border-gray-900 text-black 
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w- ps-10 p-2.5  
         dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-500
          dark:focus:border-green-500 " placeholder="Type Message..." autoFocus />
</div>
       
    </div>
     
</div>
</div>
</main>


   </>
  )
}

export default ChatMessaging
