// SkillSearch.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API_URL  from '../api_config.js'

const SkillSearch = ({ onSkillsSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skills, setSkills] = useState([]);
   
   //caching.
    useEffect(() => {
        const cachedSkills = localStorage.getItem('skills');
        if (cachedSkills) {
            setSkills(JSON.parse(cachedSkills));
        } else {
            axios.get(API_URL + "test/getSkills/")
                .then((response) => {
                    setSkills(response.data);
                    localStorage.setItem('skills', JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log("Exception Occurred", error);
                });
        }
    }, []); 

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        setFilteredSkills(skills.filter(skill => skill.toLowerCase().includes(value.toLowerCase())));
    };

    const selectSkill = (skill) => {
        if (!selectedSkills.includes(skill)) {
            let index = skills.findIndex(s=>s===skill);
           
            const updatedSkills = [...selectedSkills, skill];
            setSelectedSkills(updatedSkills);
            onSkillsSelect(updatedSkills); // Send the selected skills to parent component
        }
        setQuery('');
        setFilteredSkills([]);
    };

    const removeSkill = (skill) => {
        const updatedSkills = selectedSkills.filter(s => s !== skill);
        setSelectedSkills(updatedSkills);        
        onSkillsSelect(updatedSkills);
        let index = skills.findIndex(s=>s===skill);
        const updatedSkillsId = onSkillsSelectId.filter(s=>s!= index);
      
        
    };

    return (
        <div className="mb-4">
            <label className="block font-bold inline-block mb-2">Skills</label><span className='text-xs'>&nbsp;(select at lease 5 skills)</span>
            <input
                type="text"
                className="border rounded w-full p-2"
                placeholder="Type to search skills"
                value={query}
                onChange={handleInputChange}
            />
            {filteredSkills.length > 0 && (
                <ul className="border rounded mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                        <li
                            key={skill}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                            onClick={() => selectSkill(skill)}
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            )}
            {selectedSkills.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold">Selected Skills:</h4>
                    <div className="flex flex-wrap mt-1">
                        {selectedSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-blue-500 text-white rounded-full px-4 py-1 m-1 cursor-pointer hover:bg-red-500"
                                onClick={() => removeSkill(skill)}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillSearch;
