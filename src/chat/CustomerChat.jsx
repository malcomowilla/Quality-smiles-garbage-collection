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




const CustomerChat = () => {
  const { user_name } = useApplicationSettings();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [supportAgent, setSupportAgent] = useState(null);
  const messagesEndRef = useRef(null);
  const [subscription, setSubscription] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial fetch of messages and conversation details
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch('/api/chat_messages');
        if (response.ok) {
          const data = await response.json();
          setMessages([...data.yesterday, ...data.today]);
          setSupportAgent(data.admin); // Get assigned support agent
          
          // Subscribe to the conversation
          if (data.conversation_id) {
            subscribeToConversation(data.conversation_id);
          }
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    if (isOpen) {
      fetchConversation();
    }
  }, [isOpen]);

  const subscribeToConversation = (conversationId) => {
    const cable = createConsumer('ws://localhost:4000/cable');
    const sub = cable.subscriptions.create(
      {
        channel: "MessageChannel",
        conversation_id: conversationId
      },
      {
        received(data) {
          setMessages(prev => [...prev, data]);
        }
      }
    );
    setSubscription(sub);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    
    try {
      const response = await fetch('/api/send_chat_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });

      if (response.ok) {
        setText('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <section className='bg-white h-screen'>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4
           rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          <BiMessageDots className="w-6 h-6" />
        </button>
      )}

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