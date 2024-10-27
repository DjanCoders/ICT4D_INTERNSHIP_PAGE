// ReviewSubmissions.js
import React from "react";

function ReviewSubmissions() {
  // Placeholder data; Replace with API call
  const submissions = [{ applicantName: "John Doe", answers: ["Answer 1", "Answer 2"] }];

  return (
    <div>
      <h2>Review Submissions</h2>
      {submissions.map((submission, index) => (
        <div key={index}>
          <h3>{submission.applicantName}</h3>
          <ul>
            {submission.answers.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ReviewSubmissions;
