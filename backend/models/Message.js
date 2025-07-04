class MessageService {
  constructor() {
    console.log('Initializing message service with default messages');
    this.messages = this.getDefaultMessages();
    console.log(`Loaded ${this.messages.length} default messages`);
  }
  
  getDefaultMessages() {
    return [
      { _id: "1", text: "If ambition was a person it would be you. I’ve never met someone so driven and passionate about the things that they love. You inspire me each and every day. You always push me to do the things that I love and to never give up even when I’m so done with it. You are such a rock and I hope that fire in you never dies. I’m so proud of the person you are and the person you continue to be everyday. Here’s to day 2 of 22💗", order: 0 },
      { _id: "2", text: "The world deserves someone like you who speaks life into others, who has dreams to change the world and fully devotes themselves to helping others. You are one of the brightest minds I know and you bring so much joy and light into the world. I want you to know that you are seen and loved. I pray that everything you do is blessed and that I get to see you making your mark in this world is a blessing in itself. Here's day 1 of 22. 💗", order: 1 },
    ];
  }

  async findAll() {
    console.log('Returning all default messages');
    return this.messages;
  }

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

const messageService = new MessageService();

module.exports = {
  messageService
};
