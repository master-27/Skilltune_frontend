import React from 'react';

const RecentActivities = ({ activities }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="mb-4">
            <p className="text-gray-700">{activity.description}</p>
            <span className="text-gray-500 text-sm">{activity.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentActivities;
