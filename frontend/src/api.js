import axios from 'axios';

// Determine the base URL based on the environment
// For Vite, use import.meta.env instead of process.env
const API_URL = 
  import.meta.env.PROD
    ? '/api/messages' // In production, use relative path for Vercel
    : 'http://localhost:5000/api/messages'; // In development, use localhost

// API service for messages
const messageApi = {
  // Get all messages
  async getAllMessages() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Create a new message
  async createMessage(text) {
    try {
      const response = await axios.post(API_URL, { text });
      return response.data;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }
};

export default messageApi;
