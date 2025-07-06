class MessageService {
  constructor() {
    console.log('Initializing message service with default messages');
    this.messages = this.getDefaultMessages();
    console.log(`Loaded ${this.messages.length} default messages`);
  }
  
  getDefaultMessages() {
    return [
      { _id: "1", text: "The world deserves someone like you who speaks life into others, who has dreams to change the world and fully devotes themselves to helping others. You are one of the brightest minds I know and you bring so much joy and light into the world. I want you to know that you are seen and loved. I pray that everything you do is blessed and that I get to see you making your mark in this world is a blessing in itself. Here's day 1 of 22. 💗", order: 0 },
      { _id: "2", text: "If ambition was a person it would be you. I've never met someone so driven and passionate about the things that they love. You inspire me each and every day. You always push me to do the things that I love and to never give up even when I'm so done with it. You are such a rock and I hope that fire in you never dies. I'm so proud of the person you are and the person you continue to be everyday. Here's to day 2 of 22💗", order: 1 },
      { _id: "3", text: "It's very rare to find someone who wears his heart on his sleeve like you do. You never keep me guessing on where we are or how you feel and you're always honest about that. You don't mince your words when you speak about your values or faith. You're firm but also carry alot of grace with you. You're all the things they say love to be; kind, patient, selfless and many more. I'm grateful to be part of that love you carry so dearly. Here's to day 3 of 22💗", order: 2 },
      { _id: "4", text: "One of the things that drew me to you was your faith. Believing in something greater than your self or the world as strongly as you do shows so much about your charachter. You carry that with you so proudly and so firmly. I love that you try to share pieces of that with me and you slowly bring me into your world. It’s one of the things that I never expected from you but it’s also one of the things that draw me closer to you everyday. Here’s to day 4 of 22💗", order: 3 },
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
