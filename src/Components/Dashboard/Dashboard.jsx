import React, { useEffect, useState } from 'react';
import Overview from './Overview';
import QuickLinks from './QuickLinks';
import RecentActivities from './RecentActivities';
import Feedback from './Feedback';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Navbar from '../ChildComp/Navbar';
import axios from 'axios';
import API_URL from '../../api_config';
import Loader from '../ChildComp/Loader';

const Dashboard = () => {
  const activities = [
    { description: "Completed practice session on JavaScript Basics", time: "2 hours ago" },
    { description: "Upcoming assessment on React.js", time: "Due in 3 days" }
  ];

  const location = useLocation();
  const { email = '', username = '' } = location.state || {};
  const [sessionsCompleted, setCompletedSessions] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.post(API_URL + "user/getProgress/?email=" + email, {})
      .then((Response) => {
        setCompletedSessions(Response.data.practiceSessions);
        setOverallProgress(Response.data.percentage);
      })
      .catch((error) => {
        alert("Exception Occurred");
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [email]); //depends on email

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div> {<Loader/>}
      </div>
    );
  }

  return (
    <>
      <Navbar isLoggedin={true} username={username} email={email} />
      <div className="bg-gray-100 min-h-screen container mx-auto px-4 py-6">
        <main className="mt-6">
          <Overview
            sessionsCompleted={sessionsCompleted}
            overallProgress={overallProgress}
            email={email}
            username={username}
          />
          <QuickLinks email={email} username={username} />
          <Feedback message="Great job on completing your recent practice sessions! Keep up the good work and continue to improve your skills." />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
