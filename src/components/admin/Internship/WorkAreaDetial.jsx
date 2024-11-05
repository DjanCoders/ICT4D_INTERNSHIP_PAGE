import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Modal, Button, TextField, Switch } from '@mui/material';
import { getInternships, deleteWorkArea, updateWorkStatus, updateWorkArea } from '../../../api';

const WorkAreaDetails = () => {
    const [workAreaInfo, setWorkAreaInfo] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteModal(true); // Open the confirmation modal
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false); // Close the modal without deleting
    };

    const handleEditClick = (row) => {
        setEditData(row);
        setOpenEditModal(true); // Open the edit modal
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
      setEditData(null); // Clear the edit data when closing

    };

    useEffect(() => {
        const fetchWorkAreaInfo = async () => {
            try {
                const response = await getInternships(); 
                setWorkAreaInfo(response.data);
            } catch (error) {
                console.error('Error fetching work area info:', error);
            }
        };

        fetchWorkAreaInfo();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteWorkArea(deleteId);
            setWorkAreaInfo(workAreaInfo.filter(item => item.id !== deleteId));
        } catch (error) {
            console.error("Error deleting work area:", error);
        } finally {
            setOpenDeleteModal(false);
        }
    };

    const handleUpdateStatus = async (id, isActive) => {
        try {
            await updateWorkStatus(id, isActive);
            setWorkAreaInfo(prev => 
                prev.map(item => (item.id === id ? { ...item, is_active: isActive } : item))
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleEditSave = async () => {
        try {
            const updatedItem = await updateWorkArea(editData.id, editData);
            setWorkAreaInfo(prev => 
                prev.map(item => (item.id === editData.id ? updatedItem : item))
            );
        } catch (error) {
            console.error("Error updating work area:", error);
        } finally {
            handleCloseEditModal();
            

      }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
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
                            <TableCell className="table_cell">Actions</TableCell>
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
                                    <button title='edit' onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <EditIcon style={{ color: 'blue' }} />
                                    </button>
                                    <button title='delete' onClick={() => handleDeleteClick(row.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <DeleteIcon style={{ color: 'red' }} />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="confirmation-modal-title"
                aria-describedby="confirmation-modal-description"
            >
                <div style={{ padding: '20px', background: 'white', borderRadius: '8px', maxWidth: '400px', margin: '100px auto' }}>
                    <h2 id="confirmation-modal-title">Confirm Deletion</h2>
                    <p id="confirmation-modal-description">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} style={{ color: "red" }} color="secondary">
                        Delete
                    </Button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-modal-title"
                aria-describedby="edit-modal-description"
            >
                <div style={{ padding: '20px', background: 'white', borderRadius: '8px', maxWidth: '500px', margin: '100px auto' }}>
                    <h2 id="edit-modal-title">Edit Work Area</h2>
                    <TextField
                        label="Title"
                        name="title"
                        value={editData?.title || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Start Date"
                        name="start_date"
                        value={editData?.start_date || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        name="end_date"
                        value={editData?.end_date || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={editData?.location || ''}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <div>
                        <span>Active Status: </span>
                        <Switch
                            checked={editData?.is_active || false}
                            onChange={(e) => setEditData(prev => ({ ...prev, is_active: e.target.checked }))}
                        />
                    </div>
                    <Button onClick={handleCloseEditModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="secondary">
                        Save Changes
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default WorkAreaDetails;
