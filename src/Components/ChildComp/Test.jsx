import React, { useEffect, useState } from 'react';
import Question from './Question'; 
import axios from 'axios';
import Navbar from './Navbar';
import API_URL from '../../api_config';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const { isLoggedin,skill,username, email, level, num } = location.state || {};
  const navigate= useNavigate();
  const populateQuestions = (data) => {
    if (!Array.isArray(data)) {
      console.error("Expected an array but received:", data);
      return; // If jsonData is not an array
    }

    const questionList = data.map((item) => {
      const id = item.questionId;
      const questionText = item.questionText;
      const options = Array.from(new Set(item.options.split("~$").filter(option => option !== "")));
      const correctAnswer = item.correctAnswer;
      const explanation = item.explanation;

     //format the question list
      return {
        id,
        questionText,
        options,
        correctAnswer,
        explanation
      };
    });

    setQuestions(questionList); 
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true); 
    axios
      .post(API_URL + "user/getQuestions/", {
        skill: skill,
        level: level,
        questionNum: num
      })
      .then((response) => {
        console.log(response);
        populateQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Exception occurred! please refresh page");
        setLoading(false); 
      });

    if (skill === null) {
      console.log("skill is yet undefined");
    }
  }, [skill]);


  const handleOptionSelect = (correctAnswer, selectedOption) => {
   
  };
  useEffect(()=>{},[loading])
  
  const finishTest = () => {
    setIsTestFinished(true);
    
 
    const percentage = (score / questions.length) * 100;
    const results = {
      email: email,
      skill: skill, 
      score: score, 
      percentage: percentage,
      sessionDate: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }),
      noOfQuestions: questions.length
    };
    
    if (!isLoggedin) {
      
      alert("Test is submitted. Your score is " + score + ". You will be directed to the Login Page.");
      navigate('/');
      setLoading(false)
    }
     else {
   
      setLoading(true)
      axios.post(API_URL + "user/saveSession/", results)
        .then((response) => {
          console.log("Test session stored successfully:", response.data);
    
          
          navigate('/dashboard', { state: { email: email, username: username } });
        })
        .catch((error) => {
          console.error("Error storing session:", error);
        })
        .finally(() => {
   
          setLoading(false);
        });
      
    
     }
    
    
   
    };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-300 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">Practice Test</h2>

        {loading ? ( 
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div> {<Loader/>}
          </div>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500">No questions available.</p>
        ) : (
          <div className="space-y-8">
            {questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                selectedOption={selectedAnswers[question.id]}
                handleOptionSelect={handleOptionSelect}
                setScore={setScore}
              />
            ))}

            {!isTestFinished && (
              <div className="text-center">
                <button
                  onClick={finishTest}
                  className="mt-6 px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition duration-300"
                >
                  Finish Test
                </button>
              </div>
            )}
          </div>
        )}

        {isTestFinished && (
          <div className="mt-6 text-center text-purple-500 font-semibold text-lg">
            Test completed! Your results have been saved.
          </div>
        )}
      </div>
    </>
  );
};

export default Test;
