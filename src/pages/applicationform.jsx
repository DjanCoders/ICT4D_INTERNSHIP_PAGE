// src/ApplicationForm.js
import React, { useState } from 'react';
import './styles.css'
import axios from 'axios';
const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    school: '',
    degree: '',
    major: '',
    gpa: '',
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/applications/",
        formData
      );
      alert('Aplication Created'+response.data)
    } catch (error) {
      alert('Error Creating!'+error);

   }
    
  };

  return (
    <div className='form-wrapper'>
    <div className='left-bar'>
  {/* Coder Image */}
  <img 
    src="https://example.com/coder-image.jpg" 
    alt="Coder" 
    className="w-full h-auto rounded-lg mb-4" 
  />
  
  {/* Basic Info */}
  <div className="info-section">
    <h3 className="font-bold text-lg">Eligibility Criteria</h3>
    <p>Open to students currently enrolled in a degree program.</p>

    <h3 className="font-bold text-lg mt-4">Company Overview</h3>
    <p>We are an innovative tech firm offering internships to aspiring developers.</p>

    <h3 className="font-bold text-lg mt-4">Key Dates</h3>
    <ul>
      <li><strong>Application Start:</strong> [Date]</li>
      <li><strong>Application Deadline:</strong> [Date]</li>
    </ul>

    <h3 className="font-bold text-lg mt-4">FAQs</h3>
    <p>Check our FAQ section for any questions related to the application process.</p>
  </div>
</div>


    <div className="Apply-form">
      <h1>Internship Application </h1>
      <h2>Please complete the form below to apply for Internship with us.</h2>

    <form onSubmit={handleSubmit}>
        <div className='full-name'>
          <span> Full Name</span>
          <br/>
        <label className='text-sm font-medium text-gray-1000'> First Name:</label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} required
          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
       
         <label className=' text-sm font-medium text-gray-1000'> Last Name:</label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} required
        className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

          />
      </div>
        <div className='contact-address'>
        <span> Contact Address</span>
          <br />
         <div>
        <label className='text-sm font-medium text-gray-1000'>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 
                   sm:text-sm'
                  />
      
        <label className='text-sm font-medium text-gray-1000'>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} 
              className='appearance-none  px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 
                  focus:border-green-500 sm:text-sm'

           />
      
        <label className='text-sm font-medium text-gray-1000' >Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}
              className='appearance-none adress-input  px-3 py-2 border border-gray-300
                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 
                  focus:border-green-500 sm:text-sm'


          />
          </div>
          </div>
        <div className='school-info'> 
          <span> School Information</span>
          <div className='school-info-child'>
              
                <label className='text-sm font-medium text-gray-1000' >School/University:</label>
                <input type="text" name="school" value={formData.school} onChange={handleChange} 
              className='appearance-none  px-3 py-2 border border-gray-300 rounded-md
                           shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 
                           focus:border-green-500 sm:text-sm'

                  />
          
                <label className='text-sm font-medium text-gray-1000'>Degree:</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} 
                          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

                  />
                <label className='text-sm font-medium text-gray-1000'>Major:</label>
                <input type="text" name="major" value={formData.major} onChange={handleChange} 
                          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

                  />
              
                <label className='text-sm font-medium text-gray-1000'>CGPA:</label>
                  <input type="text" name="gpa" value={formData.gpa} onChange={handleChange}
                        className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'


                  />
            
          </div>
      </div>
        <div className='date-info'>
          <span>Date Information</span>
          <br />
          
        <label className='text-sm font-medium text-gray-1000'>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}  
                  className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

     
          />
      
        <label className='text-sm font-medium text-gray-1000'>Duration (months):</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange}  
        className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

     
          />
      </div>
      <div>
        <label className='text-sm font-medium text-gray-1000'>Department/Role Interested In:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange}  
          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

     
          />
      </div>
      <div>
        <label className='text-sm font-medium text-gray-1000'>Resume:</label>
        <input type="file" name="resume" onChange={handleChange}  
          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
     
          />
      </div>
      <div>
        <label className='text-sm font-medium text-gray-1000'>Cover Letter:</label>
          <input type="file" name="coverLetter" onChange={handleChange}
          className='appearance-none  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'

           />
      </div>
      <button className='form-button' type="submit">Submit</button>
    </form>
      </div>
    </div>   
  );
};

export default ApplicationForm;
