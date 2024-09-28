import React, { useState } from "react";
import TypingEffect from "./TypingEffect";
import LoginForm from "./LoginForm";
import Navbar from "./ChildComp/Navbar";


import Overview from "./Dashboard/Overview";

const LandingPage=()=>{

    const [email,setEmail]  = useState('')
    const [username,setUsername]= useState('')
    return(
    <>
    <Navbar isLoggedin={false} email={null} username={null}/>

    <div className="flex flex-row flex-wrap justify-between   bg-gradient-to-r from-blue-500 to-indigo-600">
    <div className="flex  flex-1 flex-col flex-wrap min-w-xl max-w-xl min-h-screen m-5 px-5 py-5 bg-gray-500 shadow-md rounded ">
        <h1 className="text-4xl font-bold mb-4">SkillTune</h1>
        <TypingEffect text={"SkillTune is an Ai-Powered platform to prepare for your interviews based on your resume and skills." } speed={100}/>
{/*      
        <button className="bg-gray-400 rounded-md font-bold hover:text-gray-500 py-2 mt-11" type="button">Continue Without login</button> */}
        
    </div>
    <div className=" flex-1 justify-center items-center  m-5 px-5 py-5 ">
        <LoginForm />

    </div>
    </div>
    </>
    )
}   
export default LandingPage;