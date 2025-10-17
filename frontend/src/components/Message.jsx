import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();

  const { authUser, selectedUser } = useSelector(store => store.user);

  const isOwnMessage = authUser?._id === message?.senderId;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scroll} className={`flex ${isOwnMessage ? 'chat-end' : 'chat-start'} mb-3 `}>
      <div
        className={`flex items-end max-w-xl
          ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} space-x-2
          ${isOwnMessage ? 'space-x-reverse' : ''} w-full gap-2.5 `}
      >
        {/* Avatar */}
        <div className="chat-image avatar w-10 h-10 rounded-full overflow-hidden shrink-0 mb-3">
          <img
            alt={`Profile photo of ${isOwnMessage ? 'you' : selectedUser?.name || 'user'}`}
            src={isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Message and time */}
        <div>
          <div
            className={`chat-bubble p-3 rounded-lg max-w-xs
              ${isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'} `}
          >
            {message?.message}
          </div>
          <time className="text-xs opacity-50 text-gray-500 mt-1 block text-right">
            {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Message;
