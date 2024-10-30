import React, { useState,useEffect ,useContext} from 'react';
import './reportsPge.scss';
import Chart from '../components/admin/Chart/Chart';
import ProgressBar from '../components/admin/ProgressBar/ProgressBar';
import axios from 'axios';
import './reportsPge.scss'
import { ColorContext } from '../components/ColorContext/DarkContext';
const Reports = () => {
    const [applicantData, setApplicantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {darkMode} = useContext(ColorContext);
    const colorStyle={
          color: darkMode ? 'green' : '#000'
          }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/monthly-application-count/');
                const  monthlyData  = response.data; 
                setApplicantData(monthlyData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


   
  if (loading) return <p style={colorStyle}>Loading...</p>;
  return (
    <div>
          <h1 style={colorStyle}>Reports </h1>    
         
          <div className="chart_sec">
                    
              <ProgressBar/>

              <Chart
                  
                data={applicantData}
                title="Internship Application Counts"
            />
        </div>
    
    </div>
  );
};

export default Reports;
