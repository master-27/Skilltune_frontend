
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
    <nav className="flex sticky z-50 top-0 justify-between  shadow-mdpy-6 px-6 py-2 bg-gray-700 shadow-md">
    
      <h2 className="text-white text-xl font-bold">SkillTune</h2>

      {
        isLoggedin ? (
    <div className='flex flex-col'>
      <h4 className='text-white text-sm'>User: {username}</h4>      
        <h4 className='text-white text-sm'>Email: {email}</h4>
    
      <button  onClick = {handleClick}className="bg-gray-500 text-sm py-2 rounded-md">Logout</button>
    </div>
  ) : null 
}

         
          
    </nav>
  );
};

export default Navbar;
