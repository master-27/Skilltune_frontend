
import React from "react";
const Overview = ({skillMastered, sessionsCompleted,overallProgress})=>{
    return(
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div className="flex justify-between items-center">
          <div>
            
            <p className="text-gray-700">Practice Sessions Completed: {sessionsCompleted}</p>
            <p className="text-gray-700">Overall Progress: {overallProgress}%</p>
          </div>
          <div className="w-1/3 relative">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">Progress</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">{overallProgress}%</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500" style={{ width: `${overallProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Overview;
