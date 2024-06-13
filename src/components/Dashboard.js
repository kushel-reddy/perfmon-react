import React, { useState, useEffect } from 'react';
import { fetchMetrics, fetchMetricsWithRange } from '../api/api'
import './Dashboard.css';
import MetricsChart from './MetricsChart';


const Dashboard = () => {
    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState(null);
    const [start, setStart] = useState('');
    const [startTime, setStartTime] = useState('00:00:00');
    const [endTime, setEndTime] = useState('23:59:59');
    const [end, setEnd] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMetrics();
                console.log(data)
                setMetrics(data);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };
        getData();
    }, []);

    const metricData = metrics.map(m => ({
        timestamp: m.timestamp,
        value: m.CPU,
    }));

    const handleFetchMetrics = async () => {
        try {
            const data = await fetchMetricsWithRange(`${start} ${startTime}`, `${end} ${endTime}`);
            setMetrics(data);
            setError('');
        } catch (err) {
            setError('Error fetching metrics.');
        }
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Linux Performance Metrics</h1>
            <div className="date-picker-container">
                <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder="Start Date"
                    className="date-picker"
                />
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="Start Time"
                    className="time-picker"
                />
                <span className="arrow">→</span>
                <input
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    placeholder="End Date"
                    className="date-picker"
                />
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="End Time"
                    className="time-picker"
                />
                
            </div>
            <button onClick={handleFetchMetrics} className="fetch-button">Fetch Metrics</button>
            {error && <div className="error">{error}</div>}
            <MetricsChart data={metricData} title="Performance Metrics" />
        </div>
    );
};

export default Dashboard;
