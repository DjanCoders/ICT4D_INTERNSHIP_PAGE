import React, { useState, useEffect } from "react";
import "./exam-setting.scss";
import { getInternships, addExamEsttings } from "../../../api";
import ExamSettingsDetails from "./ExamSettingDetail";

function ExamSettings() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [message,setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  // Fetch internship categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setMessage('');
      try {
        const response = await getInternships() 
        setCategories(response.data);

      } catch (error) {
        setMessage("Error fetching categories:", error);
        setHasError(true)
      }
    };
    fetchCategories();
  }, []);

  const saveSettings = async () => {
    setMessage('');
    setHasError(false);
    if (!selectedCategory) {
      setMessage("Please select a category.");
      setHasError(true)
      return;
    }

    const settingsData = {
      category: selectedCategory,
      start_time: startTime,
      duration: parseInt(duration, 10),
    };

    try {
      // API call to save settings
      await addExamEsttings(settingsData); 
      setMessage("Exam settings saved successfully.");
      setHasError(false);
    } catch (error) {
      let customMessage = "Failed to save exam settings.";
    
      if (error.response) {
        // Customize based on the status code
        switch (error.response.status) {
          case 400:
            customMessage = "Invalid input: Please check the data you've entered.";
            break;
          case 401:
            customMessage = "Unauthorized: Please log in to continue.";
            break;
          case 500:
            customMessage = "Server error: Please try again later.";
            break;
          default:
            customMessage = "An error occurred. Please try again.";
        }
      } else if (error.request) {
        customMessage = "Network error: Please check your internet connection.";
      } else {
        customMessage = `Unexpected error: ${error.message}`;
      }
    
      setMessage(customMessage);
      setHasError(true);
    }
  };

  return (
    <div className="exam-setting-wrapper">
    <div className="exam-setting">

      <h1>Add Timeing For an Internship</h1><br/>
      <h2 style={{ color: hasError ? "red" : "green" }} >{message }</h2>
      <div className="exam-setting-inputs">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setMessage('')
            setHasError(false)
            setSelectedCategory(e.target.value)
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title} 
            </option>
          ))}
        </select>

        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <button onClick={saveSettings}>Save Settings</button>
      </div>
      
      <div className="exam-setting-detail">
        <ExamSettingsDetails/>
      </div>
      </div>
  );
}

export default ExamSettings;
