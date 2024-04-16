import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successfully !!!");
    navigate("/login");
  };
  return (
  <nav className=" text-white font-extrabold flex flex-row w-full bg-[#161D29]">
  <div className="w-screen shadow-2xl flex justify-between p-3" >
          

       <Link className="" to="/">
       <div className="flex gap-2 ml-2 ">
          <img src={require("../assets/icons8-money-48.png")} width={40} alt="" className="-mt-1"/>
          <p className="text-sm sm:text-2xl  md:text-2xl lg:text-2xl">Expense Management</p>
         </div>
       </Link>
       <ul className="flex gap-8">
         <li>
           {" "}
           <p className=" pt-1 lg:pt-2 text-sm md:text-base sm:text-base lg:text-base text-gray-500 translate-x-7 lg:translate-x-0 sm:translate-x-0 md:translate-x-0">{loginUser && loginUser.name}</p>{" "}
         </li>
         <li className="nav-item ">
         <div className="max-w-32 items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
           <button className="px-4 py-2" onClick={logoutHandler}>
             Logout
           </button>
           </div>
          </li>
         </ul>
      </div>
  </nav>
  );
};

export default Header;