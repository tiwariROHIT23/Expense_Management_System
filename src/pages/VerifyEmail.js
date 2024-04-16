import React, { useState } from 'react'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {


    const[email, setEmail] = useState('');
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/sendotp`,{email});
            setLoading(false);
            toast.success(`${data.message}`);
            console.log(data);
            localStorage.setItem(
              "email",
              JSON.stringify({email})
            );
            navigate("/verify-otp");
        }catch(error){
            setLoading(false);
            toast.error("User Not found");
        }
       
      
    }

    return (
        <div className='w-full h-screen  flex flex-col justify-center items-center overflow-hidden'>
        {
          loading ? (<Spinner/>):(    
        <div className="max-w-md w-full shadow-2xl relative flex flex-col p-4 rounded-md text-black bg-white flex-wrap">
          <div className="text-2xl font-bold mb-2 text-center text-[#7747ff]">Verification</div>
          <form className="flex flex-col gap-3" onSubmit={submitHandler}>
              <div className="block relative"> 
              <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
              <input type="email" id="email"
               value={email}
               required
               onChange={(e)=>{setEmail(e.target.value)}}
               className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"/>
              </div>
             
              <div className=' flex justify-end'> 
               <Link to={'/login'} className="text-sm text-[#7747ff]">
                <div className='flex gap-1'>
                <p className='flex items-center'><FaArrowLeft/></p> 
                <p>Back to login </p>
                </div>
               </Link></div>
              <button type='submit'  className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Send Email</button>
    
          </form>
         </div>)}
       </div>
      )
}

export default VerifyEmail