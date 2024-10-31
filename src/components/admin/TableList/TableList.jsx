/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from "react";
import "./tableList.scss";
import axios from "axios";
// mui table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Button } from '@mui/material'; 
import { formatDate } from "../../FormateDate";

function TableList({ status }) {
  const [applicant, setApplicant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const getData = async () => {
    const url = "http://127.0.0.1:8000/api/internship-application/";
    try {
      const response = await axios.get(url, {
        params: status !== "all" ? { status } : {},
      });
      const applicantData = response.data;
      setApplicant(applicantData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching  data", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [status]);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/internship-applications/${applicationId}/status/`, {
        status: newStatus,
      });
  
      setApplicant((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicationId ? { ...applicant, status: newStatus } : applicant
        )
      );
      // Reload the entire page after a successful update
       window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true); 
};
const handleClose = () => {
    setOpen(false); // Close the modal without deleting
  };
  const handleDelete = async () => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/internship-application/${deleteId}/`);
    
    // Update local state to remove the deleted item
    setApplicant(applicant.filter(item => item.id !== deleteId));
  } catch (error) {
    console.error("Error deleting work area:", error);
  }
  finally {
      setOpen(false); // Close the modal after the operation
    }
    window.location.reload();

};

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) :  applicant.length > 0 ? (
        <TableContainer component={Paper} className="table_list">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table_head">
              <TableRow>
                <TableCell className="table_cell">Tracking Id</TableCell>
                <TableCell className="table_cell">Name</TableCell>
                <TableCell className="table_cell">Email</TableCell>
                <TableCell className="table_cell">Application Date</TableCell>
                <TableCell className="table_cell">Start Date</TableCell>
                <TableCell className="table_cell">Duration(Mon)</TableCell>
                <TableCell className="table_cell">Applay for</TableCell>

                <TableCell className="table_cell">School</TableCell>

                <TableCell className="table_cell">Status</TableCell>
                  <TableCell className="table_cell" style={{ color: "red" }}>Delete</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {applicant.map((row) => (
                <TableRow key={row.id} className="table_row">
                  <TableCell component="th" scope="row" className="table_cell">
                    <div className="product_idd">{row.id}</div>
                  </TableCell>
                  <TableCell className="table_cell">
                    {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell className="table_cell">{row.email}</TableCell>
                  <TableCell className="table_cell">{formatDate(row.created_at)}</TableCell>
                  <TableCell className="table_cell">{formatDate(row.start_date)}</TableCell>
                  <TableCell className="table_cell">{row.duration}</TableCell>
                  <TableCell className="table_cell">{row.internship_title}</TableCell>
                  <TableCell className="table_cell">{row.school}</TableCell>
                  <TableCell className="table_cell">
                  <select
                    value={row.status}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    className={`status ${row.status}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell className="table_cell">
                  <button title='delete' onClick={() => handleDeleteClick(row.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 style={{color:"red",marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>There No any Data</h1>
      )
      }
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <div style={{ padding: '20px', background: 'white', borderRadius: '8px', maxWidth: '400px', margin: '100px auto' }}>
          <h2 id="confirmation-modal-title">Confirm Deletion</h2>
          <p id="confirmation-modal-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{color:"red"}} color="secondary">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default TableList;
