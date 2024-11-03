import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import './reviewSubmissions.scss';
import { CheckCircle, Cancel, HelpOutline } from "@mui/icons-material";
import { green, red, grey } from "@mui/material/colors";

function ReviewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [editingFeedback, setEditingFeedback] = useState({});

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/review-answers/");
        setSubmissions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleFeedbackChange = (id, newFeedback) => {
    setEditingFeedback((prev) => ({
      ...prev,
      [id]: newFeedback,
    }));
  };

  const handleUpdateFeedback = async (id) => {
    const answerToUpdate = submissions.find((answer) => answer.id === id);

    if (answerToUpdate) {
      try {
        await axios.patch(
          `http://127.0.0.1:8000/api/review-answers/${id}/`,
          { admin_feedback: editingFeedback[id] || answerToUpdate.admin_feedback },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission.id === id
              ? { ...submission, admin_feedback: editingFeedback[id] || answerToUpdate.admin_feedback }
              : submission
          )
        );
        setEditingFeedback((prev) => ({ ...prev, [id]: undefined }));
      } catch (err) {
        console.error("Error updating feedback:", err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/review-answers/${id}/`,
        { review_status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === id ? { ...submission, review_status: newStatus } : submission
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching submissions: {error}</div>;
  }

  return (
    <TableContainer component={Paper} className="review-submissions">
      <h2>Review Answer Submissions</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Question Type</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Review Status</TableCell>
            <TableCell>Feedback</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow className="table-row" key={submission.id}>
              <TableCell>{submission.applicant_name}</TableCell>
              <TableCell>{submission.mcq_answer_text ? "MCQ" : "Descriptive"}</TableCell>
              <TableCell>{submission.mcq_answer_text ? submission.mcq_question_text : submission.desc_question_text}</TableCell>
              <TableCell>
                  {submission.mcq_answer_text || submission.desc_answer}
                  {" "}
                  {submission.mcq_answer_text ? (
                    submission.is_correct ? (
                      <CheckCircle sx={{ color: green[500], marginLeft: 1 }} />
                    ) : (
                      <Cancel sx={{ color: red[500], marginLeft: 1 }} />
                    )
                  ) : (
                    <HelpOutline sx={{ color: grey[500], marginLeft: 1 }} />
                  )}
                </TableCell>
              <TableCell>
                <Select
                  value={submission.review_status}
                  onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                >
                  <MenuItem value="PENDING">Pending Review</MenuItem>
                  <MenuItem value="APPROVED">Approved</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                {editingFeedback[submission.id] !== undefined ? (
                  <TextField
                    value={editingFeedback[submission.id]}
                    onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                ) : (
                  submission.admin_feedback
                )}
              </TableCell>
              <TableCell>
                {editingFeedback[submission.id] !== undefined ? (
                  <Button onClick={() => handleUpdateFeedback(submission.id)} variant="contained" color="primary">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={() => setEditingFeedback({ ...editingFeedback, [submission.id]: submission.admin_feedback || "" })} variant="outlined">
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReviewSubmissions;
