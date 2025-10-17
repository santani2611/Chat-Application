import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice'; // adjust this path

export const SendInput = () => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { selectedUser } = useSelector(store => store.user);  // ✅ correct
  const { messages } = useSelector(store => store.message);   // ✅ correct

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedUser?._id || !message.trim()) {
      console.warn("No user selected or empty message");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newMsg = res?.data?.newMessage;
      if (newMsg) {
        dispatch(setMessages([...(messages || []), newMsg])); // fallback if messages is null
      }

      setMessage("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder='Send a message'
          className='border text-sm rounded-lg block w-full bg-gray-600 text-white p-3 border-zinc-500'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
          <IoSend />
        </button>
      </div>
    </form>
  );
};
