import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FeedbackDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [], feedbackData = null, email = "", username = "" } = location.state || {};

//   const [hasNavigated, setHasNavigated] = useState(false);
// console.log("email",email)
// console.log("username",username)
//   useEffect(() => {
//     if (feedbackData && !hasNavigated) {
//       setHasNavigated(true);
//       navigate("/mockResult", { state: { questions, feedbackData } });
//     }
//   }, [feedbackData, questions, navigate, hasNavigated]);
  const handleBack = ()=>{
    console.log(localStorage.getItem("SkillTuneLogin"))
    if(localStorage.getItem("SkillTuneLogin")==="true"){
      navigate("/dashboard", { state: { email: email, username: username } });
    }
    else{
      navigate("/")
    }
  }
  if (!feedbackData || !Array.isArray(feedbackData.feedback)) {
    return <div className='flex flex-col bg-gray-300 min-h-screen  items-center'>
    <div className="text-center p-6">No feedback data available.</div>
      <button onClick={handleBack} className='bg-gray-500 font-bold text-white hover:bg-gray-400  py-2 px-2 rounded-md '>Go Back</button>
      </div>
    
  }

  const feedback = feedbackData.feedback || [];
  const averageRating = feedbackData.averageRating || 0;

  // Create a mapping of feedback to questions
  const feedbackMap = {};
  feedback.forEach((item) => {
    feedbackMap[item.question] = {
      feedback: item.feedback,
      rating: item.rating,
    };
  });

  const gotoDashboard = () => {
    if(localStorage.getItem("SkillTuneLogin")==="true")
    navigate("/dashboard", { state: { email: email, username: username } });
    else
    navigate("/")
  };

  return (
    <>
      <div className="min-w-screen flex-col justify-center items-center p-6b py-10 bg-gradient-to-r m-0 p-8 bg-gray-300">
      <div className='bg-white max-w-xxl px-3 py-3 shadow-md rounded-md'>
        <h1 className="text-2xl font-bold text-center mb-4">Evaluation Feedback</h1>
        {/* <h2 className="text-lg font-semibold text-center mb-4">Average Rating: {averageRating}</h2> */}
        <h3 className="text-lg font-semibold text-center mb-4">Questions and Feedback:</h3>
        {questions.length > 0 ? (
          <ul className="mb-6">
            {questions.map((question, index) => {
              const feedbackEntry = feedbackMap[question] || { feedback: "This question was not answered.", rating: null };

              return (
                <li key={index} className="mb-4">
                  <div className="text-gray-800">
                    {index + 1}. {question}
                  </div>
                  <div
                    className={`p-2 rounded-md border mt-1 shadow-md ${
                      feedbackEntry.feedback !== "This question was not answered." ? 'border-green-500' : 'border-red-500'
                    }`}
                  >
                    <p>{feedbackEntry.feedback}</p>
                    {feedbackEntry.rating !== null && (
                      <p className="mt-2 text-sm text-gray-600">{feedbackEntry.rating}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No questions available.</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={gotoDashboard}
          className="bg-green-500 mb-10 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
        >
          Go to Dashboard
        </button>
      </div>
      </div>
    </>
  );
};

export default FeedbackDisplay;
