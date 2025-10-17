import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {io} from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> }
]);

function App() {
  const { authUser } = useSelector(store => store.user);
 const {socket}=useSelector(store=>store.user);
  const dispatch=useDispatch();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:8080',{
        query:{
          userId:authUser._id
        },
      });
     dispatch(setSocket(newSocket));
    
      newSocket.on('getOnlineUsers',(onlineUsers)=>{
         dispatch(setOnlineUsers(onlineUsers));
      })
      return () => {
        newSocket.disconnect();
       
      };

    }else {

    if (socket) {
  socket.disconnect();
  dispatch(setSocket(null));
}

    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
