import React from 'react';
import { Sidebar } from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/30 backdrop-blur-lg'>
      <Sidebar />
      <MessageContainer />   
    </div>
  );
};

export default HomePage;
