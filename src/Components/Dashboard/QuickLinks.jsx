import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const QuickLinks = ({email,username}) => {
  console.log("quickLInk email: "+ email)
  console.log("username: ",username)
  const navigate = useNavigate();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <i className="fas fa-dumbbell text-4xl text-green-500 mb-4"></i>
        <h3 className="text-lg font-bold mb-2 " >Practice Sessions</h3> 
        <h3 className="text-purple-500 cursor-pointer" onClick={()=>{navigate("/session" ,{state:{isLoggedin:true, email:email, username:username}})}}>Customize and start practice</h3>
       
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <i className="fas fa-chart-line text-4xl text-purple-500 mb-4"></i>
        <h3 className="text-lg font-bold mb-2">Mock Interview</h3>
        <a className="text-purple-500 cursor-pointer" onClick={()=>{navigate("/advice",{state:{email:email,username:username}})}}>Interview based on your projects and exeperience</a>
      </div>
    </section>
  );
};

export default QuickLinks;
