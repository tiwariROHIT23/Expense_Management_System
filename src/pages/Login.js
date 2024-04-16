import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const[email, setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[loading,setLoading] = useState(false);

  const[showPassword,setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const LOGIN_API = `${process.env.REACT_APP_BASE_URL}/users/login`;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(LOGIN_API,{email,password});
      setLoading(false);     
      toast.success(`${data.message}`);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Incorect Email or Password");
    }
  };
  
  return (
    <div className='w-full h-screen  flex flex-col justify-center items-center overflow-hidden'>
    {
      loading ? (<Spinner/>):(    
    <div className="max-w-md w-full shadow-2xl relative flex flex-col p-4 rounded-md text-black bg-white flex-wrap">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <div className="block relative"> 
          <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
          <input type="email" id="email"
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
           className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"/>
          
          </div>
          <div className="block relative"> 
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"/>
            <span   onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
           {showPassword ? (
            <IoEyeOutline fontSize={24}  fill="#AFB2BF"/>
          ) : (
            <IoEyeOffOutline fontSize={24}  fill="#AFB2BF"/>
           
          )}
            </span>
          </div>
          <div className=' flex justify-end'> 
           <Link to={'/verifyemail'} class="text-sm text-[#7747ff]">Forgot your password? 
           </Link></div>
          <button type='submit'  className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

      </form>
        <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <Link to={'/register'} className="text-sm text-[#7747ff]">Sign up for free!</Link></div>
     </div>)}
   </div>
  )
}

export default Login