import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { IoSendSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import TextareaAutosize from 'react-textarea-autosize';
import { createConsumer } from '@rails/actioncable';
import { useDebounce } from 'use-debounce';
import { BiMessageDots } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom';




const CustomerChat = () => {
  const { user_name, customerId } = useApplicationSettings();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [supportAgent, setSupportAgent] = useState(null);
  const messagesEndRef = useRef(null);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);


  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // allow_get_chat_messages
  // Initial  fetch of messages and conversation details
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(`/api/chat_messages?customer_id=${customerId}`)
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('conversation_id_customer', data.conversation_id)
          setMessages([...data.yesterday, ...data.today]);
          setSupportAgent(data.admin); // Get assigned support agent
          subscribeToConversation()
          

          console.log('data',data.conversation_id)
         
          // Subscribe to the conversation
          // if (data.conversation_id) {
          //   localStorage.setItem('conversation_id', data.conversation_id)
          //   // subscribeToConversation();
          // }
        }else{
          const data = await response.json();
          setError(data);
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    if (isOpen) {
      fetchConversation();
    }
  }, [isOpen]);

  // const subscribeToConversation = () => {
  //   const conversationId =  parseInt(localStorage.getItem('conversation_id'))
  //   const cable = createConsumer('ws://localhost:4000/cable');
  //   // const cable = createConsumer(`ws://localhost:4000/cable?conversation_id=${conversationId}`);

  //   const sub = cable.subscriptions.create(


      
  //     {
  //       channel: "MessageChannel",
  //       conversation_id: conversationId
  //     },

      
     
  //     {

  //       connected() {
  //         console.log("Connected to private chat  WebSocket!");
  //       },

  //       disconnected() {
  //         console.log("Disconnected from private chat  WebSocket!");
  //       },
  //       received(data) {
  //         console.log("Message received:", data);
  //         setMessages(prev => [...prev, data]);
  //       }
  //     }
  //   );
  //   setSubscription(sub);
  // }; 

  const conversationIdCustomer = parseInt(localStorage.getItem('conversation_id_customer'));
  console.log('Subscribing to conversation ID customer:', conversationIdCustomer);
  const subscribeToConversation = () => {
    const conversationIdCustomer = parseInt(localStorage.getItem('conversation_id_customer'));
    if (!conversationIdCustomer) {
      console.log('Conversation ID is missing');    
      return;
    }
    const cable = createConsumer('ws://localhost:4000/cable');
  
    const sub = cable.subscriptions.create(
      {
        channel: 'MessageChannel',
        conversation_id: conversationIdCustomer
      },
      {
        connected() {
          console.log('Connected to WebSocket forchat  conversation:', conversationId);
        },
        disconnected() {
          console.log('Disconnected from WebSocket for chat conversation:', conversationId);
        },
        received(data) {
          console.log('Message received:', data);
          setMessages((prev) => [...prev, data]);
        },
      }
    );
    setSubscription(sub);
  };

// allow_send_chat_message'
  const sendMessage = async () => {

    if (text.trim()) {
      subscription.perform("receive", { content: text,
        customer_id: customerId,
        conversation_id: conversationIdCustomer
       });
      setText('');
    }
    try {
      const response = await fetch('/api/send_chat_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text ,
          customer_id: customerId


        })
      });

      if (response.status === 503) {
        const data = await response.json();
        setError(data);
      } else if (response.ok) {
        setText('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const conversationId = parseInt(localStorage.getItem('conversation_id'))

  console.log('conversationId', conversationId)

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 bg-green-500 text-white p-3 
                   rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl 
                   transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BiArrowBack className="w-6 h-6" />
      </motion.button>

      {error && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
            <div className="mb-4">
              <h4 className="text-yellow-800 font-medium text-lg mb-2">
                {error.error}
              </h4>
              <p className="text-yellow-600 text-sm mb-4">
                {error.message}
              </p>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-medium text-gray-700 mb-2">
                Alternative ways to reach us:
              </h5>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:support@example.com" 
                  className="text-blue-500 hover:underline">
                    support@example.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{' '}
                  <a href="tel:+1234567890" 
                  className="text-blue-500 hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
                <p>
                <span className="font-medium">Phone:</span>{' '}
                  <a href="tel:+1234567890" 
                  className="text-blue-500 hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
                <p>
                  <span className="font-medium">Business Hours:</span>{' '}
                  Mon-Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setError(null)}
              className="mt-4 w-full bg-yellow-100 text-yellow-700 
              py-2 px-4 rounded-md hover:bg-yellow-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}




      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4
           rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          <BiMessageDots className="w-6 h-6" />
        </button>
      )}
      <section className='bg-white h-screen'>

     

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px]
         bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-green-500 text-white 
          rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Customer Support</h3>
                {supportAgent && (
                  <p className="text-sm opacity-90">
                    with {supportAgent.user_name}
                  </p>
                )}
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-75"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-black mt-4">
                <p>👋 Hi there! How can we help you today?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                className={`flex items-end gap-2 text-black ${
                  message.sender_type === 'Customer' ? 'justify-end' : 
                  'justify-start'
                }`}
              >
                {message.sender_type === 'Admin' && (
                  <Avatar className="w-8 h-8">
                    {supportAgent?.user_name?.charAt(0) || 'S'}
                  </Avatar>
                )}
                <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender_type === 'Customer'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-75 mt-1">
                    {message.formatted_time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full 
                focus:outline-none focus:ring-2 focus:ring-green-500
                text-black"
              />
              <button
                onClick={sendMessage}
                disabled={!text.trim()}
                className="p-2 rounded-full bg-green-500 text-white 
                disabled:opacity-50 hover:bg-green-600"
              >
                <IoSendSharp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
};

export default CustomerChat;