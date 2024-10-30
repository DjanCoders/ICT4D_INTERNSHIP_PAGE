import React, { useState, useEffect } from "react";
import "./editExam.scss";
import { getMCQs, getShortQs } from "../../../api";

function ExamEditor() {
  const [mcqquestions, setMcqQuestions] = useState([]);
  const [shortAnswerQs, setShortAnswerQs] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchMcqQuestions = async () => {
      const mcqresponse = await getMCQs();
      setMcqQuestions(mcqresponse.data);
    }
    const fetchShortAnswerQs = async () => {
      const response = await getShortQs();
      setShortAnswerQs(response.data)
    }

    fetchMcqQuestions();
    fetchShortAnswerQs();
  }, []);

  useEffect(() => {
    const newAnswers = {};
    mcqquestions.forEach((q) => {
      if (q.question_type === "MCQ") {
        q.options.forEach((option) => {
          if (option.is_answer) {
            newAnswers[q.text] = option.text;
          }
        });
      }
    });
      setAnswers(newAnswers);
    }, [mcqquestions]);

  return (
    <div className="edit-exam">
      {/* Display added questions */}
      <ul>
        {mcqquestions.concat(shortAnswerQs).map((q, index) => (
          <li key={index}>
            <strong>{index + 1}. {q.text}</strong>
            {q.question_type === "MCQ" && (
              <ul>
                {q.options.map((option, optIndex) => (
                  <li key={optIndex}>
                    {option.id}. {option.text}
                  </li>
                ))}
              </ul>
            )}
            <p><strong>Answer:</strong> {q.question_type === "MCQ" ? answers[q.text] : q.short_answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamEditor;
