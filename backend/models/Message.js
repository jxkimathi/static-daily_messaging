// Simple in-memory message service
class MessageService {
  constructor() {
    console.log('Initializing message service with default messages');
    // No need for file storage or MongoDB, just use default messages
    this.messages = this.getDefaultMessages();
    console.log(`Loaded ${this.messages.length} default messages`);
  }
  
  // Default messages to use
  getDefaultMessages() {
    return [
      { _id: "1", text: "The world deserves someone like you who speaks life into others, who has dreams to change the world and fully devotes themselves to helping others. You are one of the brightest minds I know and you bring so much joy and light into the world. I want you to know that you are seen and loved. I pray that everything you do is blessed and that I get to see you making your mark in this world is a blessing in itself. Here's day 1 of 22. 💗", order: 0 },
    ];
  }

  // Get all messages - simplified to just return the default messages
  async findAll() {
    console.log('Returning all default messages');
    return this.messages;
  }

  // Create a new message - add to in-memory array
  async create(messageData) {
    console.log('Creating new message:', messageData);
    const newMessage = {
      _id: new Date().getTime().toString(),
      text: messageData.text,
      order: this.messages.length
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

// Create a singleton instance
const messageService = new MessageService();

module.exports = {
  messageService
};
