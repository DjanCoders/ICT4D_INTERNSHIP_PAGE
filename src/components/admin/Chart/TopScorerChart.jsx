import React, { useEffect, useState, useContext } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ColorContext } from '../../ColorContext/DarkContext';
import { getTopScorers } from '../../../api';
import './chart.scss';

function TopScorersChart({ title }) {
  const { darkMode } = useContext(ColorContext);
  const [topScorers, setTopScorers] = useState([]);
  const colorStyle = { color: darkMode ? 'white' : '#000' };

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        const response = await getTopScorers();
          setTopScorers(response.data);
          console.log(topScorers)
      } catch (error) {
        console.error("Error fetching top scorers:", error);
      }
    };
    fetchTopScorers();
  }, []);

  return (
    <div className="chart">
      {topScorers.length === 0 ? (
        <p style={colorStyle}>No data available</p>
      ) : (
        <div>
          <div className="title">
            <p style={colorStyle}>{title} - Top 10 Scorers</p>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topScorers} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#536def" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#536def" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="applicant_name" stroke="gray" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" className="strokee" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#536def"
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopScorersChart;
