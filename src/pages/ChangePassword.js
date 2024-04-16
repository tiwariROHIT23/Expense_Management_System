import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

const ChangePassword = () => {

  const[password,setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[loading,setLoading] = useState(false);

  const[showPassword,setShowPassword] = useState(false); 
  const[showConfirmPassword,setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("email"));
      setLoading(true);
      if(password!==confirmPassword){
        toast.error("Password and confirm password not match");
      }
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/changepassword`,{email:user,password,confirmPassword});
      console.log(data);
      toast.success('Password Updated');
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Password Not Update !!");
    }
  };
  

 
  return (
    <div className='w-full h-screen  flex flex-col justify-center items-center overflow-hidden'>
    {
      loading ? (<Spinner/>):(    
    <div className="max-w-md w-full shadow-2xl relative flex flex-col p-4 rounded-md text-black bg-white flex-wrap">
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
      
          <div className="block relative"> 
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">New Password</label>
            <input type={showPassword ? "text" : "password"} id="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"/>
            <span   onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
           {showPassword ? (
            <IoEyeOutline fontSize={24}  fill="#AFB2BF"/>
          ) : (
            <IoEyeOffOutline fontSize={24} fill="#AFB2BF" />
           
          )}=
            </span>
          </div>
          
          <div className="block relative"> 
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
            <input type={showConfirmPassword ? "text" : "password"} id="password" 
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"/>
            <span   onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer">
           {showConfirmPassword ? (
            <IoEyeOutline fontSize={24} fill="#AFB2BF" />
          ) : (
            <IoEyeOffOutline fontSize={24} fill="#AFB2BF" />
           
          )}
            </span>
          </div>
          <div className=' flex justify-end'> 
               <Link to={'/login'} className="text-sm text-[#7747ff]">
                <div className='flex gap-1'>
                <p className='flex items-center'><FaArrowLeft/></p> 
                <p>Back to login </p>
                </div>
               </Link></div>
          
          <button type='submit'  className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

      </form>
     </div>)}
   </div>
  )
}

export default ChangePassword