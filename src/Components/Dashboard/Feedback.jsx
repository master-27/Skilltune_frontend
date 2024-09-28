import React from 'react';

const Feedback = ({ message }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>
      <p className="text-gray-700">{message}</p>
    </section>
  );
};

export default Feedback;
