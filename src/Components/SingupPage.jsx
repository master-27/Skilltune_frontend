import React, { useEffect, useState } from 'react';
import SkillSearch from './SearchComp';
import Navbar from './ChildComp/Navbar';
import API_URL from '../api_config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './ChildComp/Loader';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
    console.log('Selected file:', file);
  };

  const validate = async () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || rePassword.trim() === '') {
      alert("All fields are Mandatory*.");
      return false;
    } else if (password.length < 8) {
      alert("Password should be at least 8 characters long");
      return false;
    } else if (password.trim() !== rePassword.trim()) {
      alert("Confirm password doesn't match");
      return false;
    } else if (selectedSkills.length < 5 && resume === null) {
      alert("Select at least 5 skills");
      return false;
    }

    let data = new FormData();
    data.append('email', email);
    axios.post(API_URL + "auth/emailExists", data)
      .then((Response) => {
        if (Response.data === true) {
          alert("Email already exists");
          setIsLoading(false)
          return false
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    return true;
  };

  const withoutResume = () => {
    let data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('skills', selectedSkills);

    return axios.post(API_URL + "auth/signUpWithoutResume/", data);
  };

  const withResume = () => {
    let data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('file', resume);

    return axios.post(API_URL + "auth/signUpWithResume/", data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); 

    
    if (! await validate()) {
      setIsLoading(false); // 
      return;
    }

    try {
      let response;
      if (resume !== null) {
        response = await withResume();
      } else {
        response = await withoutResume();
      }

      if (response.status === 200) {
        alert("You are signed up! Click to redirect to the login page.");
        navigate("/");
      } else {
        alert("Some error occurred in the API.");
      }
    } catch (error) {
 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Navbar />
      {isLoading && <Loader />?<Loader/>:null}
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-10 px-4'>
        <div className="flex items-center justify-center shadow-md bg-gradient-to-b from-gray-600 to-blue-600">
          <div className="bg-white max-w-4xl w-full p-8 rounded-lg shadow-md grid grid-cols-1 gap-8 md:grid-cols-2">
           
            <div className="flex flex-col bg-gray-200 px-3 py-4 items-center justify-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">Sign Up</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="border rounded w-full p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password<span className="text-xs">&nbsp;&nbsp;(Enter at least 8 characters)</span></label>
                <input
                  type="password"
                  className="border rounded w-full p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="border rounded w-full p-2"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col px-3 py-4 bg-gray-300 items-start justify-start">
              <h1 className='text-2xl font-bold mb-4 text-gray-700'></h1>
              <SkillSearch onSkillsSelect={setSelectedSkills} />
              <span className='font-bold mb-3 '> OR </span>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="border rounded w-full p-2"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Signup;