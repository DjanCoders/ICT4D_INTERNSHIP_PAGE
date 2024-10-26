// ExamQuestion.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExamQuestion() {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const navigate = useNavigate();

  const submitAnswer = () => {
    // Save answer to state or API
    navigate("/applicant/exam-submission");
  };

  return (
    <div>
      <h3>Question 1: Sample question text</h3>
      <input type="text" value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} />
      <button onClick={submitAnswer}>Submit Answer</button>
    </div>
  );
}

export default ExamQuestion;
