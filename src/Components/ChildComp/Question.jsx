import React, { useState } from 'react';

const Question = ({ question, handleOptionSelect , setScore}) => {
  const { id, questionText, options, correctAnswer, explanation } = question;
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  
  // Handle selection of  option
  const onSelect = (option) => {
    if (!isOptionSelected) {
      setSelectedOption(option); 
      setIsOptionSelected(true); 
      handleOptionSelect(id, option); 
  
      if (correctAnswer === option) {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          console.log("Question NO: " + id + "  Score: " + newScore);
          return newScore; 
        });
      }
    }
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">{id + 1}. &nbsp;{questionText}</h3>
      <div className={`grid ${options.length <= 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full p-4 rounded-lg text-left border transition duration-300 ${
              selectedOption === option
                ? (correctAnswer === option) ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
            disabled={isOptionSelected} // Disable button if an option has been selected
            aria-pressed={selectedOption === option} 
          >
            {option}
          </button>
        ))}
      </div>
      <details className='mx-auto my-4 border bg-white border-blue-500 cursor-pointer mb-3'>
        <summary className='w-full bg-white px-4 py-3 flex justify-between after:content-["+"]'>
          View Solution
        </summary>
        <p className='px-4 py-3'>
          {explanation}
        </p>
      </details>
    </div>
  );
};

export default Question;
