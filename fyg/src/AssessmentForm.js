import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';




function AssessmentForm() {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    allergies: '',
    'underlying-conditions': '',
    'dietary-restrictions': '',
    'dietary-preferences': '',
  });

  const [apiResponse, setApiResponse] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const prompt = JSON.stringify(formData);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setApiResponse(text);
    } 
    catch (error) {
      console.error('Error calling Gemini API:', error)
    }

  };


 
  return (
    <div className="assessment-form">
      <h2>Assessment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="question-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
      <div className='question-group'>
        <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div className='question-group'>
        <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="question-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="question-group">
          <label htmlFor="allergies">Allergies</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>
        <div className="question-group">
          <label htmlFor="underlying-conditions">Underlying Conditions</label>
          <input
            type="text"
            id="underlying-conditions"
            name="underlying-conditions"
            value={formData['underlying-conditions']}
            onChange={handleChange}
          />
        </div>
        <div className="question-group">
          <label htmlFor="dietary-restrictions">Dietary Restrictions</label>
          <input
            type="text"
            id="dietary-restrictions"
            name="dietary-restrictions"
            value={formData['dietary-restrictions']}
            onChange={handleChange}
          />
        </div>
        <div className="question-group">
          <label htmlFor="dietary-preferences">Dietary Preferences</label>
          <input
            type="text"
            id="dietary-preferences"
            name="dietary-preferences"
            value={formData['dietary-preferences']}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AssessmentForm;

