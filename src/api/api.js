import axios from 'axios';

const API_URL = 'http://ec2-13-127-87-100.ap-south-1.compute.amazonaws.com:3000';

export const fetchMetricsWithRange = async (start, end, selectedMetric) => {
  const metric = selectedMetric?.value;
    try {
      const response = await axios.get(`${API_URL}/metrics`, {
        params: { start, end, metric}
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  };
