import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Button } from '@mui/material'; 
const WorkAreaDetails = () => {
    const [workAreaInfo, setWorkAreaInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpen(true); // Open the confirmation modal
    };
    const handleClose = () => {
        setOpen(false); // Close the modal without deleting
      };

    useEffect(() => {
        const fetchWorkAreaInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/internships/'); 
                setWorkAreaInfo(response.data);
            } catch (error) {
                console.error('Error fetching work area info:', error);
            }
        };

        fetchWorkAreaInfo();
    }, []);
    

    const handleDelete = async () => {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/internships/${deleteId}/`);
          
          // Update local state to remove the deleted item
          setWorkAreaInfo(workAreaInfo.filter(item => item.id !== deleteId));
        } catch (error) {
          console.error("Error deleting work area:", error);
        }
        finally {
            setOpen(false); // Close the modal after the operation
          }
      };
    const handleUpdateStatus = async (id, isActive) => {
      try {
         await axios.patch(`http://127.0.0.1:8000/api/internships/${id}/status/`,
                                           { is_active: isActive }); 
          // Update local state to reflect the change
          setWorkAreaInfo(prev => 
              prev.map(item => (item.id === id ? { ...item, is_active: isActive } : item))
          );
      } catch (error) {
          console.error('Error updating status:', error);
      }
  };
  
  
    if (!workAreaInfo) {
        return <p>Loading...</p>;
    }

  return (
    <>
      <h1><strong>Work Area Info</strong></h1>
      <TableContainer component={Paper} className="table_list">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table_head">
              <TableRow>
                  <TableCell className="table_cell">Title</TableCell>
                  <TableCell className="table_cell">Start Date</TableCell>
                  <TableCell className="table_cell">End Date</TableCell>
                  <TableCell className="table_cell">Location</TableCell>
                <TableCell className="table_cell">Is Active</TableCell>
                <TableCell className="table_cell">Delete</TableCell>

              </TableRow>
          </TableHead>
          <TableBody>
              {workAreaInfo.map((row) => (
                  <TableRow key={row.id} className="table_row">
                      <TableCell className="table_cell">{row.title}</TableCell>
                      <TableCell className="table_cell">{row.start_date}</TableCell>
                      <TableCell className="table_cell">{row.end_date}</TableCell>
                      <TableCell className="table_cell">{row.location}</TableCell>
                      <TableCell className="table_cell" style={{ color: row.is_active ? 'green' : 'red' }}>
                          {row.is_active ? 'Active' : 'Inactive'}&nbsp;&nbsp;
                          <button
                            onClick={() => handleUpdateStatus(row.id, !row.is_active)}
                            style={{
                              backgroundColor: row.is_active ? 'red' : 'green',
                              color: 'white', 
                              border: 'none', 
                              padding: '5px', 
                              cursor: 'pointer', 
                              borderRadius:'5px',
                            }}
                          >
                            {row.is_active ? 'Deactivate' : 'Activate'}
                          </button>
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
};

export default WorkAreaDetails;
