
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./takeExam.scss";
import { useAuth } from "../../contexts/AuthContext";

const TakeExam = () => {
  const [questionsByCategory, setQuestionsByCategory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-questions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestionsByCategory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [token]);

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
        formattedAnswers.push({
          mcq_question: question.id, // ID of the MCQ question
          mcq_answer: answer.mcq_answer || null, // Selected option ID or null if not answered
          desc_answer: null, // No descriptive answer for MCQ questions
        });
      }
    });

    category.desc_questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        formattedAnswers.push({
          descriptive_question: question.id, // ID of the descriptive question
          desc_answer: answer.desc_answer || null, // Descriptive answer or null if not answered
          mcq_answer: null, // No answer for MCQ questions
        });
      }
    });
  });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/submit-answers/", formattedAnswers);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while submitting the exam.");
      setHasError(true);
    }
  };

  if (loading) return <p>Loading questions...</p>;

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
