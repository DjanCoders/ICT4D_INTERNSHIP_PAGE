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

function TableList({ status }) {
  const [applicant, setApplicant] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  //     const applicants = [
  //     {
  //         _id: 12345,
  //         category: 'Web Development',
  //         first_name: 'Jemberu',
  //         last_name: 'Kassie',
  //         application_date: '3 October, 2022',
  //         start_date: '3 October, 2022',
  //         end_date: '3 January, 2023',
  //         email: 'jemberu@gmail.com',
  //         school: 'Bahir Dar University',
  //         status: 'Approved',
  //     },
  //     {  _id: 12346,
  //         category: 'Data Science',
  //         first_name: 'Amanuel',
  //         last_name: 'Tadesse',
  //         application_date: '15 September, 2022',
  //         start_date: '1 October, 2022',
  //         end_date: '1 January, 2023',
  //         email: 'amanuel.tadesse@gmail.com',
  //         school: 'Addis Ababa University',
  //         status: 'Pending',
  //     },
  //     {   _id:23456,
  //         category: 'Cyber Security',
  //         first_name: 'Hana',
  //         last_name: 'Abebe',
  //         application_date: '12 November, 2022',
  //         start_date: '15 November, 2022',
  //         end_date: '15 February, 2023',
  //         email: 'hana.abebe@yahoo.com',
  //         school: 'Hawassa University',
  //         status: 'Approved',
  //     },
  //     {_id:76543,
  //         category: 'Mobile Development',
  //         first_name: 'Yared',
  //         last_name: 'Mulugeta',
  //         application_date: '22 August, 2022',
  //         start_date: '1 September, 2022',
  //         end_date: '1 December, 2022',
  //         email: 'yared.mulugeta@hotmail.com',
  //         school: 'Jimma University',
  //         status: 'Rejected',
  //     },
  //     {_id:876567,
  //         category: 'Web Development',
  //         first_name: 'Selam',
  //         last_name: 'Girma',
  //         application_date: '5 October, 2022',
  //         start_date: '10 October, 2022',
  //         end_date: '10 January, 2023',
  //         email: 'selam.girma@gmail.com',
  //         school: 'Mekelle University',
  //         status: 'Approved',
  //     },
  //     {_id:6543,
  //         category: 'Artificial Intelligence',
  //         first_name: 'Getnet',
  //         last_name: 'Desalegn',
  //         application_date: '9 October, 2022',
  //         start_date: '15 October, 2022',
  //         end_date: '15 January, 2023',
  //         email: 'getnet.desalegn@gmail.com',
  //         school: 'Gondar University',
  //         status: 'Pending',
  //     },
  //     {_id:6543,
  //         category: 'Software Engineering',
  //         first_name: 'Mulu',
  //         last_name: 'Belayneh',
  //         application_date: '29 September, 2022',
  //         start_date: '5 October, 2022',
  //         end_date: '5 January, 2023',
  //         email: 'mulu.belayneh@yahoo.com',
  //         school: 'Wolaita Sodo University',
  //         status: 'Approved',
  //     },
  //     {_id:87654,
  //         category: 'UI/UX Design',
  //         first_name: 'Eden',
  //         last_name: 'Tesfaye',
  //         application_date: '15 October, 2022',
  //         start_date: '20 October, 2022',
  //         end_date: '20 January, 2023',
  //         email: 'eden.tesfaye@gmail.com',
  //         school: 'Dire Dawa University',
  //         status: 'Rejected',
  //     },
  //     {_id:98765,
  //         category: 'Project Management',
  //         first_name: 'Fitsum',
  //         last_name: 'Kebede',
  //         application_date: '1 November, 2022',
  //         start_date: '5 November, 2022',
  //         end_date: '5 February, 2023',
  //         email: 'fitsum.kebede@gmail.com',
  //         school: 'Debre Tabor University',
  //         status: 'Approved',
  //     },
  //     {_id:87654,
  //         category: 'Network Engineering',
  //         first_name: 'Kalkidan',
  //         last_name: 'Wolde',
  //         application_date: '18 October, 2022',
  //         start_date: '25 October, 2022',
  //         end_date: '25 January, 2023',
  //         email: 'kalkidan.wolde@gmail.com',
  //         school: 'Arba Minch University',
  //         status: 'Pending',
  //     }
  // ];

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
                <TableCell className="table_cell">Category</TableCell>

                <TableCell className="table_cell">School</TableCell>

                <TableCell className="table_cell">Status</TableCell>
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
                  <TableCell className="table_cell">{row.created_at}</TableCell>
                  <TableCell className="table_cell">{row.start_date}</TableCell>
                  <TableCell className="table_cell">{row.duration}</TableCell>
                  <TableCell className="table_cell">{row.department}</TableCell>
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
                  </select>                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 style={{color:"red",marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>There No any Data</h1>
      )
      }
    </>
  );
}

export default TableList;
