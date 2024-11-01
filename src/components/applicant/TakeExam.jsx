import React, { useState, useEffect } from "react";
import axios from "axios";
import "./takeExam.scss";
import { useAuth } from "../../contexts/AuthContext";
const TakeExam = () => {
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [descQuestions, setDescQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});
  const { token } = useAuth();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-questions/",
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        setMcqQuestions(response.data.mcq_questions);
        setDescQuestions(response.data.desc_questions);
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
      [questionId]: {
        ...prevAnswers[questionId],
        mcq_answer: optionId,
      },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
  };

  const handleDescChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        desc_answer: value,
      },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [questionId]: null }));
  };

  const validateAnswers = () => {
    let isValid = true;
    let validationErrors = {};

      mcqQuestions.forEach((question) => {
        const questionKey = `mcq-${question.id}`; 
      if (!answers[question.id]?.mcq_answer) {
        validationErrors[questionKey] = "Please answer this question";
        isValid = false;
      }
    });

      descQuestions.forEach((question) => {
        const questionKey = `desc-${question.id}`; 
      if (!answers[question.id]?.desc_answer) {
        validationErrors[questionKey] = "Please answer this question";
        isValid = false;
      }
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

    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      mcq_question: mcqQuestions.find((q) => q.id === parseInt(questionId)) ? questionId : null,
      descriptive_question: descQuestions.find((q) => q.id === parseInt(questionId)) ? questionId : null,
      mcq_answer: answers[questionId]?.mcq_answer,
      desc_answer: answers[questionId]?.desc_answer,
    }));

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
        {mcqQuestions?.map((question) => (
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
            {errors[`mcq-${question.id}`] && <p style={{color:"red"}} className="error">{errors[`mcq-${question.id}`]}</p>}
          </div>
        ))}

        {descQuestions?.map((question) => (
          <div key={question.id} className="question">
            <p>{question.text}</p>
            <textarea
              placeholder="Write your answer here"
              rows="3"
              value={answers[question.id]?.desc_answer || ""}
              onChange={(e) => handleDescChange(question.id, e.target.value)}
            />
            {errors[`desc-${question.id}`] && <p style={{color:"red"}}  className="error">{errors[`desc-${question.id}`]}</p>}
          </div>
        ))}

        <button type="button" onClick={handleSubmit}>
          Submit Exam
        </button>
      </form>
      {message && <h2 style={{ color: hasError ? "red" : "green" }}>{message}</h2>}
    </div>
  );
};

export default TakeExam;
