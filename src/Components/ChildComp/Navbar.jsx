
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';

const Navbar = ({isLoggedin,username,email}) => {
  const navigate  = useNavigate()
  const handleClick = ()=>{
    localStorage.setItem("SkilltuneLogin",false)
navigate("/")
  }
  return (
    <nav className="flex sticky z-50 top-0 justify-between items-center shadow-mdpy-6 px-6 py-2 bg-gray-800 shadow-md">
    
      <h2 className="text-white text-xl font-bold">SkillTune by Mohit</h2>

      {
        isLoggedin ? (
    <div className='flex flex-col'>
      <h4 className='text-white'>Username: {username}</h4>
      <div className='flex items-center space-x-4 mb-2'>
        <h4 className='text-white'>Email: {email}</h4>
      </div>
      <button  onClick = {handleClick}className="bg-blue-400 py-2 px-2 rounded-md">Logout</button>
    </div>
  ) : null 
}

         
          
    </nav>
  );
};

export default Navbar;
