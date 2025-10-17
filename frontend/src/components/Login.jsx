import React from 'react'
import { Link ,useNavigate} from "react-router-dom"
import { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({

    username: "",
    password: "",

  })
 const dispatch=useDispatch();
  const navigate=useNavigate();
  const onSubmitHandler =async (e) => {

    e.preventDefault();
    try{
       const res=await axios.post("http://localhost:8080/api/v1/user/login",user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
       });
   
        navigate("/");
   
       console.log("res",res.data);
       dispatch(setAuthUser(res.data));

    }catch(err){
      toast.error(err.response.data.message);
      console.log(err);
    }
    
    console.log(user);
  }
  return (
    <div className="min-w-96 max-w-md mx-auto mt-10">
      <div className="p-6 bg-white rounded-md shadow-md bg-opacity-90 backdrop-blur-md border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">


          <div>
            <label className="label">
              <span className="label-text text-base">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
              className="input input-bordered w-full"
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
              className="input input-bordered w-full"
              type="password"
              placeholder="Enter your password"
            />
          </div>


          <div className='flex items-center text-center justify-center '>
            <p className='mr-1.5'> Don't have an account?</p>
            <Link to="/register">
              Sign up
            </Link>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full mt-4 text-2xl">Log In</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login
