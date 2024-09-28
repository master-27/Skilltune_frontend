import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'


import LandingPage from './Components/LandingPage.jsx'
import { Route,Routes } from 'react-router-dom'

import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Signup from './Components/SingupPage.jsx'
import PracticeSession from './Components/session.jsx'
import Test from './Components/ChildComp/Test.jsx'

import AdviceSection from './Components/advice.jsx'
import QuickLinks from './Components/Dashboard/QuickLinks.jsx'
import DummyQuestions from './Components/MockInter.jsx'
import Loader from './Components/ChildComp/Loader.jsx'
import MockInterview from './Components/MockInter.jsx'
import MockResult from './MockResult.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
 <Routes>
<Route  path="/" element={<LandingPage/>} /> 
<Route path="/dashboard" element={<Dashboard/>}/>
 <Route path="/signup" element={<Signup/>}/>
 <Route path="/session" element={<PracticeSession/>}/>
 <Route path='/test' element={<Test/>}/>
 <Route path='/advice' element={<AdviceSection/>}/>
 <Route path='/mockInter' element={<MockInterview/>}/>
  <Route path='/mockResult' element={<MockResult/>}/>

</Routes>
 </>

  )
}

export default App
