import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const useGetMessages = () => {

  const { selectedUser } = useSelector(store => store.user);
  const dispatch=useDispatch();
   console.log(selectedUser?._id);
  useEffect(() => {
    const fetchMessages = async () => {
      console.log(selectedUser?._id);
      axios.defaults.withCredentials = true;
       if(selectedUser?._id){
      const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
      console.log(res);
      console.log("res ke messages",res.data);
     dispatch(setMessages(res.data));
       }
    }
    fetchMessages();
  }, [selectedUser])
}
export default useGetMessages