import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = (props) => {
  const user = props.user;
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers = [] } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    console.log(user);
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? 'bg-zinc-200' : ''
        } flex gap-2 items-center hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}
      >
        {/* Avatar with custom online dot */}
        <div className="relative w-16 h-16">
          <img
            src={user?.profilePhoto}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </div>

        {/* Username */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2 flex-1">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
