import React from 'react';
import Message from './Message.jsx';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage.jsx';

const Messages = () => {
 useGetRealTimeMessage();
 useGetMessages();
  const { messages } = useSelector(store => store.message);

  if (!messages) {
    return null; // returning null is safer than undefined
  }

  return (
    <div className='px-4  flex-1  overflow-auto'>
      {
        messages?.map((message) => (
          <Message key={message._id} message={message} />
        ))
      }
    </div>
  );
};

export default Messages;



