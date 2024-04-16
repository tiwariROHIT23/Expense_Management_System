import React, {useState } from 'react'
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
const VerifyOtp = () => {
    const[otp,setOtp] = useState('');
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();
       
        try{
            const {email} = JSON.parse(localStorage.getItem("email"));
            setLoading(true);
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/verifyotp`,{email,otp});
            console.log(otp,email);
            setLoading(false);
            toast.success("Verification Successfull");
            console.log(data);
            navigate("/changepassword");
        }catch(error){
            setLoading(false);
            toast.error("Wrong OTP");
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
                <label htmlFor="otp" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Check email and verify OTP</label>
                <OtpInput
              value={otp}
              id='otp'
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  required
                  className="w-[48px] lg:w-[60px] border-2 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-2 focus:outline-2 focus:outline-yellow-500"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

             <div className=' flex justify-between pt-4'> 
               <Link to={'/login'} className="text-sm text-[#7747ff]">
                <div className='flex gap-1'>
                <p className='flex items-center'><FaArrowLeft/></p> 
                <p>Back to login </p>
                </div>
               </Link>
        
               <Link to={'/verifyemail'} className="text-sm text-[#7747ff]">
                <div className='flex gap-1'>
                {/* <p className='flex items-center'><FaArrowLeft/></p>  */}
                <p>Resend otp</p>
                </div>
               </Link></div>
               <div className='flex items-center'>
               <button type='submit'  className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Verify</button>
               </div>
              
          </div>
          
      </form>
     </div>)}
   </div>
  )
}

export default VerifyOtp




