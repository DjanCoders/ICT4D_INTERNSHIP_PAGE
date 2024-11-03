import React, { useState, useEffect } from "react";
import "./takeExam.scss";
import { getQuestions, submitQuesionsAnswer } from "../../api";

const TakeExam = () => {
  const [questionsByCategory, setQuestionsByCategory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestionsByCategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleMCQChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { ...prevAnswers[questionId], mcq_answer: optionId },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
  };

  const handleDescChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { ...prevAnswers[questionId], desc_answer: value },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
  };

  const validateAnswers = () => {
    let isValid = true;
    let validationErrors = {};

    questionsByCategory.forEach((category) => {
      category.mcq_questions.forEach((question) => {
        if (!answers[question.id]?.mcq_answer) {
          validationErrors[question.id] = "Please answer this question";
          isValid = false;
        }
      });
      category.desc_questions.forEach((question) => {
        if (!answers[question.id]?.desc_answer) {
          validationErrors[question.id] = "Please answer this question";
          isValid = false;
        }
      });
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setMessage("");
    setHasError(false);

    if (!validateAnswers()) {
      setMessage("Please answer all required questions.");
      setHasError(true);
      return;
    }

    const formattedAnswers = [];

    questionsByCategory.forEach((category) => {
      category.mcq_questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          const selectedOption = question.options.find(
            (option) => option.id === answer.mcq_answer
          );
          formattedAnswers.push({
            mcq_question: question.id,
            mcq_question_text: question.text,
            descriptive_question: null,
            desc_question_text: null,
            desc_answer: null,
            mcq_answer: selectedOption ? selectedOption.id : null,
          });
        }
      });

      category.desc_questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          formattedAnswers.push({
            mcq_question: null,
            mcq_question_text: null,
            descriptive_question: question.id,
            desc_question_text: question.text,
            desc_answer: answer.desc_answer || null,
            mcq_answer: null,
          });
        }
      });
    });

    try {
      const response = await submitQuesionsAnswer(formattedAnswers);
      console.log(formattedAnswers);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while submitting the exam.");
      setHasError(true);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (questionsByCategory.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ color: "#555", fontSize: "1.5rem" }}><b>No Questions Available</b></h1>
        <p style={{ color: "#777", fontSize: "1rem" }}>
          Currently, there are no questions available for this category. <br/>
          Please check back later or explore other categories.
        </p>
      
      </div>
    );
  }
  
  return (
    <div className="take-exam">
      <h1>Take Exam</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {questionsByCategory.map((category) => (
          <div key={category.category_name} className="category">
            <h2>{category.category_name}</h2>
            {category.mcq_questions.map((question) => (
              <div key={question.id} className="question">
                <p>{question.text}</p>
                {question.options.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={`mcq-${question.id}`}
                      checked={answers[question.id]?.mcq_answer === option.id}
                      onChange={() => handleMCQChange(question.id, option.id)}
                    />
                    {option.text}
                  </label>
                ))}
                {errors[question.id] && <p style={{ color: "red" }}>{errors[question.id]}</p>}
              </div>
            ))}
            {category.desc_questions.map((question) => (
              <div key={question.id} className="question">
                <p>{question.text}</p>
                <textarea
                  placeholder="Write your answer here"
                  rows="3"
                  value={answers[question.id]?.desc_answer || ""}
                  onChange={(e) => handleDescChange(question.id, e.target.value)}
                />
                {errors[question.id] && <p style={{ color: "red" }}>{errors[question.id]}</p>}
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>Submit Exam</button>
      </form>
      {message && <h2 style={{ color: hasError ? "red" : "green" }}>{message}</h2>}
    </div>
  );
};

export default TakeExam;
