import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import API_URL from '../api_config';
import Loader from './ChildComp/Loader';
import Navbar from './ChildComp/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionComponent = ({ question, qIndex, onAnswerSubmit, onSubmitSuccess, submittedStatus }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const audioChunksRef = useRef([]);

  async function requestMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted.");
      // Proceed with handling the stream
    } catch (error) {
      console.error("Microphone access denied or not available:", error);
      alert("Microphone access is required for this feature.");
    }
  }

  console.log(localStorage.getItem("SkillTuneLogin"))
  
  requestMicrophoneAccess();
  

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob1 = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob1);
        setAudioUrl(url);
        setAudioBlob(audioBlob1);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 30000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Microphone access is required to record audio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAudioUpload = async () => {
    stopRecording()
    setIsSubmitted(true);
    if (audioBlob && !isSubmitted) { // Check if not already submitted
      const success = await onAnswerSubmit(qIndex, audioBlob);
      if (success) {
         // Mark as submitted
        onSubmitSuccess(); // Notify parent of successful submission
      }
      else{setIsSubmitted(false)}
    }
  };

  return (
    <div className="max-w-xxl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-normal mb-4 text-"><span className='font-bold text-red-500'>{qIndex + 1}.</span> {question}</h2>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          {isRecording ? (
            <div className="text-blue-500 font-semibold">Recording in progress...</div>
          ) : audioUrl ? (
            <audio controls className="mb-4">
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio tag.
            </audio>
          ) : (
            <div className="text-gray-500">No recording yet</div>
          )}
        </div>

        <button
          className={`${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold py-2 px-4 rounded-full mb-4`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isSubmitted} // Disable button if already submitted
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}
      
        <button 
          onClick={handleAudioUpload}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitted} // Disable if already submitted
        >
          Submit 
        </button>
        {isSubmitted && <p className="text-green-500 mt-2">Submitted successfully!</p>} {/* Submission feedback */}
        <span className='ml-10 mt-3 text-red-500'>*Do submit after recording</span>
      </div>
    </div>
  );
};

// Main MockInterview Component
const MockInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState({});
  const [QandA, setQandA] = useState(new Map());
  const [submittedCount, setSubmittedCount] = useState(0);
  const location = useLocation();
  const email = location.state?.email || "mksharma@gmail.com";
  const username = location.state?.username || "Mohit";
  const resume = location.state?.resume||null;
  console.log("mock_inter email:",email)
  console.log("username:",username)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      if(localStorage.getItem("SkillTuneLogin")==="false"){
        const formData = new FormData();
        formData.append("file", resume);
        setLoading(true)
              const skillsResponse = await axios.post(API_URL+"test/IQWithoutLogin/",formData,{
                headers: {
                  'Content-Type': 'multipart/form-data', // Set multipart header
              },
              })
              setQuestions(skillsResponse.data)
          setLoading(false)
      }
      else{
      const formData = new FormData();
      formData.append('email', email);
      try {
        const response = await axios.post(API_URL + "user/getInterviewQ", formData);
        if (response.status === 200) {
          setQuestions(response.data);
        } else {
          throw new Error('Failed to fetch questions');
        }
      } catch (error) {
        console.error(error);
        alert("Some error occurred while fetching questions. Please refresh!");
      } finally {
        setLoading(false);
      }
    }
    };

    fetchQuestions();
  }, [email]);
  
  const handleAnswerSubmit = async (index, audioBlob) => {
    const ques = questions[index];
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await axios.post(API_URL + 'user/get', formData);
      if (response.status === 200) {
        QandA.set(ques, response.data);
        return true; // Indicate successful submission
      } else {
        alert("Transcription Failed: " + response.status);
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert("Error: " + error.message);
    }
    return false; // Indicate failure
  };

  const handleSubmitSuccess = () => {
    setSubmittedCount(prev => prev + 1);
  };

  const EndTest = async () => {
    if (QandA.size === 0) {
      if(localStorage.getItem("SkillTuneLogin"))
      navigate("/mockResult", { state: { questions: questions, feedbackData: null, email: email, username: username }, replace: true });
      else
      navigate("/mockResult", { state: { questions: questions, feedbackData: null}, replace: true });
      return; 
    }
    console.log(submittedCount)
    console.log(QandA.size)
    // if (submittedCount !== QandA.size) {
    //   alert("Ensure that all recorded audios are submitted.");
    //   return;
    // }

    setLoading(true);
    
    const questionsAndAnswers = Array.from(QandA.entries()).map(([question, answer]) => ({
      question,
      answer
    }));

    try {
      const response = await axios.post(API_URL + "user/evaluateAnswers", questionsAndAnswers);
      
      if (response.status === 200) {
        console.log(response.data);
        setFeedbackData(response.data);
        navigate("/mockResult", { state: { questions: questions, feedbackData: response.data, email: email, username: username }, replace: true });
      } else {
        alert("Failed to evaluate answers: " + response.status);
      }
    } catch (error) {
      alert("Exception occurred, please submit again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex-row bg-gradient-to-r m-0 p-8 from-blue-500 to-indigo-600 items-center'>
        <div className='bg-gradient-to-r m-0 p-8 from-blue-500 to-indigo-600'>
          {loading ? (
            <div className="text-white text-lg"><Loader /></div>
          ) : (
            questions.length > 0 ? (
              questions.map((question, index) => (
                <QuestionComponent
                  key={index}
                  question={question}
                  qIndex={index}
                  onAnswerSubmit={handleAnswerSubmit}
                  onSubmitSuccess={handleSubmitSuccess}
                  submittedStatus={QandA.has(question)} // Check if this question has been submitted
                />
              ))
            ) : (
              <div className="text-white text-lg">No questions available</div>
            )
          )}
        </div>
        <button onClick={EndTest} className='bg-green-500 rounded-md my-8 mx-8 px-5 py-3'>
          Finish Test
        </button>
      </div>
    </>
  );
};

export default MockInterview;
