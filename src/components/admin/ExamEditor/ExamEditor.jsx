import React, { useState } from "react";
import "./editExam.css";

function ExamEditor() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  // Function to add a new question with options
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: questionText, options: [...options], correctAnswerIndex }
    ]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
  };

  // Function to handle option text change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="edit-exam">
      <h2>Exam Editor</h2>
      
      {/* Question Input */}
      <input className="question-text"
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter question text"
      />
      
      {/* Option Inputs */}
      <h3>Options:</h3>
      {
        options.map((option, index) => (
        <div key={index}>
          <input className="option"
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <label>
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
            />
            {'\u00A0'} Is It Answer?
          </label>
        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>
      
      {/* Display added questions */}
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>{q.text}</strong>
            <ul>
              {q.options.map((option, optIndex) => (
                <li key={optIndex}>
                  {option} {optIndex === q.correctAnswerIndex && "(answer)"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamEditor;
