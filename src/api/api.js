import axios from 'axios';
const moment = require('moment');

const API_URL = 'http://ec2-13-127-87-100.ap-south-1.compute.amazonaws.com:3000';
// const API_URL = 'http://localhost:3000';


export const fetchMetricsWithRange = async (startLocal, endLocal, selectedMetric) => {

  const metrics = selectedMetric.map(metric => (
    metric.value
  ));

  const start = moment(startLocal).utc().format("YYYY-MM-DD HH:mm:ss");
  const end = moment(endLocal).utc().format("YYYY-MM-DD HH:mm:ss");


    try {
      const response = await axios.post(`${API_URL}/metrics`, {
        start,
        end,
        metrics
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  };
