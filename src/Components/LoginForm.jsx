
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import API_URL from "../api_config";



const LoginForm=()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[userName,setUsername] = useState('')

    const handleSubmit= (event)=>{
        //here i will write the submit function.
         event.preventDefault();
         if(email === '' || password ===''){
            alert("please enter all fields")
            return
         }

         console.log(import.meta.env.VITE_API_URL)
       
         axios.post(`${import.meta.env.VITE_API_URL}auth/login/`, {
            email: email,
            password: password
        })
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                setUsername(response.data.userName);
                 setEmail(response.data.email); 
                 localStorage.setItem("SkillTuneLogin","true")
                navigate('/dashboard',{state:{username:response.data.userName, email:email}}); 
            } else {
                alert("Invalid credentials");
            }
        })
        .catch((error) => {
            console.log(error)
            alert("Invalid credentials");
            console.log(error); 
        });
         

        
        
      
        
    }
    const signup = (event)=>{
        event.preventDefault();
        navigate('/signup')

    }
    return(
        <>
            <form className="flex flex-col " onSubmit={handleSubmit}>
            <span className="text-xl">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input className="px-2 py-2 w-full mb-3 rounded-md" placeholder="Email" onChange={(item)=>{setEmail(item.target.value)}}  type="email"/> <br/>
            <span className="text-xl">Password: </span><input className="px-2  rounded-md py-2 mb-3" placeholder="Password" onChange={(item)=>{setPassword(item.target.value)}} type="password"/><br/>
            <button className="bg-gray-500 text-white hover:bg-gray-400 rounded-md px-2 py-2 font-bold justify-center items-center" type="submit">Login</button>
            <span onClick={signup} className=" cursor-pointer mt-3">Don't have account?/<span className="underline hover:text-blue-600">SingUp</span></span> 
            </form>
        </>
    )
}
export default LoginForm;   

