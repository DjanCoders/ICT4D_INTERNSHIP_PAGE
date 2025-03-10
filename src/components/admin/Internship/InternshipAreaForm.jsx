import React, { useContext, useState } from "react";
import "./workArea.scss";
import { ColorContext } from "../../ColorContext/DarkContext";
import { addWorkArea } from "../../../api";
import { useNavigate } from 'react-router-dom';
const InternshipForm = () => {
  const { darkMode } = useContext(ColorContext);
  const navigate = useNavigate();
  const colorStyle = {
    color: darkMode ? "#fff" : "#000",
  };
  const [internship, setInternship] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    is_active: true,
  });
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setInternship({
      ...internship,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setHasError(false)
    try {
      await addWorkArea(internship);
      setMessage("Internship created Successfully");
      navigate('/admin/work-area-details')
    } catch (error) {
      setMessage("Error creating internship:"+error.message);
      setHasError(true)

    }
  };

  return (
    <div className="internship-form-continear">
      <h2 style={colorStyle}> Add Work Area</h2>
      <form className="internship-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" style={colorStyle}>
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={internship.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="textarea-div">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={internship.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={internship.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            value={internship.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={internship.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="is_active">Active</label>
          <input
            type="checkbox"
            name="is_active"
            checked={internship.is_active}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Internship</button>
      </form>
      <h2 style={{color:hasError?"red":"green"}}>{message}</h2>
    </div>
  );
};

export default InternshipForm;
