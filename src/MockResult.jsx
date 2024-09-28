import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FeedbackDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {questions = [],feedbackData = null,email = "",username = ""} = location.state || {};

  useEffect(() => {
    if (feedbackData && !hasNavigated) {
      setHasNavigated(true);  // Mark as navigated
      navigate("/mockResult", { state: { questions, feedbackData } });
    }
  }, [feedbackData, questions, navigate, hasNavigated]);

  if (!feedbackData) {
    return <div className="text-center p-6">No feedback data available.</div>;
  }

  const feedback = feedbackData.feedback || [];
  const averageRating = feedbackData.averageRating || 0;

  // Create a mapping of feedback to questions
  const feedbackMap = {};
  feedback.forEach((item, index) => {
    feedbackMap[index] = item.feedback;
  });

  const gotoDashboard = ()=>{
    navigate("/dashboard",{state:{email:email,username:username}})
  }

  return (
    <>
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-4">Evaluation Feedback</h1>
      <h2 className="text-lg font-semibold text-center mb-4">Average Rating: {averageRating.toFixed(2)}/100</h2>
      <h3 className="text-lg font-semibold text-center mb-4">Questions:</h3>
      {questions.length > 0 ? (
        <ul className="mb-6">
          {questions.map((question, index) => (
            <li key={index} className="mb-4">
              <div className="text-gray-800">
                {index + 1}. {question}
              </div>
              <div className="p-2 bg-gray-100 rounded-md border border-gray-300">
                {feedbackMap[index] ? feedbackMap[index] : "This question was not answered."}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No questions available.</p>
      )}
      
    </div>
    <div className="flex justify-center mt-4">
    <button onClick={gotoDashboard} className="bg-green-500 mb-10 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
  Go to Dashboard
</button>

      </div>
    </>
  );
};

export default FeedbackDisplay;
