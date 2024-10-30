import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
import './reportsPge.scss';
import { useApplicantData } from '../components/ApplicantContext/ApplicantContext';
const Reports = () => {
//   const [totalApplications, setTotalApplications] = useState(0);
//   const [approvedApplications, setApprovedApplications] = useState(0);
//   const [pendingApplications, setPendingApplications] = useState(0);
//   const [rejectedApplications, setRejectedApplications] = useState(0);
//   const [applicationTrends, setApplicationTrends] = useState([]);
//   const [departmentDistribution, setDepartmentDistribution] = useState([]);
//   const [demographics, setDemographics] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/reports-data');
        
//         setTotalApplications(response.data.totalApplications);
//         setApprovedApplications(response.data.approvedApplications);
//         setPendingApplications(response.data.pendingApplications);
//         setRejectedApplications(response.data.rejectedApplications);
//         setApplicationTrends(response.data.applicationTrends);
//         setDepartmentDistribution(response.data.departmentDistribution);
//         setDemographics(response.data.demographics);
        
//       } catch (error) {
//         console.error('Error fetching reports data:', error);
//       }
//     };
//     fetchData();
//   }, []);
const {
    numberOfApplicants,
    pendingApplicants,
    rejectedApplicants,
    approvedApplicants,
    loading,
} = useApplicantData();
    
    // Colors for the Pie Chart
    
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  if (loading) return <p>Loading...</p>;
  return (
    <div>
          <h1>Reports </h1>
      
      {/* Application Summary */}
      <div className="summary">
        <h2>Application Summary</h2>
        <ul>
          <li>Total Applications: {numberOfApplicants}</li>
          <li>Approved Applications: {approvedApplicants}</li>
          <li>Pending Applications: {pendingApplicants}</li>
          <li>Rejected Applications: {rejectedApplicants}</li>
        </ul>
      </div>

      {/* Status Breakdown */}
      <div className="status-breakdown">
        <h2>Status Breakdown</h2>
        <PieChart width={400} height={300}>
          <Pie dataKey="value" data={[
            { name: 'Approved', value: approvedApplicants },
            { name: 'Pending', value: pendingApplicants },
            { name: 'Rejected', value: rejectedApplicants }
          ]}
          cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {COLORS.map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Application Trends */}
      {/* <div className="application-trends">
        <h2>Application Trends Over Time</h2>
        <LineChart width={500} height={300} data={applicationTrends}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Line type="monotone" dataKey="applications" stroke="#82ca9d" />
        </LineChart>
      </div> */}

      {/* Department Distribution */}
      {/* <div className="department-distribution">
        <h2>Applications by Department</h2>
        <BarChart width={500} height={300} data={departmentDistribution}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" fill="#8884d8" />
        </BarChart>
      </div> */}

      {/* Demographics */}
      {/* <div className="demographics">
        <h2>Applicant Demographics</h2>
        <ul>
          {demographics.map((demographic, index) => (
            <li key={index}>{demographic.label}: {demographic.count}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Reports;
