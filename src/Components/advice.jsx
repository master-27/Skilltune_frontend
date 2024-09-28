import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdviceSection = () => {
  const email = location.state?.email || "mksharma@gmail.com";
  const username = location.state?.username || "Mohit";
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate("/mockInter", { state: { email: email,username:username} });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Interview Advice</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please revise your projects and experience before starting the interview.<br></br>
          <span className='text-red-500'>*You will be provided 30 seconds for recording per question.</span>
        </p>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full"
          onClick={handleStartInterview} 
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default AdviceSection;
