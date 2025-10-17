import React from 'react'
import { Link,useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })
  const navigate=useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {

    e.preventDefault();
    try {
      console.log("user1", user);
      const res = await axios.post("http://localhost:8080/api/v1/user/register", user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
           navigate("/login");
        toast.success(res.data.message);
      }
      console.log("res", res);
    } catch (err) {
        toast.error(error.response.data.message);
      console.log(err);
    }
    console.log("user", user);
  }
  return (
    <div className="min-w-96 max-w-md mx-auto mt-10">
      <div className="p-6 bg-white rounded-md shadow-md bg-opacity-90 backdrop-blur-md border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label className="label">
              <span className="label-text text-base">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="input input-bordered w-full"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input input-bordered w-full"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="input input-bordered w-full"
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <div className='flex items-center my-4'>
            <label className='mr-4 flex items-center'>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="radio mr-2"
              />
              Male
            </label>
            <label className='flex items-center'>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="radio mr-2"
              />
              Female
            </label>
          </div>

          <div className='flex items-center text-center justify-center '>
            <p className='mr-1.5'> Already have an account? </p>
            <Link to="/login">
              Sign in
            </Link>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full mt-4 text-2xl">Sign up</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup
