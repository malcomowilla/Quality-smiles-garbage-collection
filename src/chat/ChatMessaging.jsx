
import { CgProfile } from "react-icons/cg";

import {useEffect, useCallback, useState} from 'react'
import { IoSendSharp } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import {useApplicationSettings} from '../settings/ApplicationSettings'




const ChatMessaging = () => {

    const {user_name} = useApplicationSettings()

const [admins, setAdmins] = useState([])





const sendMessage = async() => {

            try {
                
            } catch (error) {
                
            }
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
<main className="content bg-chat-image relative z-50 ">
    <div className="container mx-auto p-0">

        <h1 className="text-2xl font-semibold mb-3 text-black kalam-bold">Messages</h1>

        <div className="card  rounded-lg shadow-sm">
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-5/12 lg:w-3/12 border-r border-gray-300">

                    <div className="px-4 hidden md:block">
                        <div className="flex items-center">
                            <input type="text" 
                            className="form-input my-3 w-full rounded-lg
                             border-gray-300 focus:ring-green-700" placeholder="Search..."/>
                        </div>
                    </div>

                    <div className="list-group ">
                        {admins.map((admin)=> (
                             <a key={admin.id} href="#" className="list-group-item list-group-item-action
                              border-0 flex items-center space-x-3 py-2 hover:bg-stone-300 rounded-md">
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
                         </a>
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

                    <hr className="block md:hidden my-1 border-t border-gray-300"/>
                </div>
                
                <div className="w-full md:w-7/12 lg:w-9/12">

                    <div className="py-2 px-4 border-b border-gray-300 hidden lg:block">
                        <div className="flex items-center py-1">
                            <div className="relative">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                 className="rounded-full" alt="Sharon Lessman" width="40" height="40"/>
                            </div>
                            <div className="flex-grow pl-3 kalam-light text-black text-xl">
                                <strong>Sharon Lessman</strong>
                                <div className="text-lg text-black  "><em>Typing...</em></div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="btn btn-primary btn-lg mr-1 px-3 bg-green-500 text-white rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone feather-lg">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
            </div>
        </div>
    </div>
    


    <IoSendSharp  className='text-green-800 text-2xl absolute right-0 cursor-pointer
    hover:scale-[1.8]  transition duration-500 transform'/>
    

    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full 
    text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none 
     border-gray-700 dark:focus:border-green-500 focus:outline-none focus:ring-0
      focus:border-green-600 peer" placeholder=" " required />

    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-2xl text-black
      duration-300 transform -translate-y-6 scale-75 bottom-3 -z
     -10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black
      peer-focus:dark:text-black peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6
    kalam-bold
    ">Type Message Here.......</label>


    
</main>


   </>
  )
}

export default ChatMessaging





