import { React,useContext } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis,ResponsiveContainer } from 'recharts';
import './chart.scss';
import { ColorContext } from '../../ColorContext/DarkContext';
function Chart({ data, title }) {
    const {darkMode} = useContext(ColorContext);
    const colorStyle={
          color: darkMode ? 'white' : '#000'
          }
    return (
        <div className="chart">
            {data=== 0 ? (
                <p style={colorStyle}>No data available</p>
            ) : (
                <div>
                    <div className="title">
                        <p style={colorStyle}>{title} (Last 1 year)</p>
                    </div>

                        <div  style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">

                            <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient  id="totals" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#536def" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#536def" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" className="strokee" />
                            <Tooltip />
                            <Area 
                                type="monotone"
                                dataKey="total"
                                stroke="#536def"
                                fillOpacity={1}
                                fill="url(#totals)"
                            />
                                </AreaChart>
                                </ResponsiveContainer> 
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chart;
