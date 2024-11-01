import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tooltip } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useApplicantData } from '../../ApplicantContext/ApplicantContext';
import { ColorContext } from '../../ColorContext/DarkContext';
// Import CSS file
import './progressBar.scss';

function ProgressBar() {
    const  reportData  = useApplicantData()
    const [data, setData] = useState([]);
    const {darkMode} = useContext(ColorContext);
    const colorStyle={
          color: darkMode ? 'white' : '#000'
          }
    useEffect(() => {
        if (reportData) {
            setData([
                { name: 'Total Applicants', value: reportData.numberOfApplicants },
                { name: 'Approved', value: reportData.approvedApplicants },
                { name: 'Pending', value: reportData.pendingApplicants },
                { name: 'Rejected', value: reportData.rejectedApplicants },
            ]);
        }
    }, [reportData]);

    return (
        <div className="progress_bar">
            <div className="top">
                <p style={colorStyle} >Total Internship Applications</p>
                <MoreVertOutlinedIcon />
            </div>

            <div className="middle">
                <div style={colorStyle} className="progress">
                    <ResponsiveContainer width="100%" height="100%">
                        {data.length === 0 ? (
                            <p>No data available</p>
                        ) : (<PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                fill="#536def"
                                label={({ name, value }) => `${name}: ${value}`}
                            />
                            <Tooltip />
                        </PieChart>)}
                    </ResponsiveContainer>
                </div>
                <p style={colorStyle}>Total applications 
                <span style={colorStyle} className="applications">
                    {reportData.numberOfApplicants}
                    </span>
                    </p>
            </div>

            <div className="bottom" style={colorStyle}>
                <p style={colorStyle} >Data based on the latest submissions.</p>

                <div className="botom_nested">
                    <div className="nested_nested">
                        <p style={colorStyle}>Approved</p>
                        <p className="applications">
                            <KeyboardArrowUpOutlinedIcon /> {reportData.approvedApplicants}
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p style={colorStyle}>Rejected</p>
                        <p className="applications decrese">
                            <KeyboardArrowUpOutlinedIcon /> {reportData.rejectedApplicants}
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p style={colorStyle}>Pending</p>
                        <p className="applications">
                            <KeyboardArrowUpOutlinedIcon /> {reportData.pendingApplicants}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
