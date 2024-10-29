import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const WorkAreaDetails = () => {
    const [workAreaInfo, setWorkAreaInfo] = useState(null);

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
    
    const handleUpdateStatus = async (id, isActive) => {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/internships/${id}/status/`,
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

                  </TableRow>
              ))}
          </TableBody>
      </Table>
      </TableContainer>
      </>
    );
};

export default WorkAreaDetails;
