import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

export const Sidebar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout');
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (err) {
      console.error(err);
      toast.error('Logout failed.');
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error('Please enter a name to search.');
      return;
    }

    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      // If setOtherUsers expects a single user, rename it to setSelectedUser or similar.
      dispatch(setOtherUsers([conversationUser])); // Wrapped in array if slice expects array
    } else {
      toast.error('User not found!');
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} className='flex items-center gap-2 mb-2'>
        <input
          className='input input-bordered rounded-md'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn bg-zinc-600 text-white'>
          <BiSearchAlt2 className='w-6 h-6' />
        </button>
      </form>

      <div className='divider px-3'></div>

      <OtherUsers />

      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>
          Logout
        </button>
      </div>
    </div>
  );
};
