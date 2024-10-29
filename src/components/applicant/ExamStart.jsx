// ExamStart.js
import React from "react";
import { useNavigate } from "react-router-dom";

function ExamStart() {
  const navigate = useNavigate();

  const startExam = () => {
    navigate("/applicant/exam-question");
  };

  return (
    <div>
      <h2>Welcome to the Exam</h2>
      <button onClick={startExam}>Start Exam</button>
    </div>
  );
}

export default ExamStart;
