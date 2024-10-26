// ExamSettings.js
import React, { useState } from "react";

function ExamSettings() {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60);

  const saveSettings = () => {
    // API call to save settings
    console.log({ startTime, duration });
  };

  return (
    <div>
      <h2>Exam Settings</h2>
      <label>Start Time:</label>
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <label>Duration (minutes):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default ExamSettings;
