import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Modal, TextField } from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit';
import { getExamSettings, updateExamSetting } from '../../../api';


const ExamSettingsDetails = () => {
    const [examSettings, setExamSettings] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSetting, setSelectedSetting] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");

    const handleEditClick = (setting) => {
        setSelectedSetting(setting);
        setStartTime(setting.start_time);
        setDuration(setting.duration);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSetting(null);
    };

    useEffect(() => {
        const fetchExamSettings = async () => {
            try {
                const response = await getExamSettings();
                setExamSettings(response.data);
                console.log(examSettings)
            } catch (error) {
                console.error('Error fetching exam settings:', error);
            }
        };
        fetchExamSettings();
    }, []);

    const handleSave = async () => {
        try {
            const updatedSetting = { start_time: startTime, duration: duration };
            await updateExamSetting(selectedSetting.id, updatedSetting);
            setExamSettings(prev =>
                prev.map(item => item.id === selectedSetting.id ? { ...item, ...updatedSetting } : item)
            );
            handleClose();
        } catch (error) {
            console.error("Error updating exam setting:", error);
        }
    };

    if (!examSettings) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1><strong>Timing Details</strong></h1>
            <TableContainer component={Paper} className="table_list">
                <Table sx={{ minWidth: 650 }} aria-label="exam settings table">
                    <TableHead className="table_head">
                        <TableRow>
                            <TableCell className="table_cell">Category</TableCell>
                            <TableCell className="table_cell">Start Time</TableCell>
                            <TableCell className="table_cell">Duration (minutes)</TableCell>
                            <TableCell className="table_cell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examSettings.map((setting) => (
                            <TableRow key={setting.id} className="table_row">
                                <TableCell className="table_cell">{setting.internship_title}</TableCell>
                                <TableCell className="table_cell">{new Date(setting.start_time).toLocaleString()}</TableCell>
                                <TableCell className="table_cell">{setting.duration}</TableCell>
                                <TableCell className="table_cell">
                                    <Button 
                                        onClick={() => handleEditClick(setting)} 
                                        startIcon={<EditIcon />} 
                                        variant="outlined" 
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <div style={{ padding: '20px', background: 'white', borderRadius: '8px', maxWidth: '400px', margin: '100px auto' }}>
                    <h2>Edit Exam Setting</h2>
                    <TextField
                        label="Start Time"
                        type="datetime-local"
                        fullWidth
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        margin="normal"
                    />
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ExamSettingsDetails;
