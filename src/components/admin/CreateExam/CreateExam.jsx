import React, { useState, useEffect,useContext } from "react";
import {
  updateMCQQuestion,
  createMCQQuestion,
  updateShortAnswerQuestion,
  createShortAnswerQuestion,
} from "../../../api";
import "./editExam.scss";
import { ColorContext } from "../../ColorContext/DarkContext";

const CreateExam = ({ question, onSubmit, isEditMode = false }) => {
    const {darkMode} = useContext(ColorContext);
    const colorStyle={
          color: darkMode ? 'green' : '#000'
          }
  const [text, setText] = useState(question?.text || "");
  const [questionType, setQuestionType] = useState(
    question?.question_type || "MCQ"
  );
  const [options, setOptions] = useState(
    question?.options || [{ text: "", is_answer: false }]
  );
  const [shortAnswer, setShortAnswer] = useState(question?.short_answer || "");

  useEffect(() => {
    if (isEditMode && question) {
      // Initialize with question data if editing
      setText(question.text);
      setQuestionType(question.question_type);
      setOptions(question.options || [{ text: "", is_answer: false }]);
      setShortAnswer(question.short_answer || "");
    }
  }, [question, isEditMode]);

  const resetForm = () => {
    setText("");
    setQuestionType("MCQ");
    setOptions([{ text: "", is_answer: false }]);
    setShortAnswer("");
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", is_answer: false }]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, idx) => idx !== index));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    if (field === "is_answer") {
      // Reset all options to false except the selected one
      updatedOptions.forEach((option, idx) => {
        option.is_answer = idx === index ? value : false;
      });
    }
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = {
      text,
      question_type: questionType,
      options: questionType === "MCQ" ? options : undefined,
      short_answer: questionType === "DESC" ? shortAnswer : undefined,
    };

    try {
      let response;
      if (questionType === "MCQ") {
        response = isEditMode
          ? await updateMCQQuestion(question.id, questionData)
          : await createMCQQuestion(questionData);
      } else {
        response = isEditMode
          ? await updateShortAnswerQuestion(question.id, questionData)
          : await createShortAnswerQuestion(questionData);
      }

      onSubmit(response.data);
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="edit-exam">
      <form className="edit-exam-form" onSubmit={handleSubmit}>
        <div className="question-text">
          <label style={ colorStyle}>Question Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className="quesion-type">
          <label style={ colorStyle}>Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option style={ colorStyle} value="MCQ">Multiple Choice</option>
            <option style={ colorStyle} value="DESC">Descriptive</option>
          </select>
        </div>

        {questionType === "MCQ" && (
          <div className="option">
            <label style={ colorStyle} >Options</label>
            {options.map((option, index) => (
              <div
                key={index}
               
              >
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(index, "text", e.target.value)
                  }
                  placeholder="Option text"
                  required
                />
                <label style={ colorStyle}>
                  <input
                    type="radio"
                    name="is_answer"
                    checked={option.is_answer}
                    onChange={() =>
                      handleOptionChange(index, "is_answer", true)
                    }
                  />
                  Is Answer
                </label>
                <button style={ {color:darkMode ? 'white' : '#000'}}className="remove-buttn" type="button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button style={ {color:darkMode ? 'white' : '#000'}} className = 'add-button'type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}

        {questionType === "DESC" && (
          <div className="short-answer">
            <label style={ colorStyle}>Short Answer</label>
            <input
              type="text"
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              placeholder="Optional correct answer"
            />
          </div>
        )}

        <button type="submit">
          {isEditMode ? "Update Question" : "Create Question"}
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
