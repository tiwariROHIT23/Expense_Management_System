import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
// import { message } from 'antd';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import {toast} from 'react-hot-toast';



const Register = () => {
 const REGISTER_API = `${process.env.REACT_APP_BASE_URL}/users/register`;

  const[email, setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[name,setName] = useState('');
  const[showPassword,setShowPassword] = useState(false); 
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    
      setLoading(true);
       const {data}  = await axios.post(REGISTER_API, {name,email,password});
      toast.success("Account Created Successfull");
      setLoading(false);
      console.log(data);
      setEmail('');
      setPassword('');
      setName('');    
      navigate("/login");

    } catch (error) {
      setLoading(false);
      toast.error("User already Exist !!!");
    }
  };


  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className='w-full h-screen  flex flex-col justify-center items-center overflow-hidden'>
    {loading ? (<Spinner/>) :(
    <div className="max-w-md w-full shadow-2xl relative flex flex-col p-4 rounded-md text-black bg-white flex-wrap">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Create your <span className="text-[#7747ff]">Account</span></div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">It's quick and easy</div>
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>

         <div className="block relative"> 
            <label htmlFor="name" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Your Name</label>
            <input type="text" id="name"
            value={name}
            required
            onChange={(e)=>{setName(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"/>
          
          </div>
          <div className="block relative"> 
          <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
          <input type="email" id="email"
           value={email}
           required
           onChange={(e)=>{setEmail(e.target.value)}}
           className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"/>
          
          </div>
          <div className="block relative"> 
          <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input  type={showPassword ? "text" : "password"} id="password" 
          required
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"/>
              <span   onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
           {showPassword ? (
            <IoEyeOutline fontSize={24}  fill="#AFB2BF"/>
          ) : (
            <IoEyeOffOutline fontSize={24} fill="#AFB2BF" />
           
          )}
            </span>
          </div>
         <button type='submit' className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

      </form>
        <div className="text-sm text-center mt-[1.6rem]">Already have an account ! <Link to={'/login'} className="text-sm text-[#7747ff]">Login</Link></div>
    </div>)
    }
   </div>
  )
}

export default Register