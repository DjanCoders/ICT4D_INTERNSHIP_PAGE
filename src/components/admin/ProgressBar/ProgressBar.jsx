import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tooltip } from '@mui/material';
import React, { useEffect,  useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useApplicantData } from '../../ApplicantContext/ApplicantContext';
// Import CSS file
import './progressBar.scss';

function ProgressBar() {
    const  reportData  = useApplicantData()
    const [data, setData] = useState([]);
 
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
                <p>Total Internship Applications</p>
                <MoreVertOutlinedIcon />
            </div>

            <div className="middle">
                <div className="progress">
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
                <p>Total applications processed this period.</p>
                <p className="applications">
                    {reportData.numberOfApplicants}
                </p>
            </div>

            <div className="bottom">
                <p>Data based on the latest submissions.</p>

                <div className="botom_nested">
                    <div className="nested_nested">
                        <p>Approved</p>
                        <p className="applications">
                            <KeyboardArrowUpOutlinedIcon /> {reportData.approvedApplicants}
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p>Rejected</p>
                        <p className="applications decrese">
                            <KeyboardArrowUpOutlinedIcon /> {reportData.rejectedApplicants}
                        </p>
                    </div>
                    <div className="nested_nested">
                        <p>Pending</p>
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
