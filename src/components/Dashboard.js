import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchMetricsWithRange } from '../api/api';
import './Dashboard.css';
import MetricsChart from './MetricsChart';
import { io } from 'socket.io-client';
import moment from 'moment';

const metricOptions = [
    { value: 'usr', label: '%Usr' },
    { value: 'system', label: '%System' },
    { value: 'guest', label: '%Guest' },
    { value: 'wait', label: '%Wait' },
    { value: 'CPU', label: '%CPU' },
];

const Dashboard = () => {
    const currentDateString = moment().format('YYYY-MM-DD');
    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState(null);
    const [start, setStart] = useState(currentDateString);
    const [startTime, setStartTime] = useState('00:00:00');
    const [endTime, setEndTime] = useState('23:59:59');
    const [end, setEnd] = useState(currentDateString);
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (selectedMetrics.length > 1 && metrics.length > 0) {
            handleFetchMetrics();
        }
    }, [selectedMetrics])

    const handleFetchMetrics = async () => {
        try {
            const data = await fetchMetricsWithRange(`${start} ${startTime}`, `${end} ${endTime}`, selectedMetrics);
            setMetrics(data);
            setError('');
        } catch (err) {
            setError('Error fetching metrics.');
        }
    };

    const handleLiveToggle = () => {
        setError('')
        if (!isLive) {
            const newSocket = io('http://ec2-13-127-87-100.ap-south-1.compute.amazonaws.com:3000');
            newSocket.on('metrics', (newMetric) => {
                setMetrics((prevMetrics) => [...prevMetrics, ...newMetric]);
            });
            setSocket(newSocket);
        } else {
            socket.disconnect();
            setSocket(null);
        }
        setMetrics([]);
        setIsLive(!isLive);
    };

    const getAggregatedData = () => {
        return selectedMetrics.map((metric) => {
            return {
                label: metric.label,
                data: metrics.map((m) => {
                    var utcTime = moment.utc(m.interval, "YYYY-MM-DD HH:mm");
                    var localTime = utcTime.local().format("YYYY-MM-DD HH:mm");
                    return {
                        timestamp: isLive ? moment.unix(m.interval).format("YYYY-MM-DD HH:mm") : localTime,
                        value: m[metric.value],
                        command: m.Command
                    }
                }),
            }
        });
    };

    // const getAggregatedData = () => {
    //     return selectedMetrics.map(metric => ({
    //         label: metric.label,
    //         data: metrics.map(m => ({
    //             timestamp: moment.unix(m.interval).format("YYYY-MM-DD HH:mm:ss") || m.timestamp,
    //             value: m[metric.value],
    //         })),
    //     }));
    // };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Linux Performance Monitor</h1>
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
            <Select
                isMulti
                options={metricOptions}
                className="metric-select"
                classNamePrefix="select"
                placeholder="Select Metrics"
                onChange={setSelectedMetrics}
            />
            <div>
                <button disabled={isLive} onClick={handleFetchMetrics} className="fetch-button">Fetch Metrics</button>
                <span className="arrow">or</span>
                <button onClick={handleLiveToggle} className={`live-button ${isLive ? 'active' : ''}`}>
                    {isLive ? 'Stop Live' : 'Watch Live'}
                </button>
            </div>
            {error && <div className="error">{error}</div>}
            <MetricsChart data={getAggregatedData()} />
        </div>
    );
};

export default Dashboard;
