import React, { useEffect, useState } from "react";
import axios from "axios";
import './reviewSubmissions.scss';

function ReviewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/review-answers/');
        setSubmissions(response.data);
        console.log(submissions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching submissions: {error}</div>;
  }

  // Grouping submissions by applicant name
  const groupedSubmissions = submissions.reduce((acc, submission) => {
    const { applicant_name, mcq_answer_text, desc_answer, review_status, admin_feedback } = submission;
    
    if (!acc[applicant_name]) {
      acc[applicant_name] = { mcq: [], descriptive: [] };
    }

    if (mcq_answer_text) {
      acc[applicant_name].mcq.push({
        question_text: submission.mcq_question_text, // Assuming you have this in your data
        answer_text: mcq_answer_text,
        review_status,
        admin_feedback,
      });
    }

    if (desc_answer) {
      acc[applicant_name].descriptive.push({
        question_text: submission.desc_question_text, // Assuming you have this in your data
        answer_text: desc_answer,
        review_status,
        admin_feedback,
      });
    }

    return acc;
  }, {});

  return (
    <div className="review-submissions">
      <h2>Review Submissions</h2>
      {Object.keys(groupedSubmissions).length > 0 ? (
        Object.keys(groupedSubmissions).map((applicantName, idx) => (
          <div key={idx} className="applicant-section">
            <h3>{applicantName}</h3>
            <div className="answers-group">
              {/* MCQ Questions */}
              <div className="mcq-group">
                <h4>MCQ Answers</h4>
                {groupedSubmissions[applicantName].mcq.length > 0 ? (
                  groupedSubmissions[applicantName].mcq.map((answer, index) => (
                    <div key={index} className="answer-card">
                      <p><strong>Question:</strong> {answer.question_text}</p>
                      <p><strong>Answer:</strong> {answer.answer_text}</p>
                      <p><strong>Review Status:</strong> {answer.review_status}</p>
                      {answer.admin_feedback && (
                        <p><strong>Admin Feedback:</strong> {answer.admin_feedback}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No MCQ answers submitted.</p>
                )}
              </div>
              
              {/* Descriptive Questions */}
              <div className="desc-group">
                <h4>Descriptive Answers</h4>
                {groupedSubmissions[applicantName].descriptive.length > 0 ? (
                  groupedSubmissions[applicantName].descriptive.map((answer, index) => (
                    <div key={index} className="answer-card">
                      <p><strong>Question:</strong> {answer.question_text}</p>
                      <p><strong>Answer:</strong> {answer.answer_text}</p>
                      <p><strong>Review Status:</strong> {answer.review_status}</p>
                      {answer.admin_feedback && (
                        <p><strong>Admin Feedback:</strong> {answer.admin_feedback}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No descriptive answers submitted.</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No submissions to review.</p>
      )}
    </div>
  );
}

export default ReviewSubmissions;
