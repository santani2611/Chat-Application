import React, { useEffect } from 'react'
import profilePic from '../assets/cool-profile-picture.jpg';
import { SendInput } from './SendInput.jsx';
import Messages from './Messages.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedUser} from "../redux/userSlice.js"

const MessageContainer = () => {
  const {authUser}=useSelector(store=>store.user);
  const {selectedUser,onlineUsers}=useSelector(store=>store.user);
  console.log("onlineUsers",onlineUsers);
  const isOnline=onlineUsers?.includes(selectedUser?._id);
   const dispatch=useDispatch();
  useEffect(()=>{
    
    return ()=>{
      dispatch(setSelectedUser(null));
    }
  },[])


  return (


       <>
       {
        selectedUser!==null?
        ( <div  className='md:min-w-[550px] flex flex-col'>
          
           <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2 ">
             {/* Avatar with custom online dot */}
             <div className="relative w-16 h-16">
               <img
                 src={selectedUser?.profilePhoto}
                 alt="Profile"
                 className="rounded-full w-16 h-16 object-cover"
               />
             <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${isOnline ? "bg-green-500 border-green-500" : "bg-gray-400 border-white"}`}></span>

             </div>
   
             {/* Username */}
             <div className="flex flex-col flex-1">
               <div className="flex justify-between items-center gap-2 flex-1">
                 <p>{selectedUser?.fullName}</p>
               </div>
             </div>
           </div>
           <Messages/>
       <SendInput/>
         </div>
         ):(
          <div className='md:min-w-[550px] flex flex-col justify-center items-center '>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName}!</h1>
             <h1 className='text-2xl text-white '>
            Let's start a conversation!
          </h1>
          </div>
         )
  
       }
       
       
       </>
           
        
  )
}

export default MessageContainer;