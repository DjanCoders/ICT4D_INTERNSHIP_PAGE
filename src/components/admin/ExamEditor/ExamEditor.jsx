import React, { useState } from "react";
import "./editExam.scss";

function ExamEditor() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [mcq,SetMcq]=useState(true)

  // Function to add a new question with options
  const addQuestion = () => {
    const newQuestions = {
      text: questionText,
      options: mcq ? [...options] : [],
      correctAnswerIndex: mcq ? correctAnswerIndex : null,
      type: mcq ? "MCQ" : "Descriptive"
    };
    setQuestions([ ...questions, newQuestions]);
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
      
      <div className="choice-buttons">
        <button onClick={()=>SetMcq(true) } className="mcq">MCQS</button>
        <button onClick={()=>SetMcq(false) }className="shortAnswer">Descriptive</button>

      </div>
      {/* Question Input */}
      {mcq ? (
  <>
    <input
      className="question-text"
      type="text"
      value={questionText}
      onChange={(e) => setQuestionText(e.target.value)}
      placeholder="Enter question text"
    />
      
    {/* Option Inputs */}
    <h3>Options:</h3>
    {options.map((option, index) => (
      <div key={index}>
        <input
          className="option"
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
   <button className="submit" onClick={addQuestion}>Add </button>

  </>
      ) : (
    <div className="text-area-continear">
  <textarea
    className="text-area"
    value={questionText}
    onChange={(e) => setQuestionText(e.target.value)}
    placeholder="Enter question text"
          >

            </textarea>
  <button className="add-button" onClick={addQuestion}>Add </button>

         </div> 
)}

      
      {/* Display added questions */}
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>{q.text}</strong>
            {q.type === "MCQ" && (
              <ul>
                {q.options.map((option, optIndex) => (
                  <li key={optIndex}>
                    {option} {optIndex === q.correctAnswerIndex && "(answer)"}
                  </li>
                ))}
              </ul> )}
              {q.type === "Descriptive" && <p>Answer: Free Text</p>}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamEditor;
