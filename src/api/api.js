import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchMetrics = async () => {
  try {
    const response = await axios.get`${API_URL}/query`;
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics', error);
    throw error;
  }
};

export const fetchMetricsWithRange = async (start, end) => {
    try {
      const response = await axios.get(`${API_URL}/metrics`, {
        params: { start, end}
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  };
