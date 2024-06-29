// src/ApplicationForm.js
import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    school: '',
    degree: '',
    major: '',
    gpa: '',
    graduationDate: '',
    startDate: '',
    duration: '',
    department: '',
    resume: null,
    coverLetter: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send formData to your server
    console.log(formData);
    alert('Form submitted!');
  };

  return (
    <div className="App">
    <h1>Internship Application Form</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label className='block text-sm font-medium text-gray-1000'> First Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
        </div>
        <div>
        <label className='block text-sm font-medium text-gray-1000'> Last Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} 
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
           />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000' >Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}
        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000' >School/University:</label>
        <input type="text" name="school" value={formData.school} onChange={handleChange} 
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
           />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Degree:</label>
        <input type="text" name="degree" value={formData.degree} onChange={handleChange} 
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
           />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Major:</label>
        <input type="text" name="major" value={formData.major} onChange={handleChange} 
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
           />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>CGPA:</label>
          <input type="text" name="gpa" value={formData.gpa} onChange={handleChange}
        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
      </div>
     
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}  
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
     
          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Duration (months):</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange}  
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
     
          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Department/Role Interested In:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange}  
         className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
     
          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Resume:</label>
        <input type="file" name="resume" onChange={handleChange}  
         className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
     
          />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-1000'>Cover Letter:</label>
          <input type="file" name="coverLetter" onChange={handleChange}
        className='appearance-none block w-400px px-3 py-2 border border-blue-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

           />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ApplicationForm;
