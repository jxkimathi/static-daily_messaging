import axios from 'axios';

const API_URL = 
  import.meta.env.PROD
    ? '/api/messages'
    : 'http://localhost:5000/api/messages';

const messageApi = {
  async getAllMessages() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

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
