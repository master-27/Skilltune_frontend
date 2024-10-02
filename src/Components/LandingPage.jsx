import React, { useState } from "react";
import TypingEffect from "./TypingEffect";
import LoginForm from "./LoginForm";
import Navbar from "./ChildComp/Navbar";


import Overview from "./Dashboard/Overview";
import { useNavigate } from "react-router-dom";
import Footer from "./Dashboard/Footer";

const LandingPage=()=>{

    const [email,setEmail]  = useState('')
    const [username,setUsername]= useState('')
    const[resume,setResume] = useState(null)
    const navigate = useNavigate();
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
    console.log('Selected file:', file);
  };
  const handleMcq = ()=>{
    if(resume == null) alert("choose a file")
    else
    {
    localStorage.setItem("SkillTuneLogin",false)
    navigate("/session",{state:{resume:resume}})
    }
  }
  const handleInterview = ()=>{
    if(resume == null) 
    alert("choose a file")
    else
{ localStorage.setItem("SkillTuneLogin",false)
    console.log(localStorage.getItem("SkillTuneLogin"))
     navigate("/advice",{state:{resume:resume}})}
  
  }
   
    return(
    <>
    <Navbar isLoggedin={false} email={null} username={null}/>

    <div className="flex flex-row flex-wrap justify-between   bg-gradient-to-r bg-gray-300">
    <div className="flex  flex-1 flex-col flex-wrap min-w-xl max-w-xl min-h-screen m-5 px-5 py-5 bg-white  shadow-md rounded ">
        <h1 className="text-4xl font-bold mb-4">SkillTune</h1>
        <TypingEffect text={"SkillTune is an AI-powered platform designed to help you prepare for interviews by tailoring practice questions to your resume and skills." } speed={100}/>
       <label className="font-bold mb-1 mt-10">Upload Resume<span className="font-normal text-red-500 text-sx">(*without Login)</span></label><input onChange={handleFileUpload}type='file' accept=".pdf"></input>
        <button  onClick={handleMcq}className="bg-gray-500 rounded-md text-white font-bold hover:bg-gray-400 py-2 mt-11" type="button">Multiple Choice Questions</button>
        <button onClick={handleInterview} className="bg-gray-500 rounded-md text-white font-bold hover:bg-gray-400 py-2 mt-11" type="button">Interview Practice</button>
        
    </div>
    <div className=" flex-1 justify-center items-center  m-5 px-5 py-5 ">
        <LoginForm />

    </div>
   
    </div>
   
    </>
    )
}   
export default LandingPage;