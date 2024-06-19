import axios from 'axios';
const moment = require("moment")

const API_URL = 'http://ec2-13-127-87-100.ap-south-1.compute.amazonaws.com:3000';
// const API_URL = 'http://localhost:3000';


export const fetchMetricsWithRange = async (start, end, selectedMetric) => {

  const metrics = selectedMetric.map(metric => (
    metric.value
  ));

  const startUTC = moment(start).utc().format();
  const endUTC = moment(end).utc().format();

    try {
      const response = await axios.post(`${API_URL}/metrics`, {
        startUTC,
        endUTC,
        metrics
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  };
