
// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';

const AuthContext = createContext();

 const AuthSettings = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLogedIn, setIsUserLoggedIn] = useState(false)



  // const cableApp = ActionCableProvider.create({
  //   // Your Action Cable URL
  //   url: 'ws://localhost:4000/cable',
  // });
  


  
//   const ws = new WebSocket("ws://localhost:4000/cable");

//   // Handle WebSocket events
//   ws.onopen = (event) => {
//     console.log("Connected to CurrentUserChannel");
//     ws.send(JSON.stringify({ command: "subscribe", identifier: JSON.stringify({ channel: "CurrentUserChannel" }) }));
//   };

//   ws.onmessage = (event) => {
//     const json = JSON.parse(event.data);
//     console.log("WebSocket message received:", json);

//     if (json.type === "confirm_subscription") {
//       console.log("Subscription confirmed");
//     } else if (json.message && json.message.user) {
//       setUser(json.message.user);
//       console.log("user socket", json.message.user);
//     }
//   };

//   ws.onerror = (error) => {
//     console.error("WebSocket error:", error);
//   };

//   ws.onclose = (event) => {
//     console.log("WebSocket connection closed:", event);
//     // Handle reconnect logic if needed
//   };
  
// console.log('user initial:', user)







  // const fetchCurrentUser = 
  // useCallback(
  //   async() => {
  
  //       try {
  //           const response = await fetch('/api/current_user', {
  //             method: 'GET',
  //             credentials: 'include',
  //           });
  //           const data = await response.json();
  //           if (response.ok) {
  //             console.log('Fetched user data:', data.user);
              
  //             // setUser(data.user);
  //           } else {
  //             setUser(null);
  //           }
  //         } catch (error) {
  //           console.error('Error fetching current user:', error);
  //           setUser(null);
  //         }
  //   },
  //   [],
  // )
  
  


// useEffect(() => {
//   if (user === null) {
//     fetchCurrentUser();
//   }
//   console.log('user final', user)
// }, [user, fetchCurrentUser]);
  



//   useEffect(() => {
//     fetchCurrentUser()
//   }, [fetchCurrentUser,]);


  return (
    <AuthContext.Provider value={{ user, setUser, isUserLogedIn, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthSettings


export const useAuth = () => useContext(AuthContext);

