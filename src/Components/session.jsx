import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import API_URL from '../api_config';
import Question from './ChildComp/Question';
import Navbar from './ChildComp/Navbar';
import Loader from './ChildComp/Loader'; // Import your Loader component

const PracticeSession = () => {
  const [skills, setSkills] = useState([]); // Available skills
  const [selectedSkill, setSelectedSkill] = useState(''); // Single skill selection
  const [newSkill, setNewSkill] = useState(''); // For adding a new skill
  const [previousSessions, setPreviousSessions] = useState([]); // List of previous sessions
  const [difficultyLevel, setDifficultyLevel] = useState('entry');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [loading, setLoading] = useState(true); // State to manage loading
  const location = useLocation();
  const { isLoggedin = false, email, username,resume = null } = location.state || {};
  const navigate = useNavigate();
  const dummySkills = ["React","Spring Boot","MySQL","SQLite","Python","C++","Java","Firebase"]
  useEffect(() => {
    const fetchSkillsAndSessions = async () => {
      try {
        if (isLoggedin) {
          const skillsResponse = await axios.get(API_URL + "test/skills/", {
            params: { email: email }
          });
          setSkills(skillsResponse.data);

          // Fetch previous sessions
          const sessionsResponse = await axios.post(API_URL + 'user/getSessions/?email=' + email);
          setPreviousSessions(sessionsResponse.data);
        } else { // Access and give practice session without login.
          const formData = new FormData();
    formData.append("file", resume);
    setLoading(true)
          const skillsResponse = await axios.post(API_URL+"test/skFromResume/",formData,{
            headers: {
              'Content-Type': 'multipart/form-data', // Set multipart header
          },
          })
          setSkills(skillsResponse.data);

        }
      } catch (error) {
        console.log("Exception Occurred", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSkillsAndSessions();
  }, [isLoggedin,, email]);

  // Start the practice session with selected skill
  const startPracticeSession = () => {
    if (selectedSkill !== "") {
      navigate("/test", {
        state: { isLoggedin:isLoggedin,skill: selectedSkill, username:username,email: email, level: difficultyLevel, num: numOfQuestions }
      });
    } else {
      alert("Please select a skill");
    }
  };

  if (loading) {
    return <Loader />; // to loader while fetching data
  }

  return (
    <>
      <Navbar isLoggedin={isLoggedin} {...(isLoggedin ? { email, username } : {})} />
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-10 px-4'>
        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-bold mb-6">Start a Practice Session</h1>

          {/* Skill Selection Section */}
          <div className="mb-4 ">
            <label className="block font-bold mb-2">Select a Skill</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">-- Select Skill --</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Level Radio Buttons */}
          <h3 className="font-bold mb-2">Select Question Difficulty Level</h3>
          <div className="mb-4 min-w-max justify-around flex flex-row">
            <div>
              <label>
                <input
                  type="radio"
                  value="entry"
                  checked={difficultyLevel === 'entry'}
                  onChange={() => setDifficultyLevel('entry')}
                />
                <span className='ml-2'> Entry Level</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="intermediate"
                  checked={difficultyLevel === 'intermediate'}
                  onChange={() => setDifficultyLevel('intermediate')}
                />
                <span className='ml-2'>Intermediate</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="advanced"
                  checked={difficultyLevel === 'advanced'}
                  onChange={() => setDifficultyLevel('advanced')}
                />
                <span className='ml-2'> Advanced</span>
              </label>
            </div>
          </div>

          {/* Number of Questions Radio Buttons */}
          <h3 className="block font-bold mb-2">Select Number of Questions</h3>
          <div className="mb-4 flex justify-around ">
            <div>
              <label>
                <input
                  type="radio"
                  value={5}
                  checked={numOfQuestions === 5}
                  onChange={() => setNumOfQuestions(5)}
                />
                <span className='ml-2'> 5 Questions</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value={10}
                  checked={numOfQuestions === 10}
                  onChange={() => setNumOfQuestions(10)}
                />
                <span className='ml-2'> 10 Questions</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value={15}
                  checked={numOfQuestions === 15}
                  onChange={() => setNumOfQuestions(15)}
                />
                <span className='ml-2'> 15 Questions</span>
              </label>
            </div>
          </div>

          <div className='flex justify-center my-8 items-center'>
            <button
              className="bg-green-500 text-white rounded-lg px-6 py-2 mb-6 hover:bg-green-600"
              onClick={startPracticeSession}
            >
              Start Practice Session
            </button>
          </div>

          {isLoggedin && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Previous Sessions</h2>
              {previousSessions.length === 0 ? (
                <p>No previous sessions available.</p>
              ) : (
                <ul className="space-y-4">
                  {previousSessions.map((session, index) => (
                    <li
                      key={index}
                      className="border grid grid-cols-2 border-gray-300 rounded-lg p-4 shadow-md"
                    >
                      <p><strong>Skill:&nbsp;</strong> {session.skill}</p>
                      <p><strong>Score:&nbsp;</strong> {session.score}</p>
                      <p><strong>Date:&nbsp;</strong> {new Date(session.sessionDate).toLocaleDateString()}</p>
                      <p><strong>Questions:&nbsp;</strong>{session.noOfQuestions}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PracticeSession;
