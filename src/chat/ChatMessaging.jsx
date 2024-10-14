
import { CgProfile } from "react-icons/cg";

import {useEffect, useCallback, useState, useRef} from 'react'
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


const ChatMessaging = () => {

    const {user_name} = useApplicationSettings()

const [admins, setAdmins] = useState([])
const [isSeenChat, setIsSeenChat] = useState(false)
const [showEmoji, setShowEmoji] = useState(false)
const [text, setText] = useState('')
const [selectedAdmin, setSelectedAdmin] = useState(null)
const messagesEndRef = useRef(null);
const [messages, setMessages] = useState('')



const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
    scrollToBottom();
}, [messages]);

// onChange={(e) => setText(e.target.value)}
//                     onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                             e.preventDefault();
//                             sendMessage();
//                         }
//                     }}
//                     className="bg-gray-50 border border-gray-900 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
//                     placeholder="Type your message..."
//                     required
//                     autoFocus
//                 />



const sendMessage = async() => {

            try {
                
            } catch (error) {
                
            }
}


const handleSelectAdmin = (my_admin)=> {
setSelectedAdmin(my_admin)
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
    /* eslint-enable no-bitwise */
  
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
    try {
        const response = await fetch('/api/get_admins')
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
  [],
)

useEffect(() => {
    
    fetchAdmins()
}, [fetchAdmins]);

    





  return (
   <>
<main className="content bg-chat-image relative z-50 h-screen  ">
    <div className="container mx-auto p-0">

        <h1 className="text-2xl font-semibold mb-3 text-black kalam-bold">Messages</h1>

        <div className="card  rounded-lg shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-5/12 lg:w-3/12">

                    <div className="px-4 hidden md:block">
                        <div className="flex items-center">
                            <input type="text" 
                            className="form-input my-3 text-black w-full rounded-lg
                             border-gray-300 focus:ring-green-700 focus:border-green-700
                             " placeholder="Search..."/>
                        </div>
                    </div>

                    <div className="list-group ">
                        {admins.map((admin)=> (
                             <button
                             onClick={()=> handleSelectAdmin(admin)}
                             key={admin.id} 
                             
                             className={`list-group-item list-group-item-action border-0 
                                flex items-center space-x-3 py-2 rounded-md w-full text-left ${
                                selectedAdmin && selectedAdmin.id === admin.id ? 'bg-green-300' : 
                                ''
                            }`}
                              
                              >
                             <div className="relative">
                                
                                 <Avatar style={{width: 60, height: 60, color: 'white',
                                    
                                 }}    {...stringAvatar(admin.user_name)} />

                             </div>
                             <div className="flex-grow ml-3">
                                 <span className="font-semibold text-black
                                  p-6">{admin.user_name}</span>
                                 <div className="text-sm text-black">
                                     <span className="fas fa-circle text-green-500"></span> Online</div>
                             </div>
                         </button>
                        )) }
                       
                        
                        {/* <a href="#" className="list-group-item list-group-item-action border-0 
                        flex items-center space-x-3 py-2">
                            <div className="relative">
                                <span className="absolute top-0 right-0 bg-green-500 text-white 
                                text-xs px-2 py-0.5 rounded-full">2</span>
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                 className="rounded-full" alt="William Harris" width="40" height="40"/>
                            </div>
                            <div className="flex-grow ml-3">
                                <span className="font-semibold text-black">William Harris</span>
                                <div className="text-sm text-black"><span className="fas fa-circle text-green-500"></span> Online</div>
                            </div>
                        </a>

                        <a href="#" className="list-group-item list-group-item-action border-0 flex items-center space-x-3 py-2">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" 
                            className="rounded-full" alt="Sharon Lessman" width="40" height="40"/>
                            <div className="flex-grow ml-3">
                                <span className="font-semibold text-black">Sharon Lessman</span>
                                <div className="text-sm text-black"><span className="fas fa-circle
                                 text-green-500"></span> Online</div>
                            </div>
                        </a>

                        <a href="#" className="list-group-item list-group-item-action border-0 flex items-center space-x-3 py-2">
                            <img src="https://bootdey.com/img/Content/avatar/avatar4.png"
                             className="rounded-full" alt="Christina Mason" width="40" height="40"/>
                            <div className="flex-grow ml-3">
                                <span className="font-semibold text-black">Christina Mason</span>
                                <div className="text-sm  text-black"><span className="fas fa-circle text-red-500"></span> Offline</div>
                            </div>
                        </a> */}
                    </div>
                   


                    <hr className="block md:hidden my-1 border-t border-black"/>
                </div>


      


                {isSeenChat && selectedAdmin ? (
                                     <div className="w-full md:w-7/12 lg:w-9/12">

                
                                
                                
                                     <div className={`py-2 px-4   `}>
                                         <div className="flex items-center py-1">
                                             
                                             <div className="relative">
                                                 <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                  className="rounded-full" alt="Sharon Lessman" width="40" height="40"/>
                                             </div>
                 
                 
                                             
                                             <div className="flex-grow pl-3 kalam-light text-black text-xl">
                                                 <strong>{selectedAdmin.user_name}</strong>
                                                 <div className="text-lg text-black  "><em>Typing...</em></div>
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
                 
                                     <div className="relative">
                                         <div className="chat-messages p-4 space-y-4 overflow-y-auto h-96">
                 
                                             <div className="flex justify-end kalam-light text-black">
                                                 <div className="flex-shrink-0">
                                                     <img src="https://bootdey.com/img/Content/avatar/avatar1.png" 
                                                     className="rounded-full" alt="Chris Wood" width="40" height="40"/>
                                                     <div className="text-sm text-black text-right mt-2">2:33 am</div>
                                                 </div>
                                                 <div className="chat chat-start">
                                                     {/* <div className=" chat-bubble chat-bubble-accent">You</div> */}
                 
                                                     <div className=" chat-bubble chat-bubble-accent">
                                                         <p className='font-bold'>You</p>
                                                     Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                                                     </div>
                                                     
                                                 </div>
                                             </div>
                 
                                             <div className="flex justify-start kalam-light text-black">
                                                 <div className="flex-shrink-0">
                                                     <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                      className="rounded-full" alt="Sharon Lessman" width="40" height="40"/>
                                                     <div className="text-sm text-black text-left mt-2">2:34 am</div>
                                                 </div>
                                                 <div className="chat chat-end">
                                                     {/* <div className="font-semibold mb-1 chat-bubble chat-bubble-success">
                                                         Sharon Lessman</div> */}
                 
                                                         
                 
                                                     <div className='chat-bubble chat-bubble-success'>
                                                     <p className='font-bold'>Sharon Lessman</p>
                                                     Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                                                     </div>
                                                     
                 
                 
                                                 </div>
                                             </div>
                 
                                         </div>
                                     </div>
                                 </div>
                 
                                ):   <div className='flex justify-center items-center mx-auto relative z-0'>
                                {/* <img src="/public/images/logo/logo-small.png"  className='w-[1500px] h-screen  rounded-full' alt="" /> */}
                                <BsChatRightText   className=' w-full font-extralight h-[500px] '/>
                                    </div> }

               
                
            </div>
        </div>
    </div>
    

{isSeenChat && selectedAdmin ? (
    
<div  className='mt-20'>
   
    

    <div className="flex items-center max-w-sm mx-auto ">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">

{showEmoji ? (
<div className='absolute inset-y-14'>
         <Picker data={data} 
         
         emojiSize={20}

         onEmojiSelect= {(e) => {
            addEmoji(e)
            handleEmojiSelect()
         }}
        //  onEmojiSelect={ ()=>
            
        //     addEmoji
            
        // }
         />
    </div>
): null}


        <div  onClick={()=> setShowEmoji(!showEmoji)} className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
        <BsEmojiSmile 
        className='text-black bg-yellow-400 text-xl rounded-full' />
        </div>



        <TextareaAutosize value={text}  onChange={(e)=> setText(e.target.value)} className="bg-gray-50 border
         border-gray-900 text-black
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  
         dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-500
          dark:focus:border-green-500 " placeholder="Search Message..." autoFocus />


        {/* <input type="text" value={text}  onChange={(e)=> setText(e.target.value)} className="bg-gray-50 border
         border-gray-900 text-black
        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  
         dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-green-500
          dark:focus:border-green-500 " placeholder="Search Message..." required /> */}
    </div>
     
    <IoSendSharp    onClick={sendMessage}
    className={`text-green-800 text-5xl pl-3 cursor-pointer hover:scale-125 transition duration-500 transform ${
        text.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    aria-label="Send message"
    role="button"
    disabled={text.trim() === ''}/>

    
   
</div>




{/* 
    <input  name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full 
    text-lg text-black bg-transparent border-0 border-b-2  appearance-none 
     border-gray-700 dark:focus:border-green-500 focus:outline-none focus:ring-0
      focus:border-green-600 peer "   placeholder='Type Message Here.......' required /> */}



</div>
): ''}




</main>


   </>
  )
}

export default ChatMessaging





