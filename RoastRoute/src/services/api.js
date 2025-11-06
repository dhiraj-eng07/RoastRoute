import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchRoasts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roasts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roasts:', error);
    throw error;
  }
};

export const fetchRoastDetails = async (roastId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roasts/${roastId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching roast details for ID ${roastId}:`, error);
    throw error;
  }
};

// Add more API functions as needed
